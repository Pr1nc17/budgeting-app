import React, { useState } from 'react';

function AddButton() {
  const [showLabel, setShowLabel] = useState(false);

  const handleClick = () => {
    setShowLabel(!showLabel);
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '70px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    }}>
      {showLabel && (
        <div style={{
          transition: 'opacity 0.3s ease-in-out',
          backgroundColor: '#fff',
          padding: '8px 12px',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          height: showLabel ? 'auto' : 0,
          overflow: 'hidden',
        }}>
          Add New Transaction
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
      }}>
        <button style={{
          backgroundColor: '#28a745',  
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '8px 12px',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
          Filter Date
        </button>

        <button
          onClick={handleClick}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '32px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <span style={{ position: 'relative', top: '-2.7px', left: '0.8px' }}>+</span>
        </button>

        <button style={{
          backgroundColor: '#17a2b8',  // teal
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '8px 12px',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
          Sort By Amount
        </button>
      </div>
    </div>
  );
}

export default AddButton;
