import React, { useState } from "react";
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
import InputGroup from 'react-bootstrap/InputGroup';

function Message() {
  const { userid } = useParams();
  console.log(userid);
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
    <a style={{fontSize:18, color:"white"}}><FontAwesomeIcon style={{fontSize:18, color:"white"}} icon={faGears} /></a>
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
          <Link to = {`/userPayment/${userid}`}>
            <a class="nav-link active">Ödeme Bilgileri</a>
          </Link>
          <Link to = {`/userMessage/${userid}`}>
            <a class="nav-link">Mesajlar</a>
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
      <span>Ödemeler</span>
      </div>
      <div className='col-md-8'></div>
      <div className='col-md-2'>
      <Form.Select aria-label="Default select example">
        <option>Filtreleme</option>
        <option value="1">Haftalık</option>
        <option value="2">Aylık</option>
        <option value="3">Yıllık</option>
</Form.Select>
      </div>
      
    </div>
  </Card.Header>
  
  <Card.Body>
    <Card.Text>
        <Table striped bordered hover>
  <thead>
    <tr> 
      <th>Ödenen Fatura ve Aidatlar</th>
    </tr>
  </thead>
  <tbody>
    <tr id='table'>
      <td> 
    <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon3">
      Ödenen Tutar
    </InputGroup.Text>
    <Form.Control id="basic-url" aria-describedby="basic-addon3" />
  </InputGroup>
  </td>
      
    </tr>
  
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