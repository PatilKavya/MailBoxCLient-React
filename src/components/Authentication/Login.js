import React, { useRef } from 'react'
import { Button, Card, Container, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import styles from './Login.module.css'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/Auth';


const LogIn=()=>{
const mailRef=useRef();
const passwordRef=useRef();
const history=useHistory();
const dispatch=useDispatch();


async function submitHandler(e){
e.preventDefault();
const obj={mail:mailRef.current.value,password:passwordRef}
const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbTgBuoxB3rrKvFQy2oqLwKUpc7iJulQA',{
    method:'POST',
    body:JSON.stringify({
        email:mailRef.current.value,
        password:passwordRef.current.value,
        returnSecureToken:true,
    }),
    headers:{
      'Content-Type':'application/json'}
    })

    if(res.ok){
      const data= await res.json();
      console.log(data.email);
      const loginObj = {
        idToken: data.idToken,
        email: data.email,
    }
   dispatch(authActions.login(loginObj))
       history.replace('/')
    }
    else{
        const data=await res.json();
        alert(data.error.message)
    }
}

const clickHandler=()=>{
    history.replace('/signIn')
}

return (
    <>
    <Container>
        <Card className={styles.section}>
            <h2>LogIn</h2>
            <Form onSubmit={submitHandler}>
                <FormGroup className={styles.input}>
                    <FormLabel htmlFor='mail'>Email</FormLabel>
                    <FormControl type='mail' id='mail' ref={mailRef} required/>
                </FormGroup>
                <FormGroup className={styles.input}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <FormControl type='password' id='password' ref={passwordRef} required/>
                </FormGroup>

                <Button type='submit'>LogIn</Button><br/>

            </Form>
            <Link to='/password'>Forgot Password?</Link>
            <Button onClick={clickHandler}>Create Account</Button>
        </Card>
    </Container>
    </>
)


}

export default LogIn;