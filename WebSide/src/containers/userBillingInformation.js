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
  const { userid } = useParams();
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState("");

  const axios = require('axios');

  useEffect(() => {
    if(datas.length === 0){
      getDatas();
    }
  },[]);

  const getDatas = () => {
    axios.get('/bill/' + userid)
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
  <div className='row'>
      <div className='col-md-3'>
      <span>Aidat / Fatura Bilgileri</span>
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
      <th>Ödenmesi gereken tutar</th>
      <th>Durum</th>
      <th>İşlemler</th>
    </tr>
  </thead>
  <tbody>
  {datas.map((bill) => (
        <tr id='table'>
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
            <Alert variant="warning">
            <p className="mb-0">
                Beklenen
            </p>
            </Alert>
            }
          </div>
        </td>
        <td>
          {bill.paid === false ?
          <Link to= {`/paymentPage/${userid}/${bill.billID}`}> <button type="button" class="btn btn-info">Ödeme Yap</button></Link>
          : <></>
          }
        </td>
        </tr>
      ))}
  
  </tbody>
</Table>
</Card.Text>
        </Card.Body>
        </Card>
        </div>
        </div>
        </div>
    </div>
  );
}

export default ApartmentUsers;