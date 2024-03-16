import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { Navbar2 } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import Swal from 'sweetalert2'
import validator from 'validator';

import { CircularProgress } from '@mui/material';

const Signup = () => {
    const [loading, setloading] = useState(true);
    const [lodingButton, setlodingButton] = useState(false);
    //Signup
    const [formData, setFormData] = useState({
        studentName: "",
        studentEmail: "",
        loginPassword: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();
    const [students, setStudents] = useState([])
    const [admins, setAdmins] = useState([])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://studentapironak.onrender.com`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const res = await response.json();
                setStudents(res);

                await fetchData2();

                setloading(false);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };
        fetchData();

        const fetchData2 = async () => {
            try {
                const response = await fetch(`https://eventadminapironak.onrender.com/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const res = await response.json();
                setAdmins(res);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };
        
    }, [])


    const checkForSignup = () => {
        setlodingButton(true)
        if (formData.studentName === "" || formData.studentEmail === "" || formData.loginPassword === "" || formData.confirmPassword === "") {
            Swal.fire({ title: "All fields are required" })
            setlodingButton(false)
            return;
        }
        if (!(formData.loginPassword === formData.confirmPassword)) {
            Swal.fire({ title: "Enter the same password" });
            setlodingButton(false)
            return;
        }

        if (!validator.isEmail(formData.studentEmail)) {
            Swal.fire({ title: 'Enter a valid Email' })
            setlodingButton(false)
            return;
        }

        console.log(students)
        let f = 0;
        students.map((student) => {
            if (student.studentEmail === formData.studentEmail) {
                f = 1;
            }
        })
        admins.map((admin) => {
            if (admin.adminEmail === formData.studentEmail) {
                f = 1;
            }
        })
        if (f === 1) {
            Swal.fire({ title: 'Email alrady exsist' });
            setlodingButton(false)
            return;
        }
        axios.post(`https://studentapironak.onrender.com/signup`, formData)
            .then(response => {
                localStorage.setItem("studentName", formData.studentName)
                localStorage.setItem("studentEmail", formData.studentEmail)
                Swal.fire({ template: 'succeful', title: 'SignUp succefuly' })
                navigate("/loginHome")
                localStorage.setItem('studentId', response.data._id);
                setlodingButton(false)
            })
            .catch(error => {
                alert('Error signing up');
            });
    }



    //Login
    const [formlogin, setFormlogin] = useState({
        studentName: "",
        studentEmail: "",
        loginPassword: "",
    });
    const handleInputChangelogin = (e) => {
        const { name, value } = e.target;
        setFormlogin({ ...formlogin, [name]: value });
    }
    function checkForLogin() {
        setlodingButton(true);
        let f = 1;
        console.log(formlogin);

        admins.map((e) => {
            if (e.adminName === formlogin.studentName && e.adminEmail === formlogin.studentEmail && e.loginPassword === formlogin.loginPassword) {
                f = 2;
                localStorage.setItem('adminId', e._id);
            }
        })

        if (f === 2) {
            localStorage.setItem("adminName", formlogin.studentName)
            localStorage.setItem("adminEmail", formlogin.studentEmail)

            setlodingButton(false);
            navigate("/adminhome")
            return;
        }

        students.map((e) => {
            if (e.studentName === formlogin.studentName && e.studentEmail === formlogin.studentEmail && e.loginPassword === formlogin.loginPassword) {
                f = 0;
                localStorage.setItem('studentId', e._id);
            }
        })

        if (f === 1) {
            setlodingButton(false);
            alert("wornge password")
            return;
        }
        localStorage.setItem("studentName", formlogin.studentName)
        localStorage.setItem("studentEmail", formlogin.studentEmail)
        setlodingButton(false);
        navigate("/loginHome")
    }




    return (
        <>
            <Navbar2 />
            {!loading ? (
                <body>
                <div className="container">
                    <input type="checkbox" id="check" />
                    <div className="login form">
                        <header>Login</header>
                        <form action="#">
                            <input type="text" placeholder="Enter your Name" name="studentName" value={formlogin.studentName} onChange={handleInputChangelogin} />
                            <input type="text" placeholder="Enter your email" name="studentEmail" value={formlogin.studentEmail} onChange={handleInputChangelogin} />
                            <input type="password" placeholder="Enter your password" name="loginPassword" value={formlogin.loginPassword} onChange={handleInputChangelogin} />

                            {!lodingButton ? (
                                <input type="button" className="button" value="Login" onClick={checkForLogin} />
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '10vh' }}>
                                    <CircularProgress style={{ height: '30px', width: '30px', strokeWidth: '50px', color: 'black' }} />
                                </div>
                            )}
                        </form>
                        <div className="signup">
                            <span className="signup">Don't have an account?
                                <label htmlFor="check">Signup</label>
                            </span>
                        </div>
                    </div>

                    <div className="registration form">
                        <header>Signup</header>
                        <form action="#">
                            <input type="text" placeholder="Enter your Name" name='studentName' value={formData.studentName} onChange={handleInputChange} />
                            <input type="text" placeholder="Enter your email" name='studentEmail' value={formData.studentEmail} onChange={handleInputChange} />
                            <input type="password" placeholder="Create a password" name='loginPassword' value={formData.loginPassword} onChange={handleInputChange} />
                            <input type="password" placeholder="Confirm your password" name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange} />
                            {!lodingButton ? (
                                <input type="button" className="button" value="Signup" onClick={checkForSignup} />
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '10vh' }}>
                                    <CircularProgress style={{ height: '30px', width: '30px', strokeWidth: '50px', color: 'black' }} />
                                </div>
                            )}
                        </form>
                        <div className="signup">
                            <span className="signup">Already have an account?
                                <label htmlFor="check">Login</label>
                            </span>
                        </div>
                    </div>

                </div>
            </body>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                    <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px', color: 'black' }} />
                </div>
            )}
            
            <Footer />
        </>
    )
}


export default Signup;