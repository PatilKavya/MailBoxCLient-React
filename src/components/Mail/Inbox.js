import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { composeActions } from "../../store/Composer";
import classes from "./Inbox.module.css";
import SingleMail from "./SingleMail";

const Inbox = () => {
  const [mails, setMails] = useState([]);
  const dispatch = useDispatch();
  const [singleMail, setSingleMail] = useState(false);
  console.log(mails);

  const userMailId = localStorage.getItem("email");
  const a = userMailId.replace("@", "");
  const userMail = a.replace(".", "");

  const fetchMails = async () => {
    try {
      const res = await axios.get(
        `https://mailbox-65454-default-rtdb.firebaseio.com/${userMail}/inbox.json`
      );
      console.log(res.data);
      dispatch(composeActions.fetchMail(res.data));
      setMails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMails();
  }, []);

  const deleteHandler = async (mail) => {
    console.log(mail);
    try {
      const res = await axios.delete(
        `https://mailbox-65454-default-rtdb.firebaseio.com/${userMail}/inbox/${mail}.json`
      );
      console.log(res);
      fetchMails();
    } catch (error) {
      console.log(error);
    }
  };

  const singleMailHandler = async (mail) => {
    setSingleMail(mail);
    localStorage.setItem("key", mail);

    const obj = {
      body: mails[mail].body,
      from: mails[mail].from,
      read: true,
      subject: mails[mail].subject,
      to: mails[mail].to,
    };
    console.log(obj);
    try {
      const res = await axios.put(
        `https://mailbox-65454-default-rtdb.firebaseio.com/${userMail}/inbox/${mail}.json`,
        obj
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={classes.inbox}>
      <h1>Received Mails</h1>
      <div>
        <ul>
          {!singleMail &&
            mails !== null &&
            Object.keys(mails).map((mail) => {
              return (
                <div key={mail.toString()}>
                  <li
                    style={{
                      listStyleType: mails[mail].read ? "none" : "disc",
                      color: mails[mail].read ? "black" : "blue",
                    }}
                  >
                    <div onClick={() => singleMailHandler(mail)}>
                      {console.log(mails[mail].read)}
                      <span>From: {mails[mail].from}</span>
                      <br />
                      <span>Subject: {mails[mail].subject}</span>
                    </div>
                    <span>
                      <Button
                        style={{ float: "right" }}
                        onClick={() => deleteHandler(mail)}
                      >
                        Delete
                      </Button>
                    </span>
                  </li>
                  <hr />
                </div>
              );
            })}
        </ul>
        {singleMail && <SingleMail mailDetails={{ mails, singleMail }} />}
      </div>
    </section>
  );
};
export default Inbox;
