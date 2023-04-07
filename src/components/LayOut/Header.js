import React,{useEffect,useState} from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink, useHistory } from 'react-router-dom';
import { authActions } from '../../store/Auth';
import classes from "./Header.module.css";
import axios from 'axios';
import { composeActions } from '../../store/Composer';

const Header = () => {
  const isLogin = useSelector(state => state.auth.isLogin);
  const inboxMails = useSelector(state => state.compose.fetchMail);
  const dispatch = useDispatch();
  const history = useHistory();
  const [unreadCount, setUnreadCount] = useState(0);

  
  useEffect(() => {
    const userMailId = localStorage.getItem('email');
    const a = userMailId.replace('@','');
    const userMail=a.replace('.','');
    const fetchMails = async () => {
       
      try {
          const res = await axios.get(
          `https://mailbox-65454-default-rtdb.firebaseio.com/${userMail}/inbox.json`
          );
        const  mails=res.data;
        if (mails) {
          let count = 0;
          Object.keys(mails).map((mail) => {
                if (mails[mail].read === false) {
                  count = count + 1;
                  console.log(count);
                }
                setUnreadCount(count);
            
          })
        }
          // dispatch(composeActions.fetchMail(res.data))
          // setMails(res.data);
      } catch (error) {
          console.log(error);  
         }}
    fetchMails();
  }, []);


    const logOutHandler = () => {
       localStorage.removeItem('idToken');
            localStorage.removeItem('email');
      dispatch(authActions.logout());
      history.replace('/logIn');
    };


  return (
    <header>
      <h4>Mail Box</h4>
      <nav>
        <ul>
          {/* <li>
              <NavLink 
                to="/"  
                activeClassName={classes.active} exact >
                Home
              </NavLink>
          </li> */}
          {!isLogin && (
            <li>
                <NavLink to="/logIn"  
                activeClassName={classes.active} >
                Login
                </NavLink>
            </li>
          )}
          {isLogin && (
            <li>
                <NavLink to='/compose'
                    activeClassName={classes.active}>
                    Compose
                </NavLink>
            </li>
            )}
            {isLogin && (
              <li>
                  <NavLink to="/inbox"  
                  activeClassName={classes.active} >
                  Inbox
                  {unreadCount === 0 ? (
                    <></>
                  ) : (
                    <span>({unreadCount}) Unread</span>
                  )}
                  </NavLink>
              </li>
            )}   
            {isLogin && (
              <li>
                  <NavLink to="/sent"  
                    activeClassName={classes.active} >
                    Sent Mails
                  </NavLink>
              </li>)}<br/>
            {isLogin && (
              <Button variant='secondary'
                  onClick={logOutHandler}>
                  LogOut
              </Button>
            )}      
        </ul>
      </nav>
    </header>
  )
};
export default Header