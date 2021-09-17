import React from 'react';
import Heading from '../../components/Heading/Heading';
import Form from '../../components/Form/Form';




const AddStudent = ()=>{
    return(
        <>
            <Heading/>
            <Form heading='New Student' purpose='create a new' add ={true}/>   
        </>

    );
}

export default AddStudent;