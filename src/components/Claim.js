export default function Claim({
  handleClaim,
  project,
  userInvestment,
  isLoading,
  ...props
}) {
  return (
    <div className="claim" {...props}>
      <h1 className="claim__title title">Claim</h1>
      <p className="claim__text">
        {Number(
          userInvestment.claimableTokens / 10 ** project.PayoutDecimals
        ).toFixed(4)}{" "}
        {project.payoutSymbol} Tokens Ready to Claim
      </p>
      <button
        disabled={!project.claimStatus || isLoading}
        onClick={() => handleClaim(project.id)}
        className="button button--blue claim__button"
      >
        Claim
      </button>
    </div>
  );
}
