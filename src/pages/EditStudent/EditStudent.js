import React from 'react';
import Heading from '../../components/Heading/Heading';
import Form from '../../components/Form/Form';
import { useParams } from 'react-router-dom';




const EditStudent = ()=>{
    const { id } = useParams();
    return(
        <>
            <Heading/>
            <Form heading='Update Student' purpose='update an existing' edit={id}/>   
        </>

    );
}

export default EditStudent;