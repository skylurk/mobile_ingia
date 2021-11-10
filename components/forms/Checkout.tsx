import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { db } from '../../firebase/clientApp';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, where, query, onSnapshot, getDoc } from 'firebase/firestore';
import LoadingPage from '../loader/LoadingPage';



export default function Checkout() {

    // GET LOCATION ID FROM PAGE ROUTE 
    const router = useRouter();

    //PHONE NUMBER AND LOCATION 
    const [ phone_number, setPhoneNumber ] = useState('');
    const [ location, setLocation ] = useState("");

    // STATE FOR VISITORS 
    const [ visitors, setVisitors ] = useState([]);

    // STATE FOR LOCATION QR 
    const [ locationQR, setLocationQR] = useState('');


    

    useEffect(() => {
        // GET ROUTE AND SET IT TO LOCATION 
        if( router && router.query.index){
            setLocation(`${router.query.index}`);

            // COLLECTION REFERENCE TO VISITOR COLLECTION 
            const newVisCollectionRef = query(
                collection(db, 'visitors'), 
                where('location', '==', `${router.query.index}`)
            );

            // COLLECTION REFERENCE FOR LOCATIONS 
            const locationRef = collection(db, 'locations');
            const locationDoc = doc(locationRef, `${router.query.index}`);

            // GET VISITOR DATA 
            const getVisitorData = async () => {
                const visitor_data = await getDocs(newVisCollectionRef);
                setVisitors(visitor_data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
            }
            getVisitorData();

            // GET LOCATION QR 
            const getLocationQR = async () => {
                const locationQR = await getDoc(locationDoc);
                setLocationQR(locationQR.data().location_qr)            
            }
            getLocationQR();
            
        }


    }, [router])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newVisCollectionRef = collection(db, 'visitors');

        const visitor = visitors && visitors.find(checkin => 
            checkin.phone_number === phone_number 
            && checkin.time_out === '' 
            && checkin.location === location)

        if(visitor){
            const docRef = doc(newVisCollectionRef, visitor.id);
            await updateDoc(docRef, {
                time_out : new Date()
            }).then(() =>{
                console.log('Success');
                window.location.replace('/checkout/success')
            }).catch((err) =>{
                console.log('err', err);
                window.location.replace('/checkout/error');
            })
        } else {
            window.location.replace('/checkout/error');
        }        
    }

    if(location){
        return (
            <div className='check-out'>
                <form action="" className="checkout-form" onSubmit={handleSubmit}>
                    <h3>Check Out</h3>
                    <div className="input-field mb-40">
                        <input
                            placeholder='Mobile...'
                            type='tel'
                            minLength={ 8 }
                            id='phone_number'
                            required
                            className='validate f-input'
                            onChange={e => setPhoneNumber(e.target.value)}
                            />
                        <label htmlFor="phone_number" className="active fnt-16">
                            Mobile Number
                        </label>
                    </div>
                    <div className="input-field center" >
                        <button className="outline_btn form-btn z-depth-1" id='mobile-btn-width-full'>
                            Check Out
                        </button>
                    </div>
                </form>
            </div>
        )
    }else{
        return(
            <div className="loading">
                <LoadingPage />
            </div>
        )
    }

}
