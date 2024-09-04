import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

interface UploadedFile {
  _id: string;
  title: string;
  filePath: string;
  type: string; // 'news' or 'video'
}

const NewsContent: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/files")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Filter files by type 'video' and group into rows
  const videoFiles = files.filter(file => file.type === 'video');
  
  // Grouping files into rows with specific column widths
  const groupedFiles = [
    videoFiles.slice(0, 3), // First row: 3 columns
    videoFiles.slice(3, 6), // Second row: 3 columns
    videoFiles.slice(6, 9), // Third row: 3 columns
    videoFiles.slice(9, 12) // Fourth row: 3 columns
  ];

  return (
    <div className="news-gallery">
      <h2 className='news-gallery-title'>News</h2>
      {groupedFiles.map((rowFiles, rowIndex) => (
        <Row key={rowIndex}>
          {rowFiles.map((file, colIndex) => {
            const colSizes = [4, 4, 4]; // Default sizes for 3 columns

            // Adjust column sizes based on index
            if (rowIndex === 0 && colIndex === 0) colSizes[colIndex] = 6;
            if (rowIndex === 1 && colIndex === 1) colSizes[colIndex] = 3;
            if (rowIndex === 2 && colIndex === 2) colSizes[colIndex] = 5;

            return (
              <Col
                key={file._id}
                xs={12} md={colSizes[colIndex]}
                className="news-gallery-item"
                style={{ backgroundImage: `url(http://localhost:5000/uploads/${file.filePath})` }}
              >
                <h1 className='news-gallery-item-title'>{file.title}</h1>
              </Col>
            );
          })}
        </Row>
      ))}
    </div>
  );
};

export default NewsContent;
