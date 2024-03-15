import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './SidebarAddAdmin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { CircularProgress } from '@mui/material';

export const SidebarAddAdmin = () => {
    
    const [lodingButton, setlodingButton] = useState(false);
    const [Admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3003/")
            .then((res) => res.json())
            .then((res) => setAdmins(res));
    }, []);

    const [formData, setFormData] = useState({
        adminName: '',
        adminEmail: '',
        loginPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        setlodingButton(true)
        e.preventDefault();

        if (formData.loginPassword !== formData.confirmPassword) {
            Swal.fire({ title: "Enter both passwords the same" });
            setlodingButton(false)
            return;
        }

        if (!validator.isEmail(formData.adminEmail)) {
            Swal.fire({ title: 'Enter a valid Email' })
            setlodingButton(false)
            return;
        }

        const userExists = Admins.some(admin => admin.adminEmail === formData.adminEmail);
        if (userExists) {
            Swal.fire({ title: "User already exists" });
            setlodingButton(false)
            return;
        }

        axios.post(`http://localhost:3003/`, formData)
            .then(response => {
            })
            .catch(error => {
                alert('Error signing up');
            });

        Swal.fire({ title: "New Admin created" });
        console.log(formData);

        setFormData({
            adminName: '',
            adminEmail: '',
            loginPassword: '',
            confirmPassword: ''
        })
        setlodingButton(false)

    };

    return (
        <div className="sidebar-add-admin">
            <div className="a mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mb-4">Admin Registration</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="adminName">Admin Name</label>
                                <input type="text" className="form-control" id="adminName" name="adminName" placeholder="Enter admin name" value={formData.adminName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="adminEmail">adminEmail</label>
                                <input type="adminEmail" className="form-control" id="adminEmail" name="adminEmail" placeholder="Enter adminEmail" value={formData.adminEmail} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginPassword">Password</label>
                                <input type="password" className="form-control" id="loginPassword" name="loginPassword" placeholder="Enter password" value={formData.loginPassword} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
                            </div>
                            {!lodingButton ? (
                                <button type="submit" className="btn btn-primary btn-block">Register</button>
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
    );
};
