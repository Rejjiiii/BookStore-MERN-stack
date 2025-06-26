import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const BackButton = ({ destination = '/' }) => {
    return (
        <div className='flex'>
            <Link to={destination} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit hover:bg-sky-600 transition' >
                <FaArrowLeft className='text-2xl cursor-pointer text-white ' />
            </Link>
        </div>
    );
}

export default BackButton;
