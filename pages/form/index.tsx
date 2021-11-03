
import React from 'react'
import Checkin from '../../components/forms/Checkin';
import Checkout from '../../components/forms/Checkout';
import Navbar from '../../components/Navbar';
import LoadingPage from '../../components/loader/LoadingPage';

function index() {

    const getData = (data, data2) => {
        console.log(data);
        console.log(data2);
    }
    return (
        <div className='forms'>
            <Navbar />
            <Checkin />
            <Checkout />
            {/* <LoadingPage func={getData} secfunc={getData}/> */}
        </div>
    )
}

export default index

{/* <form action="">
<h4>Check In </h4>
<TextField id='phone_number' label='Phone Number' variant='standard' />
</form> */}