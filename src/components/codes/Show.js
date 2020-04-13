import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function ShowCodes(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/codes/"+props.match.params.id;
    var parent = props.match.params.id;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const addCodes = (id) => {
    setShowLoading(true);
    console.log(id);
    const data ={"used": false};
    axios.post("http://localhost:3000/api/codes?parent="+id, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push(`/show_codes/${id}`)
      }).catch((error) => setShowLoading(false));
  };

  const deleteCodes = (codeid, parent) => {
    setShowLoading(true);
    
    axios.delete("http://localhost:3000/api/codes?id="+codeid+"&parent="+parent)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show_codes/'+parent)
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
      </Spinner> }
     
      <Table striped bordered hover style= {{marginTop: 20, width: 1200, marginLeft: 150}}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Reward Type</th>
                <th>Used/Not Used</th>
                <th>Delete Codes</th>
              </tr>
            </thead>
            
            <tbody>
            {data.map((item, idx) => (
          <tr key={idx}>
            <td className="App-td">{item.id}</td>
            <td>{item.parent}</td>
            <td>{item.used === true?"yes":"no"}</td>
            <td>
                <Button type="button" variant="danger" onClick={() => { deleteCodes(item.id, item.parent) }}>Delete</Button>
            </td>
          </tr>
          
        ))}
              </tbody>
            </Table>

            <Button type="button" style= {{marginTop: 20, width: 1200, marginLeft: 150}} variant="primary" onClick={() => { addCodes(parent) }}>Add Codes</Button>
    </div>
  );
}

export default withRouter(ShowCodes);