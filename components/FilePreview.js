import React, { useEffect, useState } from "react";

const FilePreview = ({ file }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchFilePreview = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preview/${file}`);
        const data = await response.text();
        setContent(data);
      } catch (error) {
        console.error("Error fetching file preview:", error);
      }
    };
    fetchFilePreview();
  }, [file]);

  return (
    <div>
      <h3>Preview of {file}</h3>
      <pre>{content}</pre>
    </div>
  );
};

export default FilePreview;
