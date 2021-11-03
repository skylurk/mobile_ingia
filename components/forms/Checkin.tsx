import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/clientApp';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, where, query } from 'firebase/firestore';

export default function Checkin() {

    // FORM INPUT 
    const [ first_name, setFirstName ] = useState('');
    const [ last_name, setLastName ] = useState('');
    const [ phone_number, setPhoneNumber ] = useState('');

    // GET LOCATION ITEMS 
    const [ location_items, setLocationItems ] = useState([]);

    // CREATE LOCATION ITEM REFERENCE 
    const locationItemCollectionRef = query(collection(db, 'location_items'), where("location", "==", "Dp0mDIwrilZXYHPwdROT"));

    useEffect(() => {
        const getLocationItems = async () => {
            const location_items_data = await getDocs(locationItemCollectionRef);
            setLocationItems(location_items_data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getLocationItems();
    }, [])
    
    
    console.log(location_items);
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(first_name);
    }

    return (
        <div className='check-in'>
        <form action="" className="checkin-form" onSubmit={handleSubmit}>
            <h3>Checking In </h3> 

            <div className="input-field mb-40">
                <input 
                placeholder='First Name...'
                type="text" 
                id='first_name'
                required 
                className='validate f-inpt'
                onChange={e => setFirstName(e.target.value)}
                />

                <label htmlFor="first_name" className="active fnt-16">
                    First Name
                </label>
            </div>

            <div className="input-field mb-40">
                <input 
                placeholder='Last Name...'
                type="text" 
                id='last_name'
                required 
                className='validate f-inpt'
                onChange={e => setLastName(e.target.value)}
                />

                <label htmlFor="last_name" className="active fnt-16">
                    Last Name
                </label>
            </div>

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

                <label htmlFor="phone_number" className="active fnt-16">
                    Mobile Number
                </label>
            </div>


            
            <div className="input-field center" >
                    <button className="filled_btn form-btn z-depth-1" id='mobile-btn-width-full'>
                        Check In
                    </button>
                </div>
        </form>
    </div>
    )
}

// class  Checkin extends  Component{
//     state = {
//         first_name : '',
//         last_name : '', 
//         phone_number : ''
//     }
    
//     handleSubmit = (e) => {
//         e.preventDefault() ;
//         console.log(this.state);
//     }

//     handleChange = (e) => {
//         this.setState({
//             [e.target.id] : e.target.value
//         })
//     }
    
//     render() {
//         console.log(this.state)
//         return (

//             )
//     }  
 
// }

// export default Checkin
