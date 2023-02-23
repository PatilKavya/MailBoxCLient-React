
import SignUp from './SignUp';

const Authentication = (props) => {

    const signUpHandler = async(email, confirmPassword) => {
     
     try   {  const res=await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_ysGW83ZQUf_X8CJqwT4LCBEScMULekU',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: confirmPassword,
                        returnSecureToken: true
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
                if(res.ok){
                    return res.json();
                } else{
                   const data=await res.json()
                       console.log(data.error.message)
                    }
                } catch(error) {
                alert(error);
            }
    }


    return (
        <section >
            <SignUp onSignUp={signUpHandler}/>
        </section>
    );
};

export default Authentication;