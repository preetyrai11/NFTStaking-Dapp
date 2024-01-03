import React,{useEffect,useState} from 'react'
import styles from '../Launchpad/Launchpad.module.css';
import Padcard from './Padcard';


const Launchpad = () => {
    let web3Provider;
    const [openTab, setOpenTab] = React.useState(1);
    const [upcomingArray,setUpcomingArray] = useState([]);
	const [liveArray,setLiveArray] = useState([]);
	const [successArray,setSuccessArray] = useState([]);
	// const [failArray,setFailArray] = useState([]);
	

    if (typeof window !== "undefined") {
         web3Provider = window.ethereum;
      }

    useEffect(()=>{
        fetch(
            "https://address-marketplace.herokuapp.com/api/allData")
                        .then((res) => res.json())
                        .then((json) => {
                            console.log(json,"json data")
                            setUpcomingArray(json.resObj._upcoming.split(","));
                            setLiveArray(json.resObj._live.split(","));
                            setSuccessArray(json.resObj._success.split(","));
            })
    },[])


  return(
    <div className={`${styles.bg_Launchpad}  ${openTab ===3?'h-auto':'max-h-max'} justify-center flex`}>
        <div className='md:container w-full'>
        <div className={` my-12 md:container w-full justify-center`}>
            <div className='px-5   md:px-0'>
            <div className='bg-[#ffffffd6] rounded-lg py-4 px-1  md:px-5  flex flex-col md:flex-row  justify-between w-full'>
                <div className={`bg-[#21283e]  flex-1 border border-white  transition  hover:-translate-y-1 ease-in-out delay-150 duration-700  hover:bg-[#434A5D]   cursor-pointer justify-center items-center py-4 px-4  flex ${openTab===1?" rounded-full  bg-[#434A5D] ":"bg-[#21283e] rounded-xl "}`}  onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}>
                    <img src='/assets/Images/clock.png' alt="loading" className='h-6 w-6'/>
                    <p className={styles.font_text}>Upcoming</p>
                </div>
                <div className={` rounded-xlbg-[#21283e] border border-white flex-1  transition  hover:-translate-y-1 ease-in-out delay-150 duration-700 hover:bg-[#434A5D]   cursor-pointer justify-center items-center py-4 px-4  flex ${openTab===2?"rounded-full bg-[#434A5D] ":"bg-[#21283e] rounded-xl"}`}  onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}>
                    <img src='/assets/Images/live.png' alt="loading" className='h-6 w-6'/>
                    <p className={styles.font_text}>Live</p>
                </div>
                <div className={`bg-[#21283e] flex-1 border border-white  transition  hover:-translate-y-1 ease-in-out delay-150 duration-700 hover:bg-[#434A5D]   cursor-pointer justify-center items-center py-4 px-4  flex ${openTab===3?"rounded-full bg-[#434A5D] ":"bg-[#21283e] rounded-xl"}`}  onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}>
                    <img src='/assets/Images/success2.png' alt="loading" className='h-6 w-6'/>
                    <p className={styles.font_text}>Success</p>
                </div>
                <div className={`bg-[#21283e] flex-1 border border-white  transition  hover:-translate-y-1 ease-in-out delay-150 duration-700 hover:bg-[#434A5D]   cursor-pointer justify-center items-center py-4 px-4  flex ${openTab===4?"rounded-full bg-[#434A5D]  ":"bg-[#21283e] rounded-xl"}`}
                 onClick={e => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}>
                    <img src='/assets/Images/failing.png' alt="loading" className='h-6 w-6'/>
                    <p className={styles.font_text}>Cancelled</p>
                </div>
            </div>

            <div className={`bg-[#21283e]  my-5 py-5  cursor-pointer hover:-translate-y-1 hover:ease-in-out duration-700 rounded-lg ${openTab === 1 ? "block" : "hidden"}`}>
                {/* <h1 className={`${styles.font_text} flex justify-center text-white`}>No Presale Available to Show</h1> */}
                {/* {upcomingArray === null?upcomingArray.map((v)=>{
                    return <Padcard index={v}/> 
                })
                :<h1 className={`${styles.font_text} flex justify-center text-white`}>No Presale Available to Show</h1>} */}
                {
                    upcomingArray.length == 0?<div className={`bg-[#21283e]  border my-32 container  py-5  rounded-lg `}><h1 className={`${styles.font_text} flex justify-center text-white`}>No Presale Available to Show</h1></div>:""
                }
                {
                    (upcomingArray == null)?<h1 className={`${styles.font_text} flex justify-center text-white`}>No Presale Available to Show</h1>:upcomingArray.map((v)=>{
                        return <Padcard index={v}/> 
                })}
            </div>

            

            <div className={`bg-[#21283e]  my-5 py-5  rounded-lg ${openTab === 2 ? "block" : "hidden"}`}>
            
            {
                liveArray?liveArray.map((v)=>{
                    return <Padcard index={v}/>
                }):<h1 className={`${styles.font_text} flex justify-center text-white`}>No Presale Available to Show</h1>
            }
            </div>

            <div className={`bg-[#21283e]  grid md:grid-cols-2 gap-5 my-5 py-5  rounded-lg ${openTab === 3 ? "block" : "hidden"}`}>
                {
                    successArray?successArray.map((v)=>{
                        return <Padcard index={v} /> 
                    }):<h1 className={`${styles.font_text} flex justify-center text-white`}>No Presale Available to Show</h1>
                }
            </div>

            <div className={`bg-[#21283e]  border my-32 container  py-5  rounded-lg ${openTab === 4? "block" : "hidden"}`}>
            <h1 className={`${styles.font_text} flex justify-center text-white`}>No Presale Available to Show</h1>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}
export default Launchpad