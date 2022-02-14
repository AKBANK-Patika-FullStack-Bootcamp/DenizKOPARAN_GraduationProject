import React, { useState, useEffect } from "react";
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, useParams } from 'react-router-dom';
import './main.css';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faGears } from "@fortawesome/free-solid-svg-icons";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';

function Payment() {

  const { userid } = useParams();
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState("");

  const axios = require('axios');


  const getDatas = () => {
    axios.get('/bill')
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
        <a class="nav-link active">Ödeme Bilgileri</a>
        </Link>
        <Link to = {`/message/${userid}`}>
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
      <div className='col-md-3'>
      <span>Ödeme Bilgileri</span>
      </div>
      <div className='col-md-7'></div>
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
      <th>Ad</th>
      <th>Soyad</th>
      <th>Blok No.</th>
      <th>Daire No.</th>
      <th>Tutar</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {datas.map((bill) => (
        <tr id='table'>
              <td>{bill.name}</td>
          <td>{bill.surname}</td>
          <td>{bill.block}</td>
          <td>{bill.number}</td>
          <td>{bill.fee}</td>
      <td>
        <div className="row">
          {bill.paid === true ? 
            <Alert variant="success">
              <p className="mb-0">
                  Ödendi
              </p>
            </Alert>
            :
            <Alert variant="danger">
              <p className="mb-0">
                  Ödenmedi
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

export default Payment;