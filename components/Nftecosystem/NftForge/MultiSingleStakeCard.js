import React, { useState } from "react";

    
import hero from '/public/assets/Images/hero.png';
import search from '/public/assets/Images/search.png';
import big from '/public/assets/Images/big.png';
import play from '/public/assets/Images/play.png';
import MULTI_NFT_STAKE_ABI from  "/utils/Config/MULTI_NFT_STAKE_ABI.json"
import POOL_CONTRACT from  "/utils/Config/POOL_CONTRACT.json"
import TOKEN_ABI from  "/utils/Config/TOKEN_ABI.json"
import STAKENFT_ABI from  "/utils/Config/STAKENFT_ABI.json"

import Config, {EX_LINK} from  "/utils/Config"
import Web3 from "web3"
import { useEffect } from 'react';
// import {useWallet} from '@binance-chain/bsc-use-wallet'
// import ConnectButton from '../ConnectButton'
import WIZARD from '/public/assets/Images/add.gif';
import ORDINARY from '/public/assets/Images/Ordinary.gif';
import EPIC from '/public/assets/Images/Epic.gif';
import AUTOSHARK from '/public/assets/Images/AUTOSHARK.gif';
import RARE from '/public/assets/Images/Rare.gif';
import { func } from "prop-types";
import ROUTER_ABI from  "/utils/Config/ROUTER_ABI.json"
import DMTNT from '/public/assets/Images/DMTNT.gif';
import BabyNFT from '/public/assets/Images/BabyNFT.gif';
import NFWolfPup from '/public/assets/Images/NFWolfPup.gif';
import NFB from '/public/assets/Images/BananaWIZARDs.gif';
import MCS from '/public/assets/Images/MoonCafeSloth.gif';
import BK from '/public/assets/Images/BananaKing.gif';
import PEAR from '/public/assets/Images/PEAR.gif';
 


import BBQG from '/public/assets/Images/BarbecueNFT.gif';
import SQ from '/public/assets/Images/SquirrelNFT.gif';
import OWL from '/public/assets/Images/OwlNFTFARM.gif';
import SING from '/public/assets/Images/SingularfarmNFT.gif';
import MDF from '/public/assets/Images/MDFNFT.gif';
import CL from '/public/assets/Images/Lovesswap.gif';
import GT from '/public/assets/Images/GT.gif';
import MPS from '/public/assets/Images/MPS.gif';
import BTCG from '/public/assets/Images/BTCG.gif';
import PMDB from '/public/assets/Images/PMDB.gif';
import DSG from '/public/assets/Images/DSG.gif';
import CDP from '/public/assets/Images/CDP.gif';
import ChooseSingleNFt from "./ChooseSingleNFt";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";


const MultiSingleStakeCard = (props) => {

  let web3Provider;
  if (typeof window !== "undefined") {
    web3Provider = window.ethereum;
  } 
  const NFT = props.data.nft ;
  const NFT_STAKE = props.data.address ;
  const wallet = useAccount();
  const [status, setStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
     
  const [damount, setdAmount] = useState(0);
  const [depositArray, setDepositArray] = useState([]);
  
  const [symbol, setSymbol] = useState('');
  const [sTokenPrice, setsTokenPrice] = useState(0);
  const [feeToken, setFeeToken] = useState(null);
  
  
  const [stakefee ,setstakefee] =useState(0);
  const [totalStaked ,settotalStaked] =useState(0);
  const [nftSymbol, setNftSymbol] = useState('');
  const [stakeTokenAddress, setstakeTokenAddress] = useState('');
  
  
  const [approval, setApproval] = useState(0);
  const [claimAllowed, setClaimAllowed] = useState(false);
  const [stakeAllowed, setStakeAllowed] = useState(false);
  
  const [userStaked, setUserStaked] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [stakingAmountOg, setStakingAmountOg] = useState(0);
  
  const [limit, setLimit] = useState(0);
  const [combination, setCombination] = useState(0);
   
  
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
  
  
  
  const handleDepositChange = (n,v) => {
      // alert(v);
      let _temp = depositArray ; 
      // _temp[n] = v ;
      _temp.push(v) ;
      setDepositArray(_temp);  
  
  }
  
  
  
  
  async function depositToken(){
      setDepositError(false);
      // let _amount = parseInt(depositAmount) ;
    
      if(balance <= stakefee ){
          setDepositError('Insufficient Balance for fee. Please fund your wallet with some '+symbol+' Token and try again.');
          return false;
      }
  
  
      
      let _array = [];
      depositNow(depositArray) ;

      
  }
  
  async function depositNow(_array){
  //   alert(_array.length);
      if(_array.length != limit){
          setDepositError('Invalid Deposit Selection. Please choose not more or less than '+limit+'  NFTs');
          return false;
      }
  
      let _web3 = new Web3(web3Provider);
      const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
   
  
      console.log(_array);
  
      setModal(!modal);
      _stakeContract.methods.stakeNft(_array).send({
          from: wallet.address
      }).on('receipt', function(receipt){
          setModal(modal);
          depositToggle() ;
          initContracts() ;
  
         
         
      }).on('error', function(receipt){
          setModal(modal);
  
      })
      
  }
  
  
   const getTime = async() => {
  
      let _web3 = new Web3(web3Provider);
      const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
  
      // console.log(_unlockTime);
      let _claimtime = await _stakeContract.methods.claimtime().call() ;  
      let endTime ; 
      
      let _currentTime = new Date().getTime()/1e3 ;
      let _unlockTime = 0 ;
     
           _unlockTime = await _stakeContract.methods.nftclaimtime(wallet.address).call() ;  
  
     
  
      if(_unlockTime > 0 && _currentTime < _unlockTime ){
          setClaimAllowed(false)
   
      let remainingSeconds = _unlockTime - _currentTime ;
      // console.log("Remaining Sec" , remainingSeconds);
  
      let remainingDay = Math.floor(
        remainingSeconds / (60 * 60 * 24)
      );
      let remainingHour = Math.floor(
        (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
      );
      let remainingMinutes = Math.floor(
        (remainingSeconds % (60 * 60)) / 60
      );
      let remainingSec = Math.floor(remainingSeconds % 60);
      if(remainingDay > 0){
          endTime = remainingDay+"d : "+remainingHour+"h : "+remainingMinutes+"m";
          setEndTime(endTime);
  
      }
      else{
          endTime = remainingHour+"h : "+remainingMinutes+"m : "+remainingSec+"s" ;
          setEndTime(endTime);
  
      }
  }
  else if(_unlockTime < _currentTime && _unlockTime > 0 ){
     
     setEndTime("Ended")
  
       
      setClaimAllowed(true)
  }
   
   } 
  
   
   const showTime = async() => {
  
      let _web3 = new Web3(web3Provider);
      const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
  
      // console.log(_unlockTime);
      let _claimtime = await _stakeContract.methods.claimtime().call() ;  
     
       
      let remainingSecondsC = _claimtime ;
      // console.log("Remaining Sec" , remainingSeconds);
  
      let remainingDayC = Math.floor(
          remainingSecondsC / (60 * 60 * 24)
      );
      let remainingHourC = Math.floor(
        (remainingSecondsC % (60 * 60 * 24)) / (60 * 60)
      );
      let remainingMinutesC = Math.floor(
        (remainingSecondsC % (60 * 60)) / 60
      );
      let remainingSec = Math.floor(remainingSecondsC % 60);
    
      let endTimeC = remainingDayC+"d : "+remainingHourC+"h : "+remainingMinutesC+"m";
          setEndTime(endTimeC);
  
   } 
  
  const initContracts = async() => {
      let _web3 = new Web3(web3Provider);
      console.log(NFT_STAKE);
      const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
  
      let _nfttoken = await _stakeContract.methods.nftredeem().call() ;  
  
      let _nftcombination = await _stakeContract.methods.nftcombination().call() ;  
      // let _stakinglimit = await _stakeContract.methods.stakinglimit().call() ;  
      let rows = [];
      for (let i = 0; i < 1; i++) {
       rows.push({count : 1}) ;
      }
      setCombination(rows);
      setLimit(_nftcombination);
  
  
      const _nftContract = new _web3.eth.Contract(STAKENFT_ABI,_nfttoken);
      let _nftsymbol = await _nftContract.methods.symbol().call() ;
  
      setNftSymbol(_nftsymbol)
  
      let _feeToken = await _stakeContract.methods.feeToken().call() ;
  setFeeToken(_feeToken)
      const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_feeToken);
      // setstakeTokenAddress(_staketoken);
      // let sprice = await getPrice(_staketoken,0);
      // // let sprice = 0 ;
      // setsTokenPrice(sprice);
      let _symbol = await _tokenContract.methods.symbol().call() ;
      setSymbol(_symbol);
  
      let _decimals = await _tokenContract.methods.decimals().call() ;
      let _stakingFee = await _stakeContract.methods.fee().call() ;  
      setstakefee(_stakingFee/1e1**_decimals);    
  
      
  
    
      
      let _status = await _stakeContract.methods.status().call() ; 
      setStatus(_status);
  
      if(wallet.address){
  
          let _userStaked = await _stakeContract.methods.existinguser(wallet.address).call() ; 
          // console.log(_userStaked); 
          setStakeAllowed(!_userStaked) ;
  
  
   
          
          
  
          let _approval = await _tokenContract.methods.allowance(wallet.address,NFT_STAKE).call() ;
          _approval = parseFloat(_approval/1e1 ** _decimals).toFixed(2) ;
  
          setApproval(_approval);
          let _balance = await _tokenContract.methods.balanceOf(wallet.address).call() ;
          _balance = parseFloat(_balance/1e1 ** _decimals).toFixed(2) ;
          setBalance(_balance);
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
       
      _stakeContract.methods.emergencyunstakenft().send({from: wallet.address}).on('receipt', function(receipt){
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
  
  
   
  async function approveToken(){
      let _web3 = new Web3(web3Provider);
  
      const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
  
      let _staketoken = await _stakeContract.methods.feeToken().call() ;  
  
      const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_staketoken);
  
      setModal(!modal);
      // document.getElementById("exampleModalCenter").modal('show')
      
      const _amount = _web3.utils.toWei('10000000000000000000000000000') ;
      _tokenContract.methods.approve(NFT_STAKE,_amount).send({from: wallet.address}).on('receipt', function(receipt){
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
      showTime() ; 
      if(wallet.address){
          setInterval(() => {
              getTime();
          },1000)
      }
  
  },[wallet.address])

  const [show,setShow] = useState(false);

  return (
    <div>
      <div>
                <div className="faq-mobile">
                    <div className="faq-singular" itemprop="mainEntity">
                        
                            <div className="bnbmobile-wrp">
                                
                                <div className="bnb-left">
                                <div className="img-bison">
                                            <img src={props.data.image} />
                                        </div>
                                <div className="token1">
                                         
                                         
                                            <h3 >{nftSymbol} NFT</h3>
                                    
                                    </div>
                                    {/* <div className="apr">
                                        
                                        <ul className="arp-list">
                                            <li>
                                                <div className="wrp-arp">
                                                   
                                                    <div className="apr-c1"><h3>{userStaked} {symbol}</h3></div>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </div> */}
                                    <div className="apr">
                                        
                                                <div className="wrp-arp">
                                                   
                                                    {
                                                        props.data.fee == 1 ?
                                                        <div className="apr-c1"><h3>Redeemable</h3></div>
                                                        :
                                                        <div className="apr-c1"><h3>Non-Redeemable</h3></div>
                                                    }
                                                </div>

                                    </div>
                                </div>
                                <div className="bnb-right">
                                    {/* <div className="mobile-unloackbtn">
                                    
                                        {
                                            wallet.address && props.data.status == 1 && !claimAllowed && stakeAllowed &&
                                            <button onClick={depositToggle}>Stake</button>
                                        }
                                       
                                          {
                                            wallet.address  && !claimAllowed && !stakeAllowed &&
                                            <button className="mr-3" onClick={unstakeToggleRedeemable}>Unstake</button>
                                        }
                                          {
                                            wallet.address && claimAllowed &&
                                            <button onClick={claim}>Claim</button>
                                        }
                                    {
                                        !wallet.address && 
                                        <ConnectButton />
                                    }
                                    </div> */}
                                </div>
                            </div>

                    </div>
                </div>
                <div className="wrp-satke mb-3 onlyDesktop">
			<div class="panel-heading" role="tab" id="accordion" onClick={()=>{setShow(!show)}}>
            <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#collapse'+props.index} aria-expanded="true" aria-controls={'collapse'+props.index}>

                               <div className="wrp-bison1">
                                    <div className="bison-c1 bg-bison">
                                        <div className="img-bison">
                                            <img src={props.data.image} />
                                        </div>
                                        {/* <div className="img-bison-c">
                                            <img src={play} />
                                        </div>
                                        <div className="img-bison">
                                            <img src={big} />
                                        </div> */}
                                    </div>
                                    <div className="token1">
                                             <h3 >{nftSymbol} NFT</h3>
                                         
                                    </div>
                                    {/* <div className="apr">
                                        
                                        <ul className="arp-list">
                                            <li>
                                                <div className="wrp-arp">
                                                    <div className="apr-c mr-right"></div>
                                                    <div className="apr-c1"><h3>{userStaked} {symbol}</h3></div>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </div> */}
                                    <div className="apr">
                  
                                                <div className="wrp-arp">
                                                    <div className="apr-c mr-right"></div>
                                                    {
                                                        props.data.fee == 1 ?
                                                        <div className="apr-c1"><h3> Non-Redeemable</h3></div>
                                                        :
                                                        <div className="apr-c1"><h3>Redeemable</h3></div>
                                                    }
                                                </div>
                                    </div>
                                    <div className="q-marg">
                                        <h3>{endTime}</h3>
                                    </div>
                                    <div className="bison-btn">
                                    {
                                            (wallet.address !==null) && props.data.status == 1 && !claimAllowed && stakeAllowed && status &&
                                            <button onClick={depositToggle}>Stake</button>
                                        }
                                     
                                          {
                                            (wallet.address !==null)  && !claimAllowed && !stakeAllowed && 
                                            <button className="mr-3" onClick={unstakeToggleRedeemable}>Unstake</button>
                                        }
                                          {
                                            (wallet.address !== null) && claimAllowed &&
                                            <button onClick={claim}>Claim</button>
                                        }
                                          {
                                        (wallet.address ===null) && 
                                        <ConnectButton />
                                    }

                                    </div>
                                </div>
                                </a>
                             </div>
			{/* <div id={'collapse'+props.index} className="panel-collapse collapse in mt-4" role="tabpanel" aria-labelledby="headingOne">
				<div class="panel-body">
				<div className="bottom-list">
				<ul className="arp-list2">
							
							<li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>End</p>
									</div>
									
									<div className="apr-c ">
										<p>{endTime}</p>
									</div>
								</div>
							</li>
						 
                            <li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Stake Fee</p>
									</div>
									<div className="apr-c">
										<p>{stakefee} {symbol}</p>
									</div>
								</div>
							</li>
                           
                           
                            </ul>
				<ul className="arp-list2">
						  
                            <li>
                            <div className="wrp-arp2">
									<div className="apr-c bscscan">
                            <a target="_blank" href={EX_LINK+props.data.nft} >View on BscScan</a>
                            </div>
									<div className="apr-c bscscan">
									<a target="_blank" href={'https://pancakeswap.finance/swap?outputCurrency='+feeToken}>Buy {symbol} Token</a>
                                    </div>
								</div>
                            </li>
                            
							
						</ul>
					 
                      
				</div>
                 
						
				</div>
			</div> */}


      {
        show?<div className="faq-answer" itemprop="acceptedAnswer">
        <div itemprop="text">
            <div className="bottom-list flex gap-3">
              <div className="flex-1">
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
<p>Stake Fee</p>
</div>
<div className="apr-c text-right">
<p>{stakefee/100}%</p>
</div>
</div>
</div>
        <div className="wrp-arp2 flex flex-1 justify-between">
<div className="apr-c bscscan">
        <a target="_blank" href={EX_LINK+props.data.nft} >View on BscScan</a>
        </div>
<div className="apr-c bscscan">
<a target="_blank" href={'https://pancakeswap.finance/swap?outputCurrency='+feeToken}>Buy {symbol} Token</a>
                </div>
</div>
            </div>
        </div>
    </div>:""
      }
					
{
  modal?<div className="flex justify-center absolute items-center top-52 inset-0 z-20">      
  <div isOpen={modal} toggle={toggle}  centered={true} className="bg-white w-1/2 rounded-sm p-5 justify-center">
  
       
  <main>
  <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

  </main>
  <button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</button>
   
</div>
</div>  :""
}


 {
  unstakeRedeemableModal?<div className=" flex justify-center absolute items-center top-52 inset-0 z-10">
      <div isOpen={unstakeRedeemableModal} toggle={unstakeToggleRedeemable}  centered={true} className="bg-white w-1/2 rounded-sm p-5 justify-center">

 
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
 
        <button className="depositButton mr-3" onClick={unstake}>Proceed</button>
   
  <button className="depositButton" onClick={unstakeToggle}>Cancel</button>
</footer>
</div>
  </div>:""
}

{

depositmodal? <div className="flex justify-center absolute items-center top-52 inset-0 z-10">
      <div isOpen={depositmodal} toggle={unstakeToggle}   centered={true} className="bg-white w-1/2 rounded-sm p-5 justify-center">
<main>
        
   <div className="moveRight">
       
       <span> 
          Your {symbol} Balance<br />
          {balance} {symbol}
       </span>
   </div>
  <label><br />Choose Any {limit} NFT to stake

  </label>
 <div className="" >
     
     {
         limit > 0 && combination.length > 0 && combination.map((v,i) => {

             return (
                 <ChooseSingleNFt index={i} address={NFT_STAKE} handleDepositChange={() => handleDepositChange} />

             )

         })
     }
   
 </div>


  <span className="mt-5 text-info text-blue-500" >Fee: {(stakefee) } {symbol}  </span><br />                                        <div>
  {
      depositError &&
      <span className="error text-danger">{depositError}</span>
  }

    </div>
 
</main>
<footer>
    {
        (approval > 0 && approval > stakingAmountOg*damount) &&
        <button className="depositButton mr-3" onClick={depositToken}>Deposit</button>
    }
    {
        (approval == 0 || approval < stakefee) &&
        <button className="depositButton mr-3 bg-blue-500 p-2 rounded-xl" onClick={approveToken}>Approve {symbol}</button> 
    }
  <button className="depositButton bg-blue-500 rounded-xl p-2" onClick={depositToggle}>Cancel</button>
</footer>
</div>
  </div>:""
}
 

            </div>
            </div>
    </div>
  )
}

export default MultiSingleStakeCard