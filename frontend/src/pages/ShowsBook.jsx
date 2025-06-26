import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useAuthContext } from '../hooks/useAuthContext';
import { enqueueSnackbar } from 'notistack';;

function ShowsBook() {

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user || !user.token) {
      enqueueSnackbar('You must login or register', { variant: 'error' });
      return
    }
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id, user])
  return (
    <div className='p-6 bg-gray-900 text-white min-h-screen'>
      <BackButton />
      <h1 className='text-4xl font-semibold my-6 text-center'>Book Details</h1>
      {loading ? (
        <Spinner />
      ) : book ? (
        <div className='max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg'>
          <div className='mb-4'>
            <span className='block text-lg font-semibold text-gray-400'>ID:</span>
            <span className='text-white'>{book._id}</span>
          </div>
          <div className='mb-4'>
            <span className='block text-lg font-semibold text-gray-400'>Title:</span>
            <span className='text-white'>{book.title}</span>
          </div>
          <div className='mb-4'>
            <span className='block text-lg font-semibold text-gray-400'>Author:</span>
            <span className='text-white'>{book.author}</span>
          </div>
          <div className='mb-4'>
            <span className='block text-lg font-semibold text-gray-400'>Publish Year:</span>
            <span className='text-white'>{book.publishYear}</span>
          </div>
          <div className='mb-4'>
            <span className='block text-lg font-semibold text-gray-400'>Created At:</span>
            <span className='text-white'>{new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className='mb-4'>
            <span className='block text-lg font-semibold text-gray-400'>Last Updated:</span>
            <span className='text-white'>{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      ) : (
        <p className='text-center text-gray-400'>Book not found.</p>
      )}
    </div>
  )
}

export default ShowsBook