import { ethers, providers } from "ethers";
import { abi } from "./abi";
import WalletConnectProvider from "@walletconnect/web3-provider";

// function getActiveProjects() public view returns (uint64 pos, uint64[] memory IDlist)
// getProjectDetails
// getcountdown

let provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-2-s2.binance.org:8545/"
);

let contractAddress = "0x1400c2c8E9fC46f0Ff62D4a92c37dDc6b049394b";

let contractInstance = new ethers.Contract(contractAddress, abi, provider);

export const getActiveProjects = async () => {
  try {
    let activeProjects = await contractInstance.getActiveProjects();
    let ids = activeProjects[1];

    let projectsDetails = await Promise.all(
      await ids.map(async (el, index) => {
        let details = await contractInstance.getProjectDetails(el);
        let countdown = await contractInstance.getCountDown(el);

        return {
          ...details,
          countdown,
          selected: index === 0 ? true : false,
          id: Number(el),
        };
      })
    );

    return projectsDetails;
  } catch (error) {
    console.log(error, "getActiveProjects");
  }
};

// function getDepositedUSD(uint64 ProjectID,address holder) public view returns (uint)
// function getclaimableTokens(uint64 ProjectID,address holder) public view returns (uint)
// {  uint256 balance = getDepositedUSD(ProjectID,holder);

//     function gettokensReceived(uint64 ProjectID,address holder) public view returns (uint)

export const getUserInvestment = async (projectId, userAddress) => {
  try {
    // let newContractInstance = await getContractInstance(walletType);

    let depositedUSD = await contractInstance.getDepositedUSD(
      projectId,
      userAddress
    );
    let claimableTokens = await contractInstance.getclaimableTokens(
      projectId,
      userAddress
    );
    let tokensReceived = await contractInstance.gettokensReceived(
      projectId,
      userAddress
    );

    return { depositedUSD, claimableTokens, tokensReceived, projectId };
  } catch (error) {
    console.log(error, "getUserInvestment");
  }
};

const getContractInstance = async (walletType) => {
  if (walletType === "WALLET_CONNECT") {
    let newProvider = new WalletConnectProvider({
      rpc: {
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      },
    });

    await newProvider.enable();
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(contractAddress, abi, signer);
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(contractAddress, abi, signer);
  }
};
