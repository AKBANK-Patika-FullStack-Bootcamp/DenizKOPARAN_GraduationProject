import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./containers/admin";
import Login from "./containers/login";
import SignUp from "./containers/signUp";
import Apartment from "./containers/apartment";
import Users from "./containers/users";
import Message from "./containers/message";
import SendMessage from "./containers/sendMessage";
import UserMessage from "./containers/userMessage";
import Details from "./containers/details";
import BillingInformation from "./containers/billingInformation";
import UserBillingInformation from "./containers/userBillingInformation";
import Payment from "./containers/payment";
import PaymentPage from "./containers/paymentPage";
import ApartmentUsers from "./containers/apartmentUsers";
import UserPayment from "./containers/userPayment";

class App extends Component {
  handleLogout = () => {
    localStorage.clear();
  };
  render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/admin/:userid" element={<Admin />}/>
        <Route path="/apartment/:userid" element={<Apartment />}/>
        <Route path="/users/:userid" element={<Users />}/>
        <Route path="/message/:userid" element={<Message />}/>
        <Route path="/sendMessage/:userid" element={<SendMessage />}/>
        <Route path="/userMessage/:userid" element={<UserMessage />}/>
        <Route path="/details/:userid/:messageid" element={<Details />}/>
        <Route path="/billingInformation/:userid" element={<BillingInformation />}/>
        <Route path="/userBillingInformation/:userid" element={<UserBillingInformation />}/>
        <Route path="/payment/:userid" element={<Payment />}/>
        <Route path="/paymentPage/:userid/:billid" element={<PaymentPage />}/>
        <Route path="/apartmentUsers/:userid" element={<ApartmentUsers />}/>
        

      </Routes>
    </BrowserRouter>
    );
  }
}

export default App;






