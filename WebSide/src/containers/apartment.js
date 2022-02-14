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

function Apartment() {
  const { userid } = useParams();
  const [name, setName] = useState("");

  const [show, setShow] = useState(true);
  const [showUpdate, setShowUpdate] = useState(true);
  const [datas, setDatas] = useState([]);
  const [users, setUsers] = useState([]);
  const [blokNo, setBlokNo] = useState("");
  const [katNo, setKatNo] = useState("");
  const [durum, setDurum] = useState("0");
  const [daireNo, setDaireNo] = useState("");
  const [tip, setTip] = useState("1+1");
  const [kullanici, setKullanici] = useState("0");
  const [kullaniciTuru, setKullaniciTuru] = useState("0");
  const [apartmanid, setApartmanid] = useState(0);

  const [updatedBlokNo, setUpdatedBlokNo] = useState("");
  const [updatedKatNo, setUpdatedKatNo] = useState("");
  const [updatedDurum, setUpdatedDurum] = useState("0");
  const [updatedDaireNo, setUpdatedDaireNo] = useState("");
  const [updatedTip, setUpdatedTip] = useState("1+1");
  const [updatedKullanici, setUpdatedKullanici] = useState("0");
  const [updatedKullaniciTuru, setUpdatedKullaniciTuru] = useState("0");

  const axios = require('axios');
  
  const showCard = () =>{
    setShow(false)
    setShowUpdate(true)
  }

  const showUpdateCard = () =>{
    setShowUpdate(false)
  }

  const blockNoChanged = (event) => {
    setBlokNo(event.target.value);
  }

  const katNoChanged = (event) => {
    setKatNo(event.target.value);
  }

  const durumChanged = (event) => {
    setDurum(event.target.value);
  }

  const daireNoChanged = (event) => {
    setDaireNo(event.target.value);
  }

  const tipChanged = (event) => {
    setTip(event.target.value);
  }

  const kullaniciChanged = (event) => {
    setKullanici(event.target.value);
  }

  const kullaniciTuruChanged = (event) => {
    setKullaniciTuru(event.target.value);
  }

  const updatedBlockNoChanged = (event) => {
    setUpdatedBlokNo(event.target.value);
  }

  const updatedKatNoChanged = (event) => {
    setUpdatedKatNo(event.target.value);
  }

  const updatedDurumChanged = (event) => {
    setUpdatedDurum(event.target.value);
  }

  const updatedDaireNoChanged = (event) => {
    setUpdatedDaireNo(event.target.value);
  }

  const updatedTipChanged = (event) => {
    setUpdatedTip(event.target.value);
  }

  const updatedKullaniciChanged = (event) => {
    setUpdatedKullanici(event.target.value);
  }

  const updatedKullaniciTuruChanged = (event) => {
    setUpdatedKullaniciTuru(event.target.value);
  }

  const onayla = () => {
   if(blokNo !== "" && katNo !== "" && daireNo !== "" && kullanici > 0){
      let booleanState = false;
      let booleanKullanici = false;
      console.log(durum);
      console.log(kullaniciTuru);
      if(durum == 1){
        booleanState = true;
      }

      if(kullaniciTuru == 1){
        booleanKullanici = true;
      }
      const dataToSend = {"block": blokNo, "floor": katNo, "state": booleanState, "number": daireNo, "type": tip, "userType": booleanKullanici, "userID": kullanici};
      axios.post('/apartment', dataToSend)
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

  const updatedGuncelle = () => {
    if(updatedBlokNo !== "" && updatedKatNo !== "" && updatedDaireNo !== "" && updatedKullanici > 0){
      let booleanState = false;
      let booleanKullanici = false;
      if(updatedDurum == 1){
        booleanState = true;
      }

      if(updatedKullaniciTuru == 1){
        booleanKullanici = true;
      }
      const dataToSend = {"block": updatedBlokNo, "floor": updatedKatNo, "state": booleanState, "number": updatedDaireNo, "type": updatedTip, "userType": booleanKullanici, "userID": updatedKullanici, "apartmentID": apartmanid};
      axios.put('/apartment', dataToSend)
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

  const guncelle = (id) => {
    setApartmanid(id);
    axios.get('/apartment/get/' + id)
    .then(function (response) {
      setUpdatedBlokNo(response.data.block);
      setUpdatedKatNo(response.data.floor);
      setUpdatedDurum(response.data.state);
      setUpdatedDaireNo(response.data.number);
      setUpdatedTip(response.data.type);
      setUpdatedKullanici(response.data.userID);
      setUpdatedKullaniciTuru(response.data.userType);
    })
    .catch(function (error) {
      console.log("error " + error);
    })
    setShow(true);
    showUpdateCard();
  }

  const sil = (id) => {
    axios.delete('/apartment/' + id)
    .then(function (response) {
      console.log(response);
      getDatas();
    })
  }

  const getDatas = () => {
    axios.get('/apartment')
    .then(function (response) {
      setDatas(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("error " + error);
    })

    axios.get('/user')
    .then(function (response) {
      setUsers(response.data);
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
        <Link to = {`/admin/${userid}`}>
          <a class="nav-link">Ana Sayfa</a>
        </Link>
        <Link to = {`/apartment/${userid}`}><a class="nav-link active" >Daire Bilgileri</a>
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
      <span>Daire / Konut Tablosu</span>
      </div>
      <div className='col-md-7'></div>
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
      <th>Blok</th>
      <th>Kat</th>
      <th>Daire</th>
      <th>Kullanıcı</th>
      <th>Kullanıcı Tipi</th>
      <th>Daire Tipi</th>
      <th>Daire Durum</th>
      <th>İşlemler</th>
    </tr>
  </thead>
  <tbody>
      {datas.map((apartment) => (
        <tr id='table'>
          <td>{apartment.block}</td>
          <td>{apartment.floor}</td>
          <td>{apartment.number}</td>
          <td>
            
            {
              users.map((user) => (
                user.userID === apartment.userID ? user.name + " " + user.surname : ""
              ))
            }
          </td>
          <td>{apartment.userType === false ? "Kiracı" : "Sahibi"}</td>
          <td>{apartment.type}</td>
          <td>{apartment.state === false ? "Dolu" : "Boş"}</td>
          <td>
            <div className='row'>
            <button type="button" class="btn btn-info" onClick={() => guncelle(apartment.apartmentID)}>Güncelle</button>
            <button type="button" class="btn btn-danger" onClick={() => sil(apartment.apartmentID)}>Sil</button>
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
      <div/>
 : 
 <Card>
 <Card.Header>Daire / Konut Bilgileri</Card.Header>
 <Card.Body>
   <Card.Text>
   <div className='row'>
           <div className='col-md-6'>
       <Form>
       <Form.Group className="mb-3" controlId="formBasicText">
         <Form.Label>Blok No</Form.Label>
         <Form.Control type="text" placeholder="Blok numaranız" value={blokNo} onChange={blockNoChanged}/>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicText">
         <Form.Label>Durumu</Form.Label>
         <Form.Select aria-label="Default select example" value={durum} onChange={durumChanged}>
            <option value="0">Dolu</option>
            <option value="1">Boş</option>
          </Form.Select>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicText">
       <Form.Label>Tipi</Form.Label>
       <Form.Select aria-label="Default select example" value={tip} onChange={tipChanged}>
       <option value="1+1">1+1</option>
       <option value="2+1">2+1</option> 
       <option value="3+1">3+1</option>
     </Form.Select>
     </Form.Group> 
     <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Kullanıcı</Form.Label>
          <Form.Select aria-label="Default select example" value={kullanici} onChange={kullaniciChanged}>
            <option value="Seciniz">Seçiniz</option>
            {users.map((user) => (
              <option value={user.userID}>
                {user.name} {user.surname}
              </option>
            ))}

          </Form.Select>
        </Form.Group>
      
     </Form>
     </div>
     <div className='col-md-6'>
       <Form>
       <Form.Group className="mb-3" controlId="formBasicText">
         <Form.Label>Kat No</Form.Label>
         <Form.Control type="text" placeholder="Kat numaranız" value={katNo} onChange={katNoChanged}/>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicText">
         <Form.Label>Daire No</Form.Label>
         <Form.Control type="text" placeholder="Daire numaranız" value={daireNo} onChange={daireNoChanged}/>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicText">
       <Form.Label>Kullanıcı Türü</Form.Label>
       <Form.Select aria-label="Default select example" value={kullaniciTuru} onChange={kullaniciTuruChanged}>
       <option value="0">Kiracı</option> 
       <option value="1">Daire Sahibi</option>
     </Form.Select>
     </Form.Group>
      
     </Form>
     </div>
         </div>
   </Card.Text>
   <div className='row'>
     <div className='col-md-10'></div>
     <div className='col-md-2'>
     <button style={{float:'right'}} type="button" class="btn btn-success" onClick={onayla}>Onayla</button>
     </div>
   </div>
 </Card.Body>
</Card>}

{showUpdate ? 
      <div/>
 : 
 <Card>
 <Card.Header>Daire / Konut Bilgileri Güncelle</Card.Header>
 <Card.Body>
   <Card.Text>
   <div className='row'>
           <div className='col-md-6'>
       <Form>
       <Form.Group className="mb-3" controlId="formBasicText">
         <Form.Label>Blok No</Form.Label>
         <Form.Control type="text" placeholder="Blok numaranız" value={updatedBlokNo} onChange={updatedBlockNoChanged}/>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicText">
         <Form.Label>Durumu</Form.Label>
         <Form.Select aria-label="Default select example" value={updatedDurum} onChange={updatedDurumChanged}>
            <option value="0">Dolu</option>
            <option value="1">Boş</option>
          </Form.Select>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicText">
       <Form.Label>Tipi</Form.Label>
       <Form.Select aria-label="Default select example" value={updatedTip} onChange={updatedTipChanged}>
       <option value="1+1">1+1</option>
       <option value="2+1">2+1</option> 
       <option value="3+1">3+1</option>
     </Form.Select>
     </Form.Group> 
     <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Kullanıcı</Form.Label>
          <Form.Select aria-label="Default select example" value={updatedKullanici} onChange={updatedKullaniciChanged}>
            <option value="Seciniz">Seçiniz</option>
            {users.map((user) => (
              <option value={user.userID}>
                {user.name} {user.surname}
              </option>
            ))}

          </Form.Select>
        </Form.Group>
      
     </Form>
     </div>
     <div className='col-md-6'>
       <Form>
       <Form.Group className="mb-3" controlId="formBasicText">
         <Form.Label>Kat No</Form.Label>
         <Form.Control type="text" placeholder="Kat numaranız" value={updatedKatNo} onChange={updatedKatNoChanged}/>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicText">
         <Form.Label>Daire No</Form.Label>
         <Form.Control type="text" placeholder="Daire numaranız" value={updatedDaireNo} onChange={updatedDaireNoChanged}/>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicText">
       <Form.Label>Kullanıcı Türü</Form.Label>
       <Form.Select aria-label="Default select example" value={updatedKullaniciTuru} onChange={updatedKullaniciTuruChanged}>
       <option value="0">Kiracı</option> 
       <option value="1">Daire Sahibi</option>
     </Form.Select>
     </Form.Group>
      
     </Form>
     </div>
         </div>
   </Card.Text>
   <div className='row'>
     <div className='col-md-10'></div>
     <div className='col-md-2'>
     <button style={{float:'right'}} type="button" class="btn btn-success" onClick={updatedGuncelle}>Güncelle</button>
     </div>
   </div>
 </Card.Body>
</Card>}


        </div>
        </div>
    </div>
  );
}

export default Apartment;