import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateContainerInventory(props) {
  const [container, setContainer] = useState({ uid: '', cost: null, restock: null, size: '', stock: null});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/api/containers_inventory";

  const saveContainer = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { uid: container.size, cost: container.cost, 
      restock: container.restock, size: container.size, stock : container.stock};
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show_container/' + container.size)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setContainer({...container, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        
        <Form onSubmit={saveContainer}>
            <Form.Group className="col-md-6"> <h3>Add New Container</h3> </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label>Size</Form.Label>
            <Form.Control type="text" name="size" id="size" placeholder="Enter size" value={container.size} onChange={onChange} required/>
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label>Cost</Form.Label>
            <Form.Control type="number" name="cost" id="cost" placeholder="Enter cost" value={container.cost} onChange={onChange} required/>
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" id="stock" placeholder="Enter stock" value={container.stock} onChange={onChange} required/>
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label>Restock</Form.Label>
            <Form.Control type="number" name="restock" id="restock" rows="3" placeholder="Enter restock" value={container.restock} onChange={onChange} required/>
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

export default withRouter(CreateContainerInventory);