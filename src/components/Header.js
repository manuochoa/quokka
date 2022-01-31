import Wallet from '../Icons/Wallet';
import Logo from './../Icons/Logo';
import Copy from './../Icons/Copy';
import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationProvider';
import Disconnect from './../Icons/Disconnect';

export default function Header({ popupVisible, setPopupVisible }) {
    const { setNotification } = useContext(NotificationContext);

    function handleCopy() {
        window.navigator.clipboard.writeText("0x7c8d1c186506df224a4e781b9f4ac6b9fasda21");
        setNotification("Your address is copied.");
    }

    return (
        <header className="header">
            <div className="header__wrapper container">
                <a href="/" className="logo header__logo">
                    <Logo className="logo__icon" />
                </a>
                <button className={"button button--header header__button" + (popupVisible ? " active" : "")} onClick={() => setPopupVisible(true)}>Connect Wallet</button>
                <div className="header__account" style={{ display: "none" }}>
                    <div className="header__account-row">
                        <Wallet className="header__account-icon" />
                        <h3 className="header__account-title">Your Wallet Address</h3>
                    </div>
                    <button className="header__account-row" onClick={handleCopy}>
                        <Copy className="header__account-icon" />
                        <h3 className="header__account-address">0x7c8d1c186506df224a4e781b9f4ac6b9fasda21</h3>
                    </button>
                </div>
                <button className="header__disconnect" style={{ display: "none" }}>
                    <Disconnect className="header__disconnect-icon" />
                </button>
            </div>
        </header>
    );
}