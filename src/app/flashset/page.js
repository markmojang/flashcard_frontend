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
      <div className='set-container'>
        <p> </p>
        <img></img>
        <p>  </p>
      </div>
      <div className='set-container'>
        
      </div>
    </div>
  );
}
