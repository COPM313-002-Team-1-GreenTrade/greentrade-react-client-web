import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Show(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/rewards/" + props.match.params.id;
  
  React.useEffect(() => {
    console.log("Hello")
    const fetchData = async () => {
      const result = await axios(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          }
      });
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editReward = (id) => {
    props.history.push({
      pathname: '/editreward/' + id
    });
  };

  const deleteReward = (id) => {
    setShowLoading(true);
    // const reward = { brand: reward.brand, cost: reward.cost, 
    //   hasStock: reward.hasStock, id: reward.id, img_url: reward.img_url, value: reward.value};
  
    axios.delete(apiUrl)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/rewards')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>

        <h1>{data.brand}</h1> <img
            style={{width: 100, height: 100}}
            src={data.img_url}
          />
        <p>Cost: {data.cost}</p>
        <p>Value: {data.value}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editReward(data.documentId) }}>Edit Reward</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteReward(data.documentId) }}>Delete Reward</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Show);
