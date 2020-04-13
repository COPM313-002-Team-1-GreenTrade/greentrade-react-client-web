import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Show(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/users/" + props.match.params.id;
  var users = [];
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
      users = result.data;
      console.log(users)
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editUser = (id) => {
    props.history.push({
      pathname: '/edit_user/' + id
    });
  };

  const deleteUser = (id) => {
    setShowLoading(true);
    
    axios.delete("http://localhost:3000/api/users/"+id)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/users')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
     <div>{users.length}
    {data.map((item, idx) => (
        <Jumbotron>
          <p>{idx}</p> 
            <h1>Id: {item.uid}</h1>    
            <h1>{item.displayName}</h1> 
            <h1>Full Name: {item.firstName} {item.lastName}</h1>
                
            <img
                style={{width: 100, height: 100}}
                src={item.profilePhoto}
            />
            <p>Email: {item.email}</p>
            <p>Type: {item.type}</p>
            <p>Type: {item.points}</p>
            <p>isDeleted: {item.deleted===true?"no":"yes"}</p>
            <p>
                <Button type="button" variant="primary" onClick={() => { editUser(item.uid) }}>Edit User</Button>&nbsp;
                <Button type="button" variant="danger" onClick={() => { deleteUser(item.uid) }}>Delete User</Button>
            </p>
        </Jumbotron>
    ))}
    </div>
    </div>
  );
}

export default withRouter(Show);