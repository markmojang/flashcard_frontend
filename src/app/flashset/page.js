'use client';

import './flashset.css';
import React, { useState, useEffect } from 'react';

async function getflashdata() {
    const data = await fetch(`http://localhost:8000/flash_info?user=${"test_user"}`);

}

export default function Flashset() {

  return (
    <div>
      <h1 className="Title">FlashCard</h1>
      <div className='container'> 
        <div className='set-container'>
            <p> edit </p>
            <img src='https://img.freepik.com/free-vector/realistic-vector-icon-illustration-flying-blank-playing-cards-isolated-white-background_134830-1747.jpg?w=826&t=st=1722273132~exp=1722273732~hmac=3bd25feae46d599cee0a4cfde87d945b8c3e42bdb58c8ecf15dc96eeb41a6066'></img>
            <p> test_set </p>
        </div>
        <div className='set-container'>
            <p> edit </p>
            <img src='https://img.freepik.com/free-vector/realistic-vector-icon-illustration-flying-blank-playing-cards-isolated-white-background_134830-1747.jpg?w=826&t=st=1722273132~exp=1722273732~hmac=3bd25feae46d599cee0a4cfde87d945b8c3e42bdb58c8ecf15dc96eeb41a6066'></img>
            <p> test_set </p>
        </div>
        <div className='set-container'>
            <p> edit </p>
            <img src='https://img.freepik.com/free-vector/realistic-vector-icon-illustration-flying-blank-playing-cards-isolated-white-background_134830-1747.jpg?w=826&t=st=1722273132~exp=1722273732~hmac=3bd25feae46d599cee0a4cfde87d945b8c3e42bdb58c8ecf15dc96eeb41a6066'></img>
            <p> test_set </p>
        </div>
        <div className='set-container'>
            <p> edit </p>
            <img src='https://img.freepik.com/free-vector/realistic-vector-icon-illustration-flying-blank-playing-cards-isolated-white-background_134830-1747.jpg?w=826&t=st=1722273132~exp=1722273732~hmac=3bd25feae46d599cee0a4cfde87d945b8c3e42bdb58c8ecf15dc96eeb41a6066'></img>
            <p> Add + </p>
        </div>
      </div>
    </div>
  );
}
