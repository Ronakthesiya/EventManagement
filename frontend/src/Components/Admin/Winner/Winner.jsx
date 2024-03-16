import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';
import './Winner.css'
import { SidebarHome } from '../SidebarHome/SidebarHome';
import { SidebarEvent } from '../SidebarEvent/SidebarEvent';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import HomeImg from '../../../assets/HomeImg.png'
import pasteventImg from '../../../assets/pastevent.png'
import futureeventImg from '../../../assets/futureevent.png'
import StudentImg from '../../../assets/StudentImg.png'
import AllEvent from '../../../assets/AllEvent.png'
import AddEvent from '../../../assets/AddEvent.png'
import AddAdmin from '../../../assets/AddAdmin.png'
import { CircularProgress } from '@mui/material';

const Winner = () => {
    const [loading, setLoading] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);
    const [activeItem, setActiveItem] = useState(2);
    const [event, setEvent] = useState({});
    const [student, setStudent] = useState([]);
    const [hashWinner, setHashWinner] = useState(false);
    const param = useParams();
    const nav = useNavigate();

    const change = (n, name) => {
        setActiveItem(n);
        localStorage.removeItem('idex');
        localStorage.setItem('index', n);
    };

    const [selectedStudents, setSelectedStudents] = useState([]);

    const handleCheckboxChange = (studentId) => {
        if (selectedStudents.includes(studentId)) {
            setSelectedStudents(selectedStudents.filter(id => id !== studentId));
        } else {
            if (selectedStudents.length < 3) {
                setSelectedStudents([...selectedStudents, studentId]);
            }
        }
    };

    const addWinner = async () => {
        setLoadingButton(true);
        event.winnerId = selectedStudents;
        console.log(event);

        try {
            const response = await axios.put(`https://eventapironak.onrender.com/${param.id}`, event);
            console.log(response.data);

            nav(`../sidebarevent/${param.id}`)
            setLoadingButton(false);
        } catch (error) {
            console.error('Error in put event data:', error);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://eventapironak.onrender.com/${param.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await response.json();

                await setEvent(eventData);

                if (eventData.winnerId.length > 0) {
                    setHashWinner(true);
                    setSelectedStudents(eventData.winnerId);
                }

                if (eventData.memberId.length > 0) {
                    await fetchData3(eventData.memberId);
                }

                setLoading(false)
            } catch (error) {
                console.error('Error fetching event data:', error);
            }

        };

        fetchData();

        const fetchData3 = async (a) => {
            try {
                const studentDataPromises = a.map((e) => axios.get(`https://studentapironak.onrender.com/${e}`));
                const studentDataResponses = await Promise.all(studentDataPromises);
                const studentData = studentDataResponses.map((res) => res.data);
                setStudent(studentData);
            } catch (error) {
                console.error('Error fetching Student by id for event:', error);
            }

        };
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
                    <div className="p-3 text-center mt-5" style={{ width: '100%' }}>
                        <div className='eventName'><h2>{event.eventName}</h2></div>

                        {(student.length > 0) ?
                            <>
                                <div>
                                    <table className="table table-striped mt-5">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>College</th>
                                                <th>Enrollment</th>
                                                <th>Phone Number</th>
                                                <th>Count of event</th>
                                                <th>Gender</th>
                                                <th>Select</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {student.map((currentStudent, index) => (
                                                <tr key={index} className={selectedStudents.includes(currentStudent._id) ? 'bg-light' : ''}>
                                                    <td>{selectedStudents.indexOf(currentStudent._id) !== -1 ? selectedStudents.indexOf(currentStudent._id) + 1 : ''}</td>
                                                    <td>{currentStudent.studentName}</td>
                                                    <td>{currentStudent.studentEmail}</td>
                                                    <td>{currentStudent.studentCollege}</td>
                                                    <td>{currentStudent.studentEnrollment}</td>
                                                    <td>{currentStudent.phoneNumber}</td>
                                                    <td>{currentStudent.registeredEventCount}</td>
                                                    <td>{currentStudent.gender}</td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedStudents.includes(currentStudent._id)}
                                                            onChange={() => handleCheckboxChange(currentStudent._id)}
                                                            disabled={selectedStudents.length === 3 && !selectedStudents.includes(currentStudent._id)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className='text-center mt-5'>
                                        {
                                            (loadingButton) ?
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                                                    <CircularProgress style={{ height: '30px', width: '30px', strokeWidth: '50px', color: 'black' }} />
                                                </div>
                                                : <button className='btn btn-info' onClick={addWinner}>
                                                    {(hashWinner) ? "Edit" : "Add"}
                                                </button>
                                        }

                                    </div>
                                </div>
                            </>
                            : <div className='eventName'><h4>" No Student are hear ! "</h4></div>
                        }
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


export default Winner;
