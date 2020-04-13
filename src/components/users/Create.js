import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateUser(props) {
  const [user, setUser] = useState({ uid: '', firstName: '', lastName: '', displayName: '',
                email: '', providerid: '', type:'', deleted: false, points: ''});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/api/users";

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: user.firstName, lastName: user.lastName, 
      email: user.email, providerid: user.providerid, displayName : user.displayName, 
      type: user.type, deleted:false, points:user.points};
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show_user/' + user.email)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setUser({...user, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        
        <Form onSubmit={saveUser}>
            <Form.Group className="col-md-6"> <h3>Add New Users</h3> </Form.Group>
        
          <Form.Group className="col-md-6">
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={user.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={user.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label> Display Name</Form.Label>
            <Form.Control type="text" name="displayName" id="displayName" placeholder="Enter display name" value={user.displayName} onChange={onChange} />
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={user.email} onChange={onChange} />
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="providerid" id="providerid" placeholder="Enter password" value={user.providerid} onChange={onChange} />
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Type</Form.Label>
            <Form.Control type="text" name="type" id="type" placeholder="Enter type (member or collector)" value={user.type} onChange={onChange} />
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Points</Form.Label>
            <Form.Control type="text" name="points" id="points" placeholder="Enter points" value={user.points} onChange={onChange} />
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

export default withRouter(CreateUser);