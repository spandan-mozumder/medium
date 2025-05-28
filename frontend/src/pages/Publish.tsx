import axios from 'axios';

import { Appbar } from '../components/Appbar';

import { BACKEND_URL } from '../config';

import { useNavigate } from 'react-router-dom';

import { type ChangeEvent, useState } from 'react';

import { getValidToken } from '../hooks';

import { ToastContainer, toast } from 'react-toastify';

export const Publish = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const createBlogPost = async (title: string, content: string) => {
    const token = getValidToken();

    if (!token) {
      throw new Error('Token expired or not found');
    }

    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  };

  return (
    <div>
      <Appbar />
      <ToastContainer />
      <div className="flex w-full justify-center pt-8">
        <div className="w-full max-w-screen-lg">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Title"
          />

          <TextEditor
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              try {
                const data = await createBlogPost(title, description);
                navigate(`/blog/${data.id}`);
              } catch (err) {
                toast.error(
                  'Error while publishing the post. Please try again.',
                  {
                    autoClose: 2000,
                  }
                );
                setTimeout(() => {
                  navigate('/signin');
                }, 2000);
              }
            }}
            type="submit"
            className="mt-4 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mt-2">
      <div className="mb-4 w-full">
        <div className="flex items-center justify-between border">
          <div className="my-2 w-full rounded-b-lg bg-white">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="block w-full border-0 bg-white px-0 pl-2 text-sm text-gray-800 focus:outline-none"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
