import React from 'react'
import styles from './style.module.css';
import choose from '/public/assets/Images/NFTFARM.jpg';
import choose2 from '/public/assets/Images/NFTSALE.jpg';
import choose3 from '/public/assets/Images/NFTFORGE.png';
import choose4 from '/public/assets/Images/voting.png';
import NFTStake from '/public/assets/Images/NFTStake.jpg'
import Image from 'next/image';
import Link from 'next/link';

const NftEcoSystem = () => {
  return (
    <div className={`${styles.font_text}`}>
        <div className="bg-choose">
		 
         <div className="bannermain-bg flex justify-center items-center">
         <section id="partner-sec my-5" className="sec1">
       <div className="container">
     
           <div className="partner-head">
               <h3>NFT</h3>
           </div>
           <div className="flex gap-6">
               <div className="">
                   <div className="wrp-partner-bgimg">
            <div className="wrp-autobox1 flex">
             <div className='nftstake'>
             <div className="flex">
               <div className="rounded-xl">
                 <div className="btn-center1">
                 <Link href="/nftpool">                
                   <Image src={NFTStake} alt="loading image" height={300} width={300}/>
                 </Link>
                 </div>
               </div>
             </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="">
                 <div className="btn-center1">
                 <Link href="/stake">                
                   <Image src={choose} alt="loading image" height={300} width={300}/>
                 </Link>
                 </div>
               </div>
               <div className="">
                 <div className="btn-center2 rounded-xl">
                   <Link href="/choose/ino">
                     <Image src={choose2} alt="loading" height={300} width={300}/>
                   </Link>
                 </div>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-4 pb-6" >
              
               <div className="rounded-2xl">
                 <div className="btn-center2">
                   <Link href="/multistake/single">
                     <Image src={choose3} alt="loading" height={300} width={300}/>
                   </Link>
                 </div>
               </div>
               <div className="rounded-2xl ">
                 <div className="btn-center2">
                   <Link href="/events">
                     <Image src={choose4} alt="loading" height={300} width={300} className=" rounded-xl"/>
                   </Link>
                 </div>
               </div>
              
             </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </section>
 </div>
                 
          
                   
           </div>
    </div>
  )
}

export default NftEcoSystem