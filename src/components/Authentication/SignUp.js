import { useRef } from 'react';
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
 import classes from './SignUp.module.css';

const SignUp = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const signUpHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;

        if(enteredPassword !== enteredConfirmPassword) {
            alert('Incorrect password');
        } else {
            props.onSignUp(enteredEmail, enteredConfirmPassword);
        }
    }

    return (
        <Container>
            <div className={classes.signUp}>
                <h1>Sign Up</h1>
                <Form onSubmit={signUpHandler}>
                    <FormGroup>
                        <FormLabel>Email</FormLabel><br/>
                    <FormControl 
                        name='email'
                        type='email'
                        required
                        ref={emailRef}
                    />
                    </FormGroup>
                    <FormGroup>
                    <FormLabel>Password</FormLabel><br/>
                    <FormControl 
                        name='password'
                        type='password'
                        required
                        ref={passwordRef}
                    />
                    </FormGroup>
                    <FormGroup>
                    <FormLabel>Confirm Password</FormLabel><br/>
                    <FormControl
                        name='confirmPassword'
                        id='confirmPassword'
                        required
                        ref={confirmPasswordRef}
                    />
                     </FormGroup>
                    <Button>Sign Up</Button>
                </Form>
            </div>
        </Container>
    );
};

export default SignUp;