import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function CodesList(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/rewards";

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
      pathname: '/show_codes/' + id
    });
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
      </Spinner> }
     
      <Table striped bordered hover style= {{marginTop: 20, width: 1200, marginLeft: 150}}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Brand</th>
              </tr>
            </thead>
            
            <tbody>
            {data.map((item, idx) => (
          <tr key={idx}>
            <td className="App-td" action onClick={() => { showDetail(item.documentId) }}>{item.documentId}</td>
            <td>{item.brand}</td>
          </tr>
          
        ))}
              </tbody>
            </Table>
    </div>
  );
}

export default withRouter(CodesList);