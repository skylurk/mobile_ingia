import React, { useEffect, useState } from 'react';
import  Link  from 'next/link'; 

import firebase, { db } from '../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc, where, query } from 'firebase/firestore';
import LoadingPage from './loader/LoadingPage';

import * as geolib from 'geolib';



function InorOut({ page_id }) {

    // const [ location, setLocation ] = useState('');

    // GET LOCATION DATA 
    const [ locationData, setLocationData ] = useState({});

    // STATE FOR CENTER LOCATION 
    const [ cLat, setCLat ] = useState();
    const [ cLng, setCLng ] = useState();

    // STATE FOR CURRENT LOCATION 
    const [ lat, setLat ] = useState(null);
    const [ lng, setLng ] = useState(null);
    const [ status, setStatus ] = useState(null);


    // GET RADIUS 
    const [ radius, setRadius ] = useState(null);

    const location = locationData[0];

    // CREATE LOCATION ITEM REFERENCE 
    const locationCollectionRef = query(collection(db, 'locations'), where("location_qr", "==", `${page_id}`));


    useEffect(() => {
        const getLocation = async () => {
            const location = await getDocs(locationCollectionRef);
            setLocationData(location.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getLocation();

        const location = locationData[0];
        setCLat(location?.latitude);
        setCLng(location?.longitude);
        console.log('clat', cLat);
        console.log('clng', cLng);
        console.log('lat', lat);
        console.log('lng', lng);
        
        

        if (location) {
            const geoLocation = () => {
                if (!navigator.geolocation){
                    setStatus('Geolocation is not supported by your browser');
                }else{
                    setStatus('Locating...');
                    navigator.geolocation.getCurrentPosition((position) => {
                        setStatus(null);
                        setLat(position.coords.latitude);
                        setLng(position.coords.longitude);
                    }, () => {
                        setStatus('Unable to retrieve your location');
                    })
                }
            }

            geoLocation();

            const getRadius = () => {
                if (lat && lng && cLng && cLat){
                    const geoFence = geolib.isPointWithinRadius(
                        { latitude: lat, longitude: lng},
                        { latitude: cLat, longitude: cLng}, 200
                    );
                    console.log('e', geoFence);
                    setRadius(geoFence);
                }else{
                    console.log('Wait');
                }
            }
            getRadius();
           
            }

    }, [location?.longitude, cLat, lat, lng])

    // const location = locationData[0];
    console.log('rad',radius);
    
    
    if (location === undefined){
        return (
            <div className="error-scanning">
                <LoadingPage />
                {/* <div className="error-scanning-text z-depth-2">
                    <h3>Error Scanning Code</h3>
                    <h4>There was an error identifying the location you are signing into or out of. Please try again. </h4>
                </div> */}
            </div>
        )
    }else {
        if(radius){
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
        } else if(radius === false){
            return (
                <div className="loading">
                    <div className="geofence-err z-depth-2">
                        <h4>Location Error</h4>
                        <h5>
                            You have to be withing 200 meters of the location you are trying to check in/out of 
                        </h5>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='loading'> 
                    <LoadingPage />
                </div>
            )
        }
    }

}

export default InorOut
