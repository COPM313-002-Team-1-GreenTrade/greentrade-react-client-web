import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Show(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/admins/" + props.match.params.id;
  var admins = [];
  React.useEffect(() => {
    const fetchData = async () => {
      
      const result = await axios(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          }
      });
      //console.log(result.data)
      setData(Array.from(result.data));
      admins = result.data;
      console.log(admins)
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editAdmin = (id) => {
    props.history.push({
      pathname: '/edit_admin/' + id
    });
  };

  const deleteAdmin = (id) => {
    setShowLoading(true);
    
    axios.delete("http://localhost:3000/api/admins/"+id)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/admins')
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
            <h3>{item.displayName}</h3> 
            <h3>Full Name: {item.firstName} {item.lastName}</h3>
                
            <img
                style={{width: 100, height: 100}}
                src={item.profilePhoto}
            />
            <p>Email: {item.email}</p>
            <p>isDeleted: {item.deleted===true?"no":"yes"}</p>
            <p>
                <Button type="button" variant="primary" onClick={() => { editAdmin(item.uid) }}>Edit Admin</Button>&nbsp;
                <Button type="button" variant="danger" onClick={() => { deleteAdmin(item.uid) }}>Delete Admin</Button>
            </p>
        </Jumbotron>
    ))}
    </div>
    </div>
  );
}

export default withRouter(Show);