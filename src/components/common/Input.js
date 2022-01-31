import NumberFormat from "react-number-format";
import USD from './../../Icons/USD';

export default function Input({ className, value, setValue, buttonTitle, onClick }) {
    
    function handleInputChange({ value }) {
        setValue(value);
    }

    return (
        <div className={"input-wrapper " + (className ? className : "")}>
            <div className="input-wrapper__row">
                <div className="input-wrapper__icon-wrapper">
                    <USD className="input-wrapper__icon" />
                </div>
                <NumberFormat className="input input-wrapper__input" value={value} onValueChange={handleInputChange} placeholder="Enter value" thousandSeparator={true} allowLeadingZeros={false} allowNegative={false} />
                <div className="input-wrapper__arrows">
                    <button className="input-wrapper__arrow input-wrapper__arrow--top" onClick={() => setValue(++value)}></button>
                    <button className="input-wrapper__arrow" onClick={() => setValue(value > 0 ? --value : 0)}></button>
                </div>
            </div>
            <button className="input-wrapper__button" onClick={onClick}>Max</button>
        </div>
    );
}
