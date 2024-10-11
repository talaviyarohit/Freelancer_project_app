// src/components/ProjectForm.js
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ProjectForm({ show, handleClose, handleSubmit, projectData }) {
  const [project, setProject] = useState(projectData || { name: '', dueDate: '', status: 'active' });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    handleSubmit(project);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{projectData ? 'Edit Project' : 'Add New Project'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={project.dueDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={project.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleFormSubmit}>{projectData ? 'Update Project' : 'Add Project'}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProjectForm;
