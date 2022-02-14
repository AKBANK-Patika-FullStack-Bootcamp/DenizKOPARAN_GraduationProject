import React, { useState, useEffect } from "react";
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, useParams } from 'react-router-dom';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from "@fortawesome/free-solid-svg-icons";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';

function SendMessage() {
  const { userid } = useParams();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  const axios = require('axios');

  const emailChanged = (event) => {
    setEmail(event.target.value);
  }
  const titleChanged = (event) => {
    setTitle(event.target.value);
  }
  const contentChanged = (event) => {
    setContent(event.target.value);
  }

  const gonder = () => {
    if(email !== ""){
      const dataToSend = {"name": user.name, "surname": user.surname, "userID": userid, "viewed": false, "title": title, "description": content};
      axios.post('/message', dataToSend)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("error " + error);
      })
    }
    else{
      alert("email adresini giriniz!");
    }
  }

  const getDatas = () => {
    axios.get('/user/' + userid)
    .then(function (response) {
      setUser(response.data);
      setEmail(response.data.email);
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
    getDatas();
  },[]);

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
      <div className='col-md-3'>
      <span>Aidat / Fatura Bilgileri</span>
      </div>
      <div className='col-md-9'></div>
      
      
    </div>
  </Card.Header>
  
  <Card.Body>
    <Card.Text>
    <Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label> Email adresi</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={emailChanged}/>
  </Form.Group>
  <Form.Control size="lg" type="text" placeholder="Başlık" value={title} onChange={titleChanged}/>
  <br/>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Control as="textarea" rows={3} placeholder="İçerik" value={content} onChange={contentChanged}/>
  </Form.Group>
</Form>
</Card.Text>
<div className='row'>
      <div className='col-md-2'>
      <Link to = {`/userMessage/${userid}`}><button type="button" class="btn btn-info">Geri</button></Link>
      </div>
      <div className='col-md-8'></div>
      <div className='col-md-2'>
       <button style={{float:'right'}} type="button" class="btn btn-success" onClick={gonder}>Gönder</button>
      </div>
      
    </div>
        </Card.Body>
        
        </Card>
        
        </div>
        
        </div>
        </div>
    </div>
  );
}

export default SendMessage;