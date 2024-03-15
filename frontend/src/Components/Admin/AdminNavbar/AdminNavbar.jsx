import React from 'react';
import './AdminNavbar.css';
import { Link, Outlet } from 'react-router-dom';
import adminprofile from '../../../assets/adminprofile.png'

export const AdminNavbar = () => {
    function logout(){
        localStorage.clear();
    }

    return (
        <div >
            <div className='mainbar'>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <img style={{height:30}} src={adminprofile}/>
                    <Link className="adminname navbar-brand text-light" to="/adminhome/profile">{localStorage.getItem('adminName')}</Link>
                  
                    <div className="navbar-brand text-light adminname">Admin Panel</div>
                    
                    <div className='loginbtn'>
                        <Link to={"/home"} className='mainlogin' onClick={logout}>
                            Logout
                        </Link>
                    </div>
                </div>
                
            </nav>
            </div>
            
            <Outlet />
        </div>
    )
}
