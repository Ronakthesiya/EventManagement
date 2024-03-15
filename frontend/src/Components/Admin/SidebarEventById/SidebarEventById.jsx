import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';
import { SidebarHome } from '../SidebarHome/SidebarHome';
import { SidebarEvent } from '../SidebarEvent/SidebarEvent';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './SidebarEventById.css'
import Swal from 'sweetalert2'
import HomeImg from '../../../assets/HomeImg.png'
import pasteventImg from '../../../assets/pastevent.png'
import futureeventImg from '../../../assets/futureevent.png'
import StudentImg from '../../../assets/StudentImg.png'
import AllEvent from '../../../assets/AllEvent.png'
import AddEvent from '../../../assets/AddEvent.png'
import AddAdmin from '../../../assets/AddAdmin.png'
import { CircularProgress } from '@mui/material';

const SidebarEventById = () => {
    const [lodingButton, setlodingButton] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeItem, setActiveItem] = useState(2);
    const [event, setEvent] = useState({});
    const param = useParams();
    const nav = useNavigate();

    const change = (n, name) => {
        setActiveItem(n);
        localStorage.removeItem('idex');
        localStorage.setItem('index', n);
    };

    function editEvent() {
        localStorage.setItem('EventId', param.id)
        nav(`../sidebarevent/edit/${param.id}`)
    }

    function deleteEvent() {
        setlodingButton(true);
        Swal.fire({
            title: 'Do you want to delete this event ?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')

                axios.delete(`https://eventapironak.onrender.com/${param.id}`)
                    .then(res => {
                        console.log('event deleted')
                        setlodingButton(false);
                    })
                    .catch(error => {
                        console.error(error);
                    })

                nav("../adminhome")
            } else if (result.isDenied) {
                Swal.fire('Event is not deleted', '', 'info')
            }
        })
        setlodingButton(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://studentapironak.onrender.com/${param.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await response.json();
                setLoading(false);
                setEvent(eventData);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchData();
    }, [param.id]);

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
                        <img src={event.eventImg} alt={event.eventImg + ''} />
                        <table className="table table-striped table-hover">
                            <tbody>
                                <tr>
                                    <th>Name :</th>
                                    <td>{event.eventName}</td>
                                </tr>
                                <tr>
                                    <th>Description :</th>
                                    <td>{event.eventDesc}</td>
                                </tr>
                                <tr>
                                    <th>Date :</th>
                                    <td>{new Date(event.eventDate).toDateString()}</td>
                                </tr>
                                <tr>
                                    <th>Seat :</th>
                                    <td>{event.noOfSeat}</td>
                                </tr>
                                <tr>
                                    <th>No of Remaining Seat :</th>
                                    <td>{event.noOfSeat - event.noOfFildSeat}</td>
                                </tr>
                                <tr>
                                    <th>Filled Seat :</th>
                                    <td>{event.noOfFildSeat}</td>
                                </tr>
                                <tr>
                                    <th>Event Rule :</th>
                                    <td>{event.eventRule}</td>
                                </tr>
                                <tr>
                                    <th>Length of Team :</th>
                                    <td>{event.lengthOfTeam}</td>
                                </tr>
                            </tbody>
                        </table>
                        {!lodingButton ? (
                            <button className='btn btn-danger me-5 b1' onClick={deleteEvent}> Delete </button>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                                <CircularProgress style={{ height: '30px', width: '30px', strokeWidth: '50px', color: 'black' }} />
                            </div>
                        )}
                        <button className='btn btn-info ms-5' onClick={editEvent}> Edit </button>
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


export default SidebarEventById;
