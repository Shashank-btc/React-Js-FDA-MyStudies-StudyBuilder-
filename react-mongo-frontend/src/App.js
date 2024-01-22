import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [examples, setExamples] = useState([]);
  const [newExample, setNewExample] = useState({ name: '', age: '' });
  const [buttonTextChange, setButtonTextChange] = useState('edit');
  const [editExample, setEditExample] = useState({id: '', name: '', age: '' });

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/examples');
        setExamples(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteFromDB = async (id) => {
    try {
      // Delete example by ID
      const response = await axios.delete(`http://localhost:3001/api/examples/${id}`);
      console.log(response.data.message);

      // Fetch updated examples
      const updatedExamples = await axios.get('http://localhost:3001/api/examples');
      setExamples(updatedExamples.data);
    } catch (error) {
      console.error('Error deleting example:', error);
    }
  };

  const editFromDB = async(id) =>{
    if(buttonTextChange === 'update') {
      console.log("update ", buttonTextChange !=='' || buttonTextChange !== 'update')
      updateFromDB(id)
      // console.log(editExample.age)
    } else{
    try{
    const response = await axios.get(`http://localhost:3001/api/examples/${id}`);
    setButtonTextChange('update')
    setEditExample({name:response.data.name,age: response.data.age });
    // editName = response.data.name
    // editAge = response.data.age
    
    } catch(error){
      console.log('error data is here')
    }
  }
    // if(buttonTextChange ==='edit') {
    // updateFromDB(id, updatedField1, updatedField2)
    // }
  };

  const updateFromDB = async (id) => {
    console.log('check1',editExample)
    console.log('check2',id)
   
    //

// Extract the 'id' property
//const exampleIdString = exampleIdObject.id;
//console.log('exampleIdString ',exampleIdString)
   try {
     const url = 'http://localhost:3001/api/examples/'+id
      
      const userData =  { 
        name : editExample.name, 
        age : parseInt(editExample.age)
      }
      // Update example by ID
      console.log("User data is ", userData)
      const response = await axios.put(url,userData);

      console.log('Updated Example:', response.data);

      // Fetch updated examples
      const updatedExamples = await axios.get('http://localhost:3001/api/examples');
      setExamples(updatedExamples.data);
      setButtonTextChange('edit')
      setEditExample({id:'' , name: '', age: '' });
    } catch (error) {
      console.error('Error updating example: in app.js', error);
    }
    // setButtonTextChange('edit')
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(editExample.name !== '' || editExample.age !== '') {
      if(name ==='name') {
      setEditExample({...editExample, name : value})
      }else
    setEditExample({...editExample, age : value})
    } else {
    setNewExample({ ...newExample, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newExample) 
  
    try {
      // Make a POST request to create a new example
      const response = await axios.post('http://localhost:3001/api/examples', newExample);
  
      // Update the state with the new example
      setExamples([...examples, response.data]);
  
      // Clear the form
      setNewExample({ name: '', age: '' });
    } catch (error) {
      console.error('Error creating new example:', error.message);
    }
  };

  function updareValue(data){
    if(data === 'age'){
      console.log("age")
    } else{
      console.log("name")
    }
  }
  
  

  return (
    <div>
      <h1>Examples</h1>
      <ul>
        {examples.map((example) => (
          <li key={example._id}>{example.name} - {example.age} years old    
          <button onClick={() => editFromDB(example._id)} >{buttonTextChange}</button>
  
           <button onClick={() => deleteFromDB(example._id)} >Delete</button> </li>
        ))}
      </ul>

      <h2>Create New Example</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:
          <input type="text" name="name" value={ editExample.name!== "" ? editExample.name : examples.name}  onChange={handleInputChange} />
        </label>
        <br />
        <label>Age:
          <input type="text" name="age" value={editExample.age!== "" ? editExample.age : examples.age} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Create Example</button>
      </form>
    </div>
  );
};

export default App;
