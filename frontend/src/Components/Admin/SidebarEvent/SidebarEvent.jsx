import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const SidebarEvent = () => {
    const [loading, setLoading] = useState(true);
    const [allEvent, setallEvent] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        fetch("https://eventapironak.onrender.com/")
            .then((res) => res.json())
            .then((res) => {
                setallEvent(res)
                setLoading(false)
            })
    }, []);

    var i = -1;

    var formatedEvent = allEvent.map((e) => {

        if (new Date(e.eventDate) >= new Date()) {
            return (
                <div className='col-4 px-4' style={{ textAlign: "center" }}>
                    <div className="card" >
                        <Link to={"/sidebarevent/" + e._id} style={{ textDecoration: 'none' }}>
                            <img src={e.eventImg} style={{ height: 200, width: "100%" }} className="card-img-top" alt={e.eventImg} />
                            <div className="card-body">
                                <h5 className="card-title">{e.eventName}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">No of seats : {e.noOfSeat}</li>
                                <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>
                            </ul>
                        </Link>
                    </div>
                </div>
            );
            // if (i === 2) {
            //     i = 0;
            //     return (
            //         <>
            //             <tr>
            //             </tr>
            //             <td>
            //                 <div className="card" style={{ width: "18rem" }}>
            //                     <Link to={"/sidebarevent/" + e._id} style={{ textDecoration: 'none' }}>
            //                         <img src={e.eventImg} className="card-img-top" alt={e.eventImg} />
            //                         <div className="card-body">
            //                             <h5 className="card-title">{e.eventName}</h5>
            //                             <p className="card-text">{e.eventDesc}</p>
            //                         </div>
            //                         <ul className="list-group list-group-flush">
            //                             <li className="list-group-item">No of seats : {e.noOfSeat}</li>
            //                             <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>
            //                             <li className="list-group-item">A third item</li>
            //                         </ul>
            //                     </Link>
            //                 </div>
            //             </td>
            //         </>
            //     )
            // } else {
            //     i++;
            //     return (
            //         <td>
            //             <div className="card" style={{ width: "18rem" }}>
            //                 <Link to={"/sidebarevent/" + e._id} style={{ textDecoration: 'none' }}>
            //                     <img src={e.eventImg} className="card-img-top" alt={e.eventImg} />
            //                     <div className="card-body">
            //                         <h5 className="card-title">{e.eventName}</h5>
            //                         <p className="card-text">{e.eventDesc}</p>
            //                     </div>
            //                     <ul className="list-group list-group-flush">
            //                         <li className="list-group-item">No of seats : {e.noOfSeat}</li>
            //                         <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>
            //                         <li className="list-group-item">A third item</li>
            //                     </ul>
            //                 </Link>
            //             </div>
            //         </td>
            //     )
            // }
        }
    })


    return (
        <>
            {!loading ? (
                <div className='row'>
                    {formatedEvent}
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '160vh' }}>
                    <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px', color: 'black' }} />
                </div>
            )}
        </>
    )
}
