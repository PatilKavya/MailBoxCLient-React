import axios from "axios";
import { useEffect, useState } from "react";
import SingleMail from './SingleMail';
import classes from './Inbox.module.css';
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { composeActions } from "../../store/Composer";
import { Button } from "react-bootstrap";



const Sent = () => {
    const dispatch=useDispatch()
    const userMailId = localStorage.getItem('email');
    const [singleMail, setSingleMail] = useState(false);
    const [mails, setSentMails] = useState([]);

    const a = userMailId.replace('@','');
    const userMail=a.replace('.','');
    console.log(userMail);

    const fetchSentMails = async () => {
    
        try {
            const res = await axios.get(
            `https://mailbox-b3c7c-default-rtdb.firebaseio.com/${userMail}/sentMail.json`
            );
            console.log(res.data);
            const data = res.data;
            setSentMails(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSentMails();
        // eslint-disable-next-line
    }, []);

    const singleMailHandler = (mail) => {
        setSingleMail(mail);
        localStorage.setItem('key',mail)
        dispatch(composeActions.ReadMail(mail));
    }
   
    const deleteHandler = async(mail) => {
        console.log(mail);
        try {
            const res = await axios.delete(
            `https://mailbox-b3c7c-default-rtdb.firebaseio.com/${userMail}/sentMail/${mail}.json`)
            console.log(res);
            fetchSentMails();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className={classes.inbox}>
            <h1>Sent</h1>
            <div>
                <ul>
                    {!singleMail && mails!== null &&
                        Object.keys(mails).map((mail) => {
                            return (
                                <div key={mail.toString()}>
                                    <div
                                        onClick={() =>singleMailHandler(mail) }>
                                        <li>
                                            <span>To: {mails[mail].to}</span><br />
                                            <span>Subject: {mails[mail].subject}</span>
                                        </li> 
                                    </div> 
                                    <Button 
                                        onClick={() => deleteHandler(mail)}>
                                        Delete
                                    </Button> 
                                    {/* <hr /> */}
                                </div>
                            )
                        })
                    }
                    {singleMail && (  
                        <SingleMail mailDetails={{mails,singleMail}} />
                        )}
                    {mails === null && <p>No mails found</p>}
                </ul>
            </div>
        </section>
    )
};

export default Sent;