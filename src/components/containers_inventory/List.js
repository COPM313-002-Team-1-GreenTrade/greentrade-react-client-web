import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/containers_inventory";

  useEffect(() => {
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
      pathname: '/show_container/' + id
    });
  }

  const addNew = () => {
    props.history.push({
      pathname: '/create_container/'
    });
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
      </Spinner> }
      <Button variant="primary" onClick={() => { addNew() }} style={{width: 1200, marginTop: 20, marginLeft: 150}}>
            Add New Container
          </Button>
      <Table striped bordered hover style= {{marginTop: 20, width: 1200, marginLeft: 150}}>
            <thead>
              <tr>
                <th>Uid</th>
                <th>Size</th>
                <th>Cost</th>
                <th>Restock</th>
                <th>Stock</th>
              </tr>
            </thead>
            
            <tbody>
            {data.map((item, idx) => (
          <tr key={idx}>
            <td className="App-td" action onClick={() => { showDetail(item.uid) }}>{item.uid}</td>
            <td>{item.size}</td>
            <td>{item.cost}</td>
            <td>{item.restock}</td>
            <td>{item.stock}</td>
          </tr>
          
        ))}
              </tbody>
            </Table>
    </div>
  );
}

export default withRouter(List);