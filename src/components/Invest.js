import React, { useState } from 'react';
import Input from './common/Input';

export default function Invest({ ...props }) {
    const [value, setValue] = useState(0);
    
    return (
        <div className="main__background invest" {...props}>
            <h1 className="invest__title title">Invest</h1>
            <Input value={value} setValue={setValue} className="input-wrapper--invest" />
            <div className="invest__buttons">
                <button className="invest__button button">Approve BUSD</button>
                <button className="invest__button button button--blue">Deposit BUSD</button>
            </div>
        </div>
    );
}
