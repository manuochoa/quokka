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
import { getActiveProjects, getUserInvestment } from "./blockchain/functions";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function App() {
  const [userAddress, setUserAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [mobileScreen, setMobileScreen] = useState(false);
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
    console.log("user investment", id);
    if (userAddress) {
      let investment = await getUserInvestment(id, userAddress);
      if (investment) {
        console.log(investment);
        setUserInvestment(investment);
      }
    }
  };

  useEffect(() => {
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
    const getProjectDetails = async () => {
      let details = await getActiveProjects();
      if (details) {
        console.log(details);
        setProjects(details);
      }
    };
    getProjectDetails();
  }, []);

  useEffect(() => {
    getUserProjectInvestment(selectedProject.id);
  }, [selectedProject, userAddress]);

  return (
    <NotificationProvider>
      <Header popupVisible={popupVisible} setPopupVisible={setPopupVisible} />
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
              project={selectedProject}
              style={{ display: sections[1] ? "block" : "none" }}
            />
            <Claim
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
              <Invest project={selectedProject} />
              <Claim
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
      />
    </NotificationProvider>
  );
}
