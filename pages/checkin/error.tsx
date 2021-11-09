import React from 'react';
import Navbar from '../../components/Navbar'

export default function error() {
    return (
        <>
        <Navbar />
        <div className='success-page'>
            <h4>Error</h4>
            <i className="material-icons">cancel</i>
            <h3>Unable to check out of</h3>
            <h5>Center Name</h5>
        </div>
        </>
    )
}
