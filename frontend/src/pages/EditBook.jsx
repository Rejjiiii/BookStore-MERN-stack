import { useState, useEffect } from 'react'
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { useAuthContext } from '../hooks/useAuthContext';

function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { id } = useParams();
  useEffect(() => {
    if (!user || !user.token) {
      enqueueSnackbar('You must login or register', { variant: 'error' });
      return
    }
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false)
        alert('An error happened. Please check the console')
        console.log(error);
      })
  }, [id, user]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(() => {
        if (user) {
          setLoading(false);
          enqueueSnackbar('Book Edited Successfully', { variant: 'success' });
          navigate('/');
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('ERROR!', { variant: 'error' });
        console.log(error)
      });
  }
  return (
    <div className='p-6 bg-gray-900 text-white min-h-screen'>
      <BackButton />
      <h1 className='text-4xl font-semibold my-6 text-center'>Edit Book</h1>
      {loading && <Spinner />}
      <div className='max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <label className='block text-lg mb-2'>Title</label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none' />
        </div>
        <div className='mb-4'>
          <label className='block text-lg mb-2'>Author</label>
          <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none' />
        </div>
        <div className='mb-4'>
          <label className='block text-lg mb-2'>Publish Year</label>
          <input type='number' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none' />
        </div>
        <button className='w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition' onClick={handleEditBook}>Save Changes</button>
      </div>
    </div>
  )
}

export default EditBook