import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './components/pages/Home/Home';
import FoundForm from './components/pages/FoundForm/FoundForm';
import LostForm from './components/pages/LostForm/LostForm';
import Posts from './components/pages/Posts/Posts';
import Admin from './components/pages/Admin/Admin';
import Login from './components/pages/LoginForm/LoginForm';
import FoundViewPost from './components/pages/ViewPostComplete/FoundViewPost';
import LostViewPost from './components/pages/ViewPostComplete/LostViewPost';

//Dependencies for React Router Dom v5.2.1
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* Pages without Navbar and Footer */}
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/login' component={Login} />

          {/* Pages with Navbar and Footer */}
          <>
            <div className='app-wrapper'>
              <div className='app-container'>
                <Navbar />
                <Route exact path='/'>
                  <Redirect to='/home' />
                </Route>
                <Route exact path='/home' component={Home} />
                <Route exact path='/found' component={FoundForm} />
                <Route exact path='/lost' component={LostForm} />
                <Route exact path='/post' component={Posts} />
                <Route exact path='/foundviewpost' component={FoundViewPost} />
                <Route exact path='/lostviewpost' component={LostViewPost} />
              </div>
              <Footer />
            </div>
          </>
        </Switch>
      </Router>
    </>
  );
}

export default App;
