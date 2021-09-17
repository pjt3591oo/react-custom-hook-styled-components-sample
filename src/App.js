import { useEffect } from 'react';
import Button from './components/button';
import useDisplay from './hooks/useDisplay';
import './App.css';

function App() {
  const { isMobile, isTablet, isDesktop } = useDisplay();

  useEffect(() => {
    console.log(`isMobile: ${isMobile}, isTablet: ${isTablet}, isDesktop: ${isDesktop}`);
  }, [isMobile, isTablet, isDesktop])

  return (
    <div className="App">
      <Button>btn</Button>
    </div>
  );
}

export default App;
