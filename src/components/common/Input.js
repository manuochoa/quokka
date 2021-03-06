import NumberFormat from "react-number-format";
import USD from "./../../Icons/USD";

export default function Input({
  BUSDBalance,
  className,
  value,
  setValue,
  truncateToDecimals,
  project,
  onClick,
}) {
  function handleInputChange({ value }) {
    if (value > Number(project.MaxInvest)) {
      setValue(Number(project.MaxInvest));
    } else if (value < 0) {
      setValue(0);
    } else {
      setValue(value);
    }
  }

  return (
    <div className={"input-wrapper " + (className ? className : "")}>
      <div className="input-wrapper__row">
        <div className="input-wrapper__icon-wrapper">
          <USD className="input-wrapper__icon" />
        </div>
        <NumberFormat
          className="input input-wrapper__input"
          value={value}
          onValueChange={handleInputChange}
          placeholder="Enter value"
          thousandSeparator={true}
          allowLeadingZeros={false}
          allowNegative={false}
        />
        <div className="input-wrapper__arrows">
          <button
            className="input-wrapper__arrow input-wrapper__arrow--top"
            onClick={() => setValue(++value)}
          ></button>
          <button
            className="input-wrapper__arrow"
            onClick={() => setValue(value > 0 ? --value : 0)}
          ></button>
        </div>
      </div>
      <button
        className="input-wrapper__button"
        onClick={() => setValue(truncateToDecimals(BUSDBalance / 10 ** 18, 2))}
      >
        Max
      </button>
    </div>
  );
}
