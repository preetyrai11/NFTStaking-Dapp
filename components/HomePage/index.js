import React from 'react'
// import wizaartimg  from '/assets/wizaart-img.gif';
import Image from 'next/image';
import StakeCard from '../Nftecosystem/NftFarm/StakeCard';

const HomePage = () => {
  return (
    <div className='flex justify-center'>
      <div className="bannermain-bg1 flex flex-col justify-center items-center">
		<section id="banner-section mt-10 mb-10">
			<div className="container">
				<div className="row flex">
					<div className="col-lg-7">
						<div className="banner-content">
							
							<h3>WHERE THE MAGIC HAPPENS</h3>
							<p>Welcome to WIZARD, a world of unique experience and magic never before available on the blockchain. Mint or Yield exclusive NFT’s, Play to Earn Crypto, or Explore Our Spell Inventory. 
							</p>
							<p>...You’re a WIZARD now; the possibilities are endless.</p>
							
							<div className="bnr-btn">
								<a href="https://dex.knightswap.financial/#/swap?outputCurrency=0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18" target="_blank">Buy WIZARD</a>
								<a href="/marketplace" className="play-btn" target="_blank">Buy NFT</a>
							</div>
							<div className="copy-text contract-adr">
								<h3>Contract Address</h3>
								<input className="text" type="text" value="0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18" />
									<button class="btn" type="button" data-clipboard-demo="" data-clipboard-target="#foo">
										COPY
									</button>
							</div>
						</div>
					</div>
					<div className="col-lg-5">
						<div className="bnr-img">
							<Image src="/assets/Images/wizaart-img.gif" height={20} width={20} alt="loading"/>
						</div>
					</div>
				</div>
			</div>
		</section>
		{/* <section id="tokenomic-sec">
			<div className="container">
				<div className="wrp-tokenhead">
					<div className="tokenhead1">
						<img src={wizard} />
					</div>
					<div className="tokenhead2">
						<h3>Tokenomics</h3>
					</div>
					<div className="tokenhead3">
					<img src={wizard} />
					</div>
				</div>
				<div className="responsives">
				<div className="wrp-token-box">
					<div className="tokenboxc">
						<h3>Area</h3>
						<ul className="list-token">
							<li>Game funding</li>
							<li>Presale (oxbull)</li>
							<li>Presale (Seedify)</li>
							<li>Liquidity</li>
							<li>Team and advisor <br></br>token (locked)</li>
							<li>Ecosystem and <br></br>marketing</li>
						</ul>
					</div>
					<div className="tokenboxc tokenboxc-color">
						<h3>Percentage</h3>
						<ul className="list-token">
							<li>5%</li>
							<li>25%</li>
							<li>10%</li>
							<li>35%</li>
							<li>10%</li>
							<li>15%</li>
						</ul>
					</div>
					<div className="tokenboxc">
						<h3>WIZARD</h3>
						<ul className="list-token">
							<li>100000</li>
							<li>500000</li>
							<li>200000</li>
							<li>700000</li>
							<li>200000</li>
							<li>300000</li>
						</ul>
					</div>
					<div className="tokenboxc tokenboxc-color">
						<h3>Vesting Period</h3>
						<ul className="list-token">
							<li>10% at TGE rest 1</li>
							<li>year</li>
							<li>60% at TGE</li>
							<li>20% TGE Within first <br></br>6 months of launch</li>
							<li>10% release after <br></br>every 3 months</li>
							<li>20% at TGE rest over <br></br>5 months</li>
						</ul>
					</div>
					<div className="tokenboxc">
						<h3>Amount at TGE</h3>
						<ul className="list-token">
							<li>10000</li>
							<li>300000</li>
							<li>120000</li>
							<li>140000</li>
							<li></li>
							<li>60000</li>
						</ul>
					</div>
				</div>
				<div className="ido-wrp">
					<div className="ido-box">
						<h3>Ido price 0.5</h3>
					</div>
					<div className="ido-box idobox-color">
						<h3>Listing price 0.55</h3>
					</div>
					<div className="ido-box">
						<h3>Market cap at launch</h3>
					</div>
					<div className="ido-box idobox-color">
						<h3>280k</h3>
					</div>
				</div>
				</div>
				
			 <div className="amount-box">
					<p>Amount to raise 350k <br></br>
						TGE (Token Generation Event)</p>
				</div> 
			</div>
		</section>
		 */}

<section id="">
			<div className="container">
				<div className="head-roadmap">
					<h3>KNIGHT SWAP</h3>
				</div>
				{/* <a href="https://app.knightswap.financial/" target="_blank" >
				<img src={knightswap} style={{maxWidth: "100%"}} />
				</a> */}
				<div style={{display:"flex",justifyContent:"center"}}>
				{/* <iframe src="https://www.knightswap.financial/swap" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe> */}
				{/* <iframe src="https://www.knightswap.financial/swap" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="800px" allowfullscreen></iframe> */}
				</div>
				<div className="main-roadmapbox">
					<div className="wrp-roadmap-content" style={{justifyContent: "center",alignItems: "center",display: "flex"}}>
						{/* <div className="roadmap-c1">
							<div className="roadmapimg1">
								<img src={roadmap1} />
							</div>
						</div>
						<div className="roadmap-c1">
							<div className="roadmap2">
								<img src={roadmap2} />
							</div>
							<div className="roadmapl">
								<img src={roadmapl} />
							</div>
						</div>
						<div className="roadmap-c1">
							<div className="roadmap2">
								<img src={roadmap3} />
							</div>
						</div> */}
						{/* <iframe src="https://lazaruspool.wizard.financial/#/bsc" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe> */}
						<iframe src="https://www.knightswap.financial/swap" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="1900px" allowfullscreen></iframe>
					</div>
					{/* <div className="automated-wrp">
						<h3>AUTOMATED LP</h3>
						<p>1% of tokens that incur slippage are added into the LP, to ensure that wizards’ magic never falters.</p>
						<h3>How it Works?</h3>
						<p>$WIZARD has 4% slippage on all transactions to prevent price manipulation from muggles and encourage wizards to hold.</p>

						<div className="wrp-tokengrt-list">
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets burned</li>
									<li>1% Goes towards Charity and Community</li>
								</ul>
							</div>
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets redistributed amongst all wizards</li>
									<li>1% Automated Market Making</li>
								</ul>
							</div>
						</div>
					</div> */}
				</div>
				{/* <div className="main-roadmapbox pb-3" style={{backgroundColor: "transparent" ,  backgroundImage : "url(../images/knightswap.png)" ,backgroundRepeat: "no-repeat" ,  backgroundSize: "contain" ,height: "67vh" }} > */}
					 
					{/* <div className="automated-wrp">
						<h3>AUTOMATED LP</h3>
						<p>1% of tokens that incur slippage are added into the LP, to ensure that wizards’ magic never falters.</p>
						<h3>How it Works?</h3>
						<p>$WIZARD has 4% slippage on all transactions to prevent price manipulation from muggles and encourage wizards to hold.</p>

						<div className="wrp-tokengrt-list">
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets burned</li>
									<li>1% Goes towards Charity and Community</li>
								</ul>
							</div>
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets redistributed amongst all wizards</li>
									<li>1% Automated Market Making</li>
								</ul>
							</div>
						</div>
					</div> */}
				{/* </div> */}
			</div>
		</section>

        



        <section id="">
			<div className="container">
				<div className="head-roadmap">
					<h3>Marketplace</h3>
				</div>
				{/* <a href="https://app.knightswap.financial/" target="_blank" >
				<img src={knightswap} style={{maxWidth: "100%"}} />
				</a> */}
				<div style={{display:"flex",justifyContent:"center"}}>
				{/* <iframe src="https://www.knightswap.financial/swap" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe> */}
				{/* <iframe src="https://www.knightswap.financial/swap" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="800px" allowfullscreen></iframe> */}
				</div>
				<div className="main-roadmapbox">
					<div className="wrp-roadmap-content" style={{justifyContent: "center",alignItems: "center",display: "flex"}}>
						{/* <div className="roadmap-c1">
							<div className="roadmapimg1">
								<img src={roadmap1} />
							</div>
						</div>
						<div className="roadmap-c1">
							<div className="roadmap2">
								<img src={roadmap2} />
							</div>
							<div className="roadmapl">
								<img src={roadmapl} />
							</div>
						</div>
						<div className="roadmap-c1">
							<div className="roadmap2">
								<img src={roadmap3} />
							</div>
						</div> */}
						{/* <iframe src="https://lazaruspool.wizard.financial/#/bsc" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe> */}
						<iframe src="https://www.wizard.financial/marketplace" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="1900px" allowfullscreen></iframe>
					</div>
					{/* <div className="automated-wrp">
						<h3>AUTOMATED LP</h3>
						<p>1% of tokens that incur slippage are added into the LP, to ensure that wizards’ magic never falters.</p>
						<h3>How it Works?</h3>
						<p>$WIZARD has 4% slippage on all transactions to prevent price manipulation from muggles and encourage wizards to hold.</p>

						<div className="wrp-tokengrt-list">
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets burned</li>
									<li>1% Goes towards Charity and Community</li>
								</ul>
							</div>
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets redistributed amongst all wizards</li>
									<li>1% Automated Market Making</li>
								</ul>
							</div>
						</div>
					</div> */}
				</div>
				{/* <div className="main-roadmapbox pb-3" style={{backgroundColor: "transparent" ,  backgroundImage : "url(../images/knightswap.png)" ,backgroundRepeat: "no-repeat" ,  backgroundSize: "contain" ,height: "67vh" }} > */}
					 
					{/* <div className="automated-wrp">
						<h3>AUTOMATED LP</h3>
						<p>1% of tokens that incur slippage are added into the LP, to ensure that wizards’ magic never falters.</p>
						<h3>How it Works?</h3>
						<p>$WIZARD has 4% slippage on all transactions to prevent price manipulation from muggles and encourage wizards to hold.</p>

						<div className="wrp-tokengrt-list">
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets burned</li>
									<li>1% Goes towards Charity and Community</li>
								</ul>
							</div>
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets redistributed amongst all wizards</li>
									<li>1% Automated Market Making</li>
								</ul>
							</div>
						</div>
					</div> */}
				{/* </div> */}
			</div>
		</section>

        <section id="">
			<div className="container">
				<div className="head-roadmap">
					<h3>stake nft</h3>
				</div>
				{/* <a href="https://app.knightswap.financial/" target="_blank" >
				<img src={knightswap} style={{maxWidth: "100%"}} />
				</a> */}
				<div style={{display:"flex",justifyContent:"center"}}>
				{/* <iframe src="https://www.knightswap.financial/swap" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe> */}
				{/* <iframe src="https://www.knightswap.financial/swap" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="800px" allowfullscreen></iframe> */}
				</div>
				<div className="main-roadmapbox">
					<div className="wrp-roadmap-content" style={{justifyContent: "center",alignItems: "center",display: "flex"}}>
						{/* <div className="roadmap-c1">
							<div className="roadmapimg1">
								<img src={roadmap1} />
							</div>
						</div>
						<div className="roadmap-c1">
							<div className="roadmap2">
								<img src={roadmap2} />
							</div>
							<div className="roadmapl">
								<img src={roadmapl} />
							</div>
						</div>
						<div className="roadmap-c1">
							<div className="roadmap2">
								<img src={roadmap3} />
							</div>
						</div> */}
						{/* <iframe src="https://lazaruspool.wizard.financial/#/bsc" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe> */}
						<iframe src="https://www.wizard.financial/stake" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="1900px" allowfullscreen></iframe>
					</div>
					{/* <div className="automated-wrp">
						<h3>AUTOMATED LP</h3>
						<p>1% of tokens that incur slippage are added into the LP, to ensure that wizards’ magic never falters.</p>
						<h3>How it Works?</h3>
						<p>$WIZARD has 4% slippage on all transactions to prevent price manipulation from muggles and encourage wizards to hold.</p>

						<div className="wrp-tokengrt-list">
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets burned</li>
									<li>1% Goes towards Charity and Community</li>
								</ul>
							</div>
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets redistributed amongst all wizards</li>
									<li>1% Automated Market Making</li>
								</ul>
							</div>
						</div>
					</div> */}
				</div>
				{/* <div className="main-roadmapbox pb-3" style={{backgroundColor: "transparent" ,  backgroundImage : "url(../images/knightswap.png)" ,backgroundRepeat: "no-repeat" ,  backgroundSize: "contain" ,height: "67vh" }} > */}
					 
					{/* <div className="automated-wrp">
						<h3>AUTOMATED LP</h3>
						<p>1% of tokens that incur slippage are added into the LP, to ensure that wizards’ magic never falters.</p>
						<h3>How it Works?</h3>
						<p>$WIZARD has 4% slippage on all transactions to prevent price manipulation from muggles and encourage wizards to hold.</p>

						<div className="wrp-tokengrt-list">
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets burned</li>
									<li>1% Goes towards Charity and Community</li>
								</ul>
							</div>
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets redistributed amongst all wizards</li>
									<li>1% Automated Market Making</li>
								</ul>
							</div>
						</div>
					</div> */}
				{/* </div> */}
			</div>
		</section>
	
	
        
	</div>
    </div>
  )
}

export default HomePage;
