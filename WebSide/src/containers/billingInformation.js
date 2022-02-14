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
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function BillingInformation() {

  const { userid } = useParams();
  const [name, setName] = useState("");

  const [blokNo, setBlokNo] = useState("");
  const [daireNo, setDaireNo] = useState("");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [ucret, setUcret] = useState(0);
  const [topluGonder, setTopluGonder] = useState(false);
  const [userID, setUserID] = useState(-1);

  const axios = require('axios');

  useEffect(() => {
    getDatas();
  },[]);


  const getDatas = () => {
    axios.get('/user/getname/' + userid)
    .then(function (response) {
      setName(response.data);
    })
    .catch(function (error) {
      console.log("error " + error);
    })
  }

  const blokNoChanged = (event) => {
    setBlokNo(event.target.value);
    if(daireNo !== ""){
      getApartment(event.target.value, daireNo);
    }
  }

  const daireNoChanged = (event) => {
    setDaireNo(event.target.value);
    if(blokNo !== ""){
      getApartment(blokNo, event.target.value);
    }
  }

  const adChanged = (event) => {
    setAd(event.target.value);
  }

  const soyadChanged = (event) => {
    setSoyad(event.target.value);
  }

  const ucretChanged = (event) => {
    setUcret(event.target.value);
  }

  const topluGonderBox = () => {
    console.log(topluGonder);
    setTopluGonder(!topluGonder);
  }
  function getApartment(blokNo, daireNo) {
    axios.get('/apartment/' + blokNo + "/" + daireNo)
      .then(function (response) {
        setUserID(response.data)
      },)
      .catch(function (error) {
        console.log("error " + error);
      })
  }

  function sendApartment() {
    if(topluGonder === true){
      const dataToSend = {"fee": ucret, "paid": false};
      axios.post('/bill/all', dataToSend)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("error " + error);
      })
    }
    else{    
      if(ad !== "" && soyad !== "" && blokNo !== "" && daireNo !== "" && ucret !== 0){
        console.log(userID);
        const dataToSend = {"userID": userID, "name": ad, "surname": soyad, "block": blokNo, "number": daireNo, "fee": ucret, "paid": false};
        axios.post('/bill', dataToSend)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log("error " + error);
        })
      }
      else{
        alert("Lütfen Bütün Bilgileri Doldurunuz");
      }
    }
  }

  const gonder = () => {
    sendApartment();
    console.log(blokNo);
    console.log(daireNo);
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
        <a class="nav-link active">Aidat/Fatura Bilgileri</a>
        </Link>
        <Link to = {`/payment/${userid}`}>
        <a class="nav-link">Ödeme Bilgileri</a>
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
        Fatura ve Aidat Bilgilendirme
  </Card.Header>
  <Card.Body>
    <Card.Text>
          <div className='row'>
            <div className='col-md-6'>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Blok No.</Form.Label>
          <Form.Control type="text" placeholder="Blok numarasını giriniz" value={blokNo} onChange={blokNoChanged}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Daire No.</Form.Label>
          <Form.Control type="text" placeholder="Daire numarasını giriniz." value={daireNo} onChange={daireNoChanged} />
        </Form.Group> 
      </Form>
      </div>
      <div className='col-md-6'>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Ad</Form.Label>
          <Form.Control type="text" placeholder="Adınızı giriniz" value={ad} onChange={adChanged} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Soyad</Form.Label>
          <Form.Control type="text" placeholder="Soyadınızı giriniz" value={soyad} onChange={soyadChanged} />
        </Form.Group>
       
      </Form>
      
      </div>
      <div  className="col-md-12">
      <InputGroup className="mb-3">
            <InputGroup.Text>Ödemeniz gereken tutar</InputGroup.Text>
            <Form.Control type="text" placeholder="" value={ucret} onChange={ucretChanged}/>
            <InputGroup.Text><FontAwesomeIcon icon={faCreditCard}/></InputGroup.Text>
        </InputGroup>
        
      
      </div>
      
          </div>
          </Card.Text>
          <div className='row'>
      <div className='col-md-10'>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check style={{color: '#0d6efd'}} type="checkbox" label="Toplu Gönder" value={topluGonder} onChange={topluGonderBox} />
        </Form.Group>
      </div>
      <div className='col-md-2'>
      <button style={{float:'right'}} type="button" class="btn btn-success" onClick={gonder}>Gönder</button>
      </div>
    </div>
        </Card.Body>
        </Card>
        </div>
        
        <br></br><br></br>
   
        </div>
        </div>
    </div>
  );
}

export default BillingInformation;