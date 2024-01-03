import Link from 'next/link';
import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import calculatoericon from '/public/assets/Images/calculatoericon.png'
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';


const PopupModel = () => {

    const [show, setShow] = useState(false);


  return (
    <div className='flex justify-center items-center'>
         <div onClick={()=>{setShow(!show)}} className="p-2">
         <Image src={calculatoericon} alt="loading" height={20} width={20}/>
         </div>
         {
            show?<div  className="bg-white rounded-xl p-4 ">
            <header className='flex justify-between'>
                <h2 className='text-black font-bold' >ROI</h2 >
                <div className='bg-[#305F91] p-2 text-white font-bold rounded'>
                <AiOutlineClose onClick={()=>{setShow(false)}}/>    
                </div>
            </header>
            <main>
                <ul className='model-cont-wrp'>
                    <li>
                        <h3 className='model-hding'>Timeframe</h3>
                        <ul className='model-cont-child'>
                            <li>1d</li>
                            <li>7d</li>
                            <li>30d</li>
                            <li>365d(annual)</li>
                        </ul>
                    </li>
                    <li>
                        <h3 className='model-hding'>ROI</h3>
                        <ul className='model-cont-child'>
                            <li>0.55%</li>
                            <li>3.90%</li>
                            <li>17.81%</li>
                            <li>634.88%</li>
                        </ul>
                    </li>
                    <li>
                        <h3 className='model-hding'>ACK per $1000</h3>
                        <ul className='model-cont-child'>
                            <li>722.17</li>
                            <li>5139.03</li>
                            <li>24477.72</li>
                            <li>836746.48</li>
                        </ul>
                    </li>
                </ul>
                <p className='model-para'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
            </main>
            <footer className='flex justify-center'>
                <button className='bg-[#305F91] text-white rounded-xl p-2 font-bold' onClick={()=>{setShow(false)}}>
                    Get ACK
                </button>
            </footer>
        </div>:""
         }
    </div>
  )
}

export default PopupModel