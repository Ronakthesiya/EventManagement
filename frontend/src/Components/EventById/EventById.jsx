import React, { useEffect, useState } from 'react';
import './EventById.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Navbar1, Navbar3 } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer'
import axios from 'axios';
import { CircularProgress } from '@mui/material';





const EventById = () => {
    const param = useParams();
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3004/${param.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await response.json();
                setLoading(false)
                setEvent(eventData);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchData();

        return () => {
        };
    }, [param.id]);

    const openForm = () => {
        if (localStorage.getItem('studentName') === null) {
            nav('/signup');
            return;
        }
    };

    return (
        <>
            <Navbar1 />
        {!loading ? (
            
            <div className="body1">
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
                            <td>{event.noOfRemainingSeat}</td>
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

                {(new Date(event.eventDate) >= new Date()) ?
                    <button className="btn btn-info button" onClick={openForm} >
                        Register
                    </button> :
                    <h2 className='mt-5 ms-5 text'>Past Event</h2>
                }
            </div>
            
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px' ,  color: 'black'}} />
            </div>
        )}
        <Footer />
        </>
    );
};

export default EventById;













