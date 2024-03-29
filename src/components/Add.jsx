import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import { uploadAllVideos } from '../services/allAPI';

function Add({setUploadVideoStatus}) {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [videos , setVideos] = useState({
      id:"",
      caption:"",
      url:"",
      embedLink:""
    })
    console.log(videos);

    const embedVideoLink =(e)=>{
      const{value} = e.target
      console.log(value.slice(-11));
      const link = `https://www.youtube.com/embed/${value.slice(-11)}`
      setVideos({...videos, embedLink:link})
    }

    const handleUpload = async ()=>{
        const {id , caption, url , embedLink} = videos
        if(!id || !caption || !url || !embedLink){
          toast.warning("please fill all the field")
        }
        else{
          const response = await uploadAllVideos(videos)
          console.log(response);

          if(response.status>=200 && response.status<300){
            setUploadVideoStatus(response.data)
            toast.success('video uploaded successful')
          }
          else{
            console.log(response);
            toast.error('something went wrong')
          }
        }
    }

  return (
    <>
    <div className='d-flex align-items-center'>
        <h5>Uplaod viedos</h5>
        <button onClick={handleShow} className='btn'><i class="fa-solid fa-cloud-arrow-up fs-5"></i></button>
    </div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film me-2 text-warning"></i>Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the following details</p>

          <form className='border border-secondary rounded p-2'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter Video ID"  onChange={(e)=>setVideos({...videos,id:e.target.value})}/>  
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEm  ail">
                <Form.Control type="text" placeholder="Enter Video Caption " onChange={(e)=>setVideos({...videos,caption:e.target.value})}/>  
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter Video Image Url" onChange={(e)=>setVideos({...videos,url:e.target.value})} />  
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter Youtube Video Link" onChange={embedVideoLink} />  
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
   
    </>
  )
}

export default Add