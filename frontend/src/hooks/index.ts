import { useEffect, useState } from 'react';

import axios from 'axios';

import { BACKEND_URL } from '../config';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getValidToken();

    if (!token) {
      toast.error('Session expired. Please sign in again.', {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      })
      .catch((err) => {
        toast.error('Error fetching the blog' + err, {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      });
  }, [id, navigate]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getValidToken();

    if (!token) {
      toast.error('Session expired. Please sign in again.', {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        toast.error('Error fetching blogs:' + err, {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      });
  }, [navigate]);

  return {
    loading,
    blogs,
  };
};

const ONE_MINUTE_TTL = 300 * 2000;

export const storeTokenWithExpiry = (token: string) => {
  if (typeof window === 'undefined') return;

  const now = new Date();
  const expiry = now.getTime() + ONE_MINUTE_TTL;

  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry.toString());
};

export const getValidToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('expiry');

  if (!token || !expiry) return null;

  const now = new Date().getTime();
  const expiryTime = parseInt(expiry);

  if (now > expiryTime) {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    toast.warn('Token expired');
    return null;
  }

  return token;
};

export const userHasValidToken = (): boolean => {
  return !!getValidToken();
};
