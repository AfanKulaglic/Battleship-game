import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import image from "../assets/admin.jpg";
import { Navigation } from "../components/Navigation";

interface FileState {
  title: string;
  file: File | null;
}

interface UploadedFile {
  _id: string;
  title: string;
  filePath: string;
  type: string; // 'news' or 'video'
}

export const Admin: React.FC = () => {
  const [newsState, setNewsState] = useState<FileState>({ file: null, title: "" });
  const [videoState, setVideoState] = useState<FileState>({ file: null, title: "" });
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleNewsTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewsState({ ...newsState, title: e.target.value });
  };

  const handleVideoTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoState({ ...videoState, title: e.target.value });
  };

  const handleNewsFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewsState({ ...newsState, file: e.target.files[0] });
    }
  };

  const handleVideoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoState({ ...videoState, file: e.target.files[0] });
    }
  };

  const handleNewsSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!newsState.file) return;

    const formData = new FormData();
    formData.append("title", newsState.title);
    formData.append("file", newsState.file);

    fetch("http://localhost:5000/upload-news", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleVideoSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!videoState.file) return;

    const formData = new FormData();
    formData.append("title", videoState.title);
    formData.append("file", videoState.file);

    fetch("http://localhost:5000/upload-video", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetch("http://localhost:5000/files")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <Navigation />
      <div className="admin">
        <Row className="admin-row">
          <Col xs={6} className="admin-col">
            <Accordion>
              <Accordion.Item eventKey="0">
              {files.map((file) => (
              <div key={file._id}>
                <h3>{file.title}</h3>
                <img src={`http://localhost:5000/uploads/${file.filePath}`} alt={file.title} style={{ width: '100px', height: '100px' }} />
                <video autoPlay muted src={`http://localhost:5000/uploads/${file.filePath}`} style={{ width: '200px', height: '100px' }} />
              </div>
            ))}
                <Accordion.Header>News Data</Accordion.Header>
                <Accordion.Body>
                  {files.filter(file => file.type === 'news').map((file) => (
                    <div key={file._id}>
                      <h3>{file.title}</h3>
                      <img
                        src={`http://localhost:5000/uploads/${file.filePath}`}
                        alt={file.title}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  ))}
                  <Form.Group as={Col} md="4">
                    <Form.Label className="text-white">Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Add title"
                      value={newsState.title}
                      onChange={handleNewsTitleChange}
                    />
                    <Form.Label className="text-white">Image (jpg/jpeg/png)</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      name="file"
                      onChange={handleNewsFileChange}
                    />
                    <Button onClick={handleNewsSubmit}>Submit</Button>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Video Data</Accordion.Header>
                <Accordion.Body>
                  {files.filter(file => file.type === 'video').map((file) => (
                    <div key={file._id}>
                      <h3>{file.title}</h3>
                      <video
                        autoPlay
                        muted
                        src={`http://localhost:5000/uploads/${file.filePath}`}
                        style={{ width: "200px", height: "100px" }}
                      />
                    </div>
                  ))}
                  <Form.Group as={Col} md="4">
                    <Form.Label className="text-white">Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Add title"
                      value={videoState.title}
                      onChange={handleVideoTitleChange}
                    />
                    <Form.Label className="text-white">Category</Form.Label>
                    <Form.Label className="text-white">Video (mp4)</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      name="file"
                      onChange={handleVideoFileChange}
                    />
                    <Button onClick={handleVideoSubmit}>Submit</Button>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col
            xs={6}
            className="admin-col"
            style={{ backgroundImage: `url(${image})` }}
          ></Col>
        </Row>
      </div>
    </>
  );
};
