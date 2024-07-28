'use client';
import './flashgame.css';
import React, { useState } from 'react';

export default function Flashgame() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tisFlipped, settIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
        settIsFlipped(!tisFlipped);
    }, 200);
  };

  return (
    <div>
      <div className="Title">
        <h1>FlashCard</h1>
      </div>
      <div className="flashbox-container" >
        <div onClick={handleClick} className={`flashbox ${isFlipped ? 'flip' : ''}`}>
          <div className="flashbox-front">
            <p className="box-text">{!tisFlipped ? 'hello' : ''}</p> 
          </div>
          <div className="flashbox-back">
            <p className="box-text">{tisFlipped ? 'สวัสดี' : ''}</p> 
          </div>
        </div>

      </div>
      <div className='Next'>
        <p className='nextbt'> Next </p>
      </div>
    </div>  
  );
}
