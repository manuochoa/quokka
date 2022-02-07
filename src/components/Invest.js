import React, { useState } from "react";
import Input from "./common/Input";
import { approveBUSD, depositUSD } from "../blockchain/functions";
import { toast } from "react-toastify";

export default function Invest({
  userAddress,
  walletType,
  checkAllowance,
  isBUSDApproved,
  getUserProjectInvestment,
  project,
  BUSDBalance,
  truncateToDecimals,
  getProjectDetails,
  ...props
}) {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    setIsLoading(true);
    let receipt = await approveBUSD(walletType);
    if (receipt) {
      console.log(receipt);
      toast.success("Transaction sent succesfully");
      checkAllowance();
    }
    setIsLoading(false);
  };

  const handleDeposit = async () => {
    setIsLoading(true);
    let receipt = await depositUSD(project.id, value, walletType);
    if (receipt) {
      console.log(receipt);
      toast.success("Transaction sent succesfully");
      getUserProjectInvestment(project.id);
      getProjectDetails();
    }
    setIsLoading(false);
  };

  return (
    <div className="main__background invest" {...props}>
      <h1 className="invest__title title">Invest</h1>
      <h4>BUSD Balance: {truncateToDecimals(BUSDBalance / 10 ** 18, 2)}</h4>
      <Input
        project={project}
        truncateToDecimals={truncateToDecimals}
        BUSDBalance={BUSDBalance}
        value={value}
        setValue={setValue}
        className="input-wrapper--invest"
      />
      <div className="invest__buttons">
        {isBUSDApproved ? (
          <button
            disabled={!project.investStatus || isLoading}
            onClick={handleDeposit}
            className="invest__button button button--blue"
          >
            Deposit BUSD
          </button>
        ) : (
          <button
            disabled={isLoading}
            onClick={handleApprove}
            className="invest__button button"
          >
            Approve BUSD
          </button>
        )}
      </div>
    </div>
  );
}
