import React, { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import dataContext from "../context/dataContext";
const SignUp = () => {
  let history = useNavigate();
const context = useContext(dataContext);
const {AddUser,credentials,setCredentials,match,AddAdmin} = context;
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}
const clickbutoon = () => {
    console.log('clicked button');
    AddUser();
    if(match){
      history("../login");
    }
}
const clickbutoonforadmin = ()=>{
  console.log('clicked button');
    AddAdmin();
    if(match){
      history("../login");
    }
}
  return (
    <>
      <h2 style={{'marginTop':'10vh'}}>Create Account to Vaccination Booking App</h2>

<form onSubmit={AddUser} style={{
  'marginLeft':'9vw',
  'display': 'inline-block',
  'width': '75vw',
  'border': '2px solid black', 'padding': '2vh', 'height': '60vh', 'borderRadius':'30px','marginTop': '10vh'
}}>
<div className="form-outline mb-4">
<input type="text" name='name' id='name' className="form-control" onChange={onChange}/>
<label className="form-label" htmlFor="name" >Username</label>
</div>

<div className="form-outline mb-4">
<input type="email" name='email' id='email' className="form-control" onChange={onChange}/>
<label className="form-label" htmlFor="email" >Email address</label>
</div>

<div className="form-outline mb-4">
<input type="password" name='password' id='password' className="form-control" onChange={onChange}/>
<label className="form-label" htmlFor="password" >Password</label>
</div>



<button type="button" className="btn btn-primary btn-block mb-4"  onClick={clickbutoon}style={{'marginRight':'20px'}}>SignUp</button>
<button type="button" className="btn btn-primary btn-block mb-4"  onClick={clickbutoonforadmin}>SignUp As Admin</button>

</form>
    </>
  )
}

export default SignUp
