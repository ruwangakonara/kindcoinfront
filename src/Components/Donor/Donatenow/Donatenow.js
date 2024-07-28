import React from 'react';
import { Button } from 'semantic-ui-react';
import '../../../Components/Donor/Donatenow/Donate2.css';

export default function Donatenow() {
    return (
        <div className='donatex'>
            <a href="http://localhost:3000/donor/open-requests">
                <Button className='donatebuttonx'>
                    Donate Now
                </Button>
            </a>
        </div>
    );
}
