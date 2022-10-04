import { useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import {Form, Button, FloatingLabel} from 'react-bootstrap';

const AddUser = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [searchParams] = useSearchParams();
    const userId= searchParams.get("userId");

    async function editUserData(){  
        try{
            console.log(userId);
            if(!userId) return;
            const user =await axios.get(`http://localhost:3000/users/${userId}`);
            setUserName(user.data.name);
            setEmail(user.data.email);
            setBio(user.data.bio);
        }  
    
        catch(err){
            toast.error(
                '🦄 Something went Wrong!!!'
            );
        }

        };

    useEffect(()=>{
        editUserData();
    },[]);

    const addUserInfo = async(event) =>{

        try{
            event.preventDefault();

            if(!userId){
                //alert("Editing DataAPI ");
                console.log(userName, email, bio);
                await axios.post('http://localhost:3000/users', { 
                name:userName,
                email: email,
                bio: bio
            });
    
            setBio("");
            setEmail("");
            setUserName("");
            }
    
            else{
                await axios.patch(`http://localhost:3000/users/${userId}`, { 
                    name:userName,
                    email: email,
                    bio: bio
                });
                //console.log(userName, ' ',email, " ", bio );
                setBio("");
                setEmail("");
                setUserName("");
            }
        }
       catch(err){
        toast.error(
            '🦄 Something went Wrong!!!'
        );
       }
    };
    return(
        <div>
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding:"10px"
          }}>
        {
            userId ? (<h2>Edit User </h2>): (<h2>Add User </h2>)
        }
            
          </div>


            <Form onSubmit={addUserInfo}>
            <Form.Group className="m-3 w-50" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" value={userName} onChange={(event)=> {
                setUserName(event.target.value);
            }} />
                
            </Form.Group>
    
            <Form.Group className="m-3 w-50" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} placeholder="Enter Email" onChange={(event)=> {
                setEmail(event.target.value);
            }} />
            </Form.Group>
    
            <Form.Group className="m-3 w-50" controlId="formBasicEmail">
            <Form.Label>Bio</Form.Label>
            <FloatingLabel
                controlId="floatingTextarea"
            >
            <Form.Control as="textarea" placeholder="Add Your Bio Here" value={bio} style={{ height: '200px'}} onChange = {(event) =>{
                setBio(event.target.value);
            }}
            />
            </FloatingLabel>
            </Form.Group>
    
            
            <Form.Group className="m-3 w-50" controlId="formBasicSubmit">
            <Button variant="primary" type="submit" >
            {
                userId ? "Save" : "Submit"
            }
            </Button>
            </Form.Group>
            
            </Form>
        </div>


        
   
    );
};

export default AddUser;