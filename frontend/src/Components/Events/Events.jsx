import React, { useState } from 'react';
import './Events.css';
import {Event} from '../Event/Event'
import { Footer } from '../Footer/Footer';
import { Navbar1 } from '../Navbar/Navbar';

const Events = () => {
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
    <Navbar1/>
      <div className='eventList'>
        <table className='table p-5'>
            <Event/>
        </table>
      </div>
    <Footer/>
    </>
  );
};

export default Events
