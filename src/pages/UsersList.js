import { Fragment, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import * as routes from '../constants/routePaths.js';
import axios from "axios";
import { Table, Modal, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';

export const UsersList = () => {
const [userData, setUserData] = useState([]);
const [show, setShow] = useState(false);
const [modalData, setModalData] = useState({});


const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const showDetailDialogue = (userDetail) =>{
  try{
    setModalData(userDetail);
    handleShow();
  }

  catch(err){
    console.log(err);
    toast.error('🦄 Something went Wrong!!!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
   
}


const fetchUsers = async () => {
  try{
    const userData= await axios.get('http://localhost:3000/users');
    setUserData(userData.data);
    
  }
  catch(err){
    console.log(err);
    toast.error('🦄 Something went Wrong!!!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
    
};

const removeUser = async (userId) =>{
  //salert(userId);
  try{
    await axios.delete(`http://localhost:3000/users/${userId}`);
    const removeUserResponse = userData.filter(user=> (user.id !== userId));
    setUserData(removeUserResponse);
    alert("User successfully deleted!");
  }

  catch(err){
    toast.error('🦄 Something went Wrong!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
};

useEffect(()=> {
    fetchUsers();
},[]);
console.log(modalData.bio);
    return(  
      <Fragment>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding:"10px"
      }}>
        <h2>Users </h2> 
        <Button variant="outline-info">
        <Link to={routes.addUserPage}> Add User</Link></Button>
      </div>
     
        {
          userData.length ? <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th colSpan={2}>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {
                userData.map((user, index)=>{
                    //console.log(user);
                    return <tr key={index}>
                    <td>{user.id}</td>
                    <td colSpan={2}>
                        {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>
                        <Button className="me-2" variant="info" onClick={() => showDetailDialogue(user)}>Details</Button>
                        <Button className="me-2" variant="info">
                        <Link to={`${routes.addUserPage}?userId=${user.id}`}> Edit</Link>
                        </Button>
                        <Button variant="info" onClick={()=> removeUser(user.id)}>Delete</Button>
                    </td>
                </tr>
                })
            }
        </tbody>
        </Table> : "No records to display"
        }

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalData.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4>Email: {modalData.email}</h4>
              {
                
                modalData.bio ? (<h4> Bio: {modalData.bio} </h4>) : " "
              }
              
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
);
}

export default UsersList;