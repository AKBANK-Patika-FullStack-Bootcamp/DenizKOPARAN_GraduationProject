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

function ApartmentUsers() {
  const { userid, billid } = useParams();
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState("");

  const axios = require('axios');

  const onayla = () => {
    const dataToUpdate = {"billID": billid,"paid": true};
    axios.put('/bill', dataToUpdate)
    .then(function (response) {
      setDatas(response.data);
      console.log(response.data);
      if(response.data === "Guncelleme islemi tamamlandi."){
        alert("Odeme Basarili");
      }
      else{
        alert("bir sorunla karsilasildi.");
      }
    })
    .catch(function (error) {
      console.log("error " + error);
    })
  }

  useEffect(() => {
    if(datas.length === 0){
      getDatas();
    }
  },[]);

  const getDatas = () => {
    axios.get('/bill/payment/' + billid)
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
            <a class="nav-link active">Aidat/Fatura Bilgileri</a>
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
        Ödeme Sayfası
  </Card.Header>
  <Card.Body>
    <Card.Text>
          <div className='row'>
            <div className='col-md-6'>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Kredi kartı sahibi</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Kredi kartı numarası</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Güvenlik kodu / CVV2</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
 
       
      </Form>
      </div>
      <div className='col-md-6'>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Son Kullanma Tarihi</Form.Label>
          <Form.Control type="date" placeholder="Email giriniz" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Ödeme açıklaması</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Tutar</Form.Label>
          <Form.Control type="text" disabled="true" placeholder="" value={datas.fee}/>
        </Form.Group>
       
      </Form>

      </div>
          </div>
          </Card.Text>
          <div className='row'>
          <div className='col-md-2'>
      <Link to={`/UserBillingInformation/${userid}`}><button type="button" class="btn btn-info">Geri</button></Link>
      </div>
      <div className='col-md-8'></div>
      <div className='col-md-2'>
      <button style={{float:'right'}} type="button" class="btn btn-success" onClick={onayla}>Onayla</button>
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

export default ApartmentUsers;