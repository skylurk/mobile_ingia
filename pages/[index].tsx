import Splash from '../components/Splash';
import { useState  } from 'react';
import InorOut from '../components/InorOut';
import Navbar from '../components/Navbar';

import { useRouter } from 'next/dist/client/router';


export default function Home() {

  const router = useRouter();
  const pid = (router.query);

  const page_id = pid ? Object.values(pid) : '';
  const [showSplash, setShowSplash] = useState(true);
  setTimeout(() => {
    setShowSplash(false)
  }, 2000);
  return (
    <div className='mobile-landing'>
      <Navbar />
      {
        showSplash ? <Splash /> : <InorOut page_id = {page_id}/>
      }
      
    </div>
  )
}
