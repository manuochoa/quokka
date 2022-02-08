import Goto from "./../Icons/Goto";

export default function Statistics({ userInvestment, project, ...props }) {
  const getDate = () => {
    var today = new Date();
    return today.toISOString().substring(0, 10);
  };
  return (
    <ul className="stats main__background" {...props}>
      <li className="stats__section">
        <div className="stats__row">
          <h3 className="stats__title stats__title--main">Statistics</h3>
          <button className="stats__goto">
            <Goto className="stats__goto-icon" />
          </button>
        </div>
        <time className="stats__text stats__text--date">{`${getDate()}`}</time>
      </li>
      <li className="stats__section">
        <div className="stats__progress">
          <h4 className="stats__title stats__title--small">Raised</h4>
          <div className="stats__progress-bar">
            <span
              className="stats__progress-track"
              style={{
                width:
                  Number(project.PercInvested) <= 100
                    ? `${Number(project.PercInvested)}%`
                    : "100%",
              }}
            ></span>
          </div>
          <div className="stats__progress-row">
            <span className="stats__progress-text">
              ${project.USDInvested.toString()}
            </span>
            <span className="stats__progress-text">
              ${project.Goal.toString()}
            </span>
          </div>
        </div>
        <div className="stats__progress">
          <h4 className="stats__title stats__title--small">
            Tokens Distributed
          </h4>
          <div className="stats__progress-bar">
            <span
              className="stats__progress-track"
              style={{
                width:
                  Number(project.TokensPaidOut) === 0
                    ? "0%"
                    : `${Number(
                        (project.TokensPaidOut * 100) / project.totalTokens
                      )}%` || "0%",
              }}
            ></span>
          </div>
          <div className="stats__progress-row">
            <span className="stats__progress-text">
              {Number(project.TokensPaidOut / 10 ** project.PayoutDecimals) ||
                "0"}
            </span>
            <span className="stats__progress-text">
              {Number(project.totalTokens / 10 ** project.PayoutDecimals) ||
                "0"}
            </span>
          </div>
        </div>
      </li>
      <li className="stats__section">
        <ul className="stats__list">
          <li className="stats__item">
            <span className="stats__text">Minimum investment</span>
            <span className="stats__text stats__text--value">
              {project.MinInvest.toString()}{" "}
            </span>
          </li>
          <li className="stats__item">
            <span className="stats__text">Maximum investment</span>
            <span className="stats__text stats__text--value">
              {project.MaxInvest.toString()}
            </span>
          </li>
          <li className="stats__item">
            <span className="stats__text">Time remaining</span>
            <span className="stats__text stats__text--value">
              {`${Number(project.countdown.Days)} Days, ${Number(
                project.countdown.Hours
              )} Hours, ${Number(project.countdown.Minutes)} Minutes`}
            </span>
          </li>
        </ul>
      </li>
      <li className="stats__section">
        <ul className="stats__list">
          <li className="stats__item">
            <span className="stats__text">Amount invested</span>
            <span className="stats__text stats__text--value">
              $ {userInvestment.depositedUSD.toString()}
            </span>
          </li>
          <li className="stats__item">
            <span className="stats__text">Tokens to claim</span>
            <span className="stats__text stats__text--value">
              {Number(
                userInvestment.claimableTokens / 10 ** project.PayoutDecimals
              ).toFixed(4)}
            </span>
          </li>
          <li className="stats__item">
            <span className="stats__text">Tokens paid out</span>
            <span className="stats__text stats__text--value">
              {Number(
                userInvestment.tokensReceived / 10 ** project.PayoutDecimals
              ).toFixed(4)}
            </span>
          </li>
        </ul>
      </li>
    </ul>
  );
}
