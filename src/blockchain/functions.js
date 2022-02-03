import { ethers, providers } from "ethers";
import { abi } from "./abi";
import WalletConnectProvider from "@walletconnect/web3-provider";

let busdAbi = [
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

let provider = new ethers.providers.JsonRpcProvider(
  "https://speedy-nodes-nyc.moralis.io/1d19a6082204e3ecd8dcf0b9/bsc/testnet"
);

let contractAddress = "0x1400c2c8E9fC46f0Ff62D4a92c37dDc6b049394b";
let busdAddress = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7";

let contractInstance = new ethers.Contract(contractAddress, abi, provider);
let busdInstance = new ethers.Contract(busdAddress, busdAbi, provider);

export const getActiveProjects = async () => {
  try {
    let activeProjects = await contractInstance.getActiveProjects();
    let ids = activeProjects[1];

    let projectsDetails = await Promise.all(
      await ids.map(async (el, index) => {
        let details = await contractInstance.getProjectDetails(el);
        let countdown = await contractInstance.getCountDown(el);
        let claimStatus = await contractInstance.getClaimStatus(el);
        let investStatus = await contractInstance.getInvestStatus(el);

        return {
          ...details,
          claimStatus,
          investStatus,
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

export const getUserInvestment = async (projectId, userAddress) => {
  try {
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

export const getBUSDAllowance = async (userAddress) => {
  try {
    let allowance = await busdInstance.allowance(userAddress, contractAddress);
    let balance = await busdInstance.balanceOf(userAddress);
    console.log(balance.toString());

    return { allowance: allowance > 0, balance };
  } catch (error) {
    console.log(error, "getBUSDAllowance");
  }
};

export const approveBUSD = async (walletType) => {
  try {
    let newInstance = await getContractInstance(walletType, "BUSD");
    const maxInt =
      "115792089237316195423570985008687907853269984665640564039457584007913129639935";

    let tx = await newInstance.approve(contractAddress, maxInt);
    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "approveBUSD");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const depositUSD = async (projectId, _value, walletType) => {
  try {
    console.log(projectId, _value);
    let newInstance = await getContractInstance(walletType, "MAIN");
    let value = ethers.utils.parseUnits(_value, "ether");

    let tx = await newInstance.DepositUSD(projectId, value);
    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "depositUSD");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const ClaimMyTokens = async (projectId, walletType) => {
  try {
    let newInstance = await getContractInstance(walletType, "MAIN");

    let tx = await newInstance.ClaimMyTokens(projectId);
    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "ClaimMyTokens");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

const getContractInstance = async (walletType, contract) => {
  if (walletType === "WALLET_CONNECT") {
    let newProvider = new WalletConnectProvider({
      rpc: {
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      },
    });

    await newProvider.enable();
    let signer = newProvider.getSigner(0);
    if (contract === "MAIN") {
      return new ethers.Contract(contractAddress, abi, signer);
    } else if (contract === "BUSD") {
      return new ethers.Contract(busdAddress, busdAbi, signer);
    }
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = newProvider.getSigner(0);

    if (contract === "MAIN") {
      return new ethers.Contract(contractAddress, abi, signer);
    } else if (contract === "BUSD") {
      return new ethers.Contract(busdAddress, busdAbi, signer);
    }
  }
};
