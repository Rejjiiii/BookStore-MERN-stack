import { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { useAuthContext } from '../hooks/useAuthContext';

function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();

  const handleDeleteBook = () => {
    if (!user || !user.token) {
      enqueueSnackbar('You must login or register', { variant: 'error' });
      return
    }
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted Successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error!', { variant: 'error' });
        console.log(error);
      })
  };

  return (
    <div className='p-6 bg-gray-900 text-white min-h-screen'>
      <BackButton className='text-3xl text-white' />
      <h1 className='text-4xl font-semibold my-6 text-center'>Delete Book</h1>
      {loading && <Spinner />}
      <div className='max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg'>
        <h3 className='text-2xl mb-4'>Are you sure you want to delete this book?</h3>
        <p className='text-gray-400 mb-6'>This action cannot be undone.</p>
        <button
          className='w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition'
          onClick={handleDeleteBook}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteBook