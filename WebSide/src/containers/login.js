import React, { useState } from "react";
import Sidebar from '../components/sidebar';
import Navbar from 'react-bootstrap/Navbar';
import './main.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    navigate('/signup');
  }

  const signin = () => {
    const axios = require('axios');

    axios.get('/user/' + username + "/" + password)
    .then(function (response) {
      console.log(response.data);
      if(response.data.isAdmin === true){
        navigate('/admin/' + response.data.userID);
      }
      else if(response.data.isAdmin === false){
        navigate('/apartmentUsers/' + response.data.userID);
      }
      else{
        console.log("No such user!!");
      }
    })
    .catch(function (error) {
      console.log("No such user");
    })
  }

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }
  

  return (
      <div className="login">
         <Navbar className="row" style={{backgroundColor: "#74afc8", height: "4vw"}}>
      
          <div className="col-md-2">
              <p style={{fontSize:24,paddingTop:12, fontWeight:"bold", color:"white"}}>Site Yönetimi</p>
         </div>
         <div className="col-md-6"></div>
         <div className="col-md-2"> </div>
        
        
      </Navbar>

      <div className= "row"></div>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <br/><br/><br/>
      <div className= "row">
              <div className="col-md-3"></div>
              <div className ="col-md-6">

              <div className=" LeftCard">
              <div className="row"  style={{paddingTop:'8vh'}}>
                  <div className="col-md-1"></div>
                  <div  className="col-md-10">
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Kullanıcı Adı" aria-label="Recipient's username" aria-describedby="basic-addon2" value={username} onChange={onUsernameChange}/>
                   
                    </div>
                 
               </div>
                  </div>

                  <div className="row" style={{paddingTop:'4vh'}}>
                    <div className="col-md-1"></div>
                      <div  className="col-md-10">
                        <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Şifre" aria-label="Recipient's username" aria-describedby="basic-addon2" value={password} onChange={onPasswordChange}/>
                   
                    </div>
                    </div>
                      </div>

                  <div className="row" style={{paddingTop:'6vh'}}>
                    <div className="col-md-1"></div>
                    <div style={{ textAlign:'center'}} className="col-md-10">
                      <button type="button" className="btn btn-info btn-lg btn-block" onClick={register}>Üye Ol</button>
                    </div>
                  </div>

                  <div className="row" style={{paddingTop:'3vh', paddingBottom: '4vh'}}>
                    <div className="col-md-1"></div>
                    <div style={{ textAlign:'center'}} className="col-md-10">
                      <button type="button" className="btn btn-success btn-lg btn-block" onClick={signin}>Giriş Yap</button>
                    </div>
                  </div>
                  

              </div>


          </div>
      </div>
      </div>
   
  );
}
export default Login;