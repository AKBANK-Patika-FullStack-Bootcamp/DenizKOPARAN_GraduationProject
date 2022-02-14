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
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';

function Message() {
  const { userid } = useParams();
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState("");

  const axios = require('axios');

  const getDatas = () => {
    axios.get('/message/' + userid)
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
          <Link to = {`/apartmentUsers/${userid}`}>
            <a class="nav-link">Ana Sayfa</a>
          </Link>
          <Link to ={`/userBillingInformation/${userid}`}>
            <a class="nav-link">Aidat/Fatura Bilgileri</a>
          </Link>
          <Link to = {`/userMessage/${userid}`}>
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
      <div className='col-md-2'>
      <span>Gönderilen Mesajlar</span>
      </div>
      <div className='col-md-8'></div>
      <div className='col-md-2'>
     <Link to = {`/sendMessage/${userid}`}> <button style={{float:'right'}} type="button" class="btn btn-info">Yeni Mesaj</button></Link>
      </div>
      
    </div>
  </Card.Header>
  
  <Card.Body>
    <Card.Text>
        <Table striped bordered hover>
  <thead>
    <tr> 
      <th>Başlık</th>
      <th>İçerik</th>
      <th>Durum</th>
    </tr>
  </thead>
  <tbody>
      {datas.map((message) => (
        <tr id='table'>
          <td>{message.title}</td>
          <td>{message.description}</td>
          <td>
            <div className="row">
            {message.viewed === true ?
              <Alert variant="success">
                <p className="mb-0">
                  Mesaj yönetici tarafından görüntülendi.
                </p>
              </Alert>
              :
              <Alert variant="danger">
                <p className="mb-0">
                  Mesaj yönetici tarafından görüntülenmedi.
                </p>
              </Alert>
            }
            </div>
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