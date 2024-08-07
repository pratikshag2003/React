import React ,{useState } from 'react'
import {Modal,Button} from 'react-bootstrap';
import postServices from '../services/postServices';

 function UpdateModelComponent(props){
     const [isShow ,invokeModel]=useState(false);

     const initModel =() =>{
        return invokeModel(!isShow);
     }

     //form updation Data
     const [title ,setTitle] = useState(props.title);
     const [date ,setDate] = useState(props.date);
     const [id ,setId] = useState(props.id);
     const [selectedFile ,setSelectedFile] = useState('');

      const handleSubmit =async(event)=>{
        event.preventDefault();

        const formData = new FormData();
        formData.append('id',id);
        formData.append('title',title);
        formData.append('date',date);

        if(selectedFile !=''  && selectedFile.length !=0){
            formData.append('image',selectedFile);
        }
        const response=await postServices.update(formData);

        if(response.data.success==true){
         alert(response.data.msg);
        }else{
            alert(response.data.msg);
        }

        initModel();
      }
  return (
    <div>
    <Button varient="success" onClick={initModel}>
       Edit
    </Button>

    <Modal show={isShow}>
      <Modal.Header closeButton onClick={initModel}>
      <Modal.Title>Update Post</Modal.Title>
      </Modal.Header>
      <form  onSubmit={handleSubmit}>
            
      <Modal.Body>
        <input 
        type="text" 
        name="title" 
        placeholder="Enter Post title"  
        value={title} 
         onChange= {event=> setTitle(event.target.value)}
          required/>
        <br></br>
        <br></br>
        <input 
        type="date" 
        name="date" 
        placeholder="Enter date"  
        value={date} 
         onChange= {event=> setDate(event.target.value)}
        required/>
          <br></br>
          <br></br>
          <input
        type="file" 
        name="image" 
        placeholder="Upload Image"  
         onChange= {event=> setSelectedFile(event.target.files[0])}
          />
          <br></br>


      </Modal.Body>
      <Modal.Footer>
        <Button varient="danger" onClick={initModel}>Close</Button>
        <Button type="submit" 
        varient="dark">
            Update
        </Button>
      </Modal.Footer>
            
            </form>
    </Modal>
    </div>
  )
}
export default UpdateModelComponent;
