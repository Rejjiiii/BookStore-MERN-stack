import React from 'react'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaUser, FaEye, FaEdit, FaInfoCircle, FaTrashAlt } from 'react-icons/fa';
import { useState } from 'react'
import BookModal from './BookModal'

function BookSingleCard({ book }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='border border-gray-700 bg-gray-900 text-white rounded-lg px-6 py-4 m-4 relative hover:shadow-2xl transition-all duration-300'>
            <h2 className='absolute top-2 right-4 px-4 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold'>{book.publishYear}</h2>
            <h4 className='my-2 text-gray-400 text-sm mt-8'>ID: {book._id}</h4>
            <div className='flex items-center gap-x-2'>
                <FaBookOpen className='text-orange-400 text-2xl' />
                <h2 className='text-lg font-semibold'>{book.title}</h2>
            </div>
            <div className='flex items-center gap-x-2 mt-2'>
                <FaUser className='text-blue-400 text-2xl' />
                <h2 className='text-md'>{book.author}</h2>
            </div>
            <div className='flex justify-between items-center gap-x-4 mt-6 p-4 border-t border-gray-600'>
                <FaEye className='text-3xl text-blue-500 hover:text-white cursor-pointer transition-all duration-300' onClick={() => setShowModal(true)} />
                <Link to={`/books/details/${book._id}`}>
                    <FaInfoCircle className='text-2xl text-green-500 hover:text-white transition-all duration-300' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                    <FaEdit className='text-2xl text-yellow-500 hover:text-white transition-all duration-300' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                    <FaTrashAlt className='text-2xl text-red-500 hover:text-white transition-all duration-300' />
                </Link>
            </div>
            {showModal && (
                <BookModal book={book} onClose={() => setShowModal(false)} />
            )}
        </div>
    )
}

export default BookSingleCard