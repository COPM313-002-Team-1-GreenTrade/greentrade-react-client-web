import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Show(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/containers_inventory/" + props.match.params.id;
  var containers = [];
  React.useEffect(() => {
    const fetchData = async () => {
      
      const result = await axios(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          }
      });
      setData(Array.from(result.data));
      containers = result.data;
      console.log(containers)
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editContainer = (id) => {
    props.history.push({
      pathname: '/edit_container/' + id
    });
  };

  const deleteContainer = (id) => {
    setShowLoading(true);

    axios.delete("http://localhost:3000/api/containers_inventory/"+id)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/containers_inventory')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
     <div>
    {data.map((item, idx) => (
        <Jumbotron>    
            <h3>{item.uid}</h3> 
            <p>Size: {item.size}</p>
            <p>Cost: {item.cost}</p>
            <p>Stock: {item.stock}</p>
            <p>Restock: {item.restock}</p>
            <p>
                <Button type="button" variant="primary" onClick={() => { editContainer(item.uid) }}>Edit Container</Button>&nbsp;
                <Button type="button" variant="danger" onClick={() => { deleteContainer(item.uid) }}>Delete Container</Button>
            </p>
        </Jumbotron>
    ))}
    </div>
    </div>
  );
}

export default withRouter(Show);