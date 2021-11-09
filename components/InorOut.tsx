import React, { useEffect, useState } from 'react';
import  Link  from 'next/link'; 

import firebase, { db } from '../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc, where, query } from 'firebase/firestore';


function InorOut({ page_id }) {

    // const [ location, setLocation ] = useState('');

    // GET LOCATION DATA 
    const [ locationData, setLocationData ] = useState({});

    // CREATE LOCATION ITEM REFERENCE 
    const locationCollectionRef = query(collection(db, 'locations'), where("location_qr", "==", `${page_id}`));


    useEffect(() => {
        const getLocation = async () => {
            const location = await getDocs(locationCollectionRef);
            setLocationData(location.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getLocation();
    }, [])

    const location = locationData[0];

    console.log(locationData);
    
    if (location === undefined){
        return (
            <div className="error-scanning">
                <div className="error-scanning-text z-depth-2">
                    <h3>Error Scanning Code</h3>
                    <h4>There was an error identifying the location you are signing into or out of. Please try again. </h4>
                </div>
            </div>
        )
    }else {
        
        return (
            <div className='in-or-out'>
                <h3> { location.location_name } </h3>
                <Link href={ {
                    pathname: '/checkin/' + location.id,
                    // query: {
                    //     typo : 'in'
                    // }
                } }>
                    <a>
                        <button className="filled_btn">
                            Check In
                        </button>
                    </a>
                </Link>
                <h4>OR</h4>
    
                <Link href={'/checkout/' + location.id }>
                    <a>
                    <button className="outline_btn">
                        Check Out
                    </button>
                    </a>
                </Link>
            </div>
        )

    }

}

export default InorOut
