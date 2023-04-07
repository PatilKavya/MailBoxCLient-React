import React, { useRef, useState } from 'react';
import { Container,Card, Form, FormGroup, FormLabel, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

const ForgotPassword=()=>{
   const [state,setState]= useState(false);
const mailRef=useRef()


const submitHandler=async (e)=>{
e.preventDefault();
setState(true)
try{
const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAzafnuUaUS0RXs7eH6EvLfO39f40qUS_U',{
    method:'POST',
    body:JSON.stringify({
        requestType:"PASSWORD_RESET",
        email:mailRef.current.value
    }),
    headers: {
        "Content-Type": "application/json"
      }
})
if(res.ok){
   const data=await res.json();
   console.log(data)
   setState(false)
}
}
catch(error){
console.log(error)
setState(false)
}

}

    return (
        <>
        <Container >
            <Card className={styles.section}>
                <Form onSubmit={submitHandler}>
                    <FormGroup className={styles.input}>
                    <FormLabel>Enter the Email which you have registered</FormLabel>
                    <FormControl type='mail' ref={mailRef}/>
                    </FormGroup>
                   {state&& <h4>Loading...</h4>}<br/>
                    <Button type='submit' >Send Link</Button>
                </Form><br/>
                <Link to='/logIn' style={{textDecoration:'none'}}>Already a user? LogIn</Link>
            </Card>
        </Container>
        </>
    )
}

export default ForgotPassword;