import React from 'react';
import Navbar from '../../components/Navbar';

export default function success() {
    return (
        <>
        <Navbar />
        <div className='success-page'>
            <h4>Success</h4>
            <i className="material-icons">check_circle</i>
            <h3>You have successfully checked out of</h3>
            <h5>Center Name</h5>
        </div>
        </>
    )
}
