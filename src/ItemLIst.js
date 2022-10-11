import { useEffect,useState } from 'react';
import {database} from './firebaseconfig'
import './App.css';
import {collection,getDocs,deleteDoc,doc,updateDoc} from 'firebase/firestore'
import {TiArrowSortedUp,TiArrowSortedDown} from 'react-icons/ti';//upArrow and DownArrow images
import {MdCancel} from 'react-icons/md';//cancel Image
import {BsFillPinFill} from 'react-icons/bs'; //pin image
import React from 'react'
import AddItem from './AddItem';

export default function ItemList() {
  
  const [outputmsg,setOutputmsg]=useState([{msg:'',id:'',sticky:'',up:'',down:''}]);//state array to store list of items
  var db=collection(database,"todo");

//geting the data from backend 
  useEffect(()=>{
    getdata();
  },[])

//getdata method that retrive the data from firebase using getdocs method
  async function getdata(){
    const data=await getDocs(db);
    var output=data.docs.map((itm)=>{
      return {...itm.data(),id:itm.id}
    })
    let input=output.map((itm,i)=>{
    
      return {msg:itm.msg.msg,
        id:itm.id,
        sticky:itm.msg.sticky,
        up:'arrowTrue',down:'arrowTrue'};
      
    })
    setOutputmsg([])
    setOutputmsg((current)=>[...current,...input])
  }
 //function tha updates the arrow images status (arrow images can take effect or not)
  function stylearrow(){
    let i=outputmsg.length;
    if(outputmsg[0].up==='arrowTrue'||outputmsg[i-1].down==='arrowTrue'){
      let arr=[...outputmsg]
      arr[0].up='arrowFalse';
      arr[i-1].down='arrowFalse';
      setOutputmsg(arr)
    }
  }
 stylearrow();
 
 //funtion that handle the up-arrow click
 function handleup(index){
  if(outputmsg[index].up==='arrowFalse'||outputmsg[index-1].sticky==='stickyTrue'){
    alert("cantdo")
      }else 
      if(outputmsg[index].up==='arrowTrue'){
        let uppereleref=doc(database,'todo',outputmsg[index-1].id);
        let currenteleref=doc(database,'todo',outputmsg[index].id);

        updateDoc(uppereleref,{
          msg: {msg:outputmsg[index].msg,sticky:'stickyFalse'},
         })
        updateDoc(currenteleref,{
           msg: {msg:outputmsg[index-1].msg,sticky:'stickyFalse'}
         })
         getdata();
         stylearrow();
      }
  }
  
  //function that handle down-arrow click
 function handledown(index){
  let length=outputmsg.length;
   if(outputmsg[index].down==='arrowFalse'||outputmsg[index].sticky==='stickyTrue'){
     alert("cantdo")
   }else 
   if(outputmsg[index].down==='arrowTrue'){
    let lowereleref=doc(database,'todo',outputmsg[index+1].id);
     let currenteleref=doc(database,'todo',outputmsg[index].id);

     updateDoc(lowereleref,{
         msg: {msg:outputmsg[index].msg,sticky:'stickyFalse'},
      })
      updateDoc(currenteleref,{
          msg: {msg:outputmsg[index+1].msg,sticky:'stickyFalse'}
      })
      getdata();
      stylearrow();
  }
}

//function that handles deletion operation
async function del(id){
  let db=doc(database,"todo",id)
   await deleteDoc(db); getdata();
}

//function that handle sticky operation or pin on top
function handlepin(index){
  let topref=doc(database,'todo',outputmsg[0].id);
  let currentref=doc(database,'todo',outputmsg[index].id);
  if(outputmsg[index].sticky==='stickyFalse'){
  updateDoc(topref,{
      msg: {msg:outputmsg[index].msg,sticky:'stickyTrue'},
      
     }).catch((err)=>{
      console.log(err)
     })
   updateDoc(currentref,{
    msg:{msg:outputmsg[0].msg,sticky:'stickyFalse'}
   })
  }else{
    let topref=doc(database,'todo',outputmsg[0].id);
    
  updateDoc(topref,{
      msg: {msg:outputmsg[index].msg,sticky:'stickyFalse'}
     }).catch((err)=>{
      console.log(err)
     })
  }
  getdata();
}

  return (
    <div>
       {
    // using map function to display all the items
        outputmsg.map((itm,index)=>{
        var id=itm.id;
      return <div className='list' key={itm.id}>
              {itm.msg}
              <div className='icons'>
                <TiArrowSortedUp  className={outputmsg[index].up} onClick={()=>{handleup(index)}}/>
                <TiArrowSortedDown   className={outputmsg[index].down} onClick={()=>{handledown(index)}}/>
                <MdCancel size="20px" color='red' onClick={()=>{del(id)}}/>
                <BsFillPinFill   className={outputmsg[index].sticky} onClick={()=>{handlepin(index)}}/>
      
              </div>
            </div>
      })}
    <AddItem getD={getdata()}/>
    </div>
  )
}


