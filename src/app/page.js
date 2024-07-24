'use client';

import './globals.css';
import React, { useState } from 'react';

export default function Home() {
  const [flash, setFlash] = useState([
    { front: 'hello', back: 'สวัสดี' },
    // Add more flashcards as needed
  ]);
  const [front, setFront] = useState('hi');
  const [back, setBack] = useState('สวัสดี');

  const addflash = () => {
    setFlash([
      ...flash,{front,back}
    ])

    setFront("")
    setBack("")
  }
  return (
    <div>
      <h1 className="Title">FlashCard</h1>
      <div className='Column1'>
        <label>
          <h3 className='input_text'>Front</h3> <br/>
          <input
            type="text"
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
        </label>
      </div>
      <div className='Column2'>
        <label>
        <h3 className='input_text'> Back </h3> <br/>
          <input
            type="text"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            />
        </label>
      </div>
      <button onClick={addflash}>Add</button>
      <div style={{fontFamily:'Jua',justifyContent:"center",display:"flex"}}>
        <h1> List </h1>
      </div>
      {flash.map((flashcard) => (
        <div key={flashcard.id} className="flashcard-container">
          <div className="flashcard-front">{flashcard.front}</div>
          <div className="flashcard-back">{flashcard.back}</div>
        </div>
      ))}

    </div>
  );
}
