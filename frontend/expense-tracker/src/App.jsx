import React from 'react'

import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/UserContext'

// import Root from './pages/Root'

const Root = () => {
  const isAuthenticated=!!localStorage.getItem("token");
  return isAuthenticated ? (<Navigate to="/dashboard"/> ):
   (<Navigate to="/login"/>);
};

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/SignUp" element={<SignUp />}/>
          <Route path="/dashboard" element={<Home />}/>
          <Route path="/income" element={<Income />}/>
          <Route path="/expense" element={<Expense />}/>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </div>
    </UserProvider>
  );
  // return <div>Test Render</div>

}

export default App

