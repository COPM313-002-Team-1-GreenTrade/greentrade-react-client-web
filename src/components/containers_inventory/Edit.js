import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditContainerInventory(props) {
  const [container, setContainer] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/containers_inventory/" + props.match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setContainer(result.data);
      setShowLoading(false);
    };
    fetchData();
  }, []);

  const updateContainer = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { uid: props.match.params.id, cost: container.cost, 
      restock: container.restock, size: props.match.params.id, stock : container.stock};
      axios.put("http://localhost:3000/api/containers_inventory/", data)
    .then((result) => {
      setShowLoading(false);
      props.history.push('/containers_inventory')
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
        <Form onSubmit={updateContainer}>
          <Form.Group className="col-md-6"> <h3>Update container</h3> </Form.Group>
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
            <Form.Control type="number" name="restock" id="restock" placeholder="Enter restock" value={container.restock} onChange={onChange} required/>
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

export default withRouter(EditContainerInventory);