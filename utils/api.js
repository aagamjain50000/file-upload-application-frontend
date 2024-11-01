// utils/api.js
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/upload`; // Adjust the API endpoint if necessary

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("files", file); // Adjusted for multiple files

  try {
    const response = await axios.post(API_URL, formData, {
      onUploadProgress: (event) => {
        return Math.round((event.loaded * 100) / event.total);
      },
    });
    return response.data; // Return server response
  } catch (error) {
    throw new Error(error.response?.data?.message || "Upload failed");
  }
};

export const getFiles = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/files`); // Adjust the endpoint for fetching files
  return response.data; // Return the list of files
};
