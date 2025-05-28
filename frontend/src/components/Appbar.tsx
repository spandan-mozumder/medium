import { Avatar } from './BlogCard';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

import { userHasValidToken } from '../hooks/index';

export const Appbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between border-b px-10 py-4">
      <ToastContainer />
      <Link
        to={'/blogs'}
        className="text-bold flex cursor-pointer flex-col justify-center text-3xl"
      >
        Medium
      </Link>
      <div>
        {userHasValidToken() && (
          <Link to="/publish">
            <button
              type="button"
              className="me-2 mr-4 mb-2 rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
            >
              New
            </button>
          </Link>
        )}

        {userHasValidToken() && (
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('token');
              toast.success('Logged out successfully', {
                autoClose: 2000,
              });
              setTimeout(() => {
                navigate('/signin');
              }, 2000);
            }}
            className="me-2 mr-4 mb-2 rounded-full bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
          >
            Logout
          </button>
        )}

        <Avatar size={'big'} name="spandan" />
      </div>
    </div>
  );
};
