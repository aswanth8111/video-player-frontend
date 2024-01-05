import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { addToHistory, deleteAVideo } from '../services/allAPI';
import Modal from 'react-bootstrap/Modal';



function ViedoCard({displayVideo , setDeleteVideoStatus}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() => {
    setShow(true)

    const {caption , embedLink} = displayVideo
    const today = new Date()
    let timestamp = new Intl.DateTimeFormat('en-IN',{year:'numeric', month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(today)
    console.log(timestamp);

    let videoDetails = {
      caption, embedLink ,timestamp
    }

    const response = await addToHistory(videoDetails)
    console.log(response);
  }

  const removeVideo = async(id)=>{
  const response = await deleteAVideo(id)
  setDeleteVideoStatus(true)
}

//function to drag a particular card
const dragStart = (e,id)=>{
  console.log(`card that dragged is :${id}`);
  

}


  return (
    <>

    <Card style={{ width: '100%', height:'100%' }} className='mb-4' draggable onDragStart={(e)=>dragStart(e,displayVideo?.id)}>
      <Card.Img onClick={handleShow} height={'300px'} variant="top" src={displayVideo.url} />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
            <h6>{displayVideo.caption}</h6>
        
        <Button onClick={()=>removeVideo(displayVideo?.id)} className='btn btn-danger'><i class="fa-regular fa-trash-can"></i></Button>
        
        </Card.Title>
      </Card.Body>
    </Card>

    <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="300px" src={`${displayVideo.embedLink}?autoplay=1`} title={displayVideo.caption} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Modal.Body>
        
      </Modal>

    </>
  )
}

export default ViedoCard