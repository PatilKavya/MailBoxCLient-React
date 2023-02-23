import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {  Container,Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from 'axios'


const TextEditing = () => {
  const emailRef = useRef();
  const subjectRef = useRef();
  let enteredtext ;

const onEditorStateChange=(event)=>{  
    enteredtext=event.getCurrentContent().getPlainText();
}

  const FormsubmitHandler = async (event) => {
    event.preventDefault();
    event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredSubject = subjectRef.current.value;
        const userMailId = localStorage.getItem('email');
        const userMail = userMailId.split('.').join('');
        const toEmailId = enteredEmail.split('.').join('');

        const mailDataObj = {
            from: userMail,
            to: enteredEmail,
            subject: enteredSubject,
            body: enteredtext,
            read: false
        }

        try {
            const res = await axios.post(
                `https://mailbox-b3c7c-default-rtdb.firebaseio.com/${toEmailId}Inbox.json`,
                mailDataObj
            );
            alert('Sent successfully');
            console.log(res);

            const sentRes = await axios.post(
                `https://mailbox-b3c7c-default-rtdb.firebaseio.com/${userMail}SentMail.json`,
                mailDataObj
            );
            console.log(sentRes);
        } catch (error) {
            console.log(error);
        }
  };

  return (
    <React.Fragment>
      <Container>
            <Form className="pt-4" onSubmit={FormsubmitHandler}>
                    <Form.Control
                      size="sm"
                      type="email"
                      placeholder="To"
                      ref={emailRef}
                    ></Form.Control>
                    <Form.Control
                      type="text"
                      placeholder="subject"
                      ref={subjectRef}
                    ></Form.Control>   
                  <Editor
                  toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                  />
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
            </Form>
      </Container>
    </React.Fragment>
  );
};
export default TextEditing;