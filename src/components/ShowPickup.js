import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Show(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "https://localhost:44348/api/pickups/" + props.match.params.id;

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

  const cancelPickup = (id) => {
    const d = { additionalInfo: data.additionalInfo, address: data.address, collectorId: data.collectorId, cancelled: true,
        collectorName: data.collectorName, fulfilledTime: data.fulfilledTime, memberId: data.memberId, memberName: data.memberName,
        memberProfilePicURL: data.memberProfilePicURL, scheduledTime: data.scheduledTime};
        
      axios({
        method: 'PUT',
        url: apiUrl,
        data: d,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          }
      })
        .then((result) => {
          setShowLoading(false);
          props.history.push('/pickups/')
        }).catch((error) => setShowLoading(false));
  }


  const deletePickup = (id) => {
    setShowLoading(true);
    // const reward = { brand: reward.brand, cost: reward.cost, 
    //   hasStock: reward.hasStock, id: reward.id, img_url: reward.img_url, value: reward.value};
  
    axios.delete(apiUrl)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/pickups')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>

        <h1>{data.uid}</h1> <img
            style={{width: 100, height: 100}}
            src={data.memberProfilePicURL}
          />
        <p>Additional Info: {data.additionalInfo}</p>
        <p>Member Name: {data.memberName}</p>
  <p>Collector Name: {data.collectorName}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { cancelPickup(data.uid) }}>Cancel Pickup</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deletePickup(data.uid) }}>Delete Pickup</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Show);
