import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { addToCategory, deleteACategory, getAllCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Category() {
  
  const [show, setShow] = useState(false);
  const [CategoryName , setCategoryName] = useState("")
  const [category , setCategory] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //function to add category
  const handleAddCategory = async()=>{
    console.log(CategoryName);
    if(CategoryName){
      let body = {
        CategoryName,
        allvideos:[]
      }
      const response = await addToCategory(body)
      console.log(response);
      if(response.status>=200 && response.status<300){
        toast.success('Category Added Successfully')
        //get all category
        allCategory()
        //to empty the state
        setCategoryName("")
        //close Modal
        handleClose()
      }
      else{
        toast.error('Something went wrong! please try again')
      }

    }
    else{
      toast.warning('please fill the Category Name')
    }
  }

  //function to get all categories

  const allCategory = async()=>{
    const {data}= await getAllCategory()
    setCategory(data)
  }
  console.log(category);

  //function to delete category

  const removeCategory = async(id)=>{
      await deleteACategory(id)
      //to get the remaing category
      allCategory()
  }


  useEffect(()=>{
    allCategory()
  },[])


  return (
    <>
    <div className='d-grid ms-3'>
        <button onClick={handleShow} className='btn btn-warning'>Add new Category</button>

    </div>

    { category?.length>0?
    category?.map((item)=>( <div className='m-5 border border-secondary p-3 rounded'>
    <div className='d-flex justify-content-between align-items-center'>
      <h6>{item.CategoryName}</h6>
      <button onClick={()=>removeCategory(item?.id)} className='btn btn-danger'><i class="fa-solid fa-trash-can"></i></button>

    </div>

  </div>))
      : <p className='fw-bolder fs-5 text-danger m-3' >Noting to display</p>
    }

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i className="fa-solid fa-pencil text-warning"></i>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className='border border-secondary rounded p-3'>
              
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Category Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Category Name"  onChange={(e)=>setCategoryName(e.target.value)}/>  
              </Form.Group>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default Category