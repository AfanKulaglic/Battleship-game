import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import image from "../assets/admin.jpg";
import { Navigation } from "../components/Navigation";

interface FileState {
  title: string;
  file: File | null; // Native File type
}

interface UploadedFile { // Renamed to avoid conflict
  _id: string;
  title: string;
  filePath: string;
}

export const Admin: React.FC = () => {
  const [state, setState] = useState<FileState>({
    file: null,
    title: "",
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, title: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setState({ ...state, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!state.file) return;

    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("file", state.file);

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const [files, setFiles] = useState<UploadedFile[]>([]); // Updated type

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
                <h2 className="text-white m-3">News</h2>

                {files.map((file) => (
                  <div key={file._id}>
                    <h3>{file.title}</h3>
                    <img
                      src={`http://localhost:5000/uploads/${file.filePath}`}
                      alt={file.title}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <video
                      autoPlay
                      muted
                      src={`http://localhost:5000/uploads/${file.filePath}`}
                      style={{ width: "200px", height: "100px" }}
                    />
                  </div>
                ))}

                <Accordion.Header>News Data</Accordion.Header>
                <Accordion.Body>
                  <Form.Group as={Col} md="4">
                    <Form.Label className="text-white">Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Add title"
                      value={state.title}
                      onChange={handleTitleChange}
                    />
                    <Form.Label className="text-white">Image (jpg/jpeg/png)</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      name="file"
                      onChange={handleFileChange}
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="0">
                <h2 className="text-white m-3">Video</h2>

                {files.map((file) => (
                  <div key={file._id}>
                    <h3>{file.title}</h3>
                    <img
                      src={`http://localhost:5000/uploads/${file.filePath}`}
                      alt={file.title}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <video
                      autoPlay
                      muted
                      src={`http://localhost:5000/uploads/${file.filePath}`}
                      style={{ width: "200px", height: "100px" }}
                    />
                  </div>
                ))}

                <Accordion.Header>Video Data</Accordion.Header>
                <Accordion.Body>
                  <Form.Group as={Col} md="4">
                    <Form.Label className="text-white">Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Add title"
                      value={state.title}
                      onChange={handleTitleChange}
                    />
                    <Form.Label className="text-white">Video (mp4)</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      name="file"
                      onChange={handleFileChange}
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
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
