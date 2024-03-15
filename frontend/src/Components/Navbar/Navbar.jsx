import React from 'react'
import './Navbar.css'
import { Link, Outlet } from 'react-router-dom'

//without login Navbar
export const Navbar1 = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/home">Logo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active text-light  bg-transparent " aria-current="page" to="/allevent">Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light  bg-transparent" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light  bg-transparent" aria-disabled="true" to='/help'>Help</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Link to={"/signup"} className="button btn btn-success" style={{backgroundColor:"#3253e6"}}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}


//on click signup Navbar (signup page navebar)
export const Navbar2 = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/home">Logo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active text-light  bg-transparent" aria-current="page" to="/allevent">Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light  bg-transparent" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light  bg-transparent" aria-disabled="true" to='/help'>Help</Link>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </nav>
            <Outlet />
        </div>
    )
}


//after signup Navbar (LoginHome navbar)
export const Navbar3 = () => {
    function logout(){
        localStorage.clear();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/loginHome">Logo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active text-light bg-transparent" aria-current="page" to="/loginallevent">All Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light  bg-transparent" aria-current="page" to="/loginmyevent">My Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light  bg-transparent" to="/loginabout">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light  bg-transparent" aria-disabled="true" to='/loginhelp'>Help</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Link to={"/home"} className="button btn btn-success" onClick={logout} style={{backgroundColor:"#3253e6"}}>
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}