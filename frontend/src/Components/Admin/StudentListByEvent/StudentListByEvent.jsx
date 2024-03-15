import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';
import './StudentListByEvent.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HomeImg from '../../../assets/HomeImg.png'
import pasteventImg from '../../../assets/pastevent.png'
import futureeventImg from '../../../assets/futureevent.png'
import StudentImg from '../../../assets/StudentImg.png'
import AllEvent from '../../../assets/AllEvent.png'
import AddEvent from '../../../assets/AddEvent.png'
import AddAdmin from '../../../assets/AddAdmin.png'

import exportFromJSON from 'export-from-json'

const StudentListByEvent = () => {
  const [activeItem, setActiveItem] = useState(1);
  const [student, setStudent] = useState([]);
  const [event, setEvent] = useState({})
  const param = useParams();
  const nav = useNavigate();

  const change = (n, name) => {
    setActiveItem(n);
    localStorage.removeItem('idex');
    localStorage.setItem('index', n);
  };

  const downloadcsv = () => {
    const fileName = `Student List of ${event.eventName}`
    const exportType = exportFromJSON.types.csv
    console.log(student)

    exportFromJSON({ data: student, fileName, fields: ["studentName", "studentEmail", "studentCollage", "ragiteredEventCount", "studentEnrollment", "phoneNumber", "address", "gender"], exportType })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3004/${param.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const eventData = await response.json();
        setEvent(eventData);

        const studentDataPromises = eventData.memberId.map((e) => axios.get(`http://localhost:3001/${e}`));
        const studentDataResponses = await Promise.all(studentDataPromises);
        const studentData = studentDataResponses.map((res) => res.data);
        setStudent(studentData);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchData();
  }, [param.id]);

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
        <div className="p-3" style={{ width: '100%' }}>
          <div className='eventName'><h2>{event.eventName}</h2></div>

          {(student.length > 0) ?
            <>
              <div>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>College</th>
                      <th>Enrollment</th>
                      <th>Phone Number</th>
                      <th>Count of event</th>
                      <th>Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.map((student, index) => (
                      <tr key={index} className='bg-light'>
                        <td>{student.studentName}</td>
                        <td>{student.studentEmail}</td>
                        <td>{student.studentCollage}</td>
                        <td>{student.studentEnrollment}</td>
                        <td>{student.phoneNumber}</td>
                        <td>{student.ragiteredEventCount}</td>
                        <td>{student.gender}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='buttonDownload'>
                <button className='btn btn-info' onClick={downloadcsv}>Download</button>
              </div>
            </>
            : <div className='eventName'><h4>" No Student are hear ! "</h4></div>
          }
        </div>
      </div>
    </>
  )
}

export default StudentListByEvent;
