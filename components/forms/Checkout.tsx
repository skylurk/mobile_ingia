import React, { useEffect, useState } from 'react';

import firebase from '../../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/clientApp';
import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc, where, query } from 'firebase/firestore';
import { useRouter } from 'next/dist/client/router';

export default function Checkout({ location_id }) {

    const router = useRouter();
    const pid = (router.query)
     const page_id = pid ? Object.values(pid) : '';
    const page_id_string = page_id.toString();

    


    //PHONE NUMBER AND LOCATION 
    const [ phone_number, setPhoneNumber ] = useState('');
    const [ location, setLocation ] = useState(page_id_string);

    // STATE FOR VISITORS 
    const [ visitors, setVisitors ] = useState([]);

    // STATE FOR LOCATION QR 
    const [ locationQR, setLocationQR] = useState('')

    // CREATE LOCATION ITEM REFERENCE 
    // const locationItemCollectionRef = query(collection(db, 'location_items'), where("location", "==", `${location_id}`));

    // COLLECTION REFERENCE TO VISITOR COLLECTION 
    const newVisCollectionRef = query(
        collection(db, 'newVis'), 
        where('location', '==', `${page_id_string}`)
    );

    // COLLECTION REFERENCE FOR LOCATIONS 
    const locationRef = collection(db, 'locations');
    const locationDoc = doc(locationRef, page_id_string);
    // collection(db, 'newVis');

    // GET VISITOR DATA 
    useEffect(() => {
        const getVisitorData = async () => {
            const visitor_data = await getDocs(newVisCollectionRef);
            setVisitors(visitor_data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        }


        getVisitorData();


        const getLocationQR = async () => {
            const locationQR = await getDoc(locationDoc);
            setLocationQR(locationQR.data().location_qr)            
        }

        getLocationQR();
    }, []);

    



    const handleSubmit = async (e) => {
        e.preventDefault();
        const newVisCollectionRef = collection(db, 'newVis');
        
        
        const visitor = visitors && visitors.find(checkin => 
            checkin.phone_number === phone_number 
            && checkin.time_out === '' 
            && checkin.location === location)
        
        if (visitor){
            const docRef = doc(newVisCollectionRef, visitor.id);

            await updateDoc(docRef, {
                time_out : new Date()
            }).then(() =>{
                console.log('Success');
                window.location.replace('/checkout/success')
            }).catch((err) =>{
                console.log('err', err);
                window.location.replace('/checkout/error')
            })
        }else{
            alert('error')
            window.location.replace(`/${locationQR}`)
        }
        




        // UPDTAE DOC SHOULD TAKE DOCUMENT REFERENCE AND PAYLOAD 
        
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

