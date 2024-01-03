import React from 'react';


const Footer=()=>{
	 return (
		 <div>
			 <div className="bg-footer">
				<div className="container max-w-full">
					<div className="row">
						<div className="col-lg-12">
							<ul className="socila-list">
								<li><a href="https://twitter.com/WIZARD_BSC" target="_blank" className=' flex justify-center' ><img src='/assets/Images/social1.png' /></a></li>
								<li><a href="https://t.me/wizard_financial" target="_blank" className=' flex justify-center' ><img src="/assets/Images/social2.png" /></a></li>
								<li><a href="https://medium.com/@wizardtokenofficial" target="_blank" className=' flex justify-center' ><img src="/assets/Images/social3.png" /></a></li>
								<li><a href="https://discord.com/invite/dfKrgACzHx" target="_blank" className=' flex justify-center' ><img src="/assets/Images/social4.png" /></a></li>
								<li><a href="https://bscscan.com/token/0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18" target="_blank" className='justify-center items-center flex'><img src="/assets/Images/social5.png" /></a></li>
							</ul>
						</div>
					</div>
				</div>
			 </div>
		 </div>
    );
  }
export default Footer;