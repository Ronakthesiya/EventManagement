import React, { useEffect, useState } from 'react';
import './EventById.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Navbar1, Navbar3 } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer'
import axios from 'axios';
import { CircularProgress } from '@mui/material';



const LoginEventById = () => {
    const [loading, setLoading] = useState(true);
    const param = useParams();
    const [event, setEvent] = useState({});
    const [students, setstudents] = useState({});
    const nav = useNavigate();
    const [ragister, setragister] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://eventapironak.onrender.com/${param.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await response.json();
                setEvent(eventData);

                if(eventData.memberId){
                    if (eventData.memberId.includes(localStorage.getItem('studentId'))) {
                        
                        
                            console.log("cancel")
                        
                        setragister(true);
                        
                    }
                }
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchData();

        

        const fetchData2 = async () => {
            try {
                const response = await fetch(`https://studentapironak.onrender.com`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const studentData = await response.json();
                setLoading(false);
                setstudents(studentData);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchData2();
    }, [param.id]);


    const [formData, setFormData] = useState({
        studentName: localStorage.getItem('studentName'),
        studentEmail: localStorage.getItem('studentEmail'),
        ragiteredEventCount: 0,
        studentCollage: '',
        eventId: [],
        studentEnrollment: '',
        address: '',
        phoneNumber: 0,
        gender: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    var team = false;

    const Register = () => {
        var f = 1;
        students.map((e) => {
            if (e.studentName === localStorage.getItem('studentName') && e.studentEmail === localStorage.getItem('studentEmail')) {
                localStorage.setItem('studentId', e._id);
                let k = e.ragiteredEventCount + 1;
                setFormData({ ...formData, eventId: e.eventId, ragiteredEventCount: k });
                if (event.memberId.includes(e._id)) {
                    Swal.fire({ title: 'Alrady ragisterd' })
                    f = 0;
                    return;
                }
            }
        })

        if (f == 1) {
            formData.eventId.push(event._id);
        } else {
            const blur = document.getElementById('blur');
            blur.classList.toggle('blur');

            if (team === true) {
                const popup = document.getElementById('popup');
                popup.classList.toggle('blur')
            } else {
                const popup = document.getElementById('popup2');
                popup.classList.toggle('blur')
            }
            return;
        }

        axios.put(`https://studentapironak.onrender.com/${localStorage.getItem('studentId')}`, formData)
            .then(response => {
                console.log("succeful rgister")
            })
            .catch(error => {
                alert('Error signing up student');
            });

        event.memberId.push(localStorage.getItem('studentId'));
        event.noOfRemainingSeat = ((event.noOfSeat) - event.noOfFildSeat - 1);
        event.noOfFildSeat = event.noOfFildSeat + 1;

        axios.put(`https://eventapironak.onrender.com/${event._id}`, event)
            .then(response => {
                console.log("succeful rgister")
            })
            .catch(error => {
                alert('Error signing up event');
            });

        console.log(formData)
        const blur = document.getElementById('blur');
        blur.classList.toggle('blur');

        Swal.fire({ title: 'Ragister Succesfuly' })

        if (team === true) {
            const popup = document.getElementById('popup');
            popup.classList.toggle('blur')
        } else {
            const popup = document.getElementById('popup2');
            popup.classList.toggle('blur')
        }
    }

    const cancleRagister = () => {
        let stid=localStorage.getItem('studentId').toString();
        let arr = event.memberId.filter((e)=> e!=stid);
        console.log(arr);
        console.log(event.memberId);

        event.memberId = arr;
        setEvent({...event})

        console.log(event);


        axios.put(`https://eventapironak.onrender.com/${event._id}`, event)
            .then(response => {
                console.log("ragister cancled")
                console.log(response);
            })
            .catch(error => {
                alert('Error signing up event');
            });

        nav('../loginHome')
    }

    const openForm = () => {
        if (localStorage.getItem('studentName') === null) {
            nav('/signup');
            return;
        }

        nav(`/ragusterform/${event._id}`)

        // const blur = document.getElementById('blur');
        // blur.classList.toggle('blur');

        // if (team === true) {
        //     const popup = document.getElementById('popup');
        //     popup.classList.toggle('blur')
        // } else {
        //     const popup = document.getElementById('popup2');
        //     popup.classList.toggle('blur')
        // }
    };

    return (
        <>
            <div id='blur'>
                <Navbar3 />

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
                        {(new Date(event.eventDate) > new Date()) ?
                                (ragister)?
                                    (((new Date(event.eventDate)-new Date())/36e5 < 24)?
                                        <h5>You can not cancle Ragistration because event start in (less then) 24hr</h5>
                                    :
                                    <button className="btn btn-danger button" onClick={cancleRagister}>
                                        Cancle Register
                                    </button>)
                                :
                                <button className="btn btn-info button" onClick={openForm}>
                                    Register
                                </button> 
                            :
                            <h2 className='mt-5 ms-5 text'>Past Event</h2>
                        }   
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                        <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px', color: 'black' }} />
                    </div>
                )}
                <Footer />
            </div>



            <div id='popup' className='popupForm'>
                <button onClick={Register}> Register</button>
            </div>



            <div id='popup2' className='registrationform popupForm2'>
                <div class="wrapper">
                    <div class="r_form_wrap">

                        <div class="title">
                            <p>Registration Form</p>
                        </div>

                        <div class="r_form">
                            <form>
                                <div class="input_wrap">
                                    <label for="yourname">Your Name : </label>
                                    <input type="text" name="studentName" class="input" id="yourname" value={formData.studentName} onChange={(e) => handleInputChange(e)} />
                                </div>
                                <div class="input_wrap">
                                    <label for="emailaddress">Email Address :</label>
                                    <input type="text" name="studentEmail" class="input" id="emailaddress" value={formData.studentEmail} onChange={(e) => handleInputChange(e)} />
                                </div>
                                <div class="input_wrap">
                                    <label for="collagename">Callage Name :</label>
                                    <input type="text" name="studentCollage" class="input" id="collagename" value={formData.studentCollage} onChange={(e) => handleInputChange(e)} />
                                </div>
                                <div class="input_wrap">
                                    <label for="enrollno">enrollno : </label>
                                    <input type="String" name="studentEnrollment" class="input" id="enrollno" value={formData.studentEnrollment} onChange={(e) => handleInputChange(e)} />
                                </div>
                                <div class="input_wrap">
                                    <label for="phone">Phone</label>
                                    <input type="number" name="phoneNumber" class="input" id="phone" value={formData.phoneNumber} onChange={(e) => handleInputChange(e)} />
                                </div>
                                <div class="input_wrap">
                                    <label for="address">Your address : </label>
                                    <input type="text" name="address" class="input" id="address" value={formData.address} onChange={(e) => handleInputChange(e)} />
                                </div>
                                <div class="input_wrap">
                                    <label>Gender</label>
                                    <div class="input_radio">
                                        <div class="input_radio_item">
                                            <input type="radio" id="male" name="gender" class="radio" value="male" onChange={(e) => handleInputChange(e)} />
                                            <label for="male" class="radio_mark">
                                                Male</label>
                                        </div>
                                        <div class="input_radio_item">
                                            <input type="radio" id="female" name="gender" class="radio" value="female" onChange={(e) => handleInputChange(e)} />
                                            <label for="female" class="radio_mark">
                                                Female</label>
                                        </div>
                                        <div class="input_radio_item">
                                            <input type="radio" id="others" name="gender" class="radio" value="others" onChange={(e) => handleInputChange(e)} />
                                            <label for="others" class="radio_mark">
                                                Others</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <button onClick={Register} > Register</button>
            </div>
        </>
    );
};

export default LoginEventById;