import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  ModalHeader,
  ModalFooter,
  Modal,
  ModalBody,
} from "reactstrap";

import NFT_STAKE_ABI from "/utils/Config/NFT_STAKE_ABI.json";
import POOL_CONTRACT from "/utils/Config/POOL_CONTRACT.json";
import TOKEN_ABI from "/utils/Config/TOKEN_ABI.json";
import STAKENFT_ABI from "/utils/Config/STAKENFT_ABI.json";

import Config, { EX_LINK } from "/utils/Config";
import Web3 from "web3";
import { useEffect } from "react";
import { func } from "prop-types";
import ROUTER_ABI from "/utils/Config/ROUTER_ABI.json";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const STAKE_CONTRACT = [
  {
    address: "0xfdcdeae7279df7a367138a57b8ca65a350c29b31",
    nft: "0xc8a762a43fb51b193d020f4d770b51234f0e28cd ",
    image: "/assets/Images/BronzeGuard.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },

  {
    address: "0x0521c26e992446a17ce5c6001573a434d0f36dc5",
    nft: "0xa9fcd60e343367cc14b159784b62f78404295c11 ",
    image: "/assets/Images/WolfdenGolden.png",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },

  {
    address: "0x6ea61741Bcd2B3BC932eaE0E5c940F2D2bA9613A",
    nft: "0xb31D546FDe009D99251853350c8730d322292daE ",
    image: "/assets/Images/Replay_Pacakge.png",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0xa3a476a32618e4e01086058928538e293b99be8a",
    nft: "0x00b7805B6aBa6FA68c24ab68E99F098c5b59a973 ",
    image: "/assets/Images/Lunapup2.png",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x11f86353ad439c9782f829e8a05865d97ccd234d",
    nft: "0x65218837186066aa61218335f6B509e93CBa510c ",
    image: "/assets/Images/Lunapup.jpg",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x89338E7974E812d5f4DB0828c17272Dba9e5a66a",
    nft: "0x39b11276429E94E106df06D04115cD323d611747 ",
    image: "/assets/Images/Berserker_Viking_NFT.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0xBade9839261dbCD3DCF3F2834e4bDc2f73222500",
    nft: "0x6ad2b6d5d8f96c8e581d3100c12878b2151a0423",
    image: "/assets/Images/NFWfarm.jpg",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x6FFB56b63219b0dF250F2Ff0eA627113EbE9c394",
    nft: "0x4f890381abe9917a1cfed7951b7eb79900f4830d",
    image: "/assets/Images/NFP.jpg",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0xE5a325F9Cc94C5e04040014f3D3754b2F8304A2D",
    nft: "0xdfe151ed2780f33e3239a4c4616ce3ce88e379d2 ",
    image: "/assets/Images/Wizard Battle Pass.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },

  {
    address: "0x7B5d7113A01e2A3cE3Fd87C0C680F3CE008C427A",
    nft: "0x4DaECcEef92F22f7EA69af2f4B50973e0267e3E2",
    image: "/assets/Images/SPARTANV2.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x40Ca8F037c560aD75Aa9314d42fa88B28E38adCA",
    nft: "0x34c0aa4d5f32fc427378280672f278703d56b992",
    image: "/assets/Images/JOKEZOO.jpg",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x90497871A1F1EC81b67735f5bB9ff462399467E8",
    nft: "0x3Da11D42d364c2831ec56Fbc3AACEA6b37469f7A",
    image: "/assets/Images/SPARTAN.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x5f1339928498A858BB57658Af49c5081A22be336",
    nft: "0x6f72b2B251c753C4Af1D81b141862571e83376B5",
    image: "/assets/Images/TRIBOT.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x5BE4E0B21A26A1Fda89B56bBF261915Ef116B80a",
    nft: "0xF52687C5abde0d50a29e09BBBBf000e591d62C3D",
    image: "/assets/Images/CDP.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x7b0bCe1637Ae3D960C2F9CF3C520Dd489184F5Ac",
    nft: "0x0f1EE2b911EFE445E1533043A61cd1Ed90D224b6",
    image: "/assets/Images/DSG.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x165b653cbA04DcE682e8f5C0ff9C31D691639810",
    nft: "0xd986cb1060fA2717E6df3C8D8C492c28ccDfC69C",
    image: "/assets/Images/PMDB.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x436b1C5E366991a8F883E0dB806b8B976258a6AE",
    nft: "0x712CC8EB5af53bfa063cc059839B6DB200Cc2536",
    image: "/assets/Images/BTCG.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },

  {
    address: "0xBEe4B61f70dAa6FB235B1d275c46d468E93F6a53",
    nft: "0x10755b6b4279434b121AfE23C87951A0D3971267",
    image: "/assets/Images/PEAR.gif",
    status: 0,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x1276134F11E1E677Eb9BFd67F7352Bb8Edd223a7",
    nft: "0x07d0ef66B0Fa944A06ca20680156DCbD9DcA0A6E",
    image: "/assets/Images/GT.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0xF6619EA02ddc7Fc5436F75B1eF7f3981c2Ba6f50",
    nft: "0x75AFf25f4a9B8C8c0a387d14CEf29fA7d6EF6Ab9",
    image: "/assets/Images/Lovesswap.gif",
    status: 0,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x9E0B65caB7E7650993617813650d7a31a2c92EB1",
    nft: "0xaDA57E3b55a6FC44796714E64A1BDDD4458Fe075",
    image: "/assets/Images/MDFNFT.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0xf4D938a4EC5589bEC8B00cCDbc8F5132AFc59bFE",
    nft: "0x47Ad630BdFc27dA090FaD41846a181f39882fbd9",
    image: "/assets/Images/SingularfarmNFT.gif",
    status: 0,
    fee: 1,
    feedecimal: 100,
    ape: 1,
    lp: 1,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x3b21F1A8288cff7503E0A5D8fE5252132Ed47Fa8",
    nft: "0x32271B6C330f0A8DC7b367B0488710F8C0B23642",
    image: "/assets/Images/OwlNFTFARM.gif",
    status: 0,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  },
  {
    address: "0xD92702F163b853443C4f30483FcBD8653F814440",
    nft: "0x175F6A6250d930DA156002d2f4115761C66cdCfE",
    image: "/assets/Images/BarbecueNFT.gif",
    status: 0,
    fee: 1,
    feedecimal: 100,
    ape: 1,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0xcfD293177986C4b3726Fe235B138C018E05A3D60",
    nft: "0x0795Db8a9C71797f73a9876faa6cEC36239D9353",
    image: "/assets/Images/SquirrelNFT.gif",
    status: 0,
    fee: 1,
    feedecimal: 100,
    ape: 1,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x3867E3da4ea645102BC64Cc6e84C473B464EC10c",
    nft: "0x8A372C2765C2dA913adCDAA4A7E60EfF04718942",
    image: "/assets/Images/BananaKing.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 1,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x13458cBa5f5E4de35543Ae0f8929a678b9229171",
    nft: "0x60f794549c0C0725041fF73B826B47d3E76f5777",
    image: "/assets/Images/BananaWIZARDs.gif",
    status: 0,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0xCEC6B959f18C11181575493ADA084e51c58534eC",
    nft: "0x5350c6DA3e03a287d9657F469539b6B979f7b4A5",
    image: "/assets/Images/MoonCafeSloth.gif",
    status: 0,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x7BdFbD8124cD45F6AAFeFdc689390411E980a01E",
    nft: "0x6DE0198e668eEc5fB9E14376a0A560371BfFc850",
    image: "/assets/Images/NFWolfPup.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x776B37b5f3252EdF7a7D6145c7af2a818dCFFF9a",
    nft: "0xAB3f83a57FFe66a9B05577188F95911Ef17B97De",
    image: "/assets/Images/BabyNFT.gif",
    status: 0,
    fee: 1,
    feedecimal: 100,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x97af550f4E875fC29979833Eac86FC5412Ed8758",
    nft: "0x645d1C47E7d1337A05878a143A4aDa9fcD5b1E8F",
    image: "/assets/Images/DMTNT.gif",
    status: 0,
    fee: 1,
    feedecimal: 1,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0xe3A0F1AA816aF790154AdE6ed790A9D400b0794f",
    nft: "0xe6dd923ad331cbd9015f00baa3ec8633d3131548",
    image: "/assets/Images/AUTOSHARK.gif",
    status: 0,
    fee: 1,
    feedecimal: 1,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x63a6c517cdBb674D42931cc716236249E3BCEd67",
    nft: "0x7d82F56ea0820A9d42b01C3C28F1997721732218",
    image: "/assets/Images/add.gif",
    status: 0,
    fee: 0,
    feedecimal: 1,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x1ecA32d3EbA1F035a7e4e8607342112abFcF267a",
    nft: "0x6c7933040170ad060e2132346b4b406e146c63a9",
    image: "/assets/Images/Ordinary.gif",
    status: 0,
    fee: 0,
    feedecimal: 1,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0xdd19760840D1997F8325f218cC460E79c21660dc",
    nft: "0x89edc8cbC6a87d7bCF3f5Cf1A4468157fB2Eb950",
    image: "/assets/Images/Rare.gif",
    status: 0,
    fee: 0,
    feedecimal: 1,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  {
    address: "0x5d70a100cFBcF216f6ff9096E68FC89Ba0DB8C48",
    nft: "0x50Ee5cA83766d0aF92921A8cC07968c7974525e8",
    image: "/assets/Images/Epic.gif",
    status: 0,
    fee: 0,
    feedecimal: 1,
    ape: 0,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
];

const StakeCard = (props) => {
  let web3Provider;

  if (typeof window !== "undefined") {
    web3Provider = window.ethereum;
  }

  const NFT = STAKE_CONTRACT[props.index].nft;
  const NFT_STAKE = STAKE_CONTRACT[props.index].address;
  const wallet = useAccount();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [damount, setdAmount] = useState(0);

  const [symbol, setSymbol] = useState("");
  const [sTokenPrice, setsTokenPrice] = useState(0);

  const [stakefee, setstakefee] = useState(0);
  const [totalStaked, settotalStaked] = useState(0);
  const [nftSymbol, setNftSymbol] = useState("");
  const [stakeTokenAddress, setstakeTokenAddress] = useState("");

  const [approval, setApproval] = useState(0);
  const [claimAllowed, setClaimAllowed] = useState(false);

  const [userStaked, setUserStaked] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [stakingAmountOg, setStakingAmountOg] = useState(0);

  const [limit, setLimit] = useState(0);
  const [buyLink, setBuyLink] = useState("");

  const [depositError, setDepositError] = useState("");

  const [depositmodal, setDepositmodal] = useState(false);
  const depositToggle = () => setDepositmodal(!depositmodal);

  const [unstakeModal, setUnstakemodal] = useState(false);
  const unstakeToggle = () => setUnstakemodal(!unstakeModal);
  const [unstakeRedeemableModal, setunstakeRedeemableModal] = useState(false);
  const unstakeToggleRedeemable = () =>
    setunstakeRedeemableModal(!unstakeRedeemableModal);

  async function setMaxDeposit() {
    setdAmount(balance);
    setDepositAmount(balance);
  }

  const handleDepositChange = (e) => {
    let _amt = e.target.value;
    _amt = parseInt(_amt);
    setDepositAmount(_amt);
    setdAmount(_amt);
  };

  async function depositToken() {
    setDepositError(false);
    let _amount = parseInt(depositAmount);
    // alert(limit);
    if (_amount > limit) {
      setDepositError(
        "Invalid Deposit Amount. Please enter a multiplier less than equal to " +
          limit
      );
      return false;
    }

    if (balance <= 0) {
      setDepositError(
        "Insufficient Balance. Please fund your wallet with some " +
          symbol +
          " Token and try again."
      );
      return false;
    }

    if (depositAmount <= 0 || depositAmount == "") {
      setDepositError(
        "Invalid Deposit Amount. Please enter a valid amount greater than 0."
      );
      return false;
    }

    let _web3 = new Web3(web3Provider);
    const _stakeContract = new _web3.eth.Contract(NFT_STAKE_ABI, NFT_STAKE);

    console.log(_amount);

    setModal(!modal);
    _stakeContract.methods
      .stakeTokens(_amount)
      .send({
        from: wallet.address,
      })
      .on("receipt", function (receipt) {
        setModal(modal);
        depositToggle();
        initContracts();
      })
      .on("error", function (receipt) {
        setModal(modal);
      });
  }

  const getTime = async () => {
    let _web3 = new Web3(web3Provider);
    const _stakeContract = new _web3.eth.Contract(NFT_STAKE_ABI, NFT_STAKE);

    let _unlockTime = await _stakeContract.methods
      .userclaimtime(wallet.address)
      .call();
    let endTime;

    let _currentTime = new Date().getTime() / 1e3;

    if (_unlockTime > 0 && _currentTime < _unlockTime) {
      setClaimAllowed(false);

      let remainingSeconds = _unlockTime - _currentTime;
      // console.log("Remaining Sec" , remainingSeconds);

      let remainingDay = Math.floor(remainingSeconds / (60 * 60 * 24));
      let remainingHour = Math.floor(
        (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
      );
      let remainingMinutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
      let remainingSec = Math.floor(remainingSeconds % 60);
      if (remainingDay > 0) {
        endTime =
          remainingDay +
          "d : " +
          remainingHour +
          "h : " +
          remainingMinutes +
          "m";
        setEndTime(endTime);
      } else {
        endTime =
          remainingHour +
          "h : " +
          remainingMinutes +
          "m : " +
          remainingSec +
          "s";
        setEndTime(endTime);
      }
    } else if (_unlockTime < _currentTime) {
      setEndTime("NA");
      setClaimAllowed(true);
    }
  };

  const initContracts = async () => {
    let _web3 = new Web3(web3Provider);
    console.log(NFT_STAKE);
    const _stakeContract = new _web3.eth.Contract(NFT_STAKE_ABI, NFT_STAKE);

    let _nfttoken = await _stakeContract.methods.nftredeem().call();

    let _staketoken = await _stakeContract.methods.staketoken().call();
    let _stakinglimit = await _stakeContract.methods.stakinglimit().call();

    setLimit(_stakinglimit);

    const _nftContract = new _web3.eth.Contract(STAKENFT_ABI, _nfttoken);
    let _nftsymbol = await _nftContract.methods.symbol().call();

    setNftSymbol(_nftsymbol);

    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _staketoken);
    setstakeTokenAddress(_staketoken);
    let sprice = await getPrice(_staketoken, STAKE_CONTRACT[props.index].ape);
    // let sprice = 0 ;
    setsTokenPrice(sprice);
    let _symbol = await _tokenContract.methods.symbol().call();

    let _decimals = await _tokenContract.methods.decimals().call();

    let _stakingAmount = await _stakeContract.methods.stakingamount().call();
    if (STAKE_CONTRACT[props.index].fee == 1) {
      let _stakingFee = await _stakeContract.methods.fees().call();
      setstakefee(_stakingFee / STAKE_CONTRACT[props.index].feedecimal);
    }
    let _totalStaked = await _tokenContract.methods.balanceOf(NFT_STAKE).call();
    _totalStaked = parseFloat(_totalStaked / 1e1 ** _decimals).toFixed(2);
    settotalStaked(_totalStaked);

    setStakingAmount(_stakingAmount / 1e1 ** _decimals);
    setStakingAmountOg(_stakingAmount);

    setSymbol(_symbol);

    if (wallet.address) {
      let _userStaked = await _stakeContract.methods
        .userStaked(wallet.address)
        .call();
      console.log(_userStaked);
      setUserStaked(_userStaked / 1e1 ** _decimals);

      let _approval = await _tokenContract.methods
        .allowance(wallet.address, NFT_STAKE)
        .call();
      console.log(_approval);
      setApproval(_approval);
      let _balance = await _tokenContract.methods
        .balanceOf(wallet.address)
        .call();
      _balance = parseFloat(_balance / 1e1 ** _decimals).toFixed(2);
      setBalance(_balance);
    }
  };

  async function claim() {
    let _web3 = new Web3(web3Provider);

    const _stakeContract = new _web3.eth.Contract(NFT_STAKE_ABI, NFT_STAKE);

    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')

    _stakeContract.methods
      .redeemNft()
      .send({ from: wallet.address })
      .on("receipt", function (receipt) {
        initContracts();

        setModal(modal);
      })

      .on("error", function (error, receipt) {
        setModal(modal);
      });
  }

  async function unstakeRedeemable() {
    let _web3 = new Web3(web3Provider);

    const _stakeContract = new _web3.eth.Contract(NFT_STAKE_ABI, NFT_STAKE);

    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')

    _stakeContract.methods
      .emergencyunstaketoken()
      .send({ from: wallet.address })
      .on("receipt", function (receipt) {
        initContracts();
        unstakeToggleRedeemable();
        setModal(modal);
      })

      .on("error", function (error, receipt) {
        setModal(modal);
      });
  }

  async function unstake() {
    let _web3 = new Web3(web3Provider);

    const _stakeContract = new _web3.eth.Contract(NFT_STAKE_ABI, NFT_STAKE);

    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')

    _stakeContract.methods
      .emergencyunstaketoken()
      .send({ from: wallet.address })
      .on("receipt", function (receipt) {
        initContracts();
        unstakeToggle();
        setModal(modal);
      })

      .on("error", function (error, receipt) {
        setModal(modal);
      });
  }

  const getTotalStaked = async () => {
    var v = POOL_CONTRACT[props.index];
    let _web3 = new Web3(web3Provider);
    var TOKEN_POOL_ABI = null;
    var settTotalStaked = null;
    let _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI, v.address);
    let totalStaked = await _tokenPoolContract.methods.totalStaked().call();
    let stakeTokenAddress = await _tokenPoolContract.methods
      .stakeToken()
      .call();
    let _tokenContract = new _web3.eth.Contract(TOKEN_ABI, stakeTokenAddress);
    let stotalDecimals = await _tokenContract.methods.decimals().call();

    // temp['totalStaked'] = parseFloat(totalStaked/1e18).toFixed(4) ;
    if (totalStaked > 1e1 ** stotalDecimals) {
      totalStaked = parseFloat(totalStaked / 1e1 ** stotalDecimals).toFixed(4);
    } else {
      totalStaked = parseFloat(totalStaked / 1e1 ** stotalDecimals).toFixed(8);
    }
    settTotalStaked(totalStaked);
  };

  const getPrice = async (_token, ape) => {
    let _web3 = new Web3(web3Provider);
    const BNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; // BNB or another token
    const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"; //BUSD

    let _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _token);
    let stotalDecimals = await _tokenContract.methods.decimals().call();

    let SROUTER_ADDRESS = null;

    if (ape == 0) {
      SROUTER_ADDRESS = "0x10ed43c718714eb63d5aa57b78b54704e256024e";
      setBuyLink("https://pancakeswap.finance/swap?outputCurrency=");
    } else if (ape == 1) {
      SROUTER_ADDRESS = "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7";
      setBuyLink("https://apeswap.finance/swap?outputCurrency=");
    } else if (ape == 2) {
      SROUTER_ADDRESS = "0x05E61E0cDcD2170a76F9568a110CEe3AFdD6c46f";
      setBuyLink("https://app.knightswap.financial/swap?outputCurrency=");
    }

    let _amountUSD = 1 * 10 ** 18;

    let _routerContractS = new _web3.eth.Contract(ROUTER_ABI, SROUTER_ADDRESS);

    let _resultUSDS = await _routerContractS.methods
      .getAmountsOut(_amountUSD + "", [BNB, BUSD])
      .call();
    let BNBUsdS = _resultUSDS[1] / 10 ** 18;

    let _stokenPrice = 0;

    let _amountS = 1 * 10 ** stotalDecimals;
    let _resultS = await _routerContractS.methods
      .getAmountsOut(_amountS + "", [_token, BNB])
      .call();
    _stokenPrice = _resultS[1] / 10 ** 18; // price of 1 CAKE in BUSD

    _stokenPrice = _stokenPrice * BNBUsdS;

    return _stokenPrice;
  };

  async function approveToken() {
    let _web3 = new Web3(web3Provider);

    const _stakeContract = new _web3.eth.Contract(NFT_STAKE_ABI, NFT_STAKE);

    let _staketoken = await _stakeContract.methods.staketoken().call();

    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _staketoken);

    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')

    const _amount = _web3.utils.toWei("10000000000000000000000000000");
    _tokenContract.methods
      .approve(NFT_STAKE, _amount)
      .send({ from: wallet.address })
      .on("receipt", function (receipt) {
        initContracts();

        setModal(modal);
      })

      .on("error", function (error, receipt) {
        setModal(modal);
      });
  }

  useEffect(() => {
    if (window.ethereum) {
      web3Provider = window.ethereum;
    } else {
      web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL);
    }
  }, []);

  useEffect(() => {
    initContracts();

    if (wallet.address) {
      setInterval(function () {
        getTime();
      }, 1000);
    }
  }, [wallet.address]);

  const [show,setShow] = useState(false);
  const [showStake,setShowStake] = useState(true);

  return (
    <div>
      <div>
        <div className="faq-mobile">
          <div className="faq-singular" itemprop="mainEntity">
            <h2 className="faq-question" itemprop="name">
              <div className="bnbmobile-wrp">
                <div className="bnb-left">
                  <div className="img-bison">
                    <img src={STAKE_CONTRACT[props.index].image} />
                  </div>
                  <div className="token1">
                    {userStaked > 0 && (
                      <h3>
                        {userStaked / stakingAmount} {nftSymbol} NFT
                      </h3>
                    )}
                    {userStaked == 0 && <h3>0 {nftSymbol} NFT</h3>}
                  </div>
                  <div className="apr">
                    <div className="wrp-arp">
                      <div className="apr-c1">
                        <h3>
                          {userStaked} {symbol}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="apr">
                    <div className="wrp-arp">
                      {STAKE_CONTRACT[props.index].fee == 1 ? (
                        <div className="apr-c1">
                          <h3>Redeemable</h3>
                        </div>
                      ) : (
                        <div className="apr-c1">
                          <h3>Non-Redeemable</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bnb-right">
                  <div className="mobile-unloackbtn">
                    {wallet.address &&
                      userStaked == 0 &&
                      STAKE_CONTRACT[props.index].status == 1 && (
                        <button onClick={`${depositToggle}`}>Stake</button>
                      )}
                    {wallet.address &&
                      userStaked > 0 &&
                      !claimAllowed &&
                      STAKE_CONTRACT[props.index].fee == 0 && (
                        <button onClick={unstakeToggle}>Unstake</button>
                      )}
                    {wallet.address &&
                      userStaked > 0 &&
                      STAKE_CONTRACT[props.index].fee == 1 && (
                        <button
                          className="mr-3"
                          onClick={unstakeToggleRedeemable}
                        >
                          Unstake
                        </button>
                      )}
                    {wallet.address && userStaked > 0 && claimAllowed && (
                      <button onClick={claim}>Claim</button>
                    )}
                    {!wallet.address && <ConnectButton />}
                  </div>
                </div>
              </div>
            </h2>
          </div>
        </div>
        
        <div className="wrp-satke  onlyDesktop"  onClick={()=>{setShow(!show)}}>
          <div class="panel-heading" role="tab" id="accordion">
            <a
              role="button"
              data-toggle="collapse"
              data-parent="#accordion"
              href={"#collapse" + props.index}
              aria-expanded="true"
              aria-controls={"collapse" + props.index}
            >
              <div className="wrp-bison1">
                <div className="bison-c1 bg-bison">
                  <div className="img-bison">
                    <img src={STAKE_CONTRACT[props.index].image} />
                  </div>
                </div>
                <div className="token1">
                  {userStaked > 0 && (
                    <h3>
                      {userStaked / stakingAmount} {nftSymbol} NFT
                    </h3>
                  )}
                  {userStaked == 0 && <h3>0 {nftSymbol} NFT</h3>}
                </div>
                <div className="apr">
                  <div className="wrp-arp">
                    <div className="apr-c mr-right"></div>
                    <div className="apr-c1">
                      <h3>
                        {userStaked} {symbol}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="apr">
                  <div className="wrp-arp">
                    <div className="apr-c mr-right"></div>
                    {STAKE_CONTRACT[props.index].fee == 1 ? (
                      <div className="apr-c1">
                        <h3>Redeemable</h3>
                      </div>
                    ) : (
                      <div className="apr-c1">
                        <h3>Non-Redeemable</h3>
                      </div>
                    )}
                  </div>
                </div>
                <div className="q-marg">
                  <h3>{endTime}</h3>
                </div>
                <div className="bison-btn">
                  {wallet.address &&
                    userStaked == 0 &&
                    STAKE_CONTRACT[props.index].status == 1 && (
                      <button onClick={depositToggle}>Stake</button>
                    )}
                  {wallet.address &&
                    userStaked > 0 &&
                    !claimAllowed &&
                    STAKE_CONTRACT[props.index].fee == 0 && (
                      <button onClick={unstakeToggle}>Unstake</button>
                    )}
                  {wallet.address &&
                    userStaked > 0 &&
                    STAKE_CONTRACT[props.index].fee == 1 && (
                      <button
                        className="mr-3"
                        onClick={unstakeToggleRedeemable}
                      >
                        Unstake
                      </button>
                    )}
                  {wallet.address && userStaked > 0 && claimAllowed && (
                    <button onClick={claim}>Claim</button>
                  )}
                  {!wallet.address && <ConnectButton />}
                </div>
              </div>
            </a>
          </div>


{
    modal?<div className="flex justify-center absolute items-center top-52 inset-0 z-20">
    <div isOpen={modal} toggle={toggle}  centered={true} className="bg-white w-1/2 rounded-sm p-5 justify-center">
    <main>
       <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      
       </main>
       <button className="depositButton mr-auto ml-auto mb-5 bg-blue-500 rounded-sm p-2" onClick={toggle}>Close</button>
     </div>
     </div>:""
}


{
    unstakeRedeemableModal?<div>
            <div isOpen={unstakeRedeemableModal} toggle={unstakeToggleRedeemable}  centered={true}>
<main>
  <span className="mt-5 text-center" >Please confirm if you want to unstake.</span>
</main>
<footer>
        <button className="depositButton mr-3" onClick={unstakeRedeemable}>Unstake</button>
  <button className="depositButton" onClick={unstakeToggleRedeemable}>Cancel</button>
</footer>
</div>
    </div>:""
}

{
    unstakeModal?<div className="flex justify-center absolute items-center top-52 inset-0 z-10">
    <div isOpen={unstakeModal} toggle={unstakeToggle}  centered={true} className="bg-white w-1/2 rounded-sm p-5 justify-center">
   
    
      <main>
      
      
        <span className="mt-5 text-center" >"Warning: you will lose all the progress so far if you unstake your tokens now, So if you decided to stake again the timer will begin from start again"</span>
    
      
          
       
      </main>
      <footer>
       
              <button className="depositButton mr-3 p-2 bg-blue-500 rounded-sm" onClick={unstake}>Proceed</button>
        <button className="depositButton p-2 bg-blue-500 rounded-sm" onClick={unstakeToggle}>Cancel</button>
      </footer>
    </div>
    </div>:""
}




    {
        depositmodal?<div className="flex justify-center absolute items-center top-52 inset-0 z-10">
            <div isOpen={depositmodal} toggle={unstakeToggle}  centered={true} className="bg-white w-1/2 rounded-sm p-5 justify-center">
        <main>       
           <div className="moveRight">
               
               <span> 
                  Your Balance<br />
                  {balance} {symbol}
               </span>
           </div>
          <label><br />Enter Multiples of NFT to stake for 
          </label>
          <input className="outline rounded" onChange={handleDepositChange} type="number" step="1" min="1" value={damount} />
          <span className="mt-5" >Cost: {damount*stakingAmount + (damount*stakingAmount*stakefee/100) } {symbol} (Incl. Fees)</span><br />                                        <div>
          {
              depositError &&
              <span className="error">{depositError}</span>
          }
        
            </div>
         
        </main>
        <footer>
            {
                (approval > 0 && approval > stakingAmountOg*damount) &&
                <button className="depositButton mr-3" onClick={depositToken}>Deposit</button>
            }
            {
                (approval == 0 || approval < stakingAmountOg*damount) &&
                <button className="depositButton mr-3 bg-blue-500 p-2 rounded" onClick={approveToken}>Approve</button> 
            }
          <button className="depositButton bg-blue-500 p-2 rounded" onClick={depositToggle}>Cancel</button>
        </footer>
      </div>
        </div>:""
    }
 

        </div>

        <div className="mb-3">
              <div className="faq-answer" itemprop="acceptedAnswer">
                <div itemprop="text">
                {
                    show?<div className="bottom-list gap-5 flex justify-between max-w-full">
                    <div className="w-full">
                    <div className="wrp-arp2 flex justify-between">
                      <div className="apr-c">
                        <p>End</p>
                      </div>

                      <div className="apr-c text-right">
                        <p>{endTime}</p>
                      </div>
                    </div>

                    <div className="wrp-arp2 flex justify-between">
                      <div className="apr-c">
                        <p>Total {symbol} Staked:</p>
                      </div>
                      <div className="apr-c text-right">
                        <p>{totalStaked}</p>
                      </div>
                    </div>

                    <div className="wrp-arp2 flex justify-between">
                      <div className="apr-c">
                        <p>Stake Fee</p>
                      </div>
                      <div className="apr-c text-right">
                        <p>{stakefee}%</p>
                      </div>
                    </div>
                    </div>
                    
                    <div className="w-full">
                    <div className="wrp-arp2 flex justify-between flex-1">
                      <div className="apr-c">
                        <p>Stake</p>
                      </div>
                      <div className="apr-c text-right">
                        <p>{symbol}</p>
                      </div>
                    </div>
                    <div className="wrp-arp2 flex justify-between flex-1">
                      <div className="apr-c">
                        <p>Staked Value</p>
                      </div>
                      <div className="apr-c text-right">
                        <p>${parseFloat(userStaked * sTokenPrice).toFixed()}</p>
                      </div>
                    </div>

                    <div className="wrp-arp2 flex justify-between flex-1">
                      <div className="apr-c">
                        <p>Locked Value</p>
                      </div>
                      <div className="apr-c text-right">
                        <p>
                          ${parseFloat(totalStaked * sTokenPrice).toFixed()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="wrp-arp2 flex justify-between flex-1">
                      <div className="apr-c bscscan">
                        <a
                          target="_blank"
                          href={EX_LINK + STAKE_CONTRACT[props.index].nft}
                        >
                          View on BscScan
                        </a>
                      </div>
                      <div className="apr-c bscscan">
                        <a target="_blank" href={buyLink + stakeTokenAddress}>
                          Buy {symbol} Token
                        </a>
                      </div>
                    </div>
                    
                    </div>
                    
                    <div className="wrp-arp2 w-full">
                      <div className="apr-c">
                        <p>Your Staked</p>
                      </div>
                      <div className="apr-c text-right">
                        <p>
                          {userStaked} {symbol}
                        </p>
                      </div>
                    </div>
                  </div>:""
                }
                  
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default StakeCard;
