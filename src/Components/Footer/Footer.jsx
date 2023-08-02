import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
        backgroundColor: '#f1f1f1', 
        padding: '10px', 
        textAlign: 'center', 
        position: 'fixed', 
        bottom: 0, 
        width: '100%' 
      }}>
        <p style={{ margin: '0' }}>© {new Date().getFullYear()} CRYPTO. All rights reserved.</p>
      </footer>
  );
};

export default Footer;
