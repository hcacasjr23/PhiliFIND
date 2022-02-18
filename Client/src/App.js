import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './components/pages/Home/Home';
import FoundForm from './components/pages/FoundForm/FoundForm';
import LostForm from './components/pages/LostForm/LostForm';
import Posts from './components/pages/Posts';
import Admin from './components/pages/Admin/Admin';
import Login from './components/pages/LoginForm/LoginForm';

import WithNavFoot from './components/WithNavFoot';
import WithoutNavFoot from './components/WithoutNavFoot';

//dependencies for Routing
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        {/* Links to Pages */}
        <Routes>

          {/* Pages with Navbar and Footer */}
          <Route element={<WithNavFoot />}>
            {/* Landing page will be home component */}
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path='/home' element={<Home />} />
            <Route path='/found' element={<FoundForm />} />
            <Route path='/lost' element={<LostForm />} />
            <Route path='/post' element={<Posts />} />
          </Route>

          {/* Pages without Navbar and Footer */}
          <Route element={<WithoutNavFoot />}>
            <Route path='/admin' element={<Admin />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
