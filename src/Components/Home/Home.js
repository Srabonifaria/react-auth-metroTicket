import React from 'react';
import { useHistory } from 'react-router';
import './Home.css'

const Home = () => {
    const history = useHistory()
    const handleSingIn = () => {
        history.push('/login')
    }

    return (
        <div className="home py-5" >
            <div className="cart-1 mx-3 cart">
            <h3>ONE TIME TICKET</h3>
             <button onClick={handleSingIn} className="btn-warning btn my-3">BUY NOW</button>
             <h1>$100</h1> 
             </div>
             <div className="cart-2 mx-3 cart">
            <h3>ONE DAY PASS</h3>
             <button onClick={handleSingIn} className="btn-warning btn my-3">BUY NOW</button>
             <h1>$500</h1>
                </div>
             <div className="cart-3 mx-3 cart">
            <h3>MONTHLY PASS</h3>
             <button onClick={handleSingIn} className="btn-warning btn my-3">BUY NOW</button>
             <h1>$1500</h1>
                </div>
             <div className="cart-4 mx-3 cart">
            <h3>ANNUAL PASS</h3>
             <button onClick={handleSingIn} className="btn-warning btn my-3">BUY NOW</button>
             <h1>$9000</h1>      
        </div> 
        </div>
    );
};

export default Home;