import ArrowLeft from "../Icons/ArrowLeft";
import Popup from "./common/Popup";

import metamaskIcon from "../images/icons/metamask.svg";
import wcIcon from "../images/icons/wc.svg";
import { useState } from "react";

export default function ConnectPopup({
  popupVisible,
  setPopupVisible,
  connectMetamask,
  connectWalletConnect,
}) {
  const [checkboxes, setCheckboxes] = useState({
    metamask: false,
    walletConnect: false,
  });

  function closePopup() {
    setPopupVisible(false);
  }

  return (
    <Popup
      className="popup--connect"
      popupShow={popupVisible}
      setPopupShow={setPopupVisible}
    >
      <header className="popup__header">
        <button className="popup__back" onClick={closePopup}>
          <ArrowLeft className="popup__back-icon" />
          <span>Back</span>
        </button>
        <h2 className="popup__title popup__title--header">Connect Wallet</h2>
      </header>
      <div className="popup__scrollwrapper scrollwrapper">
        <div className="popup__container">
          <h1 className="popup__title popup__title--main">Select Method</h1>
          <div className="popup__checkboxes">
            <button
              className={
                "popup__checkbox" + (checkboxes.metamask ? " active" : "")
              }
              onClick={() => connectMetamask()}
            >
              <div className="popup__checkbox-icon-wrapper">
                <img
                  src={metamaskIcon}
                  className="popup__checkbox-icon"
                  alt="metamask"
                />
              </div>
              <span>Metamask</span>
            </button>
            <button
              className={
                "popup__checkbox" + (checkboxes.walletConnect ? " active" : "")
              }
              onClick={() => connectWalletConnect()}
            >
              <div className="popup__checkbox-icon-wrapper">
                <img
                  src={wcIcon}
                  className="popup__checkbox-icon"
                  alt="wallet connect"
                />
              </div>
              <span>WalletConnect</span>
            </button>
          </div>
          <div className="popup__row">
            <p className="popup__text">New to Blockchain?</p>
            &nbsp;
            <a href="/" className="popup__text popup__text--link">
              Learn more about wallets
            </a>
          </div>
        </div>
      </div>
      <button
        className="popup__button popup__button--close"
        onClick={closePopup}
      >
        Close
      </button>
      <button className="popup__button">Connect</button>
    </Popup>
  );
}
