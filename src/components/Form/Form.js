import React, { useState, useEffect } from 'react';
import './form.css';
import { TiArrowBack } from "react-icons/ti";
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';



const Form = ({heading, purpose, add, edit})=>{
    const [student, setStudent] = useState({id:'',name:'', email:'', phone:'', gender:''});

    useEffect(()=>{
        if(edit){
            const fetchUpdatingStudent = async ()=>{
                try{
                    const response = await fetch(`http://localhost:3001/students/${edit}`);
                    if(!response.ok){
                        throw new Error(response.status);
                    }
                    const data = await response.json();
                    setStudent(data);
                }catch(e){
                    console.log(e);
                }
                
            }
            fetchUpdatingStudent();
        }
    },[edit]);

    const handleChange = (e)=>{
        setStudent({...student,[e.target.name]:e.target.value, id:uuid()});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(add){
            fetch('http://localhost:3001/students',{
                method: "POST",
                body: JSON.stringify(student),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response)=>{
                if(!response.ok){
                    throw new Error(response.status);
                }
                response.json();
            })
            .then((data)=>{
                alert('Student added successfully');
                setStudent({id:'',name:'', email:'', phone:'', gender:''});
            })
            .catch((e)=>{
                console.log(e);
            });
        }else if(edit){
            fetch(`http://localhost:3001/students/${edit}`,{
                method: "PUT",
                body: JSON.stringify(student),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response)=>{
                if(!response.ok){
                    throw new Error(response.status);
                }
                response.json();
            })
            .then((data)=>{
                alert('Student Updated successfully');
                setStudent({id:'',name:'', email:'', phone:'', gender:''});
            })
            .catch((e)=>{
                console.log(e);
            });
        }
    }
    return(
        <>
            <div className='new-user-container'>
                <NavLink to='/' className='all-students-btn'><div><TiArrowBack/> All Students</div></NavLink>
                <div className='new-user'>
                    <h1> {heading} </h1>
                    <p>Use the below form to {purpose} Student</p>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor='name'>Name</label>
                        <input required type='text' placeholder='Enter Name' className='inputBox' id='name' value={student.name} onChange={handleChange} name='name'/>
                        <label htmlFor='email'>Email</label>
                        <input required type='email' placeholder='Enter Email' className='inputBox' id='email' value={student.email} onChange={handleChange} name='email'/>
                        <label htmlFor='phone'>Phone</label>
                        <input required type='number' placeholder='Enter Phone' className='inputBox' id='phone' value={student.phone} onChange={handleChange} name='phone'/>
                        <label className='gender-label'>Gender</label>
                        <input required type='radio' name='gender' value='Male' className='male' onChange={handleChange} />&nbsp;&nbsp;Male
                        <input required type='radio' name='gender' value='Female'className='female' onChange={handleChange}/>&nbsp;&nbsp;Female
                        <button type='submit' className='submit-btn'>Save</button>
                    </form>

                </div>
            </div>
            
        </>

    );
}

export default Form;