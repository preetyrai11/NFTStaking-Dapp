import React, { useRef, useState } from "react";


import MULTI_NFT_TOKEN_STAKE_ABI from "/utils/Config/MULTI_NFT_TOKEN_STAKE_ABI.json";
import POOL_CONTRACT from "/utils/Config/POOL_CONTRACT.json";
import TOKEN_ABI from "/utils/Config/TOKEN_ABI.json";
import STAKENFT_ABI from "/utils/Config/STAKENFT_ABI.json";

import Config, { EX_LINK } from "/utils/Config";
import Web3 from "web3";
import { useEffect } from "react";

import ChooseSingleNFtStake from "./ChooseSingleNFtStake";
import PopupModel from "./PopupModel";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

const MultiSingleNFTStakeCard = (props) => {
  let web3Provider;
  if (typeof window !== "undefined") {
    web3Provider = window.ethereum;
  }
  const NFT = props.data.nft;
  const NFT_STAKE = props.data.address;
  const wallet = useAccount();
  const [status, setStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setApproveWizard(!approvewizard);

  const [damount, setdAmount] = useState(0);
  const [depositArray, setDepositArray] = useState([]);

  const [symbol, setSymbol] = useState("");
  const [sTokenPrice, setsTokenPrice] = useState(0);
  const [feeToken, setFeeToken] = useState(null);
  const [unstakeId, setUnstakeId] = useState(1);

  const [stakefee, setstakefee] = useState(0);
  const [totalStaked, settotalStaked] = useState(0);

  const [rewardTokensymbol, setRewardTokensymbol] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");

  const [stakeTokenAddress, setstakeTokenAddress] = useState("");
  const [nftAddress, setNftAddress] = useState(null);
  const [apr, setApr] = useState(0);
  const [userInfo, setUserInfo] = useState([1]);

  const [approval, setApproval] = useState(0);
  const [claimAllowed, setClaimAllowed] = useState(false);
  const [stakeAllowed, setStakeAllowed] = useState(false);
  const [userNfts, setUserNfts] = useState([]);

  const [userReward, setUserReward] = useState(0);
  const [userStaked, setUserStaked] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [stakingAmountOg, setStakingAmountOg] = useState(0);

  const [limit, setLimit] = useState(0);
  const [combination, setCombination] = useState(0);

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

  const handleDepositChange = (n, v) => {
    // alert(v);
    let _temp = depositArray;
    // _temp[n] = v ;
    _temp.push(v);
    setDepositArray(_temp);
  };

  async function depositTokenAll() {
    setDepositError(false);
    // let _amount = parseInt(depositAmount) ;

    if (parseFloat(balance) < parseFloat(stakefee)) {
      setDepositError(
        "Insufficient Balance for fee. Please fund your wallet with some " +
          symbol +
          " Token and try again."
      );
      return false;
    }

    depositNow(userNfts);
  }

  async function depositToken() {
    setDepositError(false);
    // let _amount = parseInt(depositAmount) ;

    if (parseFloat(balance) < parseFloat(stakefee)) {
      setDepositError(
        "Insufficient Balance for fee. Please fund your wallet with some " +
          symbol +
          " Token and try again."
      );
      return false;
    }

    depositNow(depositArray);
  }

  async function depositNow(_array) {
    //   alert(_array.length);
    if (_array.length == 0) {
      setDepositError(
        "Invalid Deposit Selection. Please choose atleast one NFTs"
      );
      return false;
    }

    let _web3 = new Web3(web3Provider);
    const _stakeContract = new _web3.eth.Contract(
      MULTI_NFT_TOKEN_STAKE_ABI,
      NFT_STAKE
    );

    console.log(_array);

    setModal(!modal);
    _stakeContract.methods
      .deposit(_array)
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

  const getEndTime = async () => {
    let _web3 = new Web3(web3Provider);
    const _stakeContract = new _web3.eth.Contract(
      MULTI_NFT_TOKEN_STAKE_ABI,
      NFT_STAKE
    );

    let _endBlock = await _stakeContract.methods.bonusEndBlock().call();

    let _latestBlock = await _web3.eth.getBlock("latest");
    let _endTime = 0;
    let remainingblock = parseInt(_endBlock) - parseInt(_latestBlock.number);

    let remainingSeconds = remainingblock * 3;
    // console.log("Remaining Sec" , remainingSeconds);

    let remainingDay = Math.floor(remainingSeconds / (60 * 60 * 24));
    let remainingHour = Math.floor(
      (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
    );
    let remainingMinutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
    let remainingSec = Math.floor(remainingSeconds % 60);
    if (remainingSeconds <= 0) {
      _endTime = "Ended";
      setEndTime(_endTime);
    } else if (remainingDay > 0) {
      _endTime =
        remainingDay + "d : " + remainingHour + "h : " + remainingMinutes + "m";
      setEndTime(_endTime);
    } else {
      _endTime =
        remainingHour + "h : " + remainingMinutes + "m : " + remainingSec + "s";
      setEndTime(_endTime);
    }
  };
  const getTime = async () => {
    let _web3 = new Web3(web3Provider);
    const _stakeContract = new _web3.eth.Contract(
      MULTI_NFT_TOKEN_STAKE_ABI,
      NFT_STAKE
    );

    // console.log(_unlockTime);
    // let _claimtime = await _stakeContract.methods.claimtime().call() ;
    let endTime;

    let _currentTime = new Date().getTime() / 1e3;
    let _unlockTime = 0;

    _unlockTime = await _stakeContract.methods
      .nftclaimtime(wallet.address)
      .call();

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
    } else if (_unlockTime < _currentTime && _unlockTime > 0) {
      setEndTime("Ended");

      setClaimAllowed(true);
    }
  };

  const showTime = async () => {
    let _web3 = new Web3(web3Provider);
    const _stakeContract = new _web3.eth.Contract(
      MULTI_NFT_TOKEN_STAKE_ABI,
      NFT_STAKE
    );

    // console.log(_unlockTime);
    let _claimtime = await _stakeContract.methods.claimtime().call();

    let remainingSecondsC = _claimtime;
    // console.log("Remaining Sec" , remainingSeconds);

    let remainingDayC = Math.floor(remainingSecondsC / (60 * 60 * 24));
    let remainingHourC = Math.floor(
      (remainingSecondsC % (60 * 60 * 24)) / (60 * 60)
    );
    let remainingMinutesC = Math.floor((remainingSecondsC % (60 * 60)) / 60);
    let remainingSec = Math.floor(remainingSecondsC % 60);

    let endTimeC =
      remainingDayC +
      "d : " +
      remainingHourC +
      "h : " +
      remainingMinutesC +
      "m";
    setEndTime(endTimeC);
  };

  const initContracts = async () => {
    let _web3 = new Web3(web3Provider);
    console.log(NFT_STAKE);
    const _stakeContract = new _web3.eth.Contract(
      MULTI_NFT_TOKEN_STAKE_ABI,
      NFT_STAKE
    );

    let _nfttoken = await _stakeContract.methods.nftaddress().call();
    setNftAddress(_nfttoken);
    let _rewardToken = await _stakeContract.methods.rewardToken().call();

    const _nftContract = new _web3.eth.Contract(STAKENFT_ABI, _nfttoken);
    let _nftsymbol = await _nftContract.methods.symbol().call();

    setNftSymbol(_nftsymbol);

    const _rewardTokenContract = new _web3.eth.Contract(
      TOKEN_ABI,
      _rewardToken
    );
    let _rewardTokensymbol = await _rewardTokenContract.methods.symbol().call();

    setRewardTokensymbol(_rewardTokensymbol);

    let _feeToken = await _stakeContract.methods.feeToken().call();
    setFeeToken(_feeToken);
    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _feeToken);
   

    let _symbol = await _tokenContract.methods.symbol().call();
    setSymbol(_symbol);

    let _decimals = await _tokenContract.methods.decimals().call();
    let _stakingFee = await _stakeContract.methods.stakeFee().call();
    setstakefee(_stakingFee / 1e1 ** _decimals);

    let _totalStaked = await _nftContract.methods.balanceOf(NFT_STAKE).call();
   

    let _rewardperblock = await _stakeContract.methods.rewardPerBlock().call();

    let rtotalDecimals = await _rewardTokenContract.methods.decimals().call();
    console.log("Reward per block", (_rewardperblock * 7 * 1e16) / 1e18);
    let earnPerYear = (10512000 * _rewardperblock * 7 * 1e16) / 1e18;
    console.log("Reward per year", earnPerYear);

    let sttokenpool = 13 * 1e18 * _totalStaked;

    let apr = parseFloat(
      (earnPerYear / 1e1 ** rtotalDecimals / (sttokenpool / 1e1 ** 18)) * 100
    ).toFixed();
    setApr(apr);

    if (wallet.address) {
      let _userInfo = await _stakeContract.methods
        .getuserInfo(wallet.address)
        .call();
      console.log("Userinfo", _userInfo[0].length);
      setUserInfo(_userInfo[0]);
      setUnstakeId(_userInfo[0].length);

      let _userReward = await _stakeContract.methods
        .pendingReward(wallet.address)
        .call();
      // console.log(_userStaked);
      _userReward = _web3.utils.fromWei(_userReward);
      _userReward = parseFloat(_userReward).toFixed(2);
      setUserReward(_userReward);

      let _userBalance = await _nftContract.methods
        .balanceOf(wallet.address)
        .call();

      let userTokens = [];

      for (let i = 0; i < _userBalance; i++) {
        let _userToken = await _nftContract.methods
          .tokenOfOwnerByIndex(wallet.address, i)
          .call();
        userTokens.push(_userToken);
        if (i == _userBalance - 1) {
          setUserNfts(userTokens);
        }
      }

      let _approval = await _tokenContract.methods
        .allowance(wallet.address, NFT_STAKE)
        .call();
      _approval = parseFloat(_approval / 1e1 ** _decimals).toFixed(2);

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

    const _stakeContract = new _web3.eth.Contract(
      MULTI_NFT_TOKEN_STAKE_ABI,
      NFT_STAKE
    );

    setModal(!modal);

    _stakeContract.methods
      .withdraw(0)
      .send({ from: wallet.address })
      .on("receipt", function (receipt) {
        initContracts();

        setModal(modal);
      })

      .on("error", function (error, receipt) {
        setModal(modal);
      });
  }

  async function unstakeRedeemableAll() {
    let _web3 = new Web3(web3Provider);

    const _stakeContract = new _web3.eth.Contract(
      MULTI_NFT_TOKEN_STAKE_ABI,
      NFT_STAKE
    );

    setModal(!modal);
    

    _stakeContract.methods
      .withdraw(userInfo.length)
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

  async function unstakeRedeemable() {
    let _web3 = new Web3(web3Provider);

    const _stakeContract = new _web3.eth.Contract(
      MULTI_NFT_TOKEN_STAKE_ABI,
      NFT_STAKE
    );

    setModal(!modal);
    _stakeContract.methods
      .withdraw(unstakeId)
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

    const _stakeContract = new _web3.eth.Contract(
      MULTI_NFT_TOKEN_STAKE_ABI,
      NFT_STAKE
    );

    setModal(!modal);

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

 

  async function approveToken() {
    setApproveWizard(!approvewizard);
    let _web3 = new Web3(web3Provider);

    const _stakeContract = new _web3.eth.Contract(
      MULTI_NFT_TOKEN_STAKE_ABI,
      NFT_STAKE
    );

    let _staketoken = await _stakeContract.methods.feeToken().call();

    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _staketoken);

    setModal(!modal);

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
        setApproveWizard(!approvewizard);
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
    getEndTime();
    if (wallet.address) {
      initContracts();

      setInterval(() => {
        // getTime();
      }, 1000);
    }
  }, [wallet.address]);

  const [show, setShow] = useState(false);
  const [showStake, setShowStake] = useState(false);
  const [approvewizard, setApproveWizard] = useState(false);
  return (
    <div className="flex justify-center">
      <div>
        <div className="wrp-satke mb-3 ">
          <div class="panel-heading" role="tab" id="accordion">
            <Link
              role="button"
              onClick={() => {
                setShow(!show);
              }}
              data-toggle="collapse"
              data-parent="#accordion"
              href={"#collapse" + props.index}
              aria-expanded="true"
              aria-controls={"collapse" + props.index}
            >
              <div className="wrp-bison1">
                <div className="bison-c1 bg-bison">
                  <div className={`img-bison`}>
                    <img src={props.data.image} />
                  </div>
                </div>
                <div className="token1">
                  <h3>{nftSymbol} NFT</h3>
                </div>
                <div className="apr">
                      <div className="calcul-wrp">
                        <div className="wrp-arp">
                          <div className="apr-c mr-right"></div>
                          <div className="apr-c1">
                            <h3>{apr}%</h3>
                          </div>
                        </div>
                        <div className="popup-wrp">
                          <PopupModel />
                        </div>
                      </div>
                </div>
                <div className="apr">
                      <div className="wrp-arp">
                        <div className="apr-c mr-right"></div>

                        <div className="apr-c1">
                          <h3>
                            {userReward} {rewardTokensymbol}
                          </h3>
                        </div>
                      </div>
                </div>

                <div className="bison-btn">
                  { props.data.status == 1 ?
                    <button
                      className="mr-3"
                      onClick={() => {
                        setShowStake(!showStake), depositToggle;
                      }}
                    >
                      Stake
                    </button>:""
                  }
                  {userInfo.length > 0 ? (
                    <button className="mr-3" onClick={unstakeToggleRedeemable}>
                      Unstake
                    </button>
                  ):""}
                  {userReward > 0 ? (
                    <button onClick={claim}>Claim</button>
                  ):""}
                  {(wallet.address === null) ? <ConnectButton />:""}
                </div>
              </div>
            </Link>

            {show ? (
              <div className="border">
                <div id={"collapse" + props.index} role="tabpanel">
                  <div class="panel-body">
                    <div className="bottom-list flex justify-between gap-3">
                      <div className="w-full">
                          <div className="wrp-arp2">
                            <div className="apr-c">
                              <p>Your Staked</p>
                            </div>

                            <div className="apr-c ">
                              <p>
                                {userInfo.length} {nftSymbol}
                              </p>
                            </div>
                          </div>
                          <div className="wrp-arp2">
                            <div className="apr-c">
                              <p>Stake Fee</p>
                            </div>
                            <div className="apr-c">
                              <p>
                                {stakefee} {symbol}
                              </p>
                            </div>
                          </div>
                          </div>
                          <div className="w-full">
                          <div className="wrp-arp2">
                            <div className="apr-c">
                              <p>End Time</p>
                            </div>

                            <div className="apr-c ">
                              <p>{endTime}</p>
                            </div>
                          </div>
                          <div className="wrp-arp2 flex justify-between">
                            <div className="apr-c bscscan">
                              <a
                                target="_blank"
                                href={EX_LINK + props.data.nft}
                              >
                                View on BscScan
                              </a>
                            </div>
                            <div className="apr-c bscscan">
                              <a
                                target="_blank"
                                href={
                                  "https://pancakeswap.finance/swap?outputCurrency=" +
                                  feeToken
                                }
                              >
                                Buy {symbol} Token
                              </a>
                            </div>
                          </div>
                          </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
{/* 
          <div
            isOpen={unstakeRedeemableModal}
            toggle={unstakeToggleRedeemable}
            centered={true}
          >
            <main>
              <label>
                <br />
                Choose number of {nftSymbol} NFT Token to unstake
              </label>

              <div className="">
                <select onChange={(e) => setUnstakeId(e.target.value)}>
                  {userInfo.length > 0 &&
                    userInfo.map((v, i) => {
                      return (
                        <option
                          selected={i == userInfo.length - 1 ? "selected" : ""}
                          value={i + 1}
                        >
                          {i + 1}
                        </option>
                      );
                    })}
                </select>
              </div>
            </main>
            <footer>
              <button
                className="depositButton mr-3"
                onClick={unstakeRedeemable}
              >
                Unstake
              </button>
              <button
                className="depositButton mr-3"
                onClick={unstakeRedeemableAll}
              >
                Unstake All
              </button>

              <button
                className="depositButton"
                onClick={unstakeToggleRedeemable}
              >
                Cancel
              </button>
            </footer>
          </div>

          <div isOpen={unstakeModal} toggle={unstakeToggle} centered={true}>
            <main>
              <span className="mt-5 text-center">
                "Warning: you will lose all the progress so far if you unstake
                your tokens now, So if you decided to stake again the timer will
                begin from start again"
              </span>
            </main>
            <footer>
              <button className="depositButton mr-3" onClick={unstake}>
                Proceed
              </button>

              <button className="depositButton" onClick={unstakeToggle}>
                Cancel
              </button>
            </footer>
          </div> */}
          
          {showStake ? (
            <div className=" justify-center flex absolute items-center inset-0 z-10">
              <div
                isOpen={depositmodal}
                toggle={unstakeToggle}
                centered={true}
                className="bg-white popup-wrp mt-44 rounded-xl p-8"
              >
                <main>
                  <div className="moveRight">
                    <span>
                      Your {symbol} Balance
                      <br />
                      {balance} {symbol}
                    </span>
                  </div>
                  <label>
                    <br />
                    Choose {nftSymbol} NFT Token to stake
                  </label>
                  <div className="">
                    {nftAddress && (
                      <ChooseSingleNFtStake
                        index={0}
                        stakeAddress={NFT_STAKE}
                        address={nftAddress}
                        handleDepositChange={() => handleDepositChange}
                      />
                    )}
                  </div>
                  <span className="mt-5 text-info text-blue-500">
                    Fee: {stakefee} {symbol}{" "}
                  </span>
                  <br />{" "}
                  <div>
                    {depositError && (
                      <span className="error text-danger">{depositError}</span>
                    )}
                  </div>
                </main>
                <footer>
                  {approval > 0 && approval > stakingAmountOg * damount && (
                    <>
                      <button
                        className="depositButton mr-3 "
                        onClick={depositToken}
                      >
                        Deposit
                      </button>
                      <button
                        className="depositButton mr-3"
                        onClick={depositTokenAll}
                      >
                        Deposit All
                      </button>
                    </>
                  )}
                  {(approval == 0 || approval < stakefee) && (
                    <button
                      className="depositButton mr-3 bg-blue-500 p-2 rounded-xl text-white"
                      onClick={approveToken}
                    >
                      Approve {symbol}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowStake(!showStake);
                    }}
                    className="bg-blue-500 p-2 rounded-xl text-white"
                  >
                    Cancel
                  </button>
                </footer>
              </div>
            </div>
          ) : (
            ""
          )}

          {approvewizard ? (
            <div className="flex justify-center items-center z-20">
              <div
                isOpen={modal}
                toggle={toggle}
                centered={true}
                className="bg-white rounded p-4 flex justify-center"
              >
                <main>
                  <div className="modaltext text-center mt-4">
                    Transaction is Processing...
                  </div>
                </main>
                <button
                  className="depositButton mr-auto ml-auto mb-5 bg-blue-500 p-2 rounded-xl"
                  onClick={toggle}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSingleNFTStakeCard;
