import React , {useEffect, useState} from 'react';
import axios from 'axios';
import './Footer.css';

function Footer() {

  const[items, setItems] = useState([])

  const userShop = sessionStorage.getItem("shop");

  const[currency,setCurrency] = useState(localStorage.getItem("currency"));
  const[country,setCountry] = useState(localStorage.getItem("country"));
  const[language,setLanguage] = useState(localStorage.getItem("language"));



  const handleCurrencyChange = (e) => {
      setCurrency(e.target.value);
      localStorage.setItem("currency" , e.target.value);
  }

  const handleCountryChange = (e) => {
      localStorage.setItem("country" , e.target.value);
  }

 

  return (
    <>
    <div className='main'>
      <div className='child'>
        
        <div> 
                <select value={country} onChange={handleCountryChange}>
                    <option value="USA">USA | English</option>
                    <option value="India">India | Hindi</option>
                </select>
            </div> 
            
                 
        <div>
                <select value={currency} onChange={handleCurrencyChange}>
                    <option value="₹">Rupee (₹)</option>
                    <option value="$">Dollar ($)</option>
                 </select>
            </div>   &emsp;
               
        <p>© 2022 Etsy, Inc</p>&emsp;
        <p>Terms of use</p>&emsp;
        <p>Privacy</p>&emsp;
        <p>Internet-based ads</p>
        </div>
    </div>
    </>
  )
}

export default Footer