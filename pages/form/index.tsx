import { TextField } from '@material-ui/core'
import { Formik } from 'formik'
import React from 'react'
import Checkin from '../../components/forms/Checkin'

function index() {
    return (
        <div className='forms'>
            <Checkin />
        </div>
    )
}

export default index

{/* <form action="">
<h4>Check In </h4>
<TextField id='phone_number' label='Phone Number' variant='standard' />
</form> */}