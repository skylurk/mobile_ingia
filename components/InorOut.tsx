import React from 'react';
import  Link  from 'next/link'; 

function InorOut() {
    return (
        <div className='in-or-out'>
            <h3>Center Name </h3>
            <Link href='/checkin'>
                <a>
                    <button className="filled_btn">
                        Check In
                    </button>
                </a>
            </Link>
            <h4>OR</h4>

            <Link href='/checkout'>
                <a>
                <button className="outline_btn">
                    Check Out
                </button>
                </a>
            </Link>
        </div>
    )
}

export default InorOut
