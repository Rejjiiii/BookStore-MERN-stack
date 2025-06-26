import express, { response } from 'express';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { sercretKey } from '../config.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || sercretKey;

router.post('/register', async (request, response) => {
    try {
        const { username, email, password } = request.body;

        // Validation
        if (!username || !email || !password) {
            throw Error('All fields must be filled');
        }

        if (!validator.isEmail(email)) {
            return response.status(400).json({ message: 'Invalid email format' });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            if (existingUser.username === username && existingUser.email === email) {
                return response.status(400).send({ message: 'User already exist.' }); F
            }

            if (existingUser.username === username) {
                return response.status(400).send({ message: 'Username already exist.' });
            }

            if (existingUser.email === email) {
                return response.status(400).send({ message: 'Email already exist. ' });
            }
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Generate Token
        const token = jwt.sign({ id: newUser._id, }, JWT_SECRET, { expiresIn: '1d' });

        // Return token and user data except password
        return response.status(201).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;

        // Null validation
        if (!email || !password) {
            return response.status(400).json({ message: 'All fields must be filled' });
        }

        // Check if user exist
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(400).json({ message: 'Incorrect Email' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(400).json({ message: 'Incorrect Password' });
        }

        // Generate Token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        // Return token and user data except password
        return response.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
})

export default router;