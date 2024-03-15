import React, { useEffect, useState } from 'react'
import './SidebarStudents.css'
import { CircularProgress } from '@mui/material';



export const SidebarStudents = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const res = await response.json();
                setStudents(res);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };
        fetchData();
    }, [])

    const formattedStudents = () => {
        return (
            // <table className="student-table">
            //     <thead>
            //         <tr>
            //             <th>Name</th>
            //             <th>Email</th>
            //             <th>College</th>
            //             <th>Registered Event Count</th>
            //             <th>Enrollment</th>
            //             <th>Address</th>
            //             <th>Phone Number</th>
            //             <th>Gender</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {students.map((student, index) => (
            //             <tr key={index} className='bg-light'>
            //                 <td>{student.studentName}</td>
            //                 <td>{student.studentEmail}</td>
            //                 <td>{student.studentCollage}</td>
            //                 <td>{student.eventId.length}</td>
            //                 <td>{student.studentEnrollment}</td>
            //                 <td>{student.address}</td>
            //                 <td>{student.phoneNumber}</td>
            //                 <td>{student.gender}</td>
            //             </tr>
            //         ))}
            //     </tbody>
            // </table>
            <div className="student-table">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>College</th>
                            <th>Registered Event Count</th>
                            <th>Enrollment</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} className='bg-light'>
                                <td>{student.studentName}</td>
                                <td>{student.studentEmail}</td>
                                <td>{student.studentCollage}</td>
                                <td>{student.eventId.length}</td>
                                <td>{student.studentEnrollment}</td>
                                <td>{student.address}</td>
                                <td>{student.phoneNumber}</td>
                                <td>{student.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        );
    };


    return (

        <>
            {!loading ? (
                <div>
                    {formattedStudents()}
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '160vh' }}>
                    <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px', color: 'black' }} />

                </div>
            )}
        </>
    )
}
