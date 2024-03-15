import React, { useState } from 'react';
import './AdminHome.css';
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';
import { Home, SidebarHome } from '../SidebarHome/SidebarHome';
import { Events } from '../../Events/Events';
import { SidebarEvent } from '../SidebarEvent/SidebarEvent';
import { SidebarAddEvent } from '../SidebarAddEvent/SidebarAddEvent';
import { SidebarAddAdmin } from '../SidebarAddAdmin/SidebarAddAdmin';
import { SidebarStudents } from '../SidebarStudents/SidebarStudents';
import { SidebarPastEvent } from '../SidebarPastEvent/SidebarPastEvent';
import { SidebarAllEvent } from '../SidebarAllEvent/SidebarAllEvent';
import HomeImg from '../../../assets/HomeImg.png'
import pasteventImg from '../../../assets/pastevent.png'
import futureeventImg from '../../../assets/futureevent.png'
import StudentImg from '../../../assets/StudentImg.png'
import AllEvent from '../../../assets/AllEvent.png'
import AddEvent from '../../../assets/AddEvent.png'
import AddAdmin from '../../../assets/AddAdmin.png'
import { StudentListByEvent } from '../StudentListByEvent/StudentListByEvent';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    let m = localStorage.getItem('index') === '1' ? 1 : localStorage.getItem('index') === '2' ? 2 : localStorage.getItem('index') === '3' ? 3 : localStorage.getItem('index') === '4' ? 4 : localStorage.getItem('index') === '5' ? 5 : localStorage.getItem('index') === '6' ? 6 : localStorage.getItem('index') === '7' ? 7 : 1

    const [activeItem, setActiveItem] = useState(m);
    const [activeItemName, setActiveItemName] = useState('Home');

    const change = (n, name) => {
        setActiveItem(n);
        setActiveItemName(name);
        localStorage.removeItem('idex');
        localStorage.setItem('index', n);
    };

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
                                <Link to="#" className={`nav-link text-white ${activeItem === 1 ? 'active' : ''}`} onClick={() => change(1, 'Home')}>
                                    <img src={HomeImg} alt="" width="20" height="20" className="rounded-circle me-2" color='' />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className={`nav-link text-white ${activeItem === 2 ? 'active' : ''}`} onClick={() => change(2, 'Events')}>
                                    <img src={futureeventImg} alt="" width="20" height="20" className="rounded-circle me-2" color='white'/>
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className={`nav-link text-white ${activeItem === 3 ? 'active' : ''}`} onClick={() => change(3, 'Past Events')}>
                                    <img src={pasteventImg} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    Past Events
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className={`nav-link text-white ${activeItem === 4 ? 'active' : ''}`} onClick={() => change(4, 'All Events')}>
                                    <img src={AllEvent} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    All Events
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className={`nav-link text-white ${activeItem === 5 ? 'active' : ''}`} onClick={() => change(5, 'Students')}>
                                    <img src={StudentImg} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    Students
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className={`nav-link text-white ${activeItem === 6 ? 'active' : ''}`} onClick={() => change(6, 'Add Event')}>
                                    <img src={AddEvent} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    Add Event
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className={`nav-link text-white ${activeItem === 7 ? 'active' : ''}`} onClick={() => change(7, 'Add Admin')}>
                                    <img src={AddAdmin} alt="" width="20" height="20" className="rounded-circle me-2" />
                                    Add Admin
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="containe-fluid px-4">

                    {(activeItem === 1) ? <SidebarHome /> : ronak()}
                    {(activeItem === 2) ? <SidebarEvent /> : ronak()}
                    {(activeItem === 3) ? <SidebarPastEvent/> : ronak()}
                    {(activeItem === 4) ? <SidebarAllEvent/> : ronak()}
                    {(activeItem === 5) ? <SidebarStudents/> : ronak()}
                    {(activeItem === 6) ? <SidebarAddEvent /> : ronak()}
                    {(activeItem === 7) ? <SidebarAddAdmin/> : ronak()}
                </div>
            </div>
        </>
    )
}

export default AdminHome;
