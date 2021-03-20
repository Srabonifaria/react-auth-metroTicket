import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from './../../images/Group 33141.png'
import './Header.css'

const Header = () => {
    const history = useHistory()
const handleLogIn = () =>{
    history.push('/login');
}

    return (
        <div className="Header">
            <nav>
                
            <img src={logo} alt=""/>
                <Link to="/home">Home</Link>
                <Link to="/destination">Destination</Link> 
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                <button onClick={handleLogIn}>Login</button>
                </nav>

        </div>
    );
};

export default Header;