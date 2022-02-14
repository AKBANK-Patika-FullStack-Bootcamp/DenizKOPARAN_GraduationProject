import React, { useState, useEffect } from "react";
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, useParams } from 'react-router-dom';
import './main.css';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from "@fortawesome/free-solid-svg-icons";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';

function Message() {

  const { userid } = useParams();
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState("");
  
  const axios = require('axios');

  const getDatas = () => {
    axios.get('/message')
    .then(function (response) {
      setDatas(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("error " + error);
    })

    axios.get('/user/getname/' + userid)
    .then(function (response) {
      setName(response.data);
    })
    .catch(function (error) {
      console.log("error " + error);
    })
  }

  useEffect(() => {
    if(datas.length === 0){
      getDatas();
    }
  });

  const detay = (id) => {

    const dataToUpdate = { "viewed": true, "messageID": id };
    axios.put("/message", dataToUpdate)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("error " + error);
    })
  }

  return (
    
      
    <div className="App">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Site Yönetimi</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
     
      
    </ul>
    <form class="form-inline my-2 my-lg-0">
    <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
        <a style={{fontSize:18, color:"white"}}>{name}</a>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/">Çıkış Yap</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </form>
  </div>
</nav>
      <div className='row'>
        <div className='col-md-3 sidebar'>
        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <Link to = {`/admin/${userid}`}>
          <a class="nav-link">Ana Sayfa</a>
        </Link>
        <Link to = {`/apartment/${userid}`}><a class="nav-link" >Daire Bilgileri</a>
        </Link>
        <Link to = {`/users/${userid}`}>
        <a class="nav-link">İkamet Eden Kullanıcı Bilgileri</a>
        </Link>
        <Link to ={`/billingInformation/${userid}`}>
        <a class="nav-link">Aidat/Fatura Bilgileri</a>
        </Link>
        <Link to = {`/payment/${userid}`}>
        <a class="nav-link">Ödeme Bilgileri</a>
        </Link>
        <Link to = {`/message/${userid}`}>
        <a class="nav-link active">Mesajlar</a>
        </Link>
      </div>

        </div>
        <div className='col-md-9'>
<div className='col-md-12'>
        <br></br><br></br>
          <Card>
  <Card.Header>
  <div className='row'>
      <div className='col-md-3'>
      <span>Mesajlar</span>
      </div>
      <div className='col-md-9'></div>
      
    </div>
  </Card.Header>
  
  <Card.Body>
    <Card.Text>
        <Table striped bordered hover>
  <thead>
    <tr> 
      <th>Ad</th>
      <th>Soyad</th>
      <th>Kat No.</th>
      <th>Başlık</th>
      <th>Açıklama</th>
      <th>İşlemler</th>
    </tr>
  </thead>
  <tbody>
  {datas.map((message) => (
        <tr id='table'>
          <td>{message.name}</td>
          <td>{message.surname}</td>
          <td>{message.floor}</td>
          <td>{message.title}</td>
          <td>{message.description}</td>
          <td>
            <Link to={`/details/${userid}/${message.messageID}`}>
              <div className="row">
                <button type="button" class="btn btn-info" onClick={() => detay(message.messageID)}>Detay</button>
              </div>
            </Link>
          </td>
        </tr>
      ))}
  
  </tbody>
</Table>
</Card.Text>
        </Card.Body>
        </Card>
        </div>
        
        <br></br><br></br>
   
        </div>
        </div>
    </div>
  );
}

export default Message;