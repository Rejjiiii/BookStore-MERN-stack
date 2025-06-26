/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

function BooksTable({ books }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      {/* Items per page selector */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Books List</h2>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border p-1 rounded-md  text-zinc-400"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">No</th>
            <th scope="col" className="px-6 py-3 text-center">Title</th>
            <th scope="col" className="px-6 py-3 text-center max-md:hidden">Author</th>
            <th scope="col" className="px-6 py-3 text-center max-md:hidden">Publish Year</th>
            <th scope="col" className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <tr key={book._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                {indexOfFirstBook + index + 1}
              </td>
              <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">{book.title}</td>
              <td className="px-6 py-4 text-center max-md:hidden">{book.author}</td>
              <td className="px-6 py-4 text-center max-md:hidden">{book.publishYear}</td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`books/details/${book._id}`} className="text-lime-300 text-xl hover:text-green-600">
                    <BsInfoCircle />
                  </Link>
                  <Link to={`books/edit/${book._id}`} className="text-blue-400 text-xl hover:text-blue-400">
                    <AiOutlineEdit />
                  </Link>
                  <Link to={`books/delete/${book._id}`} className="text-red-500 text-xl hover:text-red-400">
                    <MdOutlineDelete />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BooksTable;
