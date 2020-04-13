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
  const apiUrl = "http://localhost:3000/api/users";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/show_user/' + id
    });
  }

  const addNew = () => {
    props.history.push({
      pathname: '/create_user/'
    });
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </Spinner> }
      <Button variant="primary" onClick={() => { addNew() }} style={{width: 1200, marginTop: 20, marginLeft: 150}}>
            Add New User
          </Button>
      {/* <ListGroup>
        {data.map((item, idx) => (
          <ListGroup.Item key={idx} action onClick={() => { showDetail(item.documentId) }}>{item.brand}</ListGroup.Item>
        ))}
      </ListGroup> */}
      <Table striped bordered hover style= {{marginTop: 20, width: 1200, marginLeft: 150}}>
            <thead>
              <tr>
                <th>Uid</th>
                <th>Type</th>
                <th>Email</th>
                <th>Password</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Display Name</th>
                <th>Points</th>
                <th>IsDeleted</th>
              </tr>
            </thead>
            
            <tbody>
            {data.map((item, idx) => (
          <tr key={idx}>
            <td className="App-td" action onClick={() => { showDetail(item.email) }}>{item.uid}</td>
            <td>{item.type}</td>
            <td>{item.email}</td>
            <td>{item.providerid}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.displayName}</td>
            <td>{item.points}</td>
            <td>{item.deleted==true?"no":"yes"}</td>
          </tr>
          
        ))}
              </tbody>
            </Table>
    </div>
  );
}

export default withRouter(List);