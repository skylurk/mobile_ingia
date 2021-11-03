import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/clientApp';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export default function Checkin() {
    const [ first_name, setFirstName ] = useState('');
    const [ last_name, setLastName ] = useState('');
    const [ phone_number, setPhoneNumber ] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(newVisCollectionRef, {first_name: first_name, last_name: last_name, phone_number: phone_number})

    }

    const [visitors, setvisitors] = useState([]);


    const visitorCollectionRef = collection(db, 'visitors');
    const newVisCollectionRef = collection(db, 'newVis');

    useEffect(() =>{
        const getVisitors = async () => {
            const visitors = await getDocs(visitorCollectionRef);
            setvisitors(visitors.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getVisitors();
    }, [])

    console.log(visitors);

    const docInstance = doc(db, 'collection', 'document id not as string ')

    const docUpdate = async (id, parameters) =>{
        const newF = {one: 'more'}
        await updateDoc(docInstance, newF )
    }

    const docDelete = async (id) =>{
        await deleteDoc(docInstance)
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
