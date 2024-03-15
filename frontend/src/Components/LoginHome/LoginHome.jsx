import React, { useState } from 'react';
import './LoginHome.css';
import welcome from '../../assets/welcome.jpg'
import {Event, LoginEvent} from '../Event/Event'
import { Footer } from '../Footer/Footer';
import { Navbar3 } from '../Navbar/Navbar';

const LoginHome = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  const showSlides = (n) => {
    const slides = document.querySelectorAll(".mySlides");
    const dots = document.querySelectorAll(".dot");
    if (n > slides.length) {
      setSlideIndex(1);
    }
    if (n < 1) {
      setSlideIndex(slides.length);
    }
    slides.forEach(slide => {
      slide.style.display = "none";
    });
    dots.forEach(dot => {
      dot.classList.remove("active");
    });
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
  };

  return (
    <>
    <Navbar3/>
      <div className='eventList'>
        <table className='table p-5'>
            <LoginEvent/>
        </table>
      </div>
    <Footer/>
    </>
  );
};


export default LoginHome;