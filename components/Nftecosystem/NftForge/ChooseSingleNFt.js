import React, { useState } from "react";

import MULTI_NFT_STAKE_ABI from  "/utils/Config/MULTI_NFT_STAKE_ABI.json"
import POOL_CONTRACT from  "/utils/Config/POOL_CONTRACT.json"
import TOKEN_ABI from  "/utils/Config/TOKEN_ABI.json"
import NFT_ABI from  "/utils/Config/NFT_ABI.json"
import Config, {EX_LINK} from  "/utils/Config"
import Web3 from "web3"
import { useEffect } from 'react';

// import NftIcon from "./NftIcon";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";


const ChooseSingleNFt = (props) => {

    
  let web3Provider;
  if (typeof window !== "undefined") {
    web3Provider = window.ethereum;
  } 
 
  const NFT_STAKE =  props.address ;
  const wallet = useAccount();
  const [modal, setModal] = useState(false);
   
  const [NFT, setNft] = useState(false);
  const toggle = () => setModal(!modal);
     
  const [damount, setdAmount] = useState(0);
  
  const [symbol, setSymbol] = useState('');
  const [sTokenPrice, setsTokenPrice] = useState(0);
  const [nftAddress, setNftAddress] = useState(0);
  const [userNfts, setUserNfts] = useState([]);
  
   
  const [stakefee ,setstakefee] =useState(0);
  const [totalStaked ,settotalStaked] =useState(0);
  const [nftSymbol, setNftSymbol] = useState('');
  const [stakeTokenAddress, setstakeTokenAddress] = useState('');
  
  
  const [approval, setApproval] = useState(0);
  const [claimAllowed, setClaimAllowed] = useState(false);
  
  const [userStaked, setUserStaked] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [startRange, setStartRange] = useState(0);
  const [endRange, setEndRange] = useState(0);
  const [stakingAmountOg, setStakingAmountOg] = useState(0);
  
  const [limit, setLimit] = useState(0);
   
  
  const [depositError, setDepositError] = useState('');
  
  
  const [depositmodal, setDepositmodal] = useState(false);
  const depositToggle = () => setDepositmodal(!depositmodal);
  
  
  const [unstakeModal, setUnstakemodal] = useState(false);
  const unstakeToggle = () => setUnstakemodal(!unstakeModal);
  const [unstakeRedeemableModal, setunstakeRedeemableModal] = useState(false);
  const unstakeToggleRedeemable = () => setunstakeRedeemableModal(!unstakeRedeemableModal);
  
  
  async function setMaxDeposit(){
  
   
      setdAmount(balance)
      setDepositAmount(balance)
  }
  
  
  
  const handleDepositChange = props.handleDepositChange() ;
  
  
    
  const initContracts = async() => {
      let _web3 = new Web3(web3Provider);
      const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
      let _getNft = await _stakeContract.methods.nftStakeaddresses(props.index).call() ; 
      setNftAddress(_getNft);
  
      let _start = await _stakeContract.methods.stakingstarttingrange(props.index).call() ; 
      let _end = await _stakeContract.methods.stakingendrange(props.index).call() ; 
      setStartRange(_start)
      setEndRange(_end)
  
      let _nftContract = new _web3.eth.Contract(NFT_ABI,_getNft);
  
      if(wallet.address){
          let _userBalance = await _nftContract.methods.balanceOf(wallet.address).call() ;
          let _approved = await _nftContract.methods.isApprovedForAll(wallet.address,NFT_STAKE).call() ;
          setApproval(_approved)
          let userTokens = [] ;
  // alert(_userBalance)
          for(let i = 0 ; i < _userBalance; i++){
           let _userToken = await _nftContract.methods.tokenOfOwnerByIndex(wallet.address,i).call() ;
             userTokens.push(_userToken);
             if(i == (_userBalance-1)){
                setUserNfts(userTokens);           
             }
  
          }
        }
  }   
  
  
  async function claim(){
      let _web3 = new Web3(web3Provider);
  
      const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
  
      
  
      setModal(!modal);
      // document.getElementById("exampleModalCenter").modal('show')
       
      _stakeContract.methods.redeemNft().send({from: wallet.address}).on('receipt', function(receipt){
          initContracts(); 
       
           setModal(modal);
  
      })
    
      .on('error', function(error, receipt) {
      setModal(modal);
          
      });
         
  }
  
  
  
  async function unstakeRedeemable(){
      let _web3 = new Web3(web3Provider);
  
      const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
  
      
  
      setModal(!modal);
      // document.getElementById("exampleModalCenter").modal('show')
       
      _stakeContract.methods.emergencyunstaketoken().send({from: wallet.address}).on('receipt', function(receipt){
          initContracts(); 
          unstakeToggleRedeemable() ;
           setModal(modal);
  
      })
    
      .on('error', function(error, receipt) {
      setModal(modal);
          
      });
         
  }
  
  
  
  async function unstake(){
      let _web3 = new Web3(web3Provider);
  
      const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
  
      
  
      setModal(!modal);
      // document.getElementById("exampleModalCenter").modal('show')
       
      _stakeContract.methods.emergencyunstaketoken().send({from: wallet.address}).on('receipt', function(receipt){
          initContracts(); 
          unstakeToggle() ;
           setModal(modal);
  
      })
    
      .on('error', function(error, receipt) {
      setModal(modal);
          
      });
         
  }
  
  
  const getTotalStaked = async () => {
  
      var v = POOL_CONTRACT[props.index] ;  
      let _web3 = new Web3(web3Provider);
      var TOKEN_POOL_ABI = null;
      var settTotalStaked = null;
      let _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,v.address);
      let totalStaked = await _tokenPoolContract.methods.totalStaked().call() ;
      let stakeTokenAddress = await _tokenPoolContract.methods.stakeToken().call() ;
      let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,stakeTokenAddress);
      let stotalDecimals = await _tokenContract.methods.decimals().call() ;
           
      // temp['totalStaked'] = parseFloat(totalStaked/1e18).toFixed(4) ;
      if(totalStaked > 1e1**stotalDecimals){
          totalStaked = parseFloat(totalStaked/1e1**stotalDecimals).toFixed(4) ;
      }
      else{
          totalStaked = parseFloat(totalStaked/1e1**stotalDecimals).toFixed(8) ;
      }
      settTotalStaked(totalStaked);
  }
   
  async function approvenft(){
      let _web3 = new Web3(web3Provider);
  
   
      const _tokenContract = new _web3.eth.Contract(NFT_ABI,nftAddress);
  
      setModal(!modal);
      
      _tokenContract.methods.setApprovalForAll(NFT_STAKE,true).send({from: wallet.address}).on('receipt', function(receipt){
          initContracts(); 
       
           setModal(modal);
  
      })
    
      .on('error', function(error, receipt) {
      setModal(modal);
          
      });
         
  }
  
  useEffect(() => {
  
      if(window.ethereum){
          web3Provider  = window.ethereum;
        }
        else{
          web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)
         
        }
  },[])
        
  
  useEffect(() => {
      initContracts() ;
  
      if(wallet.address){
      // setInterval(function(){
      //     getTime()
          
      // },1000)
  }
  },[wallet.address])
  
  
  return (
    <div>
        <div className="mr-5 mt-4"> 
                <p className=" text-black">{nftAddress}</p> 
                {
                    userNfts.length > 0 && userNfts.map((v,i) => {
                        // if(parseInt(v) >= startRange && parseInt(v) <= endRange ){
                            return (
                                <label className="mr-3">
                                <input type={"checkbox"} className="text-black" name={nftAddress} onChange={() => handleDepositChange(nftAddress,v)} /> ID: {v} <NftIcon nftid={v} nftAddress={nftAddress} />
                                </label>
                            )
                        // }
                           
                    })
                }
                {
                     userNfts.length > 0 && !approval &&
                     <button onClick={approvenft} className="text-black">Approve NFT</button> 
                }
                {
                  userNfts.length == 0 &&
                  <p className="text-dark text-center text-black">No NFTs in your wallet</p>

                }
            </div>
    </div>
  )
}

export default ChooseSingleNFt