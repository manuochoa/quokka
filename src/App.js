import Header from "./components/Header";
import NotificationProvider from "./contexts/NotificationProvider";
import Select from "./components/common/Select";
import netflixIcon from "./images/icons/netflix.svg";
import Statistics from "./components/Statistics";
import Invest from "./components/Invest";
import Claim from "./components/Claim";
import ConnectPopup from "./components/ConnectPopup";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import {
  getActiveProjects,
  getUserInvestment,
  getBUSDAllowance,
  ClaimMyTokens,
} from "./blockchain/functions";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toast } from "react-toastify";

export default function App() {
  const [userAddress, setUserAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [mobileScreen, setMobileScreen] = useState(false);
  const [isBUSDApproved, setIsBUSDApproved] = useState(false);
  const [BUSDBalance, setBUSDBalance] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 0,
      selected: true,
      Logo: netflixIcon,
      Name: "Select a Project",
      MaxInvest: 0,
      MinInvest: 0,
      Goal: 0,
      PayoutDecimals: 18,
      PercInvested: 0,
      Status: "",
      TokensPaidOut: 0,
      USDInvested: 0,
      totalTokens: 0,
      claimStatus: false,
      investStatus: false,
      countdown: {
        Days: 0,
        Hours: 0,
        Minutes: 0,
      },
    },
  ]);
  const [selectedProject, setSelectedProject] = useState({
    id: 0,
    selected: true,
    Logo: netflixIcon,
    Name: "Select a Project",
    MaxInvest: 0,
    MinInvest: 0,
    Goal: 0,
    PayoutDecimals: 18,
    PercInvested: 0,
    Status: "",
    TokensPaidOut: 0,
    USDInvested: 0,
    totalTokens: 0,
    claimStatus: false,
    investStatus: false,
    countdown: {
      Days: 0,
      Hours: 0,
      Minutes: 0,
    },
  });
  const [userInvestment, setUserInvestment] = useState({
    claimableTokens: 0,
    depositedUSD: 0,
    tokensReceived: 0,
  });
  const [sections, setSections] = useState([true, false, false]);

  const connectMetamask = async () => {
    try {
      console.log("hola");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setUserAddress(accounts[0]);
      setWalletType("Metamask");

      window.localStorage.setItem("userAddress", accounts[0]);

      //   const chainId = await window.ethereum.request({
      //     method: "eth_chainId",
      //   });

      //   if (chainId !== "0x38") {
      //     await window.ethereum.request({
      //       method: "wallet_switchEthereumChain",
      //       params: [{ chainId: "0x38" }],
      //     });
      //   }

      window.ethereum.on("accountsChanged", function (accounts) {
        setUserAddress(accounts[0]);
      });

      window.ethereum.on("chainChanged", (_chainId) =>
        window.location.reload()
      );

      setPopupVisible(false);
    } catch (error) {
      console.log(error, "error"); //
    }
  };

  const connectWalletConnect = async () => {
    try {
      console.log("hola");
      const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed.binance.org/",

          // 97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        network: "binance",
        chainId: 56,
        infuraId: null,
      });

      await provider.enable();

      const accounts = await provider.listAccounts();

      setUserAddress(accounts[0]);
      setWalletType("WALLET_CONNECT");

      setPopupVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    if (walletType === "WALLET_CONNECT") {
      const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed.binance.org/",

          // 97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        network: "binance",
        chainId: 56,
        infuraId: null,
      });
      await provider.disconnect();
    } else {
      window.localStorage.removeItem("userAddress");
    }

    setUserAddress("");
  };

  const getUserProjectInvestment = async (id) => {
    setUserInvestment({
      claimableTokens: 0,
      depositedUSD: 0,
      tokensReceived: 0,
    });
    if (userAddress) {
      let investment = await getUserInvestment(id, userAddress);
      if (investment) {
        setUserInvestment(investment);
      }
    }
  };

  const checkAllowance = async () => {
    if (userAddress) {
      let result = await getBUSDAllowance(userAddress);
      setIsBUSDApproved(result.allowance);
      setBUSDBalance(result.balance);
    }
  };

  const handleClaim = async (projectId) => {
    setIsLoading(true);
    let receipt = await ClaimMyTokens(projectId, walletType);
    if (receipt) {
      console.log(receipt);
      toast.success("Transaction sent succesfully");
      getUserProjectInvestment(projectId);
      getProjectDetails();
    }
    setIsLoading(false);
  };

  const getProjectDetails = async () => {
    let details = await getActiveProjects();
    if (details) {
      setProjects(details);
      let currentProject = details.find((el) => el.id === selectedProject.id);
      if (currentProject) {
        setSelectedProject(details.find((el) => el.id === selectedProject.id));
      } else {
        setSelectedProject(details[0]);
      }
    }
  };

  function truncateToDecimals(num, dec) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
  }

  useEffect(() => {
    let user = window.localStorage.getItem("userAddress");

    if (user) {
      connectMetamask();
    }

    function handleMobileScreen() {
      setMobileScreen(window.innerWidth < 990);
    }

    handleMobileScreen();

    window.addEventListener("resize", handleMobileScreen);

    return () => {
      window.removeEventListener("resize", handleMobileScreen);
    };
  }, []);

  useEffect(() => {
    getProjectDetails();
  }, []);

  useEffect(() => {
    getUserProjectInvestment(selectedProject.id);
  }, [selectedProject, userAddress]);

  useEffect(() => {
    checkAllowance();
  }, [userAddress]);

  return (
    <NotificationProvider>
      <Header
        userAddress={userAddress}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
      />
      <main className="main container">
        <div className="main__top">
          <div className="main__column main__column--1 main__column--top">
            <Select
              className="select--main"
              list={projects}
              setSelectedProject={setSelectedProject}
            />
          </div>
          <div className="main__column main__column--2 main__column--top">
            <div className="main__background main__background--top">
              <img
                src={selectedProject.Logo}
                className="main__selected-icon"
                alt="Project Logo"
              />
              <p className="main__selected-text">{selectedProject.Name}</p>
              <div className="main__status">
                <h6 className="main__status-title">Status</h6>
                <p className="main__status-text">{selectedProject.Status}</p>
              </div>
            </div>
          </div>
        </div>

        {mobileScreen ? (
          <div className="main__wrapper">
            <Statistics
              userInvestment={userInvestment}
              project={selectedProject}
              style={{ display: sections[0] ? "block" : "none" }}
            />
            <Invest
              getProjectDetails={getProjectDetails}
              truncateToDecimals={truncateToDecimals}
              BUSDBalance={BUSDBalance}
              getUserProjectInvestment={getUserProjectInvestment}
              userAddress={userAddress}
              walletType={walletType}
              checkAllowance={checkAllowance}
              isBUSDApproved={isBUSDApproved}
              project={selectedProject}
              style={{ display: sections[1] ? "block" : "none" }}
            />
            <Claim
              isLoading={isLoading}
              handleClaim={handleClaim}
              userInvestment={userInvestment}
              project={selectedProject}
              style={{ display: sections[2] ? "block" : "none" }}
            />
          </div>
        ) : (
          <div className="main__wrapper">
            <div className="main__column main__column--1">
              <Statistics
                userInvestment={userInvestment}
                project={selectedProject}
              />
            </div>
            <div className="main__column main__column--2">
              <Invest
                getProjectDetails={getProjectDetails}
                truncateToDecimals={truncateToDecimals}
                BUSDBalance={BUSDBalance}
                getUserProjectInvestment={getUserProjectInvestment}
                userAddress={userAddress}
                walletType={walletType}
                checkAllowance={checkAllowance}
                isBUSDApproved={isBUSDApproved}
                project={selectedProject}
              />
              <Claim
                isLoading={isLoading}
                handleClaim={handleClaim}
                userInvestment={userInvestment}
                project={selectedProject}
              />
            </div>
          </div>
        )}
      </main>
      {mobileScreen && <Footer sections={sections} setSections={setSections} />}
      <ConnectPopup
        connectMetamask={connectMetamask}
        connectWalletConnect={connectWalletConnect}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        userAddress={userAddress}
      />
    </NotificationProvider>
  );
}
