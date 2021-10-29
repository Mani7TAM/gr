import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux**
import { Provider } from 'react-redux';
import store from './store/index';
import App from "./components/app";

// Import custom Components 

import Ecommerce from './components/dashboard/ecommerce';
import Masters from './components/dashboard/Masters';
import Collections from './components/dashboard/Masters/Collections';
import Login from './components/Login';
import test from './components/dashboard/test'

// sample page
import SupportTicket from './components/support-ticket/supportTicket';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

//firebase Auth
function Root() {
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            return;
        }
    
        // axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
        //     setUserSession(response.data.token, response.data.user);
        //     setAuthLoading(false);
        // }).catch(error => {
        //     removeUserSession();
        //     setAuthLoading(false);
        // });
        if (authLoading && getToken()) {
            return <div className="content">Checking Authentication...</div>
        }

        const layout = localStorage.getItem('layout_version')
        const color = localStorage.getItem('color')
        document.body.classList.add(layout);
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${color}.css`);
    }, []);
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter basename={'/'}>
                        <Switch>
                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Ecommerce} />
                        <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                                <App>
                                    {/* dashboard menu */}
                                    <PrivateRoute path={`${process.env.PUBLIC_URL}/dashboard`} component={Ecommerce} />
                                    <Route path={`${process.env.PUBLIC_URL}/masters`} component={Masters} />
                                    <Route path={`${process.env.PUBLIC_URL}/collections`} component={Collections} />
                                    <Route path={`${process.env.PUBLIC_URL}/test`} component={test} />
                                    <PublicRoute path={`${process.env.PUBLIC_URL}/login`} component={Login} />

                                    {/* Pricing */}
                                    <Route path={`${process.env.PUBLIC_URL}/support-ticket/supportTicket`} component={SupportTicket} />

                                </App>
                            
                        </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();