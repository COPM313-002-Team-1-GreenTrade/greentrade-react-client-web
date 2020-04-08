import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function RewardList(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "https://localhost:44348/api/rewards";

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
      pathname: '/showreward/' + id
    });
  }

  const addNew = () => {
    props.history.push({
      pathname: '/createreward/'
    });
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </Spinner> }
      <Button variant="primary" onClick={() => { addNew() }} style={{width: 1200, marginTop: 20, marginLeft: 150}}>
            Add New Reward
          </Button>
      {/* <ListGroup>
        {data.map((item, idx) => (
          <ListGroup.Item key={idx} action onClick={() => { showDetail(item.documentId) }}>{item.brand}</ListGroup.Item>
        ))}
      </ListGroup> */}
      <Table striped bordered hover style= {{marginTop: 20, width: 1200, marginLeft: 150}}>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Cost</th>
                <th>Stock</th>
                <th>Id</th>
                <th>Img_Url</th>
                <th>Value</th>
              </tr>
            </thead>
            
            <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td className="App-td" action onClick={() => { showDetail(item.documentId) }}>{item.brand}</td>
            <td>{item.cost}</td>
            <td>{item.hasStock.toString()}</td>
            <td>{item.id}</td>
            <td>{item.img_url}</td>
            <td>{item.value}</td>
              </tr>
          
        ))}
              </tbody>
            </Table>
    </div>
  );
}

export default withRouter(RewardList);
