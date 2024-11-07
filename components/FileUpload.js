import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import Spinner from "./Spinner";
import ErrorNotification from "./ErrorNotification";
import styles from "../styles/FileUpload.module.css";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to reset states
  const resetStates = () => {
    setError(null);
    setProgress({});
    setFiles([]);
    setSuccessMessage(null);
  };

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    resetStates();
    setFiles(acceptedFiles);
  };

  // Upload a file
  const uploadFile = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        formData,
        {
          onUploadProgress: (event) => {
            const progressPercentage = Math.round(
              (event.loaded * 100) / event.total
            );
            setProgress((prevProgress) => ({
              ...prevProgress,
              [file.name]: progressPercentage,
            }));
          },
        }
      );
      setSuccessMessage(response.data.message);
    } catch {
      setError(`Failed to upload ${file.name}. Please try again.`);
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={styles.file_upload_container}>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} className={styles.file_input} />
        <p className={styles.dropzone_text}>
          Drag & drop files here, or click to select files
        </p>
      </div>

      {isLoading && <Spinner />}

      <div className={styles.file_list}>
        {files.map((file) => (
          <div key={file.name} className={styles.file_item}>
            <p className={styles.file_name}>{file.name}</p>
            <ProgressBar progress={progress[file.name] || 0} />
          </div>
        ))}
      </div>

      {error && <ErrorNotification message={error} />}
      {successMessage && <div className="success">{successMessage}</div>}

      <button
        className={styles.upload_button}
        onClick={() => files.forEach(uploadFile)}
      >
        Upload All
      </button>
    </div>
  );
};

export default FileUpload;
