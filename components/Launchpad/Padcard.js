import React,{useEffect,useState} from 'react'
import styles from '../Launchpad/Launchpad.module.css';
import { PRIVATE_SALE } from '/utils/Config/index';
import PRIVATE_SALE_ABI from '/utils/Config/PRIVATE_SALE_ABI.json';
import Web3 from 'web3';
import TOKEN_ABI from '/utils/Config/TOKEN_ABI.json';
import Link from 'next/link';


const PadCard = (props) => {
	console.log(props,"props passing data")

    let web3Provider
    const [openTab, setOpenTab] = React.useState(0);
    const [presaleDetails, setPresaleDetails] = useState({});
    const [lockPerc, setLockPerc] = useState(0);

	const [presale, setPresale] = useState({});
	const [progress, setProgress] = useState(0);
	const [raiseSymbol, setRaiseSymbol] = useState("BNB");
	const [participants, setParticipants] = useState(0);
	const [publicSale, setPublicSale] = useState(false);


	

    if (typeof window !== "undefined") {
         web3Provider = window.ethereum;
      }

    useEffect(() => {
		if (window.ethereum) {
			web3Provider = window.ethereum;
		}
		else {
			web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
		}
		setInterval(() => {
			init()
		}, 3000);
	}, [])




    const init = async () => {
		let _web3 = new Web3(web3Provider);
		let _privateSaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI, PRIVATE_SALE);
		let _presale = await _privateSaleContract.methods.getPresale(props.index).call();
		let _participants = await _privateSaleContract.methods.getParticipants(props.index).call();

		let _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _presale.token);
		try{
			let _tokenRaiseContract = new _web3.eth.Contract(TOKEN_ABI, _presale.raiseToken);
			let _rSymbol = await _tokenRaiseContract.methods.symbol().call();
			setRaiseSymbol(_rSymbol);
		}
		catch {

		}
		let _tSupply = await _tokenContract.methods.totalSupply().call();
		// let _decimals = await _tokenContract.methods.decimals().call() ;
		let _lockPerc = (_presale.teamLockTokenAmount / _tSupply) * 100;
		setLockPerc(_lockPerc);

        
		setParticipants(_participants)
		setPresale(_presale);
		setPublicSale(_presale.publicSale);
		let _presaleDetails = JSON.parse(_presale.details);
		setPresaleDetails(_presaleDetails);
		let _progress = parseFloat((_presale.raisedAmount / _presale.hardCap) * 100).toFixed(2);
		setProgress(_progress);
    }

  return (
           <div className='flex justify-center text-white px-2 md:container md:px-5 md:justify-between w-full border rounded-xl my-6 cursor-pointer'>
			<Link href={{pathname:"details",query: {slug:`${presaleDetails.slug}`} }} className='w-full flex'>
                    <div className='flex w-full py-4'>
                        {
                        presaleDetails?<div className='w-full'>
							<div className='flex w-full justify-between'>
							<div>
							<h4 className={`${styles.font_text} text-[18px]`}>{presaleDetails.name} </h4>
                            <p className={styles.font_text}>{new Date(presale.startTime * 1e3).toLocaleString()}</p>
							</div>

							<div className='w-20 h-20'>
                        		<img src="/assets/Images/WizardFlying.gif"/>
                    		</div> 
							</div>

                        <div>
							<h5 className="font-weight-bold mt-2" > {presale.whitelisted ? "Whitlisted Users Only" : ""} </h5>
							<div className="progressbar-container  w-full">
								<div className="progressbar" style={{ width: progress + "%" }}></div>

								<div className="row flex justify-between">
									<div className="col-md-6">
										<div className={`${styles.font_text} progressbar-left `}><b>{parseFloat(presale.raisedAmount / 1e18).toFixed(2)}/{presale.hardCap / 1e18}  {raiseSymbol}</b></div>
									</div>
									<div className="col-md-6">
										<div className={`${styles.font_text} progressbar-right `}><b>{parseFloat(presale.raisedAmount / 1e18).toFixed(2)} {raiseSymbol}</b></div>
									</div>
								</div>

							</div>

							<div className="wrp-circle-area">
								{
									publicSale &&
									<div className="c-progressbar1">
										<div class="progress-circle2 over50 p70">
											<span><img src={piechart} className="locks2" /></span>
											<div class="left-half-clipper2">
												<div class="first50-bar2"></div>
												<div class="value-bar2"></div>
											</div>
										</div>
										<div className="caption-p2">
											<h3>{parseFloat(presale.liquidtyPercentage / 100).toFixed(2)}%</h3>
											<p>Liquidity Lockup</p>
										</div>
									</div>
								}

								<div className="c-progressbar1">
									<div class="progress-circle2 over50 p100">
										<span><img src="/assets/Images/user.png" className="locks2" /></span>
										<div class="left-half-clipper2">
											<div class="first50-bar2"></div>
											<div class="value-bar2"></div>
										</div>
									</div>
									<div className="caption-p2">
										<h3>{participants}</h3>
										<p>Participants</p>
									</div>
								</div>
								{
									publicSale &&
									<div className="c-progressbar1">
										<div class="progress-circle2 over50 p89">
											<span><img src={piechart} className="locks2" /></span>
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
								}

							</div>
							{/* changes */}
						</div>
                            </div>:<div>
                                <h1>No Presale Available to Show</h1>
                            </div>
                        }
                        
                    </div>
			</Link>
        </div>
            
  )
}

export default PadCard;