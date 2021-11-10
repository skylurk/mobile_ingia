import { PuffLoader, PulseLoader  } from "react-spinners";

const LoadingPage = () => {
    return ( 
        <div className="loading">
            <PuffLoader size='200px' color='#1741ff' />
            <h4 className='ingia-blue-txt'>
                Loading<PulseLoader size='4px' color='#1741ff'/>
            </h4>
        </div>
     );
}
 
export default LoadingPage;