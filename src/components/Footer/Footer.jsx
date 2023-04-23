// import "./Footer.scss"
import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <a href="https://github.com/alyamba" target="_blank" rel="noreferrer" className='footerLink'>
        MY PERSONAL PAGE
      </a>
      <hr />
      <div className="about-container">
        <p className="text-about">BEAUTY SALON BLOOM</p>
        <p className="creator">© 2023 by alyamba</p>
      </div>
    </footer>
  );
};

export default Footer;
