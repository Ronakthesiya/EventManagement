import React, { lazy, Suspense } from 'react'
import './CSS/HomePage.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

const StyledCircularProgress = styled(CircularProgress)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

const EventById = lazy(() => import('../Components/EventById/EventById.jsx'));
const LoginEventById = lazy(() => import('../Components/EventById/LoginEventById.jsx'));
const About = lazy(() => import('../Components/About/About.jsx'));
const Signup = lazy(() => import('../Components/Signup/Signup.jsx'));
const AllEvent = lazy(() => import('../Components/AllEvent/AllEvent.jsx'));
const LoginAllEvent = lazy(() => import('../Components/AllEvent/LoginAllEvent.jsx'));
const LoginHome = lazy(() => import('../Components/LoginHome/LoginHome.jsx'));
const LoginMyEvents = lazy(() => import('../Components/LoginMyEvents/LoginMyEvents.jsx'));
const AdminHome = lazy(() => import('../Components/Admin/AdminHome/AdminHome.jsx'));
const SidebarEventById = lazy(() => import('../Components/Admin/SidebarEventById/SidebarEventById.jsx'));
const RagisterForm = lazy(() => import('../Components/RagisterForm/RagisterForm.jsx'));
const EditEvent = lazy(() => import('../Components/Admin/EditEvent/EditEvent.jsx'));
const StudentListByEvent = lazy(() => import('../Components/Admin/StudentListByEvent/StudentListByEvent.jsx'));
const AdminProfile = lazy(() => import('../Components/Admin/AdminProfile/AdminProfile.jsx'));
const LoginAbout = lazy(() => import('../Components/About/LoginAbout.jsx'));
const LoginHelp = lazy(() => import('../Components/Help/LoginHelp.jsx'));
const Help = lazy(() => import('../Components/Help/Help.jsx'));
const Events = lazy(() => import('../Components/Events/Events.jsx'));


export const HomePage = () => {
    return (
        <Suspense fallback={<StyledCircularProgress size={60} thickness={4} />}>
                <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Events />} />
                    <Route path='/home' element={<Events />} />
                    <Route path='/allevent' element={<AllEvent />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/help' element={<Help />} />
                    <Route path='/event/:id' element={<EventById />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/loginHome' element={<LoginHome />} />
                    <Route path='/loginallevent' element={<LoginAllEvent />} />
                    <Route path='/loginabout' element={<LoginAbout />} />
                    <Route path='/loginhelp' element={<LoginHelp />} />
                    <Route path='/loginEvent/:id' element={<LoginEventById />} />
                    <Route path='/loginmyevent' element={<LoginMyEvents />} />
                    <Route path='/adminhome' element={<AdminHome />} />
                    <Route path='/sidebarevent/:id' element={<SidebarEventById />} />
                    <Route path='/ragusterform/:id' element={<RagisterForm />} />
                    
                    <Route path='/sidebarevent/edit/:id' element={<EditEvent />} />
                    <Route path='/adminhome/studentlistbyevent/:id' element={<StudentListByEvent />} />
                    <Route path='/adminhome/profile' element={<AdminProfile />} />
                </Routes>
        </BrowserRouter>
            </Suspense>
    )
}



