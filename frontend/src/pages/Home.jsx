import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from 'react-icons/io';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import { useAuthContext } from '../hooks/useAuthContext';
import { enqueueSnackbar } from 'notistack';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const { user } = useAuthContext();
  
  useEffect(() => {
    if (!user || !user.token) {
      enqueueSnackbar('You must login or register', { variant: 'error' });
      return
    }
    setLoading(true);
    axios
      .get('http://localhost:5555/books', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [user]);

  return (
    <div className='p-4 w-full bg-black text-white min-h-screen'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onClick={() => setShowType('table')}>
          Table
        </button>
        <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onClick={() => setShowType('card')}>
          Card
        </button>
      </div>
      <div className='flex justify-between items-center mt-6'>
        <h1 className='text-3xl my-8'>Book List</h1>
        <Link to='/books/create' className='text-white hover:scale-110 transition-transform'>
          <IoMdAddCircle className='text-green-400 text-5xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
}

export default Home;
