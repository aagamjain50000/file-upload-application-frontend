import React from 'react';
import FileUploader from '../components/FileUpload';
import FileList from '../components/FileList';

const HomePage = () => {
  return (
    <div className="container">
      <h1>File Upload Application</h1>
      <FileUploader />
      <FileList />
    </div>
  );
};

export default HomePage;
