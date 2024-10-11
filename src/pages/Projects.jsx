// src/pages/Projects.js
import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import ProjectForm from '../components/ProjectForm';
import ProjectCard from '../components/ProjectCard';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectCollectionRef = collection(db, 'projects');

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getDocs(projectCollectionRef);
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (project) => {
    if (selectedProject) {
      await updateDoc(doc(db, "projects", selectedProject.id), project);
    } else {
      await addDoc(projectCollectionRef, project);
    }
    setShowForm(false);
    setSelectedProject(null);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projects", id));
  };

  return (
    <div className="mt-4">
      <h3 className='text-center fs-1 mb-5'>Manage Projects</h3>
     <div className='flex'>
        <div className='flex' >
        <Button onClick={() => setShowForm(true)}>Add New Project</Button>
        </div>
        
     </div>
      <Row className="mt-3">
        {projects.map((project) => (
          <Col md={4} key={project.id} className="mb-3">
            <ProjectCard
              project={project}
              onEdit={(project) => {
                setSelectedProject(project);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          </Col>
        ))}
      </Row>
      {showForm && (
        <ProjectForm
          show={showForm}
          handleClose={() => setShowForm(false)}
          handleSubmit={handleSubmit}
          projectData={selectedProject}
        />
      )}
    </div>
  );
}

export default Projects;
