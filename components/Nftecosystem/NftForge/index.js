import React, { useState } from "react";
import MultiSingleStakeCard from "./MultiSingleStakeCard";
import Styles from './Style.module.css';


const STAKE_CONTRACT = 
[ 
  {address: '0xd05e7664b01962403ccd4143cC7032360a654a0E', nft: '0xdC352C5B8B49f213DcC8AF3eEB2D2a5F694E59Ab',image : "/assets/Images/Golden.gif", status: 1, fee: 1 ,feedecimal: 100 , ape: 0, lp: 0 },
  {address: '0x2c3e8246E2Da14D66D1A7c4475b21583Ef601425', nft: '0xdC352C5B8B49f213DcC8AF3eEB2D2a5F694E59Ab',image : "/assets/Images/Silver_Guard2.gif", status: 1, fee: 1 ,feedecimal: 100 , ape: 2, lp: 0 , pair: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'},
  {address: '0xbc3077ec4a9C74A7B7031877c4692086eFE522c7', nft: '0x6d1bbbba71d55fb5119ac3eeb360753f73f44be8',image : "/assets/Images/Golden_Guard.gif", status: 1, fee: 0 ,feedecimal: 100 , ape: 2, lp: 0 , pair: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'},
    {address: '0xf988d49341cb9dA8C0a4e6A139aa808c5A5B0DB1', nft: '0x16ad1fde0f0332dbf995e6bf71542eddb2edc1ec',image : "/assets/Images/Silver_Guard2.gif", status: 0, fee: 0 ,feedecimal: 100 , ape: 2, lp: 0 , pair: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'},
    {address: '0x28E60d5401066be7A2235dAa551F8De36B8F63Cb', nft: '0xdfe151ed2780f33e3239a4c4616ce3ce88e379d2',image : "/assets/Images/Wizard Battle Pass.gif", status: 1, fee: 0 ,feedecimal: 100 , ape: 0, lp: 0 },
    {address: '0x3eE697BA18477716F37ba87Ff1aa4fdA63c0A55F', nft: '0x32f7e05312c3D32C4D25DCC0b4046253b029f366',image : "/assets/Images/SG.gif", status: 0, fee: 0 ,feedecimal: 100 , ape: 0, lp: 0 },
];

const MultiSingleStake = () => {
  let web3Provider;
  if (typeof window !== "undefined") {
    web3Provider = window.ethereum;
  }


  const [showActive,setShowActive] = useState(true);
      
  return (
    <div className="bg-stake flex justify-center">	
				<section id="choose-sec">
                    <div className={`${Styles.font_text} container`}>
                        <div className="row">
                            <div className="col-lg-12">
                         
                                <div className="mainwrp">
                               
                               <div className="stake-head">
                                   <h3>Earn NFT</h3>
                                   <p>Stake Multiple NFTs to Earn NFT</p>
                               </div>

                               <div className="inactive-box mb-3">
                               <ul class="tabs3 mb-3">
                                <li class="tab-button">
                                    <a href="#" className={`${showActive?"active":"inactive"}`} data-tab="active" onClick={()=>{setShowActive(true)}}>
                                Active
                        </a>
                      </li>
                      <li class="tab-button">
                        <a href="#" className={`${showActive?"inactive":"active"}`} data-tab="inactive" onClick={()=>{setShowActive(false)}}>
                          Inactive
                        </a>
                      </li>
                    </ul>
					</div>
                            	<div class="tab-pane">
								<div className={`${showActive?"active":"inactive"} tab-panel`}  id="active">
                            	{STAKE_CONTRACT.length > 0 && STAKE_CONTRACT.map((value, index) => {
                                    if(value.status == 1){
                                   return   <MultiSingleStakeCard data={STAKE_CONTRACT[index]} />
                                }
                                })
                                }
                            </div>
                            <div className={`${showActive?"inactive":"active"} tab-panel`} id="inactive">
                            {STAKE_CONTRACT.length > 0 && STAKE_CONTRACT.map((value, index) => {
                                    if(value.status == 0){
                                   return   <MultiSingleStakeCard data={STAKE_CONTRACT[index]} />
                                }
                                })
                                }

                            </div>


                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
					 
            </div>
  )
}

export default MultiSingleStake