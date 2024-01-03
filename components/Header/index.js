import React,{useState} from 'react';
import styles from '../Header/Header.module.css';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RxCross1 } from 'react-icons/rx';


const Header = () => {
    const [show,setShow] = useState(false);
  return (
    <div  className=''>
            <div className="top-header-bg ">

      <div className=' xl:contents hidden'>
          <div className=' hidden md:contents max-w-full'>
        <div className="container max-w-full  py-3">
            <div className="wrp-top-header flex-col md:flex-row justify-center items-center md:justify-between  md:py-0   container max-w-full">
              <div className="py-2 md:py-0 topheaderchild1">
                <a href="/"><img src="/assets/Images/logo2.png" alt="load data"/></a>
              </div>
              <div className="py-2 md:py-0 topheaderchild2">
                <ul className="top-headerlist">
                  {/* <li><a href="https://pancakeswap.finance/swap#/swap?outputCurrency=0x5066C68cAe3B9BdaCD6A1A37c90F2d1723559D18" target="_blank">PANCAKESWAP</a></li>
                  <li><a href="https://swap.wault.finance/bsc/#/swap?outputCurrency=0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18" target="_blank">WAULT FINANCE</a></li>
                  <li><a href="https://exchange.babyswap.finance/#/swap?outputCurrency=0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18" target="_blank">BABYSWAP</a></li>
                  <li><a href="https://dex.cafeswap.finance/#/swap?outputCurrency=0x5066C68cAe3B9BdaCD6A1A37c90F2d1723559D18" target="_blank">CAFESWAP</a></li> */}
                  <li>
                    {/* <button type="btn" className='bg-white px-4 py-1 rounded-xl text-[#f44906] font-bold hover:text-[#ffffff] hover:bg-[#007bff]'>Unlock Wallet</button> */}
                     {
                      <ConnectButton/>
                     } 
                    </li>  
                </ul>
              </div>
            </div>
        </div>
        </div>
        <div className="container  max-w-full  border-b ">
        <div className="container max-w-full ">
          <div className="header-box hidden md:contents">
            <div className={`${styles.header_tags} header-c3 py-5`}>
              <ul className="flex justify-between items-center text-white">
                    <li><a href="/" className={`mrl ${styles.header_tags} hover:text-[#21283e]`}>Home</a></li>
                    {/* <li><a href="/lazarouspools" className="mrl hover:text-[#21283e]">Lazarous Pools</a></li> */}
                    <li><a href="/marketplace" className='hover:text-[#21283e]'>Marketplace</a></li>
                    <li><a href="/choose" className='hover:text-[#21283e]'>NFT ECOSYSTEM</a></li>
                    <li><a href="/games" className='hover:text-[#21283e]'>Games</a></li>
                   {/*  <li><a href="/#partner-sec">Partners</a></li> */}
                    <li><a href="/iwo/list" className='hover:text-[#21283e]'>Launchpad</a></li>
                    <li><a href="https://app.knightswap.financial" target="_blank" className='hover:text-[#21283e]'>Knight</a></li>
                    <li>
                    <div className="dropdown2 z-40">
                    <a href="#"><button className="dropbtn hover:text-[#21283e]">Spell Inventory</button></a>
                      <div class="dropdown-content">
                        <a href="/pools" className='hover:text-[#21283e]'>Mana pools</a>
                        <a href="/farm" className='hover:text-[#21283e]'>Gold farms</a>
                        <a href="https://wizard.financial/wp-content/uploads/2021/07/Wizard-White-Paper.pdf" target="_blank" className='hover:text-[#21283e]'>WIZ Paper</a>
                        <a href="#" className='hover:text-[#21283e]'>Pitch</a>
                        <a href="/faq" className="close-menu hover:text-[#21283e]" >FAQ</a>
                        <a href="/partners" className="close-menu hover:text-[#21283e]">Partners</a>
                        <a href="https://forms.gle/q5stJeET1StSNe979" target="_blank"  className="close-menu hover:text-[#21283e]">Partnership Application</a>
                        <a href="#" className='hover:text-[#21283e]'>Our team</a>
                        <a href="https://wizard.financial/wp-content/uploads/2021/07/WIZARD-Full-Smart-Contract-Security-Audit.pdf" className='hover:text-[#21283e]' target="_blank">Audit</a>
                      </div>
                    </div>
                    </li>
                </ul>
            </div>
          </div>
              
              
          
        </div>
      </div>
      </div>
      <div className='bg-[#305F91] w-full pt-5 pb-5 border-b flex justify-between md:justify-center md:items-center xl:hidden'>
      <div className='flex w-full px-10 justify-between  items-center'>
      <div className="py-2 md:py-0 topheaderchild1">
                <a href="/"><img src="/assets/Images/logo2.png" alt="load data"/></a>
      </div>
      <div className='cursor-pointer text-white '>
          {
            show?<RxCross1 onClick={()=>{setShow(false)}} className="w-8 h-8"/>:<img src="/assets/Images/burger.png" alt="menu_icon" onClick={()=>{setShow(true)}}/>
          }
      </div>
      </div>
      </div>
      {
          show?<div className=" justify-center flex max-w-full  border-b ">
          <div className="">
            <div className="header-box hidden md:contents">
              <div className={`${styles.header_tags} `}>
                <ul className="flex flex-col justify-between items-center text-white">
                      <li><a href="/" className={`mrl ${styles.header_tags} hover:text-[#21283e]`}>Home</a></li>
                      {/* <li><a href="/lazarouspools" className="mrl hover:text-[#21283e]">Lazarous Pools</a></li> */}
                      <li><a href="/marketplace" className='hover:text-[#21283e]'>Marketplace</a></li>
                      <li><a href="/choose" className='hover:text-[#21283e]'>NFT ECOSYSTEM</a></li>
                      <li><a href="/games" className='hover:text-[#21283e]'>Games</a></li>
                     {/*  <li><a href="/#partner-sec">Partners</a></li> */}
                      <li><a href="/iwo/list" className='hover:text-[#21283e]'>Launchpad</a></li>
                      <li><a href="https://app.knightswap.financial" target="_blank" className='hover:text-[#21283e]'>Knight</a></li>
                      <li>
                      <div class="dropdown2 justify-center flex">
                      <a href="#"><button className="dropbtn hover:text-[#21283e]">Spell Inventory</button></a>
                        <div class="dropdown-content">
                          <a href="/pools" className='hover:text-[#21283e]'>Mana pools</a>
                          <a href="/farm" className='hover:text-[#21283e]'>Gold farms</a>
                          <a href="https://wizard.financial/wp-content/uploads/2021/07/Wizard-White-Paper.pdf" target="_blank" className='hover:text-[#21283e]'>WIZ Paper</a>
                          <a href="#" className='hover:text-[#21283e]'>Pitch</a>
                          <a href="/faq" className="close-menu hover:text-[#21283e]" >FAQ</a>
                          <a href="/partners" className="close-menu hover:text-[#21283e]">Partners</a>
                          <a href="https://forms.gle/q5stJeET1StSNe979" target="_blank"  className="close-menu hover:text-[#21283e]">Partnership Application</a>
                          <a href="#" className='hover:text-[#21283e]'>Our team</a>
                          <a href="https://wizard.financial/wp-content/uploads/2021/07/WIZARD-Full-Smart-Contract-Security-Audit.pdf" className='hover:text-[#21283e]' target="_blank">Audit</a>
                        </div>
                      </div>
                      <div className='py-2'>
                      <ConnectButton/>
                      </div>
                      </li>
                  </ul>
              </div>
            </div>
                
                
            
          </div>
        </div>:""
        }
      </div>
        
      </div>
  )
}

export default Header