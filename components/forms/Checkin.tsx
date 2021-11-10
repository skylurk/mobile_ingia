import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/clientApp';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, where, query, onSnapshot } from 'firebase/firestore';

export default function Checkin({ location_id }) {

    // FORM INPUT 
    const [ first_name, setFirstName ] = useState('');
    const [ last_name, setLastName ] = useState('');
    const [ phone_number, setPhoneNumber ] = useState('');

    // CREATE STATE FOR TEXTFIELDS  
    const [text, setText] = useState({}); 
    // CREATE STATE FOR RADIO BUTTONS 
    const [radioButton, setRadioButton] = useState({});
    // CREATE STATE FOR CHECKBOX ITEM 
    const [checkboxItem, setCheckboxItem ] = useState({});


    // GET LOCATION ITEMS 
    const [ location_items, setLocationItems ] = useState([]);

    // GET RADIO ITEMS 
    const radio = location_items ? location_items.filter((rad => rad.type === 'radio' && rad.location === location_id)) : null;

    // GET CHECKBOX ITEMS 
    const checkboxes = location_items ? location_items.filter((loc => loc.type === 'checkbox' && loc.location === location_id)) : null;

    // GET TEXT ITEMS 
    const textfields = location_items ? location_items.filter((text => text.type === 'text' && text.location === location_id)) : null;
    textfields && textfields.map((text, index) =>{
        // let texty = text.f_id;
        // let setTexty = `set${texty}`;
    });



    // CREATE STATE FOR ALL TEXTBOX ITEMS 


    // CREATE LOCATION ITEM REFERENCE 
    const locationItemCollectionRef = query(
        collection(db, 'location_items'),
         where("location", "==", `${location_id}`));

    useEffect(() => {
        // const getLocationItems = async () => {
        //     const location_items_data = await getDocs(locationItemCollectionRef);
        //     setLocationItems(location_items_data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        // }

        const getLocationItems = async () =>{
            onSnapshot(locationItemCollectionRef, (snapshot) =>{
                setLocationItems(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
                
                // setLocationItems(location_items_data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            })
        }

        const fName = localStorage.getItem('first_name');
        const lName = localStorage.getItem('last_name');
        const pNum = localStorage.getItem('phone_number');
        setFirstName(fName);
        setLastName(lName);
        setPhoneNumber(pNum);
        

        getLocationItems();
    }, []);

    const newVisCollectionRef = collection(db, 'visitors');

    console.log(location_id);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(newVisCollectionRef, {
            first_name: first_name, 
            last_name: last_name, 
            phone_number: phone_number, 
            time_in : new Date(),
            time_out : '',
            location : location_id,
            ...text, 
            ...radioButton, 
            ...checkboxItem
        }).then(() => {
            console.log('Success');
            window.location.replace('/checkin/success');
        }).catch((err) => {
            console.log('Error', err);
            window.location.replace('/checkin/error');
            
        })
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
                value={ first_name }
                className='validate f-inpt'
                onChange={(e) => {
                    setFirstName(e.target.value);
                    localStorage.setItem(e.target.id, e.target.value);
                }}
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
                value={ last_name } 
                className='validate f-inpt'
                onChange={(e) => {
                    setLastName(e.target.value);
                    localStorage.setItem(e.target.id, e.target.value);
                }}
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
                value={ phone_number }
                required 
                className='validate f-inpt'
                onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    localStorage.setItem(e.target.id, e.target.value);
                }}
                />

                <label htmlFor="phone_number" className="active fnt-16">
                    Mobile Number
                </label>
            </div>

            { 
                location_items && location_items
                .filter((sorted_items => sorted_items.type === 'text'))
                .sort((a,b) => (a.order_by > b.order_by) ? 1 : -1)
                    .map(form_item => {
                        return (
                            <div className="input-field mb-40" key={form_item.id}>
                                <input 
                                placeholder={form_item.place_holder}
                                type="text" 
                                id={ form_item.f_id }
                                // value= {localStorage.getItem(form_item.f_id)}
                                required = {form_item.required}
                                className='validate f-inpt'

                                onChange = { (e) => {
                                    setText({...text, [e.target.id] : e.target.value});
                                    localStorage.setItem(e.target.id, e.target.value);
                                }}

                                // onChange = { e => setText({...text,
                                //     [e.target.id] : e.target.value,
                                    
                                    
                                // })}
                                // onChange = { e => setTextField(e.target.value)}
                                />
        
                                <label htmlFor="full_name" className="active fnt-16">
                                    { form_item.label }
                                </label>
                            </div>
                        )
                    })
            }

            {
                radio && radio
                .map(radio => {
                    return(
                        <div className="radio-area z-depth-1" key={radio.f_id}>
                            <h5>{radio.label}</h5>
                            <p>
                                <label htmlFor={radio.f_id + 'yes'}>
                                    <input type="radio" 
                                    name={radio.name} 
                                    id={radio.f_id + 'yes'}
                                    value='yes'
                                    onChange = { e => setRadioButton({...radioButton,
                                        [e.target.name] : e.target.value
                                    })}

                                    // onChange={e => setRadioItem('yes')}
                                    />
                                    <span>Yes</span>
                                </label>
                            </p>
                            <div className="clear-btn right" onClick={() => this.clearRadio(radio)}>
                                Clear
                            </div>
                            <p>
                                <label htmlFor={radio.f_id + 'no'}>
                                    <input 
                                    type="radio" 
                                    name={radio.name} 
                                    id={radio.f_id + 'no'}
                                    value='no'
                                    onChange = { e => setRadioButton({...radioButton,
                                        [e.target.name] : e.target.value
                                    })}
                                    // onChange={e => setRadioItem('no')}
                                    />
                                    <span>No</span>
                                </label>
                            </p>
                        </div>
                    )
                })
            }

            <div className="checkbox-area z-depth-2">
                {
                    checkboxes && checkboxes 
                    .map(checkbox => {
                        return(
                            <div className="checkbox-text" key={checkbox.f_id}>
                                <label htmlFor={ checkbox.f_id }>
                                    <input type="checkbox" 
                                    name={checkbox.name} 
                                    id={checkbox.f_id}  
                                    // checked =  {this.state[checkbox.f_id] ? this.state[checkbox.f_id]  : checkbox.value}

                                    onChange = { e => setCheckboxItem({...checkboxItem,
                                        [e.target.id] : e.target.checked
                                    })}

                                    // onChange = { e => setCheckboxItem('checked')}
                                    className='filled-in' />
                                    <span>{checkbox.label}</span>
                                </label>
                            </div>
                        )
                    })
                }
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
