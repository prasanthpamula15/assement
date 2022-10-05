import { useEffect,useState } from 'react';
import {TiArrowSortedUp,TiArrowSortedDown} from 'react-icons/ti';
import {MdCancel} from 'react-icons/md';
import {database} from './firebaseconfig'
import './App.css';
import {collection,addDoc,getDocs,deleteDoc,doc,updateDoc} from 'firebase/firestore'
import {BsFillPinFill} from 'react-icons/bs'
import React from 'react'

export default function MainComp() {
  const [msg,setmsg]=useState([]);
  const [outputmsg,setOutputmsg]=useState([]);
  var db=collection(database,"todo");


  useEffect(()=>{
    getdata();
  })


  async function getdata(){
    const data=await getDocs(db);
    var output=data.docs.map((itm)=>{
      return {...itm.data(),id:itm.id}
    })
    let input=output.map((itm)=>{
      return {msg:itm.msg.msg,id:itm.id};
      
    })
    setOutputmsg([])
    setOutputmsg((current)=>[...current,...input])
  }
  
  
 
  const handlechange=(e)=>{
  let input={msg:e.target.value}
  setmsg({...msg,...input});
  }


  const handleclick=()=>{
  addDoc(db,{
    msg
  })
  }

  
  return (
    <div>
       {  outputmsg.map((itm,index)=>{
        var id=itm.id;
       
      return <div className='list' key={itm.id}>
         {itm.msg}
      <div className='icons'><TiArrowSortedUp  size="25px" color='blue' onClick={
        //function for handling the upbutton cick
        function handleup(){
       if(index-1===0){
        alert("cantdo")
       }else 
       if(index-1>=0){
       let uppereleref=doc(database,'todo',outputmsg[index-1].id);
       let currenteleref=doc(database,'todo',outputmsg[index].id);
       
       updateDoc(uppereleref,{
        msg: {msg:outputmsg[index].msg},
       })
       updateDoc(currenteleref,{
        msg: {msg:outputmsg[index-1].msg}
       })
      
      }
      
      
      
      }}/><TiArrowSortedDown  color='blue' size="25px" onClick={
        //function for handling down button click
        function handledown(){
        let length=outputmsg.length;
        if(index===0){
          alert("cantdo")
         }else 
       if(index+1<=length-1&&index!==0){
       let lowereleref=doc(database,'todo',outputmsg[index+1].id);
       let currenteleref=doc(database,'todo',outputmsg[index].id);
       
       updateDoc(lowereleref,{
        msg: {msg:outputmsg[index].msg},
       })
       updateDoc(currenteleref,{
        msg: {msg:outputmsg[index+1].msg}
       })
      
      }
      }}/>


      <MdCancel size="20px" color='red' onClick={
        //function for cancel operation
        async function del(){
        let db=doc(database,"todo",id)
         return await deleteDoc(db);
      }}/>


      <BsFillPinFill onClick={()=>{

      //function for pin operation
    
        let topref=doc(database,'todo',outputmsg[0].id);
        let currentref=doc(database,'todo',outputmsg[index].id);
      updateDoc(topref,{
          msg: {msg:outputmsg[index].msg},
         }).catch((err)=>{
          console.log(err)
         })
       updateDoc(currentref,{
        msg:{msg:outputmsg[0].msg}
       })
      }
      }/>
      
      </div>
     </div>
     })}
     
       
        
    <div className='inputf' onChange={(e)=>{handlechange(e)
     }}><input type='text'></input><button onClick={(e)=>{handleclick(e)}}>Add</button></div>
    
    </div>
  )
}

