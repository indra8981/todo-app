import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
export default class Modale extends Component {
  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit ToDo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  name="title"
                  onChange={this.props.editChangeHandler}
                  defaultValue={this.props.title}
                  placeholder="Enter Title"
                />
              </Form.Group>

              <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  name="description"
                  onChange={this.props.editChangeHandler}
                  defaultValue={this.props.description}
                  placeholder="Please enter a Description"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.edit}>Save</Button>
            <Button onClick={this.props.delete}>Delete</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
