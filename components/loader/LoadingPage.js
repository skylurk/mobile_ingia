import { PuffLoader, PulseLoader  } from "react-spinners";

const LoadingPage = (props) => {
    props.func('My name is Dean Winchester & this is my brother Sammie');
    props.secfunc('We hypnotize');
    return ( 
        <div className="loading-page">
            <PuffLoader size='150px' color='#1741ff' />
            <h4>Loading <PulseLoader size='4px'  color='#1741ff'/></h4>
        </div>
     );
}
 
export default LoadingPage;