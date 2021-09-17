import React, { useState, useEffect } from 'react';
import Heading from '../../components/Heading/Heading';
import './home.css';
import { FaUserPlus } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';




const Home = ()=>{
    const [students, setStudents] = useState([]);

    const fetchStudents = async ()=>{
        try{
            const response = await fetch('http://localhost:3001/students');
            if(!response.ok){
                throw new Error(response.status);
            }
            const data = await response.json();
            console.log(data);
            setStudents(data);
        }catch(e){
            console.log(e);
        }
        

    }
    useEffect(()=>{
        fetchStudents();
    },[]);


    const handleDelete = (id)=>{
        fetch(`http://localhost:3001/students/${id}`,{
            method:'DELETE'
        });
        fetch(`http://localhost:3001/students/${id}`,{
            method:'DELETE'
        });
        fetchStudents();
    }

    return(
        <>
            <Heading/>
            <div className='users-container'>
                <NavLink to='/add'><button className='add-student-btn'>Add Student <FaUserPlus/></button></NavLink>
                <table>
                    <tbody>
                    <tr className='heading-row'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Operation</th>
                    </tr>
                    {
                        students.map((item,ind)=>{
                            return(
                                <tr key={item.id}>
                                    <td> {ind+1} </td>
                                    <td> {item.name} </td>
                                    <td> {item.email} </td>
                                    <td> {item.phone} </td>
                                    <td> {item.gender} </td>
                                    <td>
                                        <NavLink to={`/edit/${item.id}`}><button className='edit-student-btn' title='Edit Student'><RiEdit2Fill/></button></NavLink>
                                        <button className='delete-student-btn' title='Delete Student' onClick={()=>handleDelete(item.id)}><BsFillTrashFill/></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                    </tbody>
                </table>
            </div>
            
        </>
    );
}

export default Home;