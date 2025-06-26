import express from 'express';
import multer from 'multer';
import path from 'path';
import { Book } from '../models/bookModel.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure storage for file uploads
const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (request, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (request, file, cb) {
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only PDF files are allowed!'));
    }
})

// Route for saving a new Book
router.post('/', auth, upload.single('pdfFile'), async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            pdfFile: request.file ? request.file.path : null,
            user_id: request.user.id

        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route for Getting all Books
router.get('/', auth, async (request, response) => {
    const user_id = request.user.id

    try {
        const books = await Book.find({ user_id }).sort({ createdAt: -1 });

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route for Getting Book by Id
router.get('/:id', auth, async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route for Updating the Book by Id
router.put('/:id', auth, async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: 'Send all required fields" title, author, publishYear' });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book updated successfully ' });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
})

// Route for Deleting a Book by Id
router.delete('/:id', auth, async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book deleted sucessfully' });
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message });
    }
})

export default router;