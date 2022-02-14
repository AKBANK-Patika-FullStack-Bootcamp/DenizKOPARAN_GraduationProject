import React, { useState } from "react";
import Sidebar from '../components/sidebar';
import Navbar from 'react-bootstrap/Navbar';
import './main.css';
import { useNavigate } from "react-router-dom";


function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const axios = require('axios');
 
  const register = () => {
    const dataToAdd = {"email": username,"password": password, "isAdmin": true, "name": "admin", "surname": "admin", "tcNum": "-","phone": "-","plaka": "-"};
    axios.post('/user',dataToAdd)
    .then(function (response) {
      console.log(response.data);
      if(response.data === "Bu mail adresi zaten mevcut"){
        alert("Bu mail adresi zaten mevcut");
      }
      else{
        navigate('/');
      }
    })
    .catch(function (error) {
      console.log("error " + error);
    })
  }

  const signup = () => {
    navigate('/');
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
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form-control" placeholder="Kullanıcı Adı Oluşturun" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                   
                    </div>
                 
               </div>
                  </div>

                  <div className="row"  style={{paddingTop:'4vh'}}>
                    <div className="col-md-1"></div>
                      <div  className="col-md-10">
                        <div className="input-group mb-3">
                    <input value={password} onChange = {e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Şifre Oluşturun" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                   
                    </div>
                    </div>
                      </div>

                  <div className="row"  style={{paddingTop:'6vh'}}>
                  <div className="col-md-1"></div>
                  <div style={{ textAlign:'center'}} className="col-md-10">
                  <button type="button" className="btn btn-info btn-lg btn-block" onClick={register}>Yönetici Olarak Üye Ol</button>
               </div>
                  </div>

                  <div className="row"  style={{paddingTop:'3vh', paddingBottom: '4vh'}}>
                    <div className="col-md-1"></div>
                    <div style={{ textAlign:'center'}} className="col-md-10">
                      <button type="button" className="btn btn-success btn-lg btn-block" onClick={signup}>Zaten Üye Misiniz?</button>
                    </div>
                  </div>
                  

              </div>


          </div>
      </div>
      </div>
   
  );
}
export default SignUp;