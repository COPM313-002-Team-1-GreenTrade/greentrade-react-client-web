import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import logo from './greentrade.png';
import user from './user.png';
//
import RewardList from './components/RewardList';
import EditReward from './components/EditReward';
import CreateReward from './components/CreateReward';
import ShowReward from './components/ShowReward';
import Home from './components/Home';
import Login from './components/Login';
import PickupsList from './components/PickupsList';
import ShowPickup from './components/ShowPickup';
import ContainersInventoryList from './components/containers_inventory/List';
import ShowContainersInventory from './components/containers_inventory/Show';
import CreateContainerInventory from './components/containers_inventory/Create';
import EditContainersInventory from './components/containers_inventory/Edit';
import UsersList from './components/users/List';
import ShowUser from './components/users/Show';
import CreateUser from './components/users/Create';
import EditUser from './components/users/Edit';
import ListCodes from './components/codes/List';
import ShowCodes from './components/codes/Show';
//
function App() {

  return (
    <Router>
      <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="mr-auto">
          <Nav.Link href="/home" style={{color: 'white'}}>
            <img src={logo} style={{height: 50}}/>
          </Nav.Link>
            <Nav.Link href="/home" style={{marginTop: 15, color: 'white', fontWeight: 'bold'}}>Home</Nav.Link>

            <Nav.Link href="/rewards" style={{marginTop: 15, color: 'white', marginLeft: 10, fontWeight: 'bold'}}>Rewards</Nav.Link>
            <Nav.Link href="/pickups" style={{marginTop: 15, color: 'white', marginLeft: 10, fontWeight: 'bold'}}>Pickups</Nav.Link>
            <Nav.Link href="/users" style={{marginTop: 15, color: 'white', marginLeft: 10, fontWeight: 'bold'}}>Users</Nav.Link>
            <Nav.Link href="/codes" style={{marginTop: 15, color: 'white', marginLeft: 10, fontWeight: 'bold'}}>Codes</Nav.Link>
            <Nav.Link href="/containers_inventory" style={{marginTop: 15, color: 'white', marginLeft: 10, fontWeight: 'bold'}}>Containers</Nav.Link>
            <Nav.Link href="/login" style={{marginTop: 10, color: 'white', marginLeft: 700}}>
            <img src={user} style={{height: 35}}/>
            </Nav.Link>
            <Nav.Link href="/login" style={{marginTop: 15, color: 'white', fontWeight: 'bold'}}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>
          
          <Route exact path='/' component={Home} />
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < RewardList />} path="/rewards" />
          <Route render ={()=> < EditReward />} path="/editreward/:id" />
          <Route render ={()=> < CreateReward />} path="/createreward" />
          <Route render ={()=> < ShowReward />} path="/showreward/:id" />
          <Route render ={()=> <PickupsList />} path="/pickups" />
          <Route render ={()=> <UsersList />} path="/users" />
          <Route render ={()=> < ShowPickup />} path="/showpickup/:id" />
          <Route render ={()=> < ShowUser />} path="/show_user/:id" />
          <Route render ={()=> < CreateUser />} path="/create_user" />
          <Route render ={()=> < EditUser />} path="/edit_user/:id" />
          <Route render ={()=> < ListCodes />} path="/codes" />
          <Route render ={()=> < ShowCodes />} path="/show_codes/:id" />
          <Route render ={()=> < ContainersInventoryList />} path="/containers_inventory" />
          <Route render ={()=> < ShowContainersInventory />} path="/show_container/:id" />
          <Route render ={()=> < CreateContainerInventory />} path="/create_container" />
          <Route render ={()=> < EditContainersInventory />} path="/edit_container/:id" />
      </div>
      {/* {path==""?(
      <Home/>
      ): <div></div>} */}


    </Router>


  );
}

//<Route render ={()=> < App />} path="/" />
export default App;
