'use client';
import './flashgame.css';
import React, { useState, useEffect } from 'react';

async function getFlashcardData() {
  try {
    const response = await fetch('http://localhost:8000/flash_info');
    let data = await response.json();
    data = data.map(flashcard => ({
      front: flashcard.front,
      back: flashcard.back
    }));
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default function Flashgame() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tisFlipped, settIsFlipped] = useState(false);
  const [flashlist, setFlashlist] = useState({});
  const [randomkey, setRandomkey] = useState('');
  const [word, setWord] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await getFlashcardData();
      if (data.length > 0) {
        const flashcards = {};
        data.forEach((flashcard, index) => {
          flashcards[data[index].front] = data[index].back;
        });
        console.log(flashcards);
        setFlashlist(flashcards);

        const keys = Object.keys(flashcards); // Get keys only once
        const newRandomIndex = Math.floor(Math.random() * keys.length);
        setRandomkey(keys[newRandomIndex]);
        setWord(flashcards[keys[newRandomIndex]]);
      }
    }

    fetchData();
  }, []);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      settIsFlipped(!tisFlipped);
    }, 200);
  };

  const random = () => {
    const keys = Object.keys(flashlist); // Get keys only once
    const newRandomIndex = Math.floor(Math.random() * keys.length);
    setRandomkey(keys[newRandomIndex]); // Update randomkey
    setWord(flashlist[keys[newRandomIndex]]); 
  };

  return (
    <div>
      <div className="Title">
        <h1>FlashCard</h1>
      </div>
      <div className="flashbox-container">
        <div onClick={handleClick} className={`flashbox ${isFlipped ? 'flip' : ''}`}>
          <div className="flashbox-front">
            <p className="box-text">{!tisFlipped ? randomkey : ''}</p>
          </div>
          <div className="flashbox-back">
            <p className="box-text">{tisFlipped ? word : ''}</p>
          </div>
        </div>
      </div>
      <div className='Next'>
        <p className='nextbt' onClick={random}>Random</p>
      </div>
    </div>
  );
}
