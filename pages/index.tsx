import Splash from '../components/Splash';
import { useState  } from 'react';
import InorOut from '../components/InorOut';
import Navbar from '../components/Navbar';


export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  setTimeout(() => {
    setShowSplash(false)
  }, 2000);
  return (
    <div className='mobile-landing'>
      <Navbar />
      {
        showSplash ? <Splash /> : <InorOut />
      }
      
    </div>
  )
}
