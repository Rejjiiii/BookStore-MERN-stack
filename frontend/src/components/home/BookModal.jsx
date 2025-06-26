import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi'
import { FaBookOpen, FaUser, FaTimes } from 'react-icons/fa';

function BookModal({ book, onClose }) {
    return (
        <div className='fixed bg-black/50 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()} className='w-[600px] max-w-full h-[400px] bg-gray-800 text-white rounded-xl p-6 flex flex-col relative shadow-lg'>
                <FaTimes className='absolute right-6 top-6 text-3xl text-red-500 cursor-pointer hover:text-white transition-all duration-300' onClick={onClose} />
                <h2 className='w-fit px-4 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold'>{book.publishYear}</h2>
                <h4 className='my-2 text-gray-400 text-sm'>ID: {book._id}</h4>
                <div className='flex items-center gap-x-2'>
                    <FaBookOpen className='text-orange-400 text-2xl' />
                    <h2 className='text-lg font-semibold'>{book.title}</h2>
                </div>
                <div className='flex items-center gap-x-2 mt-2'>
                    <FaUser className='text-blue-400 text-2xl' />
                    <h2 className='text-md'>{book.author}</h2>
                </div>
                <p className='mt-4 text-gray-300'>Book Description:</p>
                <p className='my-2 text-gray-400'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id officiis, porro quasi blanditiis itaque aperiam repudiandae eius, doloribus iste neque, dolor facilis commodi sunt perferendis? Ad atque sapiente perspiciatis consequatur!</p>
            </div>
        </div>
    )
}

export default BookModal