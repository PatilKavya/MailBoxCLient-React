import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { composeActions } from "../../store/Composer";
import classes from "./SingleMail.module.css";

const SingleMail = (props) => {
  const mails = props.mailDetails.mails;
  console.log(mails);

  const userMailId = localStorage.getItem("email");
  const singleMailKey = localStorage.getItem("key");
  console.log(singleMailKey);
  const a = userMailId.replace("@", "");
  const userMail = a.replace(".", "");

  // useEffect(() => {

  //     const readMail = async () => {
  //         try {
  //             const res = await axios.put(
  //             `https://mailbox-b3c7c-default-rtdb.firebaseio.com/${userMail}/sentMail/${singleMailKey}.json`,
  //             mails[singleMailKey]
  //             )
  //             console.log(res);
  //             console.log(mails[singleMailKey]);
  //         } catch (err) {
  //             console.log(err);
  //         }
  //     }
  //     readMail();
  // }, [userMailId, mails, singleMailKey]);

  return (
    <section className={classes["single-mail"]}>
      <span>
        From:
        <span style={{ fontWeight: "500" }}> {mails[singleMailKey].from}</span>
      </span>
      <br />
      <span>Subject: {mails[singleMailKey].subject}</span>
      <br />
      <p>{mails[singleMailKey].body}</p>
    </section>
  );
};

export default SingleMail;
