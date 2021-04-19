import React, { useState, useContext } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./assets/css/general.css"
import Navbar from './components/Navbar'
import Profile from './components/profile'
import Sidebar from './components/Sidebar'
import { faBars, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { MyContext } from './MyContext'

import Login from "./components/login.component";
function App() {
  const {user,setUser}= useContext(MyContext)
  const [visible, setVisible] = useState(false)
  const open = () => setVisible(!visible)
  console.log(user)
  return (

    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Sidebar close={open} visible={visible}>
              <Navbar closeTester={visible} button={<FontAwesomeIcon className="open-button" onClick={() => open()} icon={faBars} />} />
              <div className="main-container">
              </div>
            </Sidebar>
          </Route>
          <Route exact path='/profile' >
            <Sidebar close={open} visible={visible}>
              <Navbar closeTester={visible} button={<FontAwesomeIcon className="open-button" onClick={() => open()} icon={faBars} />} />
              <div className="main-container">
              </div>
            </Sidebar>
            <Profile />
          </Route>

        </Switch>
      </Router>
    </div>

  );
}
export default App;