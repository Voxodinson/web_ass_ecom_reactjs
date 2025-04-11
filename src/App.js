import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./component/Home";
import About from "./component/About";
import Testimonial from './component/Testimonial';
import Layout from './component/Layout';
import Narbar from './component/Narbar';
import Product from './component/Product';
import Blog from './component/Blog';
import Contact from './component/Contact';
import Cart from './pages/Cart';
import CheckOut from'./pages/CheckOut';
import ProductDetailPage from './pages/ProductDetail';
import FeedbackPage from './pages/FeedbackPage';
import LoginPage from './pages/LoginPage';
function App() {
  return (
    <BrowserRouter>
    <Narbar/>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About/>}/>
          <Route path="/Testimonial"element={<Testimonial/>}/>
          <Route path="/Product"element={<Product/>}/>
          <Route path="/Blog"element={<Blog/>}/>
          <Route path="/Contact"element={<Contact/>}/>
          <Route path="/Cart" element={<Cart/>}/> 
          <Route path="/CheckOut" element={<CheckOut/>}/> 
          <Route path="/feedback" element={<FeedbackPage/>}/> 
          <Route path="/login" element={<LoginPage/>}/> 
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  }
export default App;