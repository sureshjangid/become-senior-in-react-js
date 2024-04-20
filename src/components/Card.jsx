
  
   const Image = ({ children }) => {
    return (
      <div style={{
        marginBottom: '10px',
      }}>
        {children}
      </div>
    );
  };
  const Header = ({ children }) => {
    return (
      <div style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '10px',
      }}>
        {children}
      </div>
    );
  };
  
  const Body = ({ children }) => {
    return (
      <div style={{
        fontSize: '1rem',
        lineHeight: '1.4',
        marginBottom: '15px',
      }}>
        {children}
      </div>
    );
  };
  
  const Footer = ({ children }) => {
    return (
      <div style={{
        borderTop: '1px solid #ccc',
        paddingTop: '10px',
        marginTop: '10px',
        fontSize: '0.9rem',
        color: '#666',
      }}>
        {children}
      </div>
    );
  };

  const Card = ({ children }) => {
    return (
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '20px',
        maxWidth: '300px',
        backgroundColor: '#fff',
      }}>
        {children}
      </div>
    );
  };
  Card.Image = Image;
  Card.Header = Header;
  Card.Body = Body;
  Card.Footer = Footer;
  
  export default Card;
  