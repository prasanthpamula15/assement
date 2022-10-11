import React from 'react';
import {useState } from 'react';
import './App.js';
import {collection,addDoc} from 'firebase/firestore';
import {database} from './firebaseconfig'


export default function AddItem(props) {
    const [msg,setMsg]=useState([]);
    var db=collection(database,"todo");//refers the database collection
    
    //updating the state array
    const handlechange=(e)=>{
        let input={msg:e.target.value,sticky:"stickyFalse"}
        setMsg({...msg,...input});
        }
      
      //Adding new documenet to the database using addDoc method
        const handleclick=()=>{
        addDoc(db,{
          msg
        })
        props.getD();
        
        }
  return (
    <div className='inputf' onChange={(e)=>{handlechange(e)
    }}><input type='text'></input><button onClick={(e)=>{handleclick(e)}}>Add</button></div>
  )
}
