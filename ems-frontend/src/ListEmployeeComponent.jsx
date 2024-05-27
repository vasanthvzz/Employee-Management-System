import React, { useEffect } from 'react'
import { useState } from 'react'
import { deleteEmployee, listEmployee } from './services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListEmployeeComponent = () => {

    const  [employee,setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployee()
    },[])

    function getAllEmployee(){
        listEmployee().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    
    }

    const notify = () => toast("Wow so easy!");

    function addNewEmployee(){
        navigator('/add-employee');
        toast("Employee has been deleted");
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`);
    }
    function removeEmployee(id){
        deleteEmployee(id).then(() => {
            getAllEmployee();
            toast("Employee has been deleted");
        }).catch(error => {
            console.log(error);
        })
    }

    return (
    <div className='container'>

        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-success mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table class='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>ID </th>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employee.map(employee => 
                <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td className='d-flex flex-row bd-highlight mb-3'><button className='btn btn-primary 'onClick={()=> updateEmployee(employee.id)}>Update</button>
                   <button className='btn btn-danger 'onClick={()=> removeEmployee(employee.id)} style={{marginLeft:'10px'}}>Delete</button>
                    </td>
                </tr>)
                }
            </tbody>
        </table>
        <ToastContainer></ToastContainer>
    </div>
  )
}

export default ListEmployeeComponent