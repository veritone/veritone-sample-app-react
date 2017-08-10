import React from 'react';
const Footer = (props = {}) => {
  return (
    <div className="footer">
      <div className="content">
        <span>&copy; Veritone, Inc. All Rights Reserved.</span>
        <span><a href='https://www.veritone.com/wp/terms/' target='_blank' rel="noopener noreferrer">Terms of Service</a></span>
        <span><a href='https://www.veritone.com/wp/privacy/' target='_blank' rel="noopener noreferrer">Privacy Policy</a></span>
      </div>
    </div>
  );
};

export default Footer;
