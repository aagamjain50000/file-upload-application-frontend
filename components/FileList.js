import React, { useEffect, useState } from "react";
import { getFiles } from "../utils/api";
import styles from "../styles/FileList.module.css"; // Import the CSS file

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getFiles();
        setFiles(response.files); // Adjust based on API response structure
      } catch {
        setError("Failed to fetch files");
      }
    };
    fetchFiles();
  }, []);

  return (
    <div className={styles.file_list_container}>
      <h2 className={styles.file_list_title}>Uploaded Files</h2>
      {error && <div className={styles.file_list_error}>{error}</div>}
      <ul className={styles.file_list}>
        {files.map((file) => (
          <li key={file.filename} className={styles.file_list_item}>
            <span className={styles.file_name}>{file.filename}</span>
            <div className={styles.file_actions}>
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/download/${file.filename}`}
                className={styles.file_action + " " + styles.download}
                download
              >
                Download
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/preview/${file.filename}`}
                className={styles.file_action + " " + styles.preview}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;