// import React, { useEffect, useState } from 'react';
// import './SidebarAddEvent.css';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export const SidebarAddEvent = () => {
//     const [imagePreview, setImagePreview] = useState(null);
//     const today = new Date().toISOString().split('T')[0];
//     const nav = useNavigate();

//     const [eventData, setEventData] = useState({
//         eventName: '',
//         eventDesc: '',
//         noOfSeat: '',
//         noOfRemainingSeat: '',
//         noOfFildSeat: '',
//         eventDate: today,
//         eventRule: '',
//         lengthOfTeam: '',
//         eventImg: '',
//         hasTeam:false
//     });

//     let id = localStorage.getItem('EventId');

//     function deleteEvent(){
//         axios.delete(`https://studentapironak.onrender.com/${id}`)
//         .then(res =>{
//             console.log('event deleted')
//         })
//         .catch(error =>{
//             console.error(error);
//         })
//     }

//     useEffect(() => {
//         if(localStorage.getItem('EventId')!== null){
//             console.log("id found")
//             const fetchData = async () => {
//                 let a =localStorage.getItem('EventId')
//                 try {
//                     const response = await fetch(`https://studentapironak.onrender.com/${a}`);
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch event data');
//                     }
//                     const event = await response.json();

//                     setEventData(event);
//                     setImagePreview(event.eventImg)
//                 } catch (error) {
//                     console.error('Error fetching event data:', error);
//                 }
//             };
//             fetchData()
//         }
//     }, []);




//     const Submit = (e) => {
//         e.preventDefault();

//         if (eventData.eventName === '' || eventData.eventDesc === '' || eventData.noOfSeat === '' || eventData.eventRule === '' || eventData.lengthOfTeam === '') {
//             Swal.fire({ title: 'please Enter Valid data' });
//             return;
//         } else {
//             let f=0;
//             if(localStorage.getItem('EventId')!== null){
//                 f=1;
//                 console.log("delete");
//                 deleteEvent();
//                 let b = localStorage.getItem('EventId');
//                 localStorage.removeItem('EventId')               
//             }
//             localStorage.setItem('index',1);
//             eventData.noOfRemainingSeat = eventData.noOfSeat - eventData.noOfFildSeat;
//             axios.post(`https://studentapironak.onrender.com/`, eventData)
//             .then(response => {
//                 if(f==0){
//                     Swal.fire({template:'succeful',title:'New Event Created'})
//                     .then(()=>window.location.reload(false))
//                 }else{
//                     Swal.fire({template:'succeful',title:'Event Edited'})
//                     .then(()=>window.location.reload(false))
//                 }
//             })
//             .catch(error => {
//                 alert('Error signing up');
//             });

//             console.log(eventData);
//             setEventData({
//                 eventName: '',
//                 eventDesc: '',
//                 noOfSeat: '',
//                 eventDate: today,
//                 eventRule: '',
//                 lengthOfTeam: '',
//                 eventImg: ''
//             });
//             setImagePreview(null);
//         }


//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEventData({
//             ...eventData,
//             [name]: value
//         });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 const base64String = reader.result;
//                 setImagePreview(base64String);
//                 setEventData({
//                     ...eventData,
//                     eventImg: base64String
//                 });
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleDrop = (e) => {
//         e.preventDefault();
//         const file = e.dataTransfer.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 const base64String = reader.result;
//                 setImagePreview(base64String); 
//                 setEventData({
//                     ...eventData,
//                     eventImg: base64String 
//                 });
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleDragOver = (e) => {
//         e.preventDefault();
//     };

//     return (
//         <div className='a'>
//             <div className="row justify-content-center">
//                 <div className="col-lg-1000000">
//                     <div className="card">
//                         <div className="card-header bg-primary text-white">
//                             <h4>Event Registration Form</h4>
//                         </div>
//                         <div className="card-body">
//                             <form onSubmit={Submit}>
//                                 <div className="form-group">
//                                     <label htmlFor="eventName">Event Name:</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="eventName"
//                                         name="eventName"
//                                         placeholder="Enter event name"
//                                         value={eventData.eventName}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="eventDesc">Event Description:</label>
//                                     <textarea
//                                         className="form-control"
//                                         id="eventDesc"
//                                         name="eventDesc"
//                                         rows="3"
//                                         placeholder="Enter event description"
//                                         value={eventData.eventDesc}
//                                         onChange={handleInputChange}
//                                     ></textarea>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="noOfSeat">Number of Seats:</label>
//                                     <input
//                                         type="number"
//                                         className="form-control"
//                                         id="noOfSeat"
//                                         name="noOfSeat"
//                                         placeholder="Enter number of seats"
//                                         value={eventData.noOfSeat}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="eventDate">Event Date:</label>
//                                     <input
//                                         type="date"
//                                         className="form-control"
//                                         id="eventDate"
//                                         name="eventDate"
//                                         min={today}
//                                         value={eventData.eventDate}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="eventRule">Event Rule:</label>
//                                     <textarea
//                                         className="form-control"
//                                         id="eventRule"
//                                         name="eventRule"
//                                         rows="3"
//                                         placeholder="Enter event rule"
//                                         value={eventData.eventRule}
//                                         onChange={handleInputChange}
//                                     ></textarea>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="eventImage">Event Image:</label>
//                                     <div
//                                         className="drop-zone"
//                                         onDrop={handleDrop}
//                                         onDragOver={handleDragOver}
//                                     >
//                                         {imagePreview ? (
//                                             <img src={imagePreview} alt="Event" className="img-fluid" />
//                                         ) : (
//                                             <p>Drag & Drop or Click to Upload</p>
//                                         )}
//                                         <input
//                                             type="file"
//                                             id="eventImage"
//                                             className="form-control-file"
//                                             onChange={handleImageChange}
//                                             style={{ display: 'none' }}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="lengthOfTeam">Max Length of Team:</label>
//                                     <input
//                                         type="number"
//                                         className="form-control"
//                                         id="lengthOfTeam"
//                                         name="lengthOfTeam"
//                                         placeholder="Enter max length of team"
//                                         value={eventData.lengthOfTeam}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <button type="submit" className="btn btn-primary">Submit</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };








import React, { useEffect, useState } from 'react';
import './SidebarAddEvent.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const SidebarAddEvent = () => {
    const [lodingButton, setlodingButton] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const today = new Date().toISOString().split('T')[0];
    const nav = useNavigate();

    const [eventData, setEventData] = useState({
        eventName: '',
        eventDesc: '',
        noOfSeat: 0,
        noOfRemainingSeat: 0,
        noOfFildSeat: 0,
        eventDate: today,
        eventRule: '',
        lengthOfTeam: 0,
        eventImg: '',
        hasTeam: false
    });

    let id = localStorage.getItem('EventId');

    const Submit = (e) => {
        setlodingButton(true)
        e.preventDefault();

        if (eventData.eventName === '' || eventData.eventDesc === '' || eventData.noOfSeat === '' || eventData.eventRule === '' || eventData.lengthOfTeam === '' || eventData.eventImg === '') {
            Swal.fire({ title: 'please Enter Valid data' });
            setlodingButton(false)
            return;
        } else {

            if (eventData.noOfSeat <= 0) {
                Swal.fire({ title: 'please Enter Valid Seats' });
                setlodingButton(false)

                return;
            }

            if (eventData.lengthOfTeam <= 0) {
                Swal.fire({ title: 'please Enter Valid Team length' });
                setlodingButton(false)

                return;
            }

            localStorage.setItem('index', 1);
            axios.post(`https://eventapironak.onrender.com/`, eventData)
                .then(response => {
                    Swal.fire({ template: 'succeful', title: 'New Event Created' })
                        .then(() => {
                            window.location.reload(false)
                            setlodingButton(false)
                        })
                })
                .catch(error => {
                    alert('Error signing up');
                });

            console.log(eventData);
            setEventData({
                eventName: '',
                eventDesc: '',
                noOfSeat: '',
                eventDate: today,
                eventRule: '',
                lengthOfTeam: '',
                eventImg: ''
            });
            setImagePreview(null);
            setlodingButton(false)
        }


    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({
            ...eventData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImagePreview(base64String);
                setEventData({
                    ...eventData,
                    eventImg: base64String
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImagePreview(base64String);
                setEventData({
                    ...eventData,
                    eventImg: base64String
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className='a'>
            <div className="row justify-content-center">
                <div className="col-lg-1000000">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h4>Event Registration Form</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={Submit}>
                                <div className="form-group">
                                    <label htmlFor="eventName">Event Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="eventName"
                                        name="eventName"
                                        placeholder="Enter event name"
                                        value={eventData.eventName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventDesc">Event Description:</label>
                                    <textarea
                                        className="form-control"
                                        id="eventDesc"
                                        name="eventDesc"
                                        rows="3"
                                        placeholder="Enter event description"
                                        value={eventData.eventDesc}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="noOfSeat">Number of Seats:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="noOfSeat"
                                        name="noOfSeat"
                                        placeholder="Enter number of seats"
                                        value={eventData.noOfSeat}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventDate">Event Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="eventDate"
                                        name="eventDate"
                                        min={today}
                                        value={eventData.eventDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventRule">Event Rule:</label>
                                    <textarea
                                        className="form-control"
                                        id="eventRule"
                                        name="eventRule"
                                        rows="3"
                                        placeholder="Enter event rule"
                                        value={eventData.eventRule}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventImage">Event Image:</label>
                                    <div
                                        className="drop-zone"
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                    >
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Event" className="img-fluid" />
                                        ) : (
                                            <p>Drag & Drop or Click to Upload</p>
                                        )}
                                        <input
                                            type="file"
                                            id="eventImage"
                                            className="form-control-file"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lengthOfTeam">Max Length of Team:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="lengthOfTeam"
                                        name="lengthOfTeam"
                                        placeholder="Enter max length of team"
                                        value={eventData.lengthOfTeam}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {!lodingButton ? (
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                                        <CircularProgress style={{ height: '30px', width: '30px', strokeWidth: '50px', color: 'black' }} />
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
