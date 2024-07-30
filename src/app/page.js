'use client';

import './flashset.css';
import React, { useState, useEffect } from 'react';


async function getflashdata() {
  const res = await fetch(`http://localhost:8000/flash_info?user=${"test_user"}`);
  let data = await res.json();
  data = Array.from(new Set(data.map(flashcard => flashcard.Set_name)));
  return data;
  
}

export default function Flashset() {
  
  const [setname,setSetname] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const data = await getflashdata();
      setSetname(data);
      console.log(data);
    }
    fetchData();
    }, []);

  const flipgame = (name) =>{
    window.location.href = `./${name}/flashgame`;
  };

  const editflash = (name) =>{
    window.location.href = `./${name}/flashedit`;
  };
  
  return (
    <div>
      <h1 className="Title">FlashCard</h1>
      <div className='container'> 
      {setname.map((set,index) => (
        <div className='set-container'>
            <p className='edit_bt' onClick={() => editflash(set)}> Edit ✏️</p>
            <img src='https://img.freepik.com/free-vector/realistic-vector-icon-illustration-flying-blank-playing-cards-isolated-white-background_134830-1747.jpg?w=826&t=st=1722273132~exp=1722273732~hmac=3bd25feae46d599cee0a4cfde87d945b8c3e42bdb58c8ecf15dc96eeb41a6066'></img>
            <p className='setlabel' onClick={() => flipgame(set)}> {set} </p>
        </div>
      ))}
        <div className='set-container'>
          <p> <br/></p>
            <img src='https://img.freepik.com/free-vector/realistic-vector-icon-illustration-flying-blank-playing-cards-isolated-white-background_134830-1747.jpg?w=826&t=st=1722273132~exp=1722273732~hmac=3bd25feae46d599cee0a4cfde87d945b8c3e42bdb58c8ecf15dc96eeb41a6066'></img>
            <p className='add_bt'> Add + </p>
        </div>
      </div>
    </div>
  );
}