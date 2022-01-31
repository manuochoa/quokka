import Rewards from './../Icons/Rewards';
import InvestIcon from './../Icons/InvestIcon';
import ClaimIcon from './../Icons/ClaimIcon';

export default function Footer({ sections, setSections }) {

    function changeSection(index) {
        setSections(sections.map((item, itemIndex) => index === itemIndex ? true : false));
    }

    return (
        <footer className="footer">
            <ul className="footer__menu container">
                <li className="footer__menu-item">
                    <button className={"footer__menu-button" + (sections[0] ? " active" : "")} onClick={() => changeSection(0)}>
                        <Rewards className="footer__menu-icon" />
                        <p>Rewards</p>
                    </button>
                </li>
                <li className="footer__menu-item">
                    <button className={"footer__menu-button" + (sections[1] ? " active" : "")} onClick={() => changeSection(1)}>
                        <InvestIcon className="footer__menu-icon" />
                        <p>Invest</p>
                    </button>
                </li>
                <li className="footer__menu-item">
                    <button className={"footer__menu-button" + (sections[2] ? " active" : "")} onClick={() => changeSection(2)}>
                        <ClaimIcon className="footer__menu-icon" />
                        <p>Claim</p>
                    </button>
                </li>
            </ul>
        </footer>
    );
}
