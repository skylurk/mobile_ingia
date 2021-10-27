import React, { Component } from 'react';

class  Checkin extends  Component{
    state = {
        first_name : '',
        last_name : '', 
        phone_number : ''
    }
    
    handleSubmit = () => {

    }

    handleChange = () => {

    }
    render() {
        console.log(this.state)
        return (
            <div className='check-in'>
                <form action="" className="checkin-form">
                    <h3>Checking In </h3> 
                    <div className="input-field">
                        <input placeholder='First Name' type="text" id="first_name" className="validate" />
                        <label htmlFor="first_name">First Name</label>
                    </div>

                    <div className="input-field col s6">
                        <input id="last_name" type="text" className="validate" />
                        <label htmlFor="last_name">Last Name</label>
                    </div>
                    
    
                </form>
            </div>
            )
    }  
 
}

export default Checkin
