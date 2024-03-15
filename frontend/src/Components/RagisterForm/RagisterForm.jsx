import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Navbar2, Navbar3 } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import './RagisterForm.css'
import validator from 'validator'
import { CircularProgress } from '@mui/material';



const RagisterForm = () => {
    const [loading, setloading] = useState(true);
    const [lodingButton, setlodingButton] = useState(false);
    const param = useParams();
    const [event, setEvent] = useState({});
    const [students, setstudents] = useState({});
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://studentapironak.onrender.com/${param.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await response.json();
                setloading(false);
                setEvent(eventData);
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
        phoneNumber: '',
        gender: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    let team = false;



    const Register = () => {
        setlodingButton(true)
        var f = 1;

        if (formData.address === '' || formData.studentCollage === '' || formData.phoneNumber === '' || formData.gender === '') {
            Swal.fire({ title: 'fill all details' })
            setlodingButton(false)
            return;
        }

        if (!validator.isMobilePhone(formData.phoneNumber)) {
            Swal.fire({ title: 'Enter a valid Phone number' })
            setlodingButton(false)
            return;
        }

        students.map((e) => {
            if (e.studentName === localStorage.getItem('studentName') && e.studentEmail === localStorage.getItem('studentEmail')) {
                localStorage.setItem('studentId', e._id);
                setFormData({ ...formData, eventId: e.eventId });

                if (event.memberId.includes(e._id)) {
                    Swal.fire({ title: 'Alrady ragisterd' })
                    nav('/loginHome')
                    f = 0;
                    return;
                }
            }
        })

        if (f == 1) {
            formData.eventId.push(event._id);
            formData.ragiteredEventCount = formData.eventId.length;
        } else {
            setlodingButton(false)
            return;
        }

        axios.put(`https://studentapironak.onrender.com/${localStorage.getItem('studentId')}`, formData)
            .then(response => {
                console.log("succeful rgister")
                nav('/loginHome')
            })
            .catch(error => {
                alert('Error signing up student');
            });

        event.memberId.push(localStorage.getItem('studentId'));
        event.noOfRemainingSeat = ((event.noOfSeat) - event.noOfFildSeat - 1);
        event.noOfFildSeat = event.noOfFildSeat + 1;

        axios.put(`https://studentapironak.onrender.com/${event._id}`, event)
            .then(response => {
                setlodingButton(false)
                console.log("succeful rgister")
            })
            .catch(error => {
                alert('Error signing up event');
            });

        console.log(formData)


        Swal.fire({ title: 'Ragister Succesfuly' })
    }





    return (
        <div>
            <Navbar3 />
            {!loading ? (
                <div className='Rform'>
                    <div class="title">
                        <p>Registration Form</p>
                    </div>

                    <div class="r_form">
                        <form>
                            <div class="input_wrap p-2">
                                <label for="yourname">Your Name : </label>
                                <input type="text" name="studentName" class="input" id="yourname" value={formData.studentName} onChange={(e) => handleInputChange(e)} disabled />
                            </div>
                            <div class="input_wrap p-2">
                                <label for="emailaddress">Email Address :</label>
                                <input type="text" name="studentEmail" class="input" id="emailaddress" value={formData.studentEmail} onChange={(e) => handleInputChange(e)} disabled />
                            </div>
                            <div class="input_wrap p-2">
                                <label for="collagename">Callage Name :</label>
                                <input type="text" name="studentCollage" class="input" id="collagename" value={formData.studentCollage} onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div class="input_wrap p-2">
                                <label for="enrollno" style={{ display: "block" }}>Enrollment No : </label>
                                <input type="String" style={{ width: "100%", height: 50, border: "none" }} name="studentEnrollment" class="input" id="enrollno" value={formData.studentEnrollment} onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div class="input_wrap p-2">
                                <label for="phone" style={{ display: "block" }}>Phone   :</label>
                                <input type="number" style={{ width: "100%", height: 50, border: "none" }} name="phoneNumber" class="input" id="phone" value={formData.phoneNumber} onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div class="input_wrap p-2">
                                <label for="address">Your address : </label>
                                <input type="text" name="address" class="input" id="address" value={formData.address} onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div class="input_wrap p-2">
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

                                </div>
                            </div>
                        </form>

                    </div>

                    {!lodingButton ? (
                        <button className='btn btn-success' style={{ display: "block", marginInline: "auto" }} onClick={Register}> Register</button>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                            <CircularProgress style={{ height: '30px', width: '30px', strokeWidth: '50px', color: 'black' }} />
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                    <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px', color: 'black' }} />
                </div>
            )}
            <Footer />
        </div>
    )
}


export default RagisterForm;