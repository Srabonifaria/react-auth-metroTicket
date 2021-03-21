import React from 'react';
import image from '../../images/image6.png'
import './Destination.css'

const Destination = () => {


    // const tickets = [
    //     {
    //         from: 'Dhaka',
    //         to: 'Brahmanbaria',
    //         imgUrl: '../../images/tickets3.png',
    //         ticket: 1,
    //         ticketType: 'Single',
    //         price: 100
    //     },
    //     {
    //         from: 'Khilgoan',
    //         to: 'Dhaka',
    //         imgUrl: '../../images/tickets3.png',
    //         ticket: 2,
    //         ticketType: 'Single',
    //         price: 1500
    //     },
    //     {
    //         from: 'Brahmanbaria',
    //         to: 'Mirpur',
    //         imgUrl: '../../images/tickets3.png',
    //         ticket: 3,
    //         ticketType: 'Single',
    //         price: 9000
    //     }
    // ]


    return (
        <div className="d-flex justify-content-center">
        <div className="info">
            <form action="">
        <input type="search" placeholder="from" name="Dhaka" id=""/>
        <br/>
        <input type="search" placeholder="to" name="Brahmanbaria" id=""/>
        <br/>
        <button className="btn-primary">Search</button>
            </form>
        </div>
        <div>
        {/* {
                tickets.map(ticket => <div key={ticket.ticket} ticket={ticket}></div>)
            } */}
             <img src={image} alt=""/>

        </div>
      </div>
    );
};

export default Destination;

