import React, { useState } from 'react';

export default function Checkout() {


    const [ phone_number, setPhoneNumber ] = useState('');
    const [ location, setLocation ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(phone_number);
        console.log(location);
    }
    return (
        <div className='check-out'>
        <form action="" className="checkout-form" onSubmit={handleSubmit}>
            <h3>Checking Out </h3> 
            <div className="input-field mb-40">
                <input 
                placeholder='Mobile...'
                type="tel" 
                minLength={ 8 }
                id='phone_number'
                // value={ localStorage.getItem('phone_number') }
                required 
                className='validate f-inpt'
                onChange={e => setPhoneNumber(e.target.value)}
                />

                <div className="input-field center" >
                    <button className="outline_btn form-btn z-depth-1" id='mobile-btn-width-full'>
                        Check Out
                    </button>
                </div>
                <label htmlFor="phone_number" className="active fnt-16">
                    Mobile Number
                </label>
            </div>


        </form>
    </div>
    )
}

// class Checkout extends Component {
//     state = {
//         phone_number : '',
//         location : ''
//     }
    
//     handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(this.state)
//     }

//     handleChange = (e) => {
//         this.setState({
//             [e.target.id] : e.target.value
//         })
//     }

//     render() {
//         return (

//         )
//     }
// }

// export default Checkout

