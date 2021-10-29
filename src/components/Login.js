import React , { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import { withRouter } from 'react-router';
import * as apiURLS from '../ApiUrls';

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
}

const Logins = ({history}) => {
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // const loginAuth = () => {
    //     history.push(`${process.env.PUBLIC_URL}/dashboard`);
    // }
    
    
// handle button click of login form
const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post(apiURLS.LOGIN,{},
        {
            auth: { username: username.value, password: password.value },
            headers: {
              'Authorization': `Basic Auth` 
            }
        }
    ).then(response => {
        setLoading(false);
        if(response.data.message === "Success"){
            setUserSession(response.data.data[0].bearerToken, response.data.data[0]);
            history.push('/dashboard');
        }
        else{
            console.log('response',response);
            if (response.data.message) setError(response.data.message);
            else setError("Something went wrong. Please try again later.");
        }
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }
        return (
            <div>
                <div>
            <div className="page-wrapper">
                <div className="container-fluid p-0">
                    {/* <!-- login page start--> */}
                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="auth-innerright">
                                    <div className="authentication-box">
                                        <div className="card mt-4">
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h4>LOGIN</h4>
                                                    <h6>{"Enter your Username and Password"} </h6>
                                                </div>
                                                {/* <form className="theme-form"> */}
                                                    <div className="form-group">
                                                        <label className="col-form-label pt-0">Your Name</label>
                                                        <input {...username} className="form-control" type="text" required="" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Password</label>
                                                        <input {...password} className="form-control" type="password" required="" />
                                                    </div>
                                                    <div className="checkbox p-0">
                                                        <input id="checkbox1" type="checkbox" />
                                                        <label htmlFor="checkbox1">Remember Me</label>
                                                    </div>
                                                    {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                                                    <div className="form-group form-row mt-3 mb-0">
                                                        <button className="btn btn-primary btn-block" type="button" 
                                                        value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}

                                                        // onClick={() => loginAuth()} 
                                                        >Login</button>
                                                    </div>
                                                    
                                                {/* </form> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- login page end--> */}
                </div>
            </div>
        </div>
            </div>
    
        );
    }; 
    


export default withRouter(Logins);