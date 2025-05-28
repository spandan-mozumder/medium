import { type ChangeEvent, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { type SignupInput } from '@spandyzlost/medium-zod-types';

import axios from 'axios';

import { BACKEND_URL } from '../config';
import { storeTokenWithExpiry } from '../hooks';

import { ToastContainer, toast } from 'react-toastify';

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: '',
    username: '',
    password: '',
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        postInputs
      );
      const jwt = response.data.jwt;
      storeTokenWithExpiry(jwt);
      navigate('/blogs');
    } catch (e) {
      toast.error('Error while signing up', {
        autoClose: 2000,
      });
    }
  }

  return (
    <div className="flex h-screen flex-col justify-center">
      <ToastContainer />

      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500">
              {type === 'signin'
                ? "Don't have an account?"
                : 'Already have an account?'}
              <Link
                className="pl-2 underline"
                to={type === 'signin' ? '/signup' : '/signin'}
              >
                {type === 'signin' ? 'Sign up' : 'Sign in'}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === 'signup' ? (
              <LabelledInput
                label="Name"
                placeholder="Spandan Mozumder..."
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}
            <LabelledInput
              label="Username"
              placeholder="spandan@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={'password'}
              placeholder="123456"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="me-2 mt-8 mb-2 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              {type === 'signup' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="mb-2 block pt-4 text-sm font-semibold text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || 'text'}
        id="first_name"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
