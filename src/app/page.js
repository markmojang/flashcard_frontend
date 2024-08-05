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
  const [setinp,setSetinp] = useState("");
  const [existingSetNames, setExistingSetNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getflashdata();
      setSetname(data);
      setExistingSetNames(data);
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
  
  const addsetname = async () =>{
    if(setinp !== "" && !existingSetNames.includes(setinp)){
      try {
        console.log(setinp);
        const response = await fetch('http://localhost:8000/add_flashcard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: "test_user", // Replace with actual user data
            Set_name: setinp, // Assuming the set name remains constant
            front: "test",
            back: "test"
          })
        }
      );
        if (response.ok) {
          setSetname([...setname, setinp]); // Add the new flashcard to the list

          setSetinp('');
        } 
        else {
          console.error('Failed to add setname to flashcard');
          // Handle the error (e.g., show an error message to the user)
        }
      }
      catch (error){
        console.error(error);
      }
    }
    else {
      alert('Set name already exists. Please choose a different name.'); // Or handle it differently
    };
  };

  const delete_set = async (Users,setnames) => {
    try {
      const response = await fetch(`http://localhost:8000/delete_set?user=${Users}&Set_name=${setnames}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('set deleted successfully');
        // Refresh the flashcard list or remove the deleted item from the 'flash' state.
        fetchData();  
      } else {
        console.error('Failed to delete set');
        // Handle the error (e.g., show a message to the user)
      }
    } catch (error) {
      console.error('Error deleting flashcard:', error);
      // Handle the error
    }
    async function fetchData() {
      const data = await getflashdata();
      setSetname(data);
    }
    fetchData();
  }

  return (
    <div>
      <h1 className="Title">FlashCard</h1>
      <div className='container'> 
      {setname.map((set,index) => (
        <div className='set-container'>
            <div className='top-set'><p className='delete-bt' onClick={() => delete_set("test_user",set)}> X </p> <p className='edit_bt' onClick={() => editflash(set)}> Edit ✏️</p></div>
            <img src='https://img.freepik.com/free-vector/realistic-vector-icon-illustration-flying-blank-playing-cards-isolated-white-background_134830-1747.jpg?w=826&t=st=1722273132~exp=1722273732~hmac=3bd25feae46d599cee0a4cfde87d945b8c3e42bdb58c8ecf15dc96eeb41a6066'></img>
            <p className='setlabel' onClick={() => flipgame(set)}> {set} </p>
        </div>
      ))}
        <div className='set-container'>
          <p> <input className='inputset' value={setinp} onChange={(e) => setSetinp(e.target.value)} /> </p>
            <img src='https://img.freepik.com/free-vector/realistic-vector-icon-illustration-flying-blank-playing-cards-isolated-white-background_134830-1747.jpg?w=826&t=st=1722273132~exp=1722273732~hmac=3bd25feae46d599cee0a4cfde87d945b8c3e42bdb58c8ecf15dc96eeb41a6066'></img>
            <p className='add_bt' onClick={addsetname}> Add + </p>
        </div>
      </div>
    </div>
  );
}