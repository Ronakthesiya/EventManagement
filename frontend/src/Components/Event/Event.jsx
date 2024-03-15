import React, { useEffect, useState } from 'react'
import './Event.css'
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { Navbar1 } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';

export function Event() {
    const [loading, setLoading] = useState(true);
    const [allEvent, setallEvent] = useState([]);


    useEffect(() => {

        fetch("https://studentapironak.onrender.com/")
            .then((res) => res.json())
            .then((res) => {
                setallEvent(res)
                setLoading(false)
            });
    }, []);

    function scrollup() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    var i = -1;

    var formatedEvent = allEvent.map((e) => {
        if (new Date(e.eventDate) >= new Date()) {
            if (i === 2) {
                i = 0;
                return (
                    <>
                        <tr>
                        </tr>
                        <td>

                            <div className="card mt-3 mb-3" style={{ width: "18rem", textAlign: "center" }}>
                                <Link onClick={scrollup()} to={"/event/" + e._id} style={{ textDecoration: 'none' }}>
                                    <img src={e.eventImg} style={{ height: 200 }} className="card-img-top" alt={e.eventImg} />
                                    <div className="card-body">
                                        <h5 className="card-title">{e.eventName}</h5>

                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">No of seats : {e.noOfSeat}</li>
                                        <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>

                                    </ul>
                                </Link>
                            </div>

                        </td>
                    </>
                )
            } else {
                i++;
                return (
                    <td>
                        <div className="card mt-3 mb-2" style={{ width: "18rem", textAlign: "center" }}>
                            <Link onClick={scrollup()} to={"/event/" + e._id} style={{ textDecoration: 'none' }}>
                                <img src={e.eventImg} style={{ height: 200 }} className="card-img-top" alt={e.eventImg} />
                                <div className="card-body">
                                    <h5 className="card-title">{e.eventName}</h5>

                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">No of seats : {e.noOfSeat}</li>
                                    <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>
                                </ul>
                            </Link>
                        </div>
                    </td>
                )
            }
        }
    })

    return ( 
        <>
            {!loading ? (
                <>
                    {formatedEvent}
                </>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                    <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px' }} />
                </div>
            )}
        </>
    )
}





export function LoginEvent() {
    const [allEvent, setallEvent] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        fetch("https://studentapironak.onrender.com/")
            .then((res) => res.json())
            .then((res) => {
                setallEvent(res)
                setLoading(false)
            });
    }, []);

    function scrollup() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    var i = -1;

    var formatedEvent = allEvent.map((e) => {
        if (new Date(e.eventDate) >= new Date()) {
            if (i === 2) {
                i = 0;
                return (
                    <>
                        <tr>
                        </tr>
                        <td>

                            <div className="card ms-5 mt-3 mb-3" style={{ width: "18rem", textAlign: "center" }}>
                                <Link onClick={scrollup()} to={"/loginEvent/" + e._id} style={{ textDecoration: 'none' }}>
                                    <img src={e.eventImg} style={{ height: 200 }} className="card-img-top" alt={e.eventImg} />
                                    <div className="card-body">
                                        <h5 className="card-title">{e.eventName}</h5>

                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">No of seats : {e.noOfSeat}</li>
                                        <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>

                                    </ul>
                                </Link>
                            </div>

                        </td>
                    </>
                )
            } else {
                i++;
                return (
                    <td>
                        <div className="card ms-5 mt-3 mb-3" style={{ width: "18rem", textAlign: "center" }}>
                            <Link onClick={scrollup()} to={"/loginEvent/" + e._id} style={{ textDecoration: 'none' }}>
                                <img src={e.eventImg} style={{ height: 200 }} className="card-img-top" alt={e.eventImg} />
                                <div className="card-body">
                                    <h5 className="card-title">{e.eventName}</h5>

                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">No of seats : {e.noOfSeat}</li>
                                    <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>

                                </ul>
                            </Link>
                        </div>
                    </td>
                )
            }
        }
    })

    return (
        <>
        {!loading ? (
            <>
            {formatedEvent}
            </>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px' }} />
            </div>
        )}
        </>
    )
}






export function MyEvent() {
    const [allEvent, setallEvent] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("https://studentapironak.onrender.com/")
            .then((res) => res.json())
            .then((res) => {
                setallEvent(res)
                setLoading(false)
            });
    }, []);

    var i = -1;

    var formatedEvent = allEvent.map((e) => {
        if (e.memberId.includes(localStorage.getItem('studentId'))) {
            if (i === 3) {
                i = 0;
                return (
                    <>
                        <tr>
                        </tr>
                        <td>

                            <div className="card me-3 ms-3 " style={{ width: "18rem", textAlign: "center" }}>
                                <Link to={"/loginEvent/" + e._id} style={{ textDecoration: 'none' }}>
                                    <img src={e.eventImg} style={{ height: 200 }} className="card-img-top" alt={e.eventImg} />
                                    <div className="card-body">
                                        <h5 className="card-title">{e.eventName}</h5>

                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">No of seats : {e.noOfSeat}</li>
                                        <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>

                                    </ul>
                                </Link>
                            </div>

                        </td>
                    </>
                )
            } else {
                i++;
                return (
                    <td>
                        <div className="card me-3 ms-3" style={{ width: "18rem", textAlign: "center" }}>
                            <Link to={"/loginEvent/" + e._id} style={{ textDecoration: 'none' }}>
                                <img src={e.eventImg} style={{ height: 200 }} className="card-img-top" alt={e.eventImg} />
                                <div className="card-body">
                                    <h5 className="card-title">{e.eventName}</h5>

                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">No of seats : {e.noOfSeat}</li>
                                    <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>

                                </ul>
                            </Link>
                        </div>
                    </td>
                )
            }
        }
    })

    return (
        <>
        {!loading ? (
            <>
            {formatedEvent}
            </>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px' ,  color: 'black'}} />
            </div>
        )}
        </>
    )
}



export function LoginAllEvent1() {
    const [allEvent, setallEvent] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("https://studentapironak.onrender.com/")
            .then((res) => res.json())
            .then((res) => {
                setallEvent(res)
                setLoading(false)
            });
    }, []);

    var i = -1;

    var formatedEvent = allEvent.map((e) => {
        if (i === 3) {
            i = 0;
            return (
                <>
                    <tr>
                    </tr>
                    <td>

                        <div className="card me-4" style={{ width: "18rem", textAlign: "center" }}>
                            <Link to={"/loginEvent/" + e._id} style={{ textDecoration: 'none' }}>
                                <img src={e.eventImg} style={{ height: 200 }} className="card-img-top" alt={e.eventImg} />
                                <div className="card-body">
                                    <h5 className="card-title">{e.eventName}</h5>

                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">No of seats : {e.noOfSeat}</li>
                                    <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>

                                </ul>
                            </Link>
                        </div>

                    </td>
                </>
            )
        } else {
            i++;
            return (
                <td>
                    <div className="card me-4" style={{ width: "18rem", textAlign: "center" }}>
                        <Link to={"/loginEvent/" + e._id} style={{ textDecoration: 'none' }}>
                            <img src={e.eventImg} style={{ height: 200 }} className="card-img-top" alt={e.eventImg} />
                            <div className="card-body">
                                <h5 className="card-title">{e.eventName}</h5>

                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">No of seats : {e.noOfSeat}</li>
                                <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>

                            </ul>
                        </Link>
                    </div>
                </td>
            )
        }

    })

    return (
        <>
        {!loading ? (
            <div className='ms-4'>
            {formatedEvent}
        </div>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px' ,  color: 'black'}} />
            </div>
        )}
        </>
        
    )
}



export function Event2() {
    const [allEvent, setallEvent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://studentapironak.onrender.com/")
            .then((res) => res.json())
            .then((res) => {
                setallEvent(res)
                setLoading(false)
            });
    }, []);

    function scrollup() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    var i = -1;

    var formatedEvent = allEvent.map((e) => {
        if (i === 3) {
            i = 0;
            return (
                <>
                    <tr>
                    </tr>
                    <td>

                        <div className="card me-4" style={{ width: "18rem", textAlign: "center" }}>
                            <Link to={"/event/" + e._id} style={{ textDecoration: 'none' }}>
                                <img src={e.eventImg} style={{ height: 200 }} className="card-img-top" alt={e.eventImg} />
                                <div className="card-body">
                                    <h5 className="card-title">{e.eventName}</h5>

                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">No of seats : {e.noOfSeat}</li>
                                    <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>

                                </ul>
                            </Link>
                        </div>

                    </td>
                </>
            )
        } else {
            i++;
            return (
                <td>
                    <div className="card me-4" style={{ width: "18rem", textAlign: "center" }}>
                        <Link to={"/event/" + e._id} style={{ textDecoration: 'none' }}>
                            <img src={e.eventImg} style={{ height: 200 }} className="card-img-top" alt={e.eventImg} />
                            <div className="card-body">
                                <h5 className="card-title">{e.eventName}</h5>

                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">No of seats : {e.noOfSeat}</li>
                                <li className="list-group-item">Date : {new Date(e.eventDate).toDateString()}</li>

                            </ul>
                        </Link>
                    </div>
                </td>
            )
        }
    })

    return (
        <>
        {!loading ? (
            <div className='ms-4'>
            {formatedEvent}
        </div>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px' ,  color: 'black'}} />
            </div>
        )}
        </>
    )
}