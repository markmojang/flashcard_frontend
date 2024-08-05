'use client';

import './globals.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function Home() {
  const [flash, setFlash] = useState([{}]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://flashcard-backend-db69fcfacfa6.herokuapp.com/flash_info?Set_name=${params.set_names}&user=${"test_user"}`);
      let data = await response.json();
      data = data.map(flashcard => ({
        front: flashcard.front,
        back: flashcard.back
      }));
      setFlash(data);
    }

    fetchData();
  }, []);

  const addFlashcard = async () => {
    if (front != "" && back != ""){
      try {
      console.log(parmas.set_names);
      const response = await fetch('https://flashcard-backend-db69fcfacfa6.herokuapp.com/add_flashcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: "test_user", // Replace with actual user data
          Set_name: params.set_names, // Assuming the set name remains constant
          front,
          back
        })
      }
    );
      if (response.ok) {
        const newFlashcard = await response.json();
        setFlash([...flash, newFlashcard]); // Add the new flashcard to the list
        setFront('');
        setBack('');
      } 
      else {
        console.error('Failed to add flashcard');
        // Handle the error (e.g., show an error message to the user)
      }
      async function fetchData() {
        const response = await fetch(`https://flashcard-backend-db69fcfacfa6.herokuapp.com/flash_info?Set_name=${params.set_names}&user=${"test_user"}`);
        let data = await response.json();
        data = data.map(flashcard => ({
          front: flashcard.front,
          back: flashcard.back
        }));
        setFlash(data);
      }
  
      fetchData();
    }
     
    catch (error) {
      console.error('Error adding flashcard:', error);
      // Handle the error
    }
    }
    else{
      alert("Data cant be blank");
    }
  };


  const deleteFlash = async (Users,setnames,front,back) => {
    try {
      const response = await fetch(`https://flashcard-backend-db69fcfacfa6.herokuapp.com/delete_flashcard?user=${Users}&Set_name=${setnames}&front=${front}&back=${back}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Flashcard deleted successfully');
        // Refresh the flashcard list or remove the deleted item from the 'flash' state.
        fetchData();  
      } else {
        console.error('Failed to delete flashcard');
        // Handle the error (e.g., show a message to the user)
      }
    } catch (error) {
      console.error('Error deleting flashcard:', error);
      // Handle the error
    }
    async function fetchData() {
      const response = await fetch(`https://flashcard-backend-db69fcfacfa6.herokuapp.com/flash_info?Set_name=${params.set_names}&user=${"test_user"}`);
      let data = await response.json();
      data = data.map(flashcard => ({
        front: flashcard.front,
        back: flashcard.back
      }));
      setFlash(data);
    }

    fetchData();
  }

  const backbt = () => {
    window.history.back();
  }
  return (
    <div>
      <h1 className='back-bt' onClick={backbt}> Go Back </h1>
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
          <p className='delete-bt' onClick={() => deleteFlash("test_user",params.set_names,flashcard.front,flashcard.back)}> X </p>
          <div className="flashcard-front"><p>{flashcard.front}</p></div>
          <div className="flashcard-back"><p>{flashcard.back}</p></div>
        </div>
      ))}
    </div>
  );
}
