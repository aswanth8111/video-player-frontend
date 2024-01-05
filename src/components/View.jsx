import React, { useEffect, useState } from 'react'
import ViedoCard from './ViedoCard'
import { Col, Row } from 'react-bootstrap'
import { getAllVideos } from '../services/allAPI'

function View({uploadVideoStatus}) {

  const [allVideo , setAllVideo]= useState([])

  const [DeleteVideoStatus , setDeleteVideoStatus] = useState([])
  
   
  const getAllUploadedVideos = async()=>{
    const response = await getAllVideos()
    const {data} = response
    /* console.log(data); */
    setAllVideo(data)
  }

  console.log(allVideo);

  useEffect(()=>{
    getAllUploadedVideos()
    setDeleteVideoStatus(false)
  },[uploadVideoStatus , DeleteVideoStatus])
  return (
    <>
    
    <Row>
        { allVideo.length>0?
        allVideo.map((video)=>( <Col sm={12} md={6} lg={4} xl={3} className='mb-4'>
          
            <ViedoCard  displayVideo={video} setDeleteVideoStatus={setDeleteVideoStatus} />
        </Col>)):
        <p>Nothing to display</p>
        }
    </Row>
    
    </>
  )
}

export default View