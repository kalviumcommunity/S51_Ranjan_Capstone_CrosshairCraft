import React from 'react';
import linked from  '../assets/linkedin.png';


const Footer = () => {
  return (
    <footer className="footer">
        <div className='container foot_tbs'>
            <p>Follow Us on - <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer"><img id='linked' src={linked} alt="linked   " /></a> </p>
        </div> 
        <div id='year' className='foot_tbs'>
            <p>&copy; {new Date().getFullYear()} Crosshair craft</p>
        </div>
        <div className='foot_tbs'>
            <p>contact:ranjan.m1325@gmail.com</p>
        </div>     
        
    </footer>
  );
};

export default Footer;
