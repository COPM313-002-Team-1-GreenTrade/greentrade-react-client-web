import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function PickupsList(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "https://localhost:44348/api/pickups";

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   // const result = await axios(apiUrl);
  //     fetch(apiUrl).then(res => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       setData(data);
  //       setShowLoading(false);
  //     })
  //     .catch(console.log)

  //   // };
  //   // fetchData();
  // }, []);

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

  const showDetail = (id) => {
    props.history.push({
      pathname: '/showpickup/' + id
    });
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </Spinner> }
      {/* <ListGroup>
        {data.map((item, idx) => (
          <ListGroup.Item key={idx} action onClick={() => { showDetail(item.documentId) }}>{item.brand}</ListGroup.Item>
        ))}
      </ListGroup> */}
      <Table striped bordered responsive="sm"pos style= {{marginTop: 20, width: 1300}}>
            <thead>
              <tr>
                  <th>UID</th>
                <th>Additional Info</th>
                <th>Address</th>
                <th>Cancelled</th>
                <th>Collector Id</th>
                <th>Collector Name</th>
                <th>Fulfilled Time</th>
                <th>Member Id</th>
                <th>Member Name</th>
                <th>Member Profile Pic URL</th>
              </tr>
            </thead>
            
            <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                  <td className="App-td" action onClick={() => { showDetail(item.uid) }}>{item.uid}</td>
                <td>{item.additionalInfo}</td>
            <td>
                <p>{item.address.city}</p>
                <p>{item.address.postalCode}</p>
                <p>{item.address.street}</p>
                <p>{item.address.province}</p>
            </td>
            <td>{item.cancelled.toString()}</td>
            <td>{item.collectorId}</td>
            <td>{item.collectorName}</td>
            <td>{item.fulfilledTime}</td>
            <td>{item.memberId}</td>
            <td>{item.memberName}</td>
            <td>{item.memberProfilePicURL}</td>
              </tr>
          
        ))}
              </tbody>
            </Table>
    </div>
  );
}

export default withRouter(PickupsList);
