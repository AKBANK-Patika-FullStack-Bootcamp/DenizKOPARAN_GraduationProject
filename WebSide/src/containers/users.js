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

function Users() {
  
  const { userid } = useParams();
  const [name, setName] = useState("");
  const [kullaniciID, setKullaniciID] = useState(0);
  const [show, setShow] = useState(true);
  const [showUpdate, setShowUpdate] = useState(true);
  const [datas, setDatas] = useState([]);
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [TC, setTC] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [password, setPassword] = useState("");
  const [plaka, setPlaka] = useState("");

  const [updatedAd, setUpdatedAd] = useState("");
  const [updatedSoyad, setUpdatedSoyad] = useState("");
  const [updatedTC, setUpdatedTC] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedTelefon, setUpdatedTelefon] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedPlaka, setUpdatedPlaka] = useState("");

  const axios = require('axios');

  const adChanged = (event) => {
    setAd(event.target.value);
  }

  const soyadChanged = (event) => {
    setSoyad(event.target.value);
  }

  const passwordChanged = (event) => {
    setPassword(event.target.value);
  }

  const tcChanged = (event) => {
    setTC(event.target.value);
  }

  const emailChanged = (event) => {
    setEmail(event.target.value);
  }

  const telefonChanged = (event) => {
    setTelefon(event.target.value);
  }

  const plakaChanged = (event) => {
    setPlaka(event.target.value);
  }



  const updatedAdChanged = (event) => {
    setUpdatedAd(event.target.value);
  }

  const updatedSoyadChanged = (event) => {
    setUpdatedSoyad(event.target.value);
  }

  const updatedPasswordChanged = (event) => {
    setUpdatedPassword(event.target.value);
  }

  const updatedTcChanged = (event) => {
    setUpdatedTC(event.target.value);
  }

  const updatedEmailChanged = (event) => {
    setUpdatedEmail(event.target.value);
  }

  const updatedTelefonChanged = (event) => {
    setUpdatedTelefon(event.target.value);
  }

  const updatedPlakaChanged = (event) => {
    setUpdatedPlaka(event.target.value);
  }

  const getDatas = () => {
    axios.get('/user')
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

  const onayla = () => {
    if(ad !== "" && soyad !== "" && TC !== "" && email !== "" && telefon !== "" && plaka !== "" && password !== ""){
      const dataToSend = {"name": ad, "surname": soyad, "TCNum": TC, "email": email, "phone": telefon, "carPlate": plaka, "password": password};
      axios.post('/user', dataToSend)
      .then(function (response) {
        console.log(response);
        getDatas();
      })
      .catch(function (error) {
        console.log("error " + error);
      })
    }
    else{
      alert("Lütfen Bütün Bilgileri Doldurunuz");
    }
  }

  const updatedOnayla = () => {
    if(updatedAd !== "" && updatedSoyad !== "" && updatedTC !== "" && updatedEmail !== "" && updatedTelefon !== "" && updatedPlaka !== "" && updatedPassword !== ""){
      const dataToSend = {"name": updatedAd, "surname": updatedSoyad, "TCNum": updatedTC, "email": updatedEmail, "phone": updatedTelefon, "carPlate": updatedPlaka, "password": updatedPassword, "userID": kullaniciID};
      axios.put('/user', dataToSend)
      .then(function (response) {
        console.log(response);
        getDatas();
      })
      .catch(function (error) {
        console.log("error " + error);
      })
    }
    else{
      alert("Lütfen Bütün Bilgileri Doldurunuz");
    }
  }

  const sil = (id) => {
    axios.delete('/user/' + id)
    .then(function (response) {
      console.log(response);
      getDatas();
    })
  }

  const guncelle = (id) => {
    setKullaniciID(id);
    axios.get('/user/' + id)
    .then(function (response) {
      console.log(response.data);
      setUpdatedAd(response.data.name);
      setUpdatedSoyad(response.data.surname);
      setUpdatedTC(response.data.tcNum);
      setUpdatedEmail(response.data.email);
      setUpdatedTelefon(response.data.phone);
      setUpdatedPassword(response.data.password);
      setUpdatedPlaka(response.data.carPlate);
    })
    .catch(function (error) {
      console.log("error " + error);
    })
    setShowUpdate(false);
    setShow(true)
  }

  useEffect(() => {
    if(datas.length === 0){
      getDatas();
    }
  },[]);


  const showCard = () =>{
    setShow(false)
    setShowUpdate(true)
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
        <a class="nav-link active">İkamet Eden Kullanıcı Bilgileri</a>
        </Link>
        <Link to ={`/billingInformation/${userid}`}>
        <a class="nav-link">Aidat/Fatura Bilgileri</a>
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
  <div className='row'>
      <div className='col-md-2'>
      <span>Kullanıcı Tablosu</span>
      </div>
      <div className='col-md-8'></div>
      <div className='col-md-2'>
      <button onClick={showCard} style={{float:'right'}} type="button" class="btn btn-info">Yeni Kayıt</button>
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
      <th>TC</th>
      <th>Email</th>
      <th>Telefon</th>  
      <th>Plaka</th>
      <th>İşlemler</th>
    </tr>
  </thead>
  <tbody>
  {datas.map((user) => (
        <tr id='table'>
          <td>{user.name}</td>
          <td>{user.surname}</td>
          <td>{user.tcNum}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.carPlate}</td>
          <td>
            <div className='row'>
            <button type="button" class="btn btn-info" onClick={() => guncelle(user.userID)}>Güncelle</button>
            <button type="button" class="btn btn-danger" onClick={() => sil(user.userID)}>Sil</button>
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
          {show ?
        <div></div>
            :
          <Card>
  <Card.Header>
        Kullanıcı Bilgileri
  </Card.Header>
  <Card.Body>
    <Card.Text>
          <div className='row'>
            <div className='col-md-6'>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Ad</Form.Label>
          <Form.Control type="text" placeholder="Adı giriniz" value={ad} onChange={adChanged}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Soyad</Form.Label>
          <Form.Control type="text" placeholder="Soyad giriniz" value={soyad} onChange={soyadChanged}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>TC. No</Form.Label>
          <Form.Control type="text" placeholder="TC. numarasını giriniz" value={TC} onChange={tcChanged}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Telefon</Form.Label>
          <Form.Control type="text" placeholder="Telefon numarası giriniz" value={telefon} onChange={telefonChanged}/>
        </Form.Group>
       
      </Form>
      </div>
      <div className='col-md-6'>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email giriniz" value={email} onChange={emailChanged}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Şifre</Form.Label>
          <Form.Control type="password" placeholder="Şifre giriniz" value={password} onChange={passwordChanged}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Araç Bilgisi</Form.Label>
          <Form.Control type="text" placeholder="Plakayı giriniz" value={plaka} onChange={plakaChanged}/>
        </Form.Group>
       
      </Form>

      </div>
          </div>
          </Card.Text>
          <div className='row'>
      <div className='col-md-10'></div>
      <div className='col-md-2'>
      <button onClick={onayla} style={{float:'right'}} type="button" class="btn btn-success">Onayla</button>
      </div>
    </div>
        </Card.Body>
        </Card>
         }

{showUpdate ?
        <div></div>
            :
          <Card>
  <Card.Header>
        Kullanıcı Bilgileri Güncelle
  </Card.Header>
  <Card.Body>
    <Card.Text>
          <div className='row'>
            <div className='col-md-6'>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Ad</Form.Label>
          <Form.Control type="text" placeholder="Adı giriniz" value={updatedAd} onChange={updatedAdChanged}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Soyad</Form.Label>
          <Form.Control type="text" placeholder="Soyad giriniz" value={updatedSoyad} onChange={updatedSoyadChanged}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>TC. No</Form.Label>
          <Form.Control type="text" placeholder="TC. numarasını giriniz" value={updatedTC} onChange={updatedTcChanged}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Telefon</Form.Label>
          <Form.Control type="text" placeholder="Telefon numarası giriniz" value={updatedTelefon} onChange={updatedTelefonChanged}/>
        </Form.Group>
       
      </Form>
      </div>
      <div className='col-md-6'>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email giriniz" value={updatedEmail} onChange={updatedEmailChanged}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Şifre</Form.Label>
          <Form.Control type="password" placeholder="Şifre giriniz" value={updatedPassword} onChange={updatedPasswordChanged}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Araç Bilgisi</Form.Label>
          <Form.Control type="text" placeholder="Plakayı giriniz" value={updatedPlaka} onChange={updatedPlakaChanged}/>
        </Form.Group>
       
      </Form>

      </div>
          </div>
          </Card.Text>
          <div className='row'>
      <div className='col-md-10'></div>
      <div className='col-md-2'>
      <button onClick={updatedOnayla} style={{float:'right'}} type="button" class="btn btn-success">Güncelle</button>
      </div>
    </div>
        </Card.Body>
        </Card>
         }
        <div className='col-md-12'>
        
        
        </div>
        </div>
        </div>

       
    </div>
  );
}

export default Users;