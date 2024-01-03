import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import { FaGlobeAmericas } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';
import { BsTelegram } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { AiFillMediumCircle } from 'react-icons/ai';
import styles from '/styles/Details.module.css';
import { ConnectButton } from "@rainbow-me/rainbowkit";


import lightlogo from '/public/assets/Images/WizardFlying.gif';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'

  import { PRIVATE_SALE , CLAIM_SALE,VESTING_CLAIM} from '/utils/Config/index.js';
import  PRIVATE_SALE_ABI from '/utils/Config/PRIVATE_SALE_ABI.json';
import  CLAIM_ABI from '/utils/Config/CLAIM_ABI.json';
import  VESTING_CLAIM_ABI from '/utils/Config/VESTING_CLAIM_ABI.json';
// import  OLD_PRIVATE_SALE_ABI from '/utils/Config/OLD_PRIVATE_SALE_ABI.json';
import  TOKEN_ABI from '/utils/Config/TOKEN_ABI.json';
import { useRouter } from 'next/router';
import Web3 from 'web3';

const Details = () => {
    let web3Provider;
    const router = useRouter();
    const slug = router.query.slug;
    console.log(slug,"slug data")
    const wallet = useAccount();
    console.log(wallet,"wallet wagmi");
    if (typeof window !== "undefined") {
        web3Provider = window.ethereum;
     }
	const [array,setArray] = useState(null);
	const [presale,setPresale] = useState({});
	const [presaleDetails,setPresaleDetails] = useState({});
	const [tokenDetails,setTokenDetails] = useState({});
	const [raiseTokenDetails,setRaiseTokenDetails] = useState({});
	const [saleTokenDetails,setSaleTokenDetails] = useState({});
	const [teamNextClaimTime,setTeamNextClaimTime] = useState(0);
    var check = null;
    
    
	const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

	const [successModal, setSuccessModal] = useState(false);
    const successToggle = () => setSuccessModal(!successModal);
    
	const [tokenDue,setTokenDue] = useState(0);
	const [tokenPurchased,setTokenPurchased] = useState(0);
	const [tokenDueClaim,setTokenDueClaim] = useState(0);
	const [tokenTotalClaim,setTotalTokenClaim] = useState(0);
    
	const [tokenPurchasedClaim,setTokenPurchasedClaim] = useState(0);
    
	const [nextClaim,setNextClaim] = useState(0);
    
	const [tokenDueNow,setTokenDueNow] = useState(0);
	const [teamTokenDueNow,setTeamTokenDueNow] = useState(0);
    
	const [status,setStatus] = useState(0);
	const [progress,setProgress] = useState(0);
	const [logo,setLogo] = useState(lightlogo);
	const [participants,setParticipants] = useState(0);
	const [participantFetching,setParticipantFetching] = useState(false);
	const [publicSale,setPublicSale] = useState(false);
	const [contribution,setContribution] = useState(0);
    
    const [bnbBalance,setbnbBalance] = useState(0);
    const [allowance,setAllowance] = useState(0);
    
    const [depositAmount,setDepositAmount] = useState(0);
    const [presaleId,setPresaleId] = useState(null);
    const [day,setDay] = useState(null);
    const [hour,setHour] = useState(null);
    const [minute,setMinute] = useState(null);
    const [second,setSecond] = useState(null);
    const [whitlistuser,setwhitlistusers] = useState(null);
    const [checkwhitlistuser,setcheckwhitlistusers] = useState(null);
    const [whitelistedtrue,setWhitelistedtrue] = useState(null);
    const [userWhitelistedtrue,setUserWhitelistedtrue] = useState(null);
    const [lockPerc,setLockPerc] = useState(0) ; 
    const [saleTokenLimit,setSaleTokenLimit] = useState(0) ; 
    const [nextClaimVesting,setNextClaimVesting] = useState(0) ; 
    const [tokenDueNowVesting,setTokenDueNowVesting] = useState(0) ; 
    

    useEffect(() => {
		if(window.ethereum){
			web3Provider  = window.ethereum;
		  }
		  else{
			web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
		  }
		  init()
	},[wallet.address])


    const init = async () => {
        console.log("slug",{slug})
		let _web3 = new Web3(web3Provider);
		let _privateSaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
		let _claimSaleContract = new _web3.eth.Contract(CLAIM_ABI,CLAIM_SALE);
		let _vestingClaimSaleContract = new _web3.eth.Contract(VESTING_CLAIM_ABI,VESTING_CLAIM);
		let _presaleFromSlug = await _privateSaleContract.methods.presaleListSlug(`${slug}`).call() ;
        setPresaleId(_presaleFromSlug);
		let _presale = await _privateSaleContract.methods.getPresale(_presaleFromSlug).call() ;
		let _tokenDetails = await _privateSaleContract.methods.getTokenInfo(_presale.token).call()  ;
        
        
        let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_presale.token);
		let _tSupply = await _tokenContract.methods.totalSupply().call() ;
		// let _decimals = await _tokenContract.methods.decimals().call() ;
		let _lockPerc = (_presale.teamLockTokenAmount/_tSupply)*100 ; 
		setLockPerc(_lockPerc);
        let _rTokenDetails ; 
        let _sTokenDetails 
        try{
             _rTokenDetails = await _privateSaleContract.methods.getTokenInfo(_presale.raiseToken).call()  ;
            setRaiseTokenDetails(_rTokenDetails)
        }
catch{

}
        try{
             _sTokenDetails = await _privateSaleContract.methods.getTokenInfo(_presale.saleToken).call()  ;
            setSaleTokenDetails(_sTokenDetails)
        }
catch{
    
}
        // setSaleTokenLimit(presale.sake)
        if(wallet.address){

            if(_presale.status == 5 ){
                
	        	let _tokenRemaining = await _claimSaleContract.methods.getTokenDueSingle(_presaleFromSlug,wallet.address).call()  ;
	        	let _remainingClaim = await _claimSaleContract.methods.remainingClaim(_presaleFromSlug,wallet.address).call()  ;
                
                setTokenPurchasedClaim( parseFloat(_tokenRemaining[0]/1e1 ** _tokenDetails[2]).toFixed(2));
                setTotalTokenClaim( parseFloat(_tokenRemaining[1]/1e1 ** _tokenDetails[2]).toFixed(2));
                setTokenDueClaim( parseFloat(_remainingClaim/1e1 ** _tokenDetails[2]).toFixed(2));

                
            }

            if(_presale.status == 6 ){
                
	        	// let _tokenRemainingvesting = await _vestingClaimSaleContract.methods.getTokenDueSingle(_presaleFromSlug,wallet.account).call()  ;
	        	let _remainingClaimVesting = await _vestingClaimSaleContract.methods.remainingClaim(_presaleFromSlug,wallet.address).call()  ;
                setTokenDueNowVesting( parseFloat(_remainingClaimVesting/1e1 ** _tokenDetails[2]).toFixed(2));
                
                let _nextClaimVesting = await _vestingClaimSaleContract.methods.getNextClaim(_presaleFromSlug,wallet.address).call()  ;
                setNextClaimVesting( _nextClaimVesting);
                
                // setTokenPurchasedClaim( parseFloat(_tokenRemaining[0]/1e1 ** _tokenDetails[2]).toFixed(2));
                // setTotalTokenClaim( parseFloat(_tokenRemaining[1]/1e1 ** _tokenDetails[2]).toFixed(2));
                // setTokenDueClaim( parseFloat(_remainingClaim/1e1 ** _tokenDetails[2]).toFixed(2));

                
            }

            if(_presale.raiseToken == "0x0000000000000000000000000000000000000000"){
                _web3.eth.getBalance(wallet.address).then(function(_balance){
                    setbnbBalance(_web3.utils.fromWei(_balance));
    
                }) 
            }
            else{
                
        let _rtokenContract = new _web3.eth.Contract(TOKEN_ABI,_presale.raiseToken);
		let _balance = await _rtokenContract.methods.balanceOf(wallet.address).call() ;
		let _allowance = await _rtokenContract.methods.allowance(wallet.address,PRIVATE_SALE).call() ;
        setbnbBalance(_balance/1e1**_rTokenDetails[2])
        setAllowance(_allowance)
            }
            console.log("here");
           
            try{
	        let _contribution = await _privateSaleContract.methods.users(_presaleFromSlug,wallet.address).call()  ;
            setContribution( parseFloat(_contribution/1e18).toFixed(2));
                
            let _tokenDue = await _privateSaleContract.methods.getTokenDue(_presaleFromSlug,wallet.address).call()  ;
            console.log(_tokenDue);
            
            setTokenPurchased( parseFloat(_tokenDue[0]/1e1 ** _tokenDetails[2]).toFixed(2));
            setTokenDue( parseFloat(_tokenDue[1]/1e1 ** _tokenDetails[2]).toFixed(2));
            setTokenDueNow( parseFloat(_tokenDue[2]/1e1 ** _tokenDetails[2]).toFixed(2));
        }
        catch(e){
            console.log(e);
        }
        try{
            let _teamTokenDue = await _privateSaleContract.methods.getTeamTokenDue(_presaleFromSlug).call()  ;
            console.log(_presaleFromSlug);
            console.log(_teamTokenDue);
            setTeamTokenDueNow(_teamTokenDue);
            
            let _nextClaim = await _privateSaleContract.methods.getNextClaim(_presaleFromSlug,wallet.address).call()  ;
            setNextClaim(_nextClaim)
        }
        catch(e){
            console.log(e);

        }

        let _userWhitelisted = await _privateSaleContract.methods.whitelistedUsers(_presaleFromSlug,wallet.address).call()  ;

        setUserWhitelistedtrue(_userWhitelisted)

 
        }
        console.log(_presale);
        try{
        let _lastTeamClaim = await _privateSaleContract.methods.teamTokenClaimTime(_presaleFromSlug).call()  ;
        if(_lastTeamClaim == 0 ){
             
            setTeamNextClaimTime(_presale.teamLockTokenTime*1000);
        }
        else{
            let _nextClaimTime = (parseInt(_lastTeamClaim)+parseInt(_presale.teamUnlockTokenInterval))*1e3;
        console.log(_nextClaimTime);
        console.log(_lastTeamClaim);
        console.log(_presale.teamUnlockTokenInterval);

            setTeamNextClaimTime(_nextClaimTime);
        }

    }
    catch(e){
        console.log(e);
    }
  

        setTokenDetails(_tokenDetails);
        setPresale(_presale);
        setPublicSale(_presale.publicSale)
        let _presaleDetails = JSON.parse(_presale.details) ;
        setPresaleDetails(_presaleDetails) ;
        let _progress = parseFloat((_presale.raisedAmount/_presale.hardCap ) *100).toFixed(2);
    
        setProgress(_progress);
        console.log(_presale.status);
        console.log(_presale.active);
        getTimer(_presale.startTime,_presale.endTime);
        let url = _presaleDetails.website.replace(/\/$/, "")+"/logo.png" ;
        // let url = "https://mprogame.com/logo.png" ;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log(this.status);
            if (this.readyState == 4 && this.status == 200) {
                    setLogo(url)
            }
        }
        xhttp.open("HEAD", url, true);
        xhttp.send();
         
 
        let _participants = await _privateSaleContract.methods.getParticipants(_presaleFromSlug).call() ;
        setParticipants(_participants);
	  }


      const schedule = (_t) => {
        if(_t == 86400){
            return "Daily" ; 
        }
        else if(_t == 86400*7){
           return "Weekly" ; 
       }
       else if(_t == 86400*30){
           return "Monthly" ; 
       }
       else if(_t == 86400*365){
           return "Yearly" ; 
       }
        
     }

     const getProgress = async () => {
        if(presaleId){
            let _web3 = new Web3(web3Provider);
            let _privateSaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
            let _participants = await _privateSaleContract.methods.getParticipants(presaleId).call() ;
            setParticipants(_participants);
		let _presale = await _privateSaleContract.methods.getPresale(presaleId).call() ;
            setPresale(_presale);
            let _progress =  parseFloat((_presale.raisedAmount/_presale.hardCap ) *100).toFixed(2) ;
         if(_progress == 100){
             init();
         }
            setProgress(_progress);
          }

      }

      const getTimer = (_s,_t) => {
        
        let _currentTime = new Date().getTime()/1e3 ; 
        let _status ;
        let _time ;
        if(_currentTime < _s){
              _status = 0 ; 
              _time = _s ;
        }
        else if(_currentTime > _s && _currentTime < _t){
              _status = 1 ; 
              _time = _t ;

        }
        else if(_currentTime > _t){
              _status = 2 ; 
              _time = 0 ; 
        }
        setStatus(_status);

     
                const countdown = () => {
            const countDate = _time*1000;
            const now = new Date().getTime();
            const gap = countDate - now;
                if(gap < 0){
                    init() ;
                    return false
                }
            const second = 1000,
              minute = second * 60,
              hour = minute * 60,
              day = hour * 24;
          
            const textDay = Math.floor(gap / day),
              textHour = Math.floor((gap % day) / hour),
              textMinute = Math.floor((gap % hour) / minute),
              textSecond = Math.floor((gap % minute) / second);
          
            setDay(textDay+"d");
            setHour(textHour+"h");
            setMinute(textMinute+"m");
            setSecond(textSecond+"s");
                }
                if(_time > 0){
                    setInterval(countdown, 1000);
                    setInterval(getProgress, 2000);
                }
       
        

      }

      
      const handleDeposit = (e) => {
        setDepositAmount(e.target.value) ; 
  }

  const handleWhitelist = (e) => {
    setwhitlistusers(e.target.value) ; 
}

const handlecheckwhitelist = (e) => {
setcheckwhitlistusers(e.target.value) ; 
}


  
const checkWhiteList = async() => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
    let _check = await _privatePresaleContract.methods.checkWhiteList(presaleId,checkwhitlistuser).call() ;
    setWhitelistedtrue(_check);
}

  const depositMax = () => {
    let _web3 = new Web3(web3Provider);
    let _maxAllocation = _web3.utils.fromWei(presale.maxAllocation)
    if(_maxAllocation > bnbBalance){
        setDepositAmount(bnbBalance)
    }
    else if(_maxAllocation < bnbBalance){
        setDepositAmount(_maxAllocation)
    }
  }

  
  
  
  const disallowClaim = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
 
    setModal(!modal);
    _privatePresaleContract.methods.changeStatus(presaleId,4).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
  }

  const allowClaim = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
 
    setModal(!modal);
    _privatePresaleContract.methods.changeStatus(presaleId,2).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
  }

  const finalizeAdmin = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
 
    setModal(!modal);
    _privatePresaleContract.methods.finishPresaleOwner(presaleId).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
  }


    const finalize = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
 
    setModal(!modal);
    _privatePresaleContract.methods.finishPresale(presaleId).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}

  const whiteListUsersStatusChange = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
 
    let _array = whitlistuser.split(",") ;
    setModal(!modal);
    _privatePresaleContract.methods.whiteListUsersStatusChange(_array,true,presaleId).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}



const toggleWhitelist = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
    
    let _whitelist = true ; 
    if(presale.whitelisted){
      _whitelist = false ; 
    }
 
    setModal(!modal);
    _privatePresaleContract.methods.changeWhitleist(presaleId,_whitelist).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}

const changeSaleTokenLimit = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
    
    let _saleTokenLimit = _web3.utils.toWei(saleTokenLimit.toString()); 
 
    setModal(!modal);
    _privatePresaleContract.methods.changeSaleTokenlimit(presaleId,_saleTokenLimit).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}

const handleSaleTokenLimit = (e) => {
    setSaleTokenLimit(e.target.value);
}    

const claimLPToken = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
 
 
    setModal(!modal);
    _privatePresaleContract.methods.claimLPToken(presaleId).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}

const claimBNB = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
    setModal(!modal);

   
    _privatePresaleContract.methods.claimContribution(presaleId).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);
    })
}

const cancelPresale = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
 
 
    setModal(!modal);
    _privatePresaleContract.methods.cancelPresale(presaleId).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}

const claimTeamToken = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
 
 
    setModal(!modal);
    _privatePresaleContract.methods.claimTeamToken(presaleId).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}


const claimPresaleOther = () => {
    let _web3 = new Web3(web3Provider);
    let _claimPresaleContract = new _web3.eth.Contract(CLAIM_ABI,CLAIM_SALE);
 
 
    setModal(!modal);
    _claimPresaleContract.methods.claimPresale(presaleId).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}

const claimVesting = () => {
    let _web3 = new Web3(web3Provider);
    let _claimPresaleContract = new _web3.eth.Contract(VESTING_CLAIM_ABI,VESTING_CLAIM);
 
 
    setModal(!modal);
    _claimPresaleContract.methods.claimPresale(presaleId,wallet.address).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}

  const claimPrivatePresale = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
 
 
    setModal(!modal);
    _privatePresaleContract.methods.claimPresale(presaleId).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}


const approveRaiseToken = () => {
    let _web3 = new Web3(web3Provider);
    let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,presale.raiseToken);
    let _amt = _web3.utils.toWei("10000000000000000000000000000000")
    setModal(!modal);
    _tokenContract.methods.approve(PRIVATE_SALE ,_amt).send({
        from: wallet.address
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}


const approveProject = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
 
 
    setModal(!modal);
    _privatePresaleContract.methods.OwnerDetails(false,true,true,true,presaleId).send({
        from: wallet.address,
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}

  const participatePrivatePresaleBNB = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
 
     let _deposit = _web3.utils.toWei(depositAmount.toString());

    setModal(!modal);
    _privatePresaleContract.methods.buyPresaleBnb(presaleId).send({
        from: wallet.address,
        value: _deposit
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        reset();
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}


  const participatePrivatePresale = () => {
    let _web3 = new Web3(web3Provider);
    let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
    
     let _deposit =  depositAmount;
     //  _deposit =  parseFloat(depositAmount * 1e1 ** raiseTokenDetails[2]).toFixed();
    //   console.log(_deposit);

    //   _deposit  = parseFloat(_deposit);
    //   _deposit = _deposit.toString();
    //   console.log(_deposit);

      _deposit = _web3.utils.toBN(_deposit).mul(_web3.utils.toBN(1e1 ** raiseTokenDetails[2]));

    setModal(!modal);
    _privatePresaleContract.methods.buyPresale(presaleId,_deposit).send({
        from: wallet.address
    }).on('receipt', function(receipt){
        setModal(modal);
        successToggle() ;
        reset();
        init();
    }).on('error', function(receipt){
        setModal(modal);

    })
}
const reset = () => {
    setDepositAmount(0)
}
    
  return (
    <div className="bg-[#21283D] flex justify-center">
        <div className={`${styles.font_text} flex md:container justify-center`}>
				<div className="md:container w-full py-5">
					<div className="content-wrapper px-4 lg:px-0 justify-center md:container w-full">
                       <div className="grid  md:grid-cols-2 max-w-full gap-4">
                        <div className="flex-1">
                                    <div className="list-box-l2">
                                      <div class="wrp-social-l">
                                    		<div className="bitrides-img">
												<img src="/assets/Images/WizardFlying.gif" alt="loading_logo" />
											</div>
                            

                                            <div>
                                            </div>
                                            <div className="bitrides-content5 pl-2">
												
                                               
                                                <ul class="list-s-icons">
                                                    { presaleDetails.website &&
                                                <li>
                                                    <a href={presaleDetails.website} target="_blank"  title="" data-original-title="Website"><FaGlobeAmericas className=' text-black'/></a>
                                                </li>
}
                                                {presaleDetails.telegram &&

                                                <li>
                                                    <a href={presaleDetails.telegram}  target="_blank" data-toggle="tooltip" title="" data-original-title="Telegram"><BsTelegram className=' text-black'/></a>
                                                </li>
                                                }

                                                {
                                                    presaleDetails.twitter   &&
                                                <li>
                                                    <a href={presaleDetails.twitter}  target="_blank" class="text-muted" data-toggle="tooltip" title="" data-original-title="Twitter"><BsTwitter className=' text-black'/></a>
                                                </li>
}
                                                {
                                                    presaleDetails.discord &&
                                                    <li>
                                                    <a href={presaleDetails.discord} target="_blank" class="text-muted" data-toggle="tooltip" title="" data-original-title="Discord"><FaDiscord className=' text-black'/></a>
                                                </li>
                                                }
 {
                                                    presaleDetails.medium   &&
                                                <li>
                                                    <a href={presaleDetails.medium}  target="_blank" class="text-muted" data-toggle="tooltip" title="" data-original-title="Medium"><AiFillMediumCircle className=' text-black'/></a>
                                                </li>
                                                }

                    
                                            </ul>
											</div>
											
										</div>
                                            
										
                                        <div className="p-font">
                                            <h3 className='text-white'>{presaleDetails.name}</h3>
                                            <p>{presaleDetails.description}</p>
                                           
                                            <p>{presale.whitelisted ? "Whitlisted Users Only" : "" }</p>
                                        </div>
                                        <div className="pre-sale"><h3>{
                                            progress < 100 && status == 0 && presale.status == 1 ?
                                            "Presale Starts in"
                                            :
                                            progress < 100 && status == 1 && presale.status == 1 ?
                                            "Presale Ends in"
                                            :
                                            (progress == 100) && presale.status != 3 ?
                                            "Presale Filled"
                                            :
                                            (presale.status == 2)  ?
                                            "Presale Ended"
                                            :
                                            (presale.status == 3)  ?
                                            "Presale Cancelled"
                                            :
                                            ""
                                            }</h3></div>
                                            {
                                               ( status == 1 || status == 0 ) && presale.status == 1 && progress < 100 &&

                                               <div className="wrp-coundown">
                                            
                                               <div className="countdown-box ">
                                               <div class="countdown">
                                                   <div class="container-day mr">
                                                       <h3 class="day">{day}</h3>
                                                   
                                                   </div>
                                                   <div class="container-hour mr">
                                                       <h3 class="hour">{hour}</h3>
                                                       
                                                   </div>
   
                                                   <div class="container-minute mr">
                                                       <h3 class="minute">{minute}</h3>
                                                   
                                                   </div>
   
                                                   <div class="container-second mr">
                                                       <h3 class="second">{second}</h3>
                                                   
                                                   </div>
                                               </div>
                                               </div>
                                        
                                           </div>
                                            }
                                        {/* <div id="chart"></div> */}
                                        <div className="mt-4">
                                            <table class="table w-full">
                                                <tbody>
                                                <tr>
                                                    <td className="abcd">Token Name</td>
                                                    <td className="abcde">{tokenDetails[0]}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Token Symbol</td>
                                                    <td className="abcde">{tokenDetails[1]}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Token Decimals</td>
                                                    <td className="abcde">{tokenDetails[2]}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Total Supply</td>
                                                    <td className="abcde">{parseFloat(tokenDetails[3]/1e1**tokenDetails[2]).toFixed()} {tokenDetails[1]}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Tokens For Presale</td>
                                                    <td className="abcde">{parseFloat(presale.tokenAmount/1e1 ** tokenDetails[2]).toFixed()} {tokenDetails[1]}</td>
                                                </tr>
                                                {
                                                    publicSale &&
                                                <>
                                                <tr>
                                                    <td className="abcd">% for Liquidity</td>
                                                    <td className="abcde">{parseFloat(presale.liquidtyPercentage/100).toFixed(2)}%</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Liquidity Unlock Time</td>
                                                    <td className="abcde">{new Date(presale.liquidityLockedDays*1000).toLocaleString()}</td>
                                                </tr>
                                                </>
                                                    }
                                                <tr>
                                                    <td className="abcd">Presale Rate</td>
                                                    <td className="abcde">1 {raiseTokenDetails[1]} = {parseFloat(presale.saleRate/1e1 ** tokenDetails[2]).toFixed()} {tokenDetails[1]}</td>
                                                </tr>
                                                {
                                                    publicSale &&
                                                    <tr>
                                                    <td className="abcd">Listing Rate</td>
                                                    <td className="abcde">1 {raiseTokenDetails[1]} = {parseFloat(presale.listRate/1e1 ** tokenDetails[2]).toFixed()} {tokenDetails[1]}</td>
                                                </tr>
                                                }
                                              
                                                <tr>
                                                    <td className="abcd">Soft Cap</td>
                                                    <td className="abcde">{parseFloat(presale.softcap/1e18).toFixed(2)} {raiseTokenDetails[1]}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Hard Cap</td>
                                                    <td className="abcde">{parseFloat(presale.hardCap/1e18).toFixed(2)} {raiseTokenDetails[1]}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Sale Start Time</td>
                                                    <td className="abcde">{new Date(presale.startTime*1e3).toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Sale End Time</td>
                                                    <td className="abcde">{new Date(presale.endTime*1e3).toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Sale Type</td>
                                                    <td className="abcde">{(presale.publicSale ? "Public"  : "Private" )}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Token Requirement ?</td>
                                                    <td className="abcde">{(presale.saleTokenLimit > 0 ? parseFloat(presale.saleTokenLimit/1e1**saleTokenDetails[2]).toFixed() + " " + saleTokenDetails[1] : "None" )}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Unsold Tokens</td>
                                                    <td className="abcde">{(presale.burnUnsold ? "Burn"  : "Refund" )}</td>

                                                </tr>
                                                {
                                                    publicSale &&
                                                     <tr>
                                                     <td className="abcd">Team Tokens Locked</td>
                                                     <td className="abcde">{parseFloat(presale.teamLockTokenAmount/1e1**tokenDetails[2]).toFixed(2) }</td>
 
                                                 </tr>
                                                }

                                                {
                                                    publicSale &&
                                                     <tr>
                                                     <td className="abcd">Team Token Unlock Schedule</td>
                                                     <td className="abcde">{parseFloat(presale.teamUnlockTokenPercentage/100).toFixed(2) }% released {schedule(presale.teamUnlockTokenInterval)}</td>
 
                                                 </tr>
                                                }       
                                                 {
                                                    publicSale &&
                                                     <tr>
                                                     <td className="abcd">Initial Token Unlock Date/Time</td>
                                                     <td className="abcde">{new Date(presale.teamLockTokenTime*1000).toLocaleString() }</td>
 
                                                 </tr>
                                                }                                          
                                                </tbody>
                                            </table>
                                            
                                        </div>
                                        
									</div>
                        </div>
                        <div className="col-lg-6">
                            <div className="list-box-l2">
                                <div className="bnb-wrp">
                                   
                                    {
                                        status > 0  &&
                                        <>
                                    <p className=""><span> {parseFloat(presale.raisedAmount/1e18).toFixed(2)}/{parseFloat(presale.hardCap/1e18).toFixed(2)} </span> {raiseTokenDetails[1]}</p>
                                    <div>
                                    <div className="progressbar-container">
										<div className="progressbar" style={{width: progress+"%"}}></div>
                                        <span className="progress-complete-c">{progress}% Complete</span>	
									</div>
                                    </div>
                                    </>
                                    }

                                    <div className="wrp-circle-area">
                                        {
                                            publicSale &&
                                            <>
                                        <div className="c-progressbar1">
                                            <div class="progress-circle over50 p100">
                                                <span><img src="/assets/Images/piechart.png" className="locks" /></span>
                                            <div class="left-half-clipper">
                                                <div class="first50-bar"></div>
                                                <div class="value-bar"></div>
                                            </div>
                                            </div>
                                            <div className="caption-p2">
                                                <h3>{presale.liquidtyPercentage/100}%</h3>
                                                <p>Liquidity Lockup</p>
                                            </div>
                                        </div>
                                        <div className="c-progressbar1">
													<div class="progress-circle2 over50 p89">
														<span><img src="/assets/Images/piechart.png" className="locks2" /></span>
														<div class="left-half-clipper2">
															<div class="first50-bar2"></div>
															<div class="value-bar2"></div>
														</div>
														</div>
														<div className="caption-p2">
															<h3>{lockPerc}%</h3>
															<p>Token Locked</p>
														</div>
													</div>
                                        </>
                                        }
                                        {
                                        status > 0  &&
                                        <div className="c-progressbar1">
                                            <div class="progress-circle over50 p100">
                                            <span><img src="/assets/Images/user.png" className="locks" /></span>
                                            <div class="left-half-clipper">
                                                <div class="first50-bar"></div>
                                                <div class="value-bar"></div>
                                            </div>
                                            </div>
                                            <div className="caption-p2">
                                                <h3>{participants}</h3>
                                                <p>Participants</p>
                                            </div>
                                        </div>
                                        }
                                        
                                         {
                                              presale.vestingScheduled > 0 &&
                                        <div className="c-progressbar1">
                                        <div class="progress-circle over50 p89">
                                            <span><img src="/assets/Images/calendar.png" className="locks" /></span>
                                            <div class="left-half-clipper">
                                                <div class="first50-bar"></div>
                                                <div class="value-bar"></div>
                                            </div>
                                            </div>
                                            <div className="caption-p2">
                                                <h3>{schedule(presale.vestingScheduled)}</h3>
                                                <p>Vesting Schedule</p>
                                            </div>
                                        </div>
                                        }
                                         {
                                           presale.vestingScheduled > 0 &&
                                        <div className="c-progressbar1">
                                        <div class="progress-circle over50 p89">
                                            <span><img src="/assets/Images/piechart.png" className="locks" /></span>
                                            <div class="left-half-clipper">
                                                <div class="first50-bar"></div>
                                                <div class="value-bar"></div>
                                            </div>
                                            </div>
                                            <div className="caption-p2">
                                                {presale.vetsingPercentage &&
                                            <h3>{presale.vetsingPercentage[0]/100}% / {presale.vetsingPercentage[1]/100}%</h3>
                                        }

                                                <p>Vesting Percentage</p>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                    <div className="connect-wallet">
                                        {
                                            !wallet.address  &&
                                            <div className=' py-4 flex justify-center items-center'>
                                                <ConnectButton />                                                
                                            </div>

                                            }
                                            {
                                                wallet.address &&
                                                <h5 className="mt-5 font-weight-bolder">Your Contribution: {contribution} {raiseTokenDetails[1]} </h5>
                                            }
                                            {
                                            wallet.address && status == 1 && progress < 100 && presale.status == 1 &&
                                            <>
                                            <div className="input-know-part">
									        	<h5>Enter {raiseTokenDetails[1]} Amount do you want to invest. (Max Alloc.: { presale.raiseToken != "0x0000000000000000000000000000000000000000" ? parseFloat(presale.maxAllocation/1e1 ** raiseTokenDetails[2]).toFixed(2) : parseFloat(presale.maxAllocation/1e1 ** 18).toFixed(2)  } { presale.raiseToken == "0x0000000000000000000000000000000000000000" ?  "BNB" : raiseTokenDetails[1] }) </h5>
											<input   placeholder="0.0" onChange={handleDeposit} value={depositAmount} /> <button onClick={depositMax} >Max</button> <h3><span>{bnbBalance} {raiseTokenDetails[1]}</span><p>Balance</p></h3>
										</div>
                                        {
                                            (presale.whitelisted && userWhitelistedtrue) || !presale.whitelisted ?
                                            presale.raiseToken == "0x0000000000000000000000000000000000000000" ?
                                            
                                            <a  onClick={participatePrivatePresaleBNB} >Participate</a>
                                            :
                                            allowance > (depositAmount* (1e1 ** raiseTokenDetails[2])) ?
                                            <a  onClick={participatePrivatePresale} >Participate</a>
                                            :
                                            <a  onClick={approveRaiseToken} >Approve {raiseTokenDetails[1]}</a>
                                            :
                                            <a  href="javascript:void" >Not Whitelisted</a>
                                        }
                                                </>
                                            }
                                             {
                                            wallet.address == presale.creator && presale.status == 1   &&
                                            <a  onClick={cancelPresale} >Cancel Presale</a>

                                             }
                                             {
                                            wallet.address && presale.status == 3   && contribution > 0 &&
                                            

                                        
                                            <a  onClick={claimBNB} >Claim Back {raiseTokenDetails[1]}</a>

                                             }
                                                                                    {
                                            wallet.address  && presale.status == 5 &&
                                                    <>
                                                    <div className="showClaimtext">
                                                    {/* <p>Total Token Purchased: {tokenPurchasedClaim} {tokenDetails[1]}</p> */}
                                                    <p>Total Token: {tokenTotalClaim} {tokenDetails[1]}</p>
                                                    <p>Total Token Claimable: {tokenDueClaim} {tokenDetails[1]}</p>
                                                </div>
                                                {
                                                    tokenDueClaim > 0 &&
                                                    <a  onClick={claimPresaleOther} >Claim Token Now</a>
                                                }

                                                </>
                                                                                    }
                                                                                     {
                                            wallet.address  && presale.status == 6 &&
                                                    <>
                                                    <div className="showClaimtext">
                                                    <p>Total Token Purchased: {tokenPurchased} {tokenDetails[1]}</p>
                                                    {/* <p>Total Token Due: {tokenDue} {tokenDetails[1]}</p> */}
                                                    <p>Total Token Due Now: {tokenDueNowVesting} {tokenDetails[1]}</p>
                                                    {
                                                    nextClaimVesting*1e3 > new Date().getTime() &&
                                                    <p>Next Vesting: { new Date(nextClaimVesting*1e3).toLocaleString()}</p>
                                                    }

                                                </div>
                                                {
                                                  wallet.address &&  nextClaimVesting*1e3 < new Date().getTime() && presale.status == 6 &&
                                                    <a  onClick={claimVesting} >Claim Token Due</a>
                                                }
                                                </>

                                             }
                                             {
                                            wallet.address  && presale.status == 2 &&
                                                    <>
                                                    <div className="showClaimtext">
                                                    <p>Total Token Purchased: {tokenPurchased} {tokenDetails[1]}</p>
                                                    <p>Total Token Due: {tokenDue} {tokenDetails[1]}</p>
                                                    <p>Total Token Due Now: {tokenDueNow} {tokenDetails[1]}</p>
                                                    {
                                                    nextClaim*1e3 > new Date().getTime() &&
                                                    <p>Next Vesting: { new Date(nextClaim*1e3).toLocaleString()}</p>
                                                    }

                                                </div>
                                                {
                                                  wallet.address &&  nextClaim*1e3 < new Date().getTime() && presale.status == 2 &&
                                                    <a  onClick={claimPrivatePresale} >Claim Token Due</a>
                                                }
                                                </>

                                             }
                                                {
                                            wallet.address == presale.creator && presale.status == 2 &&
                                                    <>
                                                    <div className="showClaimtext">
                                                    <p>Total Team Token Locked: {parseFloat(presale.teamLockTokenAmount/1e1**tokenDetails[2]).toFixed()} {tokenDetails[1]}</p>
                                                    <p>Total Team Token Due: {parseFloat(presale.teamLockTokenAmount - presale.teamLockTokenClaimedAmount)/1e1**tokenDetails[2]} {tokenDetails[1]}</p>
                                                    {
                                                        teamNextClaimTime < new Date().getTime() &&
                                                        <div className="connect-wallet">
                                                    <p>Total Team Token Due Now: {teamTokenDueNow/1e1**tokenDetails[2]} {tokenDetails[1]}</p>
                                                    <a  onClick={claimTeamToken} >Claim Team Token Due</a>

                                                        </div>
                                                    }
                                                     {
                                                          teamNextClaimTime > new Date().getTime() &&
                                                        <div className="c">
                                                    <p>Total Team Token Due Now: 0</p>
                                                    <p>Next Unlock: { new Date(teamNextClaimTime).toLocaleString()}</p>

                                                        </div>
                                                    }
{
                                                          presale.liquidityLockedDays*1000  < new Date().getTime() &&
                                                    <div className="connect-wallet">

                                                        <a  onClick={claimLPToken} >Claim LP Token</a>

                                                        </div>
}
                                                     

                                                </div>
                                                 
                                                </>

                                             }
                                             {
                                                 presale.status != 2 &&
                                                 <>
                                             
                                              <input type="text" onChange={handlecheckwhitelist} placeholder="Enter address to verify" />
                                                       {
                                                           whitelistedtrue == true &&
                                                           <h6 className="text-dark font-weight-bold mt-2 text-left" >Address is Whitelisted</h6>
                                                       }
                                                       {
                                                           whitelistedtrue == false &&
                                                           <h6 className="text-dark font-weight-bold mt-2 text-left">Address is not Whitelisted</h6>
                                                       }
                                                 <a  onClick={checkWhiteList} >Check Whitelist</a>
                                             {
                                                 (wallet.address == "0x1b8d0e5095bF368A962DF1222282720fA33c60de" || wallet.address == presale.creator) &&
                                                 <>
                                                  {/* <p>Creator: {presale.creator}</p> */}
                                                  <a   onClick={toggleWhitelist} >Toggle Whitelist</a>
                                                        <input type="text" onChange={handleSaleTokenLimit} placeholder="Enter Minimum Token to hold (Use 0 to remove)" />
                                                        <a   onClick={changeSaleTokenLimit} >Change {saleTokenDetails[1]} Requirement (Use 0 to remove)</a>
                                                 <textarea onChange={handleWhitelist} placeholder="Paste Comma separated Addresses here" ></textarea>
                                                 <a   onClick={whiteListUsersStatusChange} >Add Whitelist</a>
                                                 </>
                                                                                                                                                                                                                                                                   }
                                                 
                                                 {
                                                    wallet.address ==  presale.creator &&  !presale.active &&
                                                     <a   onClick={() => window.location.replace("/complete/"+slug)} >Complete Set Up</a>

                                                 }                                     
                                                 {
                                                    wallet.address ==  presale.creator &&  presale.status != 2 && 
                                                      <>
                                                       
                                                        <a   onClick={finalize} >Finalize</a>
                                                        </>
                                                    }
                                                    
                                                    {
                                                   wallet.address == "0x1b8d0e5095bF368A962DF1222282720fA33c60de"  && 
                                                      <>
                                                       
                                                        <a   onClick={approveProject} >Approve Project</a>
                                                        </>
                                                    }
                                                    
                                                     


                                                
                                                {
                                                 wallet.address == "0x1b8d0e5095bF368A962DF1222282720fA33c60de" && presale.status != 2     &&        
                                                 <>
                                                 <span>Presale Id: {presaleId}</span>                                     
                                                 <a   onClick={finalizeAdmin} >Finalize Admin</a>
                                                </>
                                                }


                                                 </>
                                                 
                                             }
                                              {
                                                   wallet.address == "0x1b8d0e5095bF368A962DF1222282720fA33c60de"  && presale.status == 2 && 
                                                      <>
                                                        <a   onClick={disallowClaim} >Disallow Claim</a>
                                                        </>
                                                    }
                                                    {
                                                   wallet.address == "0x1b8d0e5095bF368A962DF1222282720fA33c60de"  && presale.status == 4 && 
                                                      <>
                                                        <a   onClick={allowClaim} >Allow Claim</a>
                                                        </>
                                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>  
				</div>
               
					
			</div>
    </div>
  )
}

export default Details;
