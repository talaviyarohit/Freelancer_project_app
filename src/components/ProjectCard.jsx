// src/components/ProjectCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Text>Due Date: {project.dueDate}</Card.Text>
        <Card.Text>Status: {project.status}</Card.Text>
        <Button variant="warning" onClick={() => onEdit(project)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(project.id)} className="ml-2">Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
