"use client";
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const AxiosProvider = ({ children }) => {
  const { token } = useSelector((state) => {
    return {
      token: state?.auth?.user?.token
    }
  })

  useEffect(() => {
    createInstance()
  }, [])

  const createInstance = () => {
    axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        if (response?.status === 200) {
          return response;
        }
        if (!response) {
          return toast.error("Network Error")
        }
      },
      (error) => {
        if (!error) {
          return toast.error("Network Error")
        }
        const data = error?.response
        if (error?.response && error?.response?.status === 404) {
          toast.error("Network Error")
        }
        if (data?.errors?.length === 1) {
          toast.error(data?.errors[0])
        } else {
          toast.error(data?.errors)
        }
        return error
      }
    );
  }
  return children;
}

const API = {
  get: async (url, params) => {
    return await axiosInstance.get(url)
  },
  post: async (url, body) => {
    return await axiosInstance.post(url, body)
  },
  put: async (url, body) => {
    return await axiosInstance.put(url, body)
  }
}

export { API, AxiosProvider }