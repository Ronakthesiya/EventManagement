// import React from 'react'

// export const StudentListByEvent = () => {
//   return (
//     <div>StudentListByEvent</div>
//   )
// }


import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';
import { SidebarHome } from '../SidebarHome/SidebarHome';
import { SidebarEvent } from '../SidebarEvent/SidebarEvent';
import './AdminProfile.css'
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

const AdminProfile = () => {
  const [activeItem, setActiveItem] = useState(1);
  const [admin, setadmin] = useState({})
  const param = useParams();
  const nav = useNavigate();

  const change = (n, name) => {
    setActiveItem(n);
    localStorage.removeItem('idex');
    localStorage.setItem('index', n);
  };



  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3003/${localStorage.getItem('adminId')}`);
        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }
        const data = await response.json();
        setadmin(data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);

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
        <div className="p-3 ms-5" style={{ width: '100%' }}>
          <div className='eventName'><h2>{admin.adminName}</h2></div>
          <table className='bg-light'>
            <tr className='bg-light'>
              <td>Name : </td>
              <td>{admin.adminName}</td>
            </tr>

            <tr className='bg-light'>
              <td>Email : </td>
              <td>{admin.adminEmail}</td>
            </tr>

            {(admin.address != null) ?
              <tr className='bg-light'>
                <td>Address : </td>
                <td>{admin.address}</td>
              </tr> : <div />
            }

            {(admin.phoneNumber != null) ?
              <tr className='bg-light'>
                <td>phoneNumber : </td>
                <td>{admin.phoneNumber}</td>
              </tr> : <div />
            }
          </table>

            
        </div>
      </div>
    </>
  )
}


export default AdminProfile;