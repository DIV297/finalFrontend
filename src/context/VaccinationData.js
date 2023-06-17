import React, { useState } from 'react';
import dataContext from "./dataContext";
import Alert from '../components/Alert';
const VaccinationData = (props) => {
    const centersinitial=[]
    const [centers,setCenters] = useState(centersinitial);
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [match,setMatch] = useState(false);
    const [admin,setAdmin] = useState(false);
    const fetchallcenters = async()=>{
      try{
        const response = await fetch("https://finalll1.onrender.com/auth/user/displaycenter", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
          
          });
          
          const json = await response.json();
          console.log(json)
          setCenters(json);
        }
        catch(err){

        }
      
    }
    const addcenter = async (name, place,dosage) => {
      try{
        const response = await fetch("https://finalll1.onrender.com/auth/admin/addcenter", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({ name, place,dosage })
        });
        const json = await response.json();
        setCenters(centers.concat(json))
        showAlert("success",'Note Added Successfully','block')
      }
      catch(err){

      }
      }
      const deletecenter = async (id) => {
        try{
        const response = await fetch(`https://finalll1.onrender.com/auth/admin/deletecenter/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'mode': 'no-cors',
            'auth-token': localStorage.getItem('token')
          }
        });
        const json = await response.json();
        setCenters(centers.concat(json))
        showAlert("success",'Note Deleted Successfully','block')
      }
      catch(err){

      }
      }
      const [slots,setSlots] = useState([]);
      const applyforslot = async (id) => {
        try{
        const response = await fetch(`https://finalll1.onrender.com/auth/user/applyforslot/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'mode': 'no-cors',
            'auth-token': localStorage.getItem('token')
          },
          // body:JSON.stringify({})
        });
        const json = await response.json();
        
         setSlots(slots.concat(json));
        showAlert("success",'Slots added','block')
      }
      catch(err){

      }
      }
      const loginUser = async () => {
        // login(user.email,user.password);
        try{
        const response = await fetch("https://finalll1.onrender.com/auth/user/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            setMatch(json.success);
            setAdmin(false);
            // showAlert("success", "successfully login")
            showAlert("success", "successfully login", "block")
        }
        else {
            showAlert("danger", "Invalid credentials", "block")
            // alert('Invalid Credentials')
        }
      }
      catch(err){
      }
    }
    
    const AddUser = async () => {
      // login(user.email,user.password);
      try{
      const {name,email,password}=credentials;
      const response = await fetch("https://finalll1.onrender.com/auth/user/adduser", {
        
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,email,password })
  
      });
      const json = await response.json();
          console.log(json)
          if (json.answer===0) {
              localStorage.setItem('token', json.authtoken);
              showAlert("success", "successfully account created",'block')
              // history("../", { replace: true });
              if(json.success===true)
              setMatch(json.success);
              setAdmin(false);
              showAlert("success", "successfully account created. You can now login",'block')
          }
          else if(json.answer===2) {
              showAlert("danger", "User already exist.Try to login", "block")
          }
          else if(json.answer===1) {
            showAlert("danger", "Invalid Crudentials - Your password and name should be contain atleast 5 alphabets", "block")
        }
      }
      catch(err){
      }
      }


      const loginAdmin = async () => {
        // login(user.email,user.password);
        try{
        const response = await fetch("https://finalll1.onrender.com/auth/admin/loginadmin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            if(json.success===true)
            setMatch(json.success);
            setAdmin(true);
            // showAlert("success", "successfully login")
            showAlert("success", "successfully login", "block")
        }
        else {
            showAlert("danger", "Invalid credentials", "block")
            // alert('Invalid Credentials')
        }
      }
      catch(err){
        
      }
    }
    const AddAdmin = async () => {
      // login(user.email,user.password);
      try{
      const {name,email,password}=credentials;
      const response = await fetch("https://finalll1.onrender.com/auth/admin/addadmin", {
        
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,email,password })
        
      });
      const json = await response.json();
          console.log(json)
          if (json.answer===0) {
              localStorage.setItem('token', json.authtoken);
              showAlert("success", "successfully account created",'block')
              // history("../", { replace: true });
              if(json.success===true)
              setMatch(json.success);
              setAdmin(true);
              showAlert("success", "successfully account created. You can now login",'block')
          }
          else if(json.answer===2) {
              showAlert("danger", "User already exist.Try to login", "block")
          }
          else if(json.answer===1) {
            showAlert("danger", "Invalid Crudentials - Your password and name should be contain atleast 5 alphabets", "block")
        }
      }
      catch(error){
        
      }
      }
    const [message, setMessage] = useState('');
    const [type, setType] = useState(' ');
    const [display,setDisplay]=useState('none');
  
    const showAlert = (type, message,display) => {

      setMessage(message);
      setType(type)
      setDisplay(display)
      setTimeout(() => {
        setMessage(' ')
      setType(' ')
      setDisplay('none')
      },[2000])
      
    }
  return (
    <>
    <Alert message={message} type={type} display={display}/>
      <dataContext.Provider value={{centers,setCenters,fetchallcenters,addcenter,deletecenter,credentials,setCredentials,loginUser,match,AddUser,admin,setAdmin,AddAdmin,loginAdmin,applyforslot}}>
        {props.children}
      </dataContext.Provider>
    </>
  )
}

export default VaccinationData
