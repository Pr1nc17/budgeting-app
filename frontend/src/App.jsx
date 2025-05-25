import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/LoginForm'; 
import Dashboard from './components/Dashboard';


function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false); //set true to see dashboard , otherwise login form

  return (//
    isLoggedIn ? <div><Dashboard/></div> : <div><LoginForm /></div>
)}

export default App
