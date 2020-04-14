import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Edit(props) {
  const [reward, setReward] = useState({ documentId: '', brand: '', cost: '', hasStock: '', 
  id: '',img_url: '', value: '' });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "https://localhost:44348/api/rewards/" + props.match.params.id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setReward(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateReward = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { brand: reward.brand, cost: reward.cost, 
      hasStock: reward.hasStock, id: reward.id, img_url: reward.img_url, value: reward.value};
      
    axios({
      method: 'PUT',
      url: apiUrl,
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
    });
      // .then((result) => {
        setShowLoading(false);
        props.history.push('/showreward/' + props.match.params.id)
      // }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setReward({...reward, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={updateReward}>
          <Form.Group style={{width: 800, marginLeft: 350, marginTop: 20}}>
            <Form.Label> Brand</Form.Label>
            <Form.Control style={{marginLeft: 80, marginTop: -40}} type="text" name="brand" id="brand" placeholder="Enter brand name" value={reward.brand} onChange={onChange} />
          </Form.Group>
          <Form.Group style={{width: 800, marginLeft: 350, marginTop: 20}}>
            <Form.Label> Cost</Form.Label>
            <Form.Control style={{marginLeft: 80, marginTop: -40}} type="text" name="cost" id="cost" placeholder="Enter cost" value={reward.cost} onChange={onChange} />
          </Form.Group>
          <Form.Group style={{width: 800, marginLeft: 350, marginTop: 20}}>
            <Form.Label> Has Stock?</Form.Label>
            <Form.Control style={{marginLeft: 80, marginTop: -40}} type="text" name="hasStock" id="hasStock" placeholder="Enter true or false" value={reward.hasStock} onChange={onChange} />
          </Form.Group>
          <Form.Group style={{width: 800, marginLeft: 350, marginTop: 20}}>
            <Form.Label> ID</Form.Label>
            <Form.Control style={{marginLeft: 80, marginTop: -40}} type="text" name="id" id="id" placeholder="Enter id" value={reward.id} onChange={onChange} />
          </Form.Group>
          <Form.Group style={{width: 800, marginLeft: 350, marginTop: 20}}>
            <Form.Label> Image URL</Form.Label>
            <Form.Control style={{marginLeft: 80, marginTop: -40}} type="text" name="img_url" id="img_url" placeholder="Enter image url" value={reward.img_url} onChange={onChange} />
          </Form.Group>
          <Form.Group style={{width: 800, marginLeft: 350, marginTop: 20}}>
            <Form.Label>Value</Form.Label>
            <Form.Control style={{marginLeft: 80, marginTop: -40}} type="text" name="value" id="value" placeholder="Enter value" value={reward.value} onChange={onChange} />
          </Form.Group>
        
          <Button variant="primary" type="submit" style={{width: 880, marginLeft: 350}}>
            Update Reward
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Edit);
