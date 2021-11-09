import React from 'react';
import Checkout from '../../components/forms/Checkout';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'



function CheckOut() {
    const router = useRouter();
    const pid = (router.query);
    

    const location_id = pid ? Object.values(pid).toString() : '';

    console.log(location_id);
    
    return (
        <div className='forms'>
            <Navbar />
            <Checkout location_id = {location_id}/>
        </div>
    )
}

export default CheckOut
