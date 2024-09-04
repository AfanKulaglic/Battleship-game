import React from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import image from "../assets/admin.jpg";
import { Navigation } from "../components/Navigation";

export const Admin = () => {
  return (
    <>
      <Navigation />
      <div className="admin">
        <Row className="admin-row">
          <Col xs={6} className="admin-col">
            <Accordion>
              <Accordion.Item eventKey="0">
              <h2 className="text-white m-3">Home page</h2>
                <Accordion.Header>Hero Video</Accordion.Header>
                <Accordion.Body>
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label className="text-white">Video-Hero (mp4)</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Add title"
                    />
                    <Form.Control type="file" required name="file" />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Video Background</Accordion.Header>
                <Accordion.Body>
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label className="text-white">Video-Background (jpg/jpeg/png)</Form.Label>
                    <Form.Control type="file" required name="file" />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Membership</Accordion.Header>
                <Accordion.Body>
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label className="text-white">Membership-Background (jpg/jpeg,png)</Form.Label>
                    <Form.Control type="file" required name="file" />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Banner</Accordion.Header>
                <Accordion.Body>
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label className="text-white">Banner-Background (jpg/jpeg,png)</Form.Label>
                    <Form.Control type="file" required name="file" />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Last games</Accordion.Header>
                <Accordion.Body>
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label className="text-white">Last-Games-Background (jpg/jpeg,png)</Form.Label>
                    <Form.Control type="file" required name="file" />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <h2 className="text-white m-3">News</h2>
                <Accordion.Header>Hero Background</Accordion.Header>
                <Accordion.Body>
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label className="text-white">Hero-Background (jpg/jpeg/png)</Form.Label>
                    <Form.Control type="file" required name="file" />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>News Data</Accordion.Header>
                <Accordion.Body>
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label className="text-white">News-Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Add title"
                    />
                    <Form.Label className="text-white">News-Image (jpg/jpeg/png)</Form.Label>
                    <Form.Control type="file" required name="file" />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>              
              <Accordion.Item eventKey="7">
                <h2 className="text-white m-3">Video</h2>
                <Accordion.Header>Hero Background</Accordion.Header>
                <Accordion.Body>
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label className="text-white">Video-Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Add title"
                    />
                    <Form.Label className="text-white">Video-Title-Image (jpg/jpeg/png)</Form.Label>
                    <Form.Control type="file" required name="file" />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8">
                <Accordion.Header>Videos Data</Accordion.Header>
                <Accordion.Body>
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label className="text-white">Video-Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Add title"
                    />
                    <Form.Label className="text-white">Video-Video (mp4)</Form.Label>
                    <Form.Control type="file" required name="file" />
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
