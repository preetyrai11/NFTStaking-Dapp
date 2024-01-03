import React, { useState } from "react";
import Config, { NFT, NFT_STAKE } from "/utils/Config";
import Web3 from "web3";
import MultiSingleNFTStakeCard from "./MultiSingleNFTStakeCard";

import Styles from "./style.module.css";


const STAKE_CONTRACT = [
  {
    address: "0xCeb05424c79Bd009e72Cb7107BD00A5D090a2Fa5",
    nft: "0xf9548aefa7b23E7B9EdAc6bc2075099b12A25b06",
    image: "/assets/Images/OctoNft.gif",
    status: 1,
    fee: 1,
    feedecimal: 100,
    ape: 2,
    lp: 0,
    pair: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
];

const MultiSingleNftStake = () => {
  let web3Provider;
  if (typeof window !== "undefined") {
    web3Provider = window.ethereum;
  }else{
    web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)
  }
  const [showActive,setShowActive] = useState(true);

  return (
    <div className="bg-stake flex justify-center py-5">
      <section id="choose-sec" className={`${Styles.font_text}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="mainwrp">
                <div className="stake-head max-w-full py-3">
                  <h3>Earn Token</h3>
                  <p>Stake NFTs to Earn Token</p>
                </div>
                <div className=" mb-3">
                  <ul className="tabs3 mb-3">
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
                  </ul>
                </div>

                <div class="tab-pane">
                  
                  <div className={`${showActive?"active":"inactive"} tab-panel`} id="active">
                    {STAKE_CONTRACT.length > 0 &&
                      STAKE_CONTRACT.map((value, index) => {
                        if (value.status == 1) {
                          return (
                            <MultiSingleNFTStakeCard
                              data={STAKE_CONTRACT[index]}
                              index={index}
                            />
                          );
                        }
                      })}
                  </div>
                  <div className={`${showActive?"inactive":"active"} tab-panel`} id="inactive">
                    {STAKE_CONTRACT.length > 0 &&
                      STAKE_CONTRACT.map((value, index) => {
                        if (value.status == 0) {
                          return (
                            <MultiSingleNFTStakeCard
                              data={STAKE_CONTRACT[index]}
                              index={index}
                            />
                          );
                        }
                      })}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};

export default MultiSingleNftStake;
