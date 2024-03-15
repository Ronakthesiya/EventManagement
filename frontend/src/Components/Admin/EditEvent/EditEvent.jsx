import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';
import { SidebarHome } from '../SidebarHome/SidebarHome';
import { SidebarEvent } from '../SidebarEvent/SidebarEvent';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditEvent.css'
import Swal from 'sweetalert2'
import HomeImg from '../../../assets/HomeImg.png'
import pasteventImg from '../../../assets/pastevent.png'
import futureeventImg from '../../../assets/futureevent.png'
import StudentImg from '../../../assets/StudentImg.png'
import AllEvent from '../../../assets/AllEvent.png'
import AddEvent from '../../../assets/AddEvent.png'
import AddAdmin from '../../../assets/AddAdmin.png'
import { CircularProgress } from '@mui/material';

const EditEvent = () => {
    const [loading, setloading] = useState(true);
    const [activeItem, setActiveItem] = useState(2);
    const [event, setEvent] = useState({});
    const param = useParams();
    const nav = useNavigate();

    const [imagePreview, setImagePreview] = useState(null);
    const today = new Date().toISOString().split('T')[0];

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://eventapironak.onrender.com/${param.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await response.json();
                setEventData(eventData);
                setloading(false)
                setImagePreview(eventData.eventImg)
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchData();
    }, []);


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


    const change = (n, name) => {
        setActiveItem(n);
        localStorage.removeItem('idex');
        localStorage.setItem('index', n);
    };

    function editEvent() {
        console.log(eventData)

        axios.put(`https://eventapironak.onrender.com/${param.id}`, eventData)
            .then(() => {
                Swal.fire({ template: 'succeful', title: 'Event Edited' })
                nav('/adminhome')
            })
    }



    const ronak = () => {
        return (
            <> </>
        )
    }


    return (
        <>
            <AdminNavbar />
            <div className="d-flex">
                <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '210px' }}>
                    <div className="sidebar-content">
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <Link to="/adminhome" className={`nav-link text-white ${activeItem === 1 ? 'active' : ''}`} onClick={() => change(1, 'Home')}>
                                    <img src={HomeImg} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/adminhome" className={`nav-link text-white ${activeItem === 2 ? 'active' : ''}`} onClick={() => change(2, 'Events')}>
                                    <img src={futureeventImg} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/adminhome" className={`nav-link text-white ${activeItem === 3 ? 'active' : ''}`} onClick={() => change(3, 'Past Events')}>
                                    <img src={pasteventImg} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    Past Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/adminhome" className={`nav-link text-white ${activeItem === 4 ? 'active' : ''}`} onClick={() => change(4, 'All Events')}>
                                    <img src={AllEvent} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    All Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/adminhome" className={`nav-link text-white ${activeItem === 5 ? 'active' : ''}`} onClick={() => change(5, 'Students')}>
                                    <img src={StudentImg} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    Students
                                </Link>
                            </li>
                            <li>
                                <Link to="/adminhome" className={`nav-link text-white ${activeItem === 6 ? 'active' : ''}`} onClick={() => change(6, 'Add Event')}>
                                    <img src={AddEvent} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    Add Event
                                </Link>
                            </li>
                            <li>
                                <Link to="/adminhome" className={`nav-link text-white ${activeItem === 7 ? 'active' : ''}`} onClick={() => change(7, 'Add Admin')}>
                                    <img src={AddAdmin} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    Add Admin
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>


                {!loading ? (
                    <div className="p-3" style={{ width: '100%' }}>
                        <div className='a'>
                            <div className="row justify-content-center">
                                <div className="col-lg-1000000">
                                    <div className="card">
                                        <div className="card-header bg-primary text-white">
                                            <h4>Event Edit Form</h4>
                                        </div>
                                        <div className="card-body">

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
                                                    min={eventData.eventDate}
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
                                            <button className='btn btn-info' onClick={editEvent}>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '165vh' }}>
                        <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px', color: 'black' }} />
                    </div>
                )}
            </div>

        </>
    )
}


export default EditEvent;
