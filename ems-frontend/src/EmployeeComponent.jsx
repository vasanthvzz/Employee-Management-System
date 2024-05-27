import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from './services/EmployeeService';
import { useNavigate,useParams } from 'react-router-dom';

const EmployeeComponent = () => {

  const [firstName,setFirstName]  = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const navigator = useNavigate();
  const{id} = useParams();
  const[errors,setErrors] = useState({
    firstName : '',
    lastName : '',
    email : ''
  })

const handleFirstName = (e) => setFirstName(e.target.value);
const handleLastName = (e) => setLastName(e.target.value);
const handleEmail = (e) => setEmail(e.target.value);

 
useEffect(() => {
  if(id){
    getEmployee(id).then((response) =>{
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
    }).catch(error => {
      console.log(error);
    })
  }
},[id])

function pageTitle(){
  if(id){
    return <h2 className='text-center'>Update Employee</h2>
  }else{
    return <h2 className='text-center'>Add Employee</h2>
  }
}

function validateForm(){
  let valid = true;
  const errorsCopy = {... errors };
  if(firstName.trim()){
    errorsCopy.firstName='';
  }else{
    errorsCopy.firstName = 'First name is required';
    valid = false;
  }
  if(lastName.trim()){
    errorsCopy.lastName='';
  }else{
    errorsCopy.lastName = 'Last name is required';
    valid = false;
  }
  if(email.trim()){
    errorsCopy.email='';
  }else{
    errorsCopy.email = 'Email is required';
    valid = false;
  }
  setErrors(errorsCopy);
  return valid;
}

function saveOrUpdateEmployee(e){
  e.preventDefault();
  const employee = {firstName,lastName,email};
  if(validateForm()){
    if(id){
      updateEmployee(id,employee).then((response) => {
        console.log(response.data);
        navigator('/employees');
      }).catch(error => {console.log(error)});
    }else{
      createEmployee(employee).then((response) => {
        console.log(response.data);
        navigator('/employees');
    }).catch(error => {console.log(error)})
  }
  }
}

  return (
    <div className='container'>
      <br />
      <div className='row'>
      <div class='card col-md-6 offset-md-3 offset-md-3 border border-dark'>
        {pageTitle()}
          <div className="card-body">
            <form action="">
              <div className='form-group mb-2'>
                <label className='form-label'>First name:</label>
                <input type="text" name="firstName" className={`form-control ${errors.firstName?'is-invalid':''}`} placeholder="Enter Employee First Name" value={firstName} onChange={handleFirstName}/>
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Last name:</label>
                <input type="text" name="lastName" className={`form-control ${errors.lastName?'is-invalid':''}`} placeholder="Enter Employee Last Name"  value={lastName} onChange={handleLastName}/>
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Email id:</label>
                <input type="email" name="email" className={`form-control ${errors.email?'is-invalid':''}`} placeholder="Enter Employee email"  value={email} onChange={handleEmail}/>
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
            </form> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent