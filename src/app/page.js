'use client';

import './globals.css';
import React, { useState, useEffect } from 'react';


export default function Home() {
  const [flash, setFlash] = useState([{}]);
  const [front, setFront] = useState();
  const [back, setBack] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8000/flash_info?Set_name=${"test_set"}&user=${"test_user"}`);
      let data = await response.json();
      data = data.map(flashcard => ({
        front: flashcard.front,
        back: flashcard.back
      }));
      setFlash(data);
    }

    fetchData();
  }, []);

  const addflash = () => {
    setFlash([
      ...flash,{front,back}
    ])

    setFront("")
    setBack("")
  }

  const addFlashcard = async () => {
    try {
      const response = await fetch('http://localhost:8000/add_flashcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: "test_user", // Replace with actual user data
          Set_name: "test_set", // Assuming the set name remains constant
          front,
          back
        })
      });

      if (response.ok) {
        const newFlashcard = await response.json();
        setFlash([...flash, newFlashcard]); // Add the new flashcard to the list
        setFront('');
        setBack('');
      } else {
        console.error('Failed to add flashcard');
        // Handle the error (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error adding flashcard:', error);
      // Handle the error
    }
  };

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
      <button onClick={addFlashcard}>Add</button>
      <div style={{fontFamily:'Jua',justifyContent:"center",display:"flex"}}>
        <h1> List </h1>
      </div>
      {flash.map((flashcard,index) => (
        <div key={index} className="flashcard-container">
          <div className="flashcard-front"><p>{flashcard.front}</p></div>
          <div className="flashcard-back"><p>{flashcard.back}</p></div>
        </div>
      ))}
    </div>
  );
}
