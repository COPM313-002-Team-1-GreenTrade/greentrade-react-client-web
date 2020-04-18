import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateAdmin(props) {
  const [admin, setAdmin] = useState({ uid: '', firstName: '', lastName: '', displayName: '',
                email: '', providerid: '', deleted: false});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/api/admin";

  const saveAdmin = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: admin.firstName, lastName: admin.lastName, 
      email: admin.email, providerid: admin.providerid, displayName : admin.displayName, deleted:false};
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show_admin/' + admin.email)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setAdmin({...admin, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        
        <Form onSubmit={saveAdmin}>
            <Form.Group className="col-md-6"> <h3>Add New admin</h3> </Form.Group>
        
          <Form.Group className="col-md-6">
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={admin.firstName} onChange={onChange} required/>
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={admin.lastName} onChange={onChange} required/>
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label> Display Name</Form.Label>
            <Form.Control type="text" name="displayName" id="displayName" placeholder="Enter display name" value={admin.displayName} onChange={onChange} required/>
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={admin.email} onChange={onChange} required/>
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="providerid" id="providerid" placeholder="Enter password" value={admin.providerid} onChange={onChange} required/>
          </Form.Group>

         <div className="col-md-6"> 
            <Button variant="primary" type="submit">
              Save
            </Button>
         </div>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateAdmin);