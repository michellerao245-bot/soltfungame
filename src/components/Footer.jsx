import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerStyles = {
    container: {
      background: "#0b1426",
      padding: "60px 20px 30px 20px",
      borderTop: "1px solid rgba(59, 130, 246, 0.1)",
      width: "100%",
      boxSizing: "border-box",
      marginTop: "auto",
      position: "relative"
    },
    grid: {
      display: "flex",
      justifyContent: "space-between",
      maxWidth: "1100px",
      margin: "0 auto",
      flexWrap: "wrap",
      textAlign: "left"
    },
    col: {
      minWidth: "180px",
      marginBottom: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "4px"
    },
    h4: {
      color: "#f59e0b",
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "16px",
      textTransform: "uppercase",
      letterSpacing: "1px"
    },
    linkButton: {
      background: "none",
      border: "none",
      color: "#94a3b8",
      fontSize: "14px",
      padding: "6px 0",
      textAlign: "left",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      width: "fit-content",
      outline: "none",
      display: "block"
    },
    hr: { border: "0", borderTop: "1px solid rgba(255, 255, 255, 0.05)", margin: "30px auto", maxWidth: "1100px" },
    socialLink: {
      color: "#94a3b8",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      transition: "all 0.2s ease",
      cursor: "pointer"
    },
    highlightText: {
      fontSize: "14px",
      color: "#22d3ee",
      fontWeight: "600",
      textAlign: "center",
      marginTop: "20px",
      letterSpacing: "0.5px",
      textShadow: "0 0 10px rgba(34, 211, 238, 0.3)",
      fontFamily: "sans-serif"
    }
  };

  const handleLinkClick = (e, itemName) => {
    e.preventDefault();
    console.log(`Navigating to: ${itemName}`);

    const routeMap = {
      'Terms of Use': '/terms',
      'Private Policy': '/privacy',
      'Marketing Service': '/marketing',
      'Documentation': '/documentation'
    };

    if (routeMap[itemName]) {
      navigate(routeMap[itemName]);
    } else if (itemName === 'Support Chat') {
      window.open('https://discordapp.com/invite/ru3haKpN8', '_blank', 'noopener,noreferrer');
    }
  };

  const handleButtonEnter = (e) => {
    e.currentTarget.style.color = "#22d3ee";
    e.currentTarget.style.paddingLeft = "6px";
    e.currentTarget.style.textShadow = "0 0 8px rgba(34, 211, 238, 0.6)";
  };

  const handleButtonLeave = (e) => {
    e.currentTarget.style.color = "#94a3b8";
    e.currentTarget.style.paddingLeft = "0";
    e.currentTarget.style.textShadow = "none";
  };

  return (
    <footer style={footerStyles.container}>
      <div style={footerStyles.grid}>
        <div style={footerStyles.col}>
          <h4 style={footerStyles.h4}>Products</h4>
          {['SoltMint', 'SoltSale', 'SoltLock', 'SoltDrop'].map((item) => (
            <button key={item} style={footerStyles.linkButton} onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} onClick={(e) => handleLinkClick(e, item)}>{item}</button>
          ))}
        </div>
        <div style={footerStyles.col}>
          <h4 style={footerStyles.h4}>Company</h4>
          {['Our Story', 'Press Kit', 'Terms of Use', 'Private Policy'].map((item) => (
            <button key={item} style={footerStyles.linkButton} onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} onClick={(e) => handleLinkClick(e, item)}>{item}</button>
          ))}
        </div>
        <div style={footerStyles.col}>
          <h4 style={footerStyles.h4}>Resources</h4>
          {['Documentation', 'Support Chat', 'Marketing Service'].map((item) => (
            <button key={item} style={footerStyles.linkButton} onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} onClick={(e) => handleLinkClick(e, item)}>{item}</button>
          ))}
        </div>
      </div>
      <hr style={footerStyles.hr} />
      <p style={footerStyles.highlightText}>© 2026 Soltchain Technologies. All rights reserved.</p>
    </footer>
  );
};

export default Footer;