import React, { useState } from 'react';
import about1 from '../../../assets/images/course/1.jpg';
import about2 from '../../../assets/images/course/4.jpg';
import './index.css';

function AboutSection({ title }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div>
      <div className="about-container flex flex-col-reverse md:flex-row">
        <div className="about-images">
          <div className="main-image">
            <img src={about1} alt="Main Course Image" />
            <a href="#!" onClick={toggleMenu} className="play-button" aria-label="Play Video">
              <span className="play-icon"></span>
            </a>
          </div>
          <div className="secondary-image">
            <img src={about2} alt="Secondary Course Image" />
          </div>
        </div>
        <div className="about-content">
          {title && <span className="section-title">Our Story</span>}
          <h2 className="about-title">Access to Learning<br />Anytime & Anywhere</h2>
          <p className="about-text">
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
          <ul className="about-features">
            <li>Flexible Timing</li>
            <li>Easy Learning</li>
            <li>Affordable</li>
            <li>World Class</li>
          </ul>
          <a href="#!" onClick={(e) => e.preventDefault()} className="learn-more">
            Learn More <span className="arrow-icon"></span>
          </a>
        </div>
      </div>

      <div className={`modal ${open ? '' : 'modal-hidden'}`}>
        <div className="modal-content">
          <button className="modal-close" onClick={toggleMenu}>
            <span className="close-icon"></span>
          </button>
          <div className="modal-iframe">
            <iframe
              width="750"
              height="400"
              src="https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1"
              title="myFrame"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;