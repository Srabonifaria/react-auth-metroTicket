import React from 'react';
import image from '../../images/image6.png'

const Destination = () => {
    return (
        <div className="d-flex justify-content-center">
        <div>
            <form action="">
        <input type="search" placeholder="from" name="Dhaka" id=""/>
        <br/>
        <input type="search" placeholder="to" name="Brahmanbaria" id=""/>
        <br/>
        <button className="btn-primary">Search</button>
            </form>
        </div>
        <div>
            <img src={image} alt=""/>
        </div>
      </div>
    );
};

export default Destination;

