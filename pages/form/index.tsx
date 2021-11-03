
import React from 'react'
import Checkin from '../../components/forms/Checkin'
import Checkout from '../../components/forms/Checkout'
import Navbar from '../../components/Navbar';

function index() {
    return (
        <div className='forms'>
            <Navbar />
            <Checkin />
            {/* <Checkout /> */}
        </div>
    )
}

export default index

{/* <form action="">
<h4>Check In </h4>
<TextField id='phone_number' label='Phone Number' variant='standard' />
</form> */}