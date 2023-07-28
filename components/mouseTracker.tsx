import { useEffect, useState } from 'react';

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event : any) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up after the component is unmounted
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <h1>Mouse Tracker</h1>
      <p>Current mouse position: {position.x}, {position.y}</p>
    </div>
  );
};

export default MouseTracker;
