export default function Claim({ userInvestment, ...props }) {
  return (
    <div className="claim" {...props}>
      <h1 className="claim__title title">Claim</h1>
      <p className="claim__text">
        {userInvestment.claimableTokens.toString()} Tokens Ready to Claim
      </p>
      <button className="button button--blue claim__button">Claim</button>
    </div>
  );
}
