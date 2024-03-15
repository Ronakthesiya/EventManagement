import React from 'react'
import './Footer.css'
import instagrm_icon from '../../assets/insta.png'
import pintester_icon from '../../assets/pantro.png'
import whatsapp_icon from '../../assets/whatsapp.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <p>Evento</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img className='appIcon' src={instagrm_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img className='appIcon' src={pintester_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img className='appIcon' src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr/>
            <p>Copyright @ 2023 - All Right Reserved.</p>
        </div>
    </div>
  )
}
