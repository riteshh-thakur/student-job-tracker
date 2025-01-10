import React from 'react';
import banner_2 from '../assets/images/banner_2.jpg';

const Form = () => {
	return (
		<div id='Application Form' className='top-0 left-0 w-full h-auto'>
			<div id="container" className='w-[450px] md:w-[600px] h-auto my-3 md:h-[85vh] mx-auto items-center justify-center bg-gradient-45 shadow-2xl rounded'>
				<div id="header" className='px-0'>
					<h2 className='pt-8 text-center text-2xl md:text-4xl font-semibold text-gradient-start'>APPLICATION FORM</h2>
				</div>
				{/* Form Starts From Here */}
				<div id="form" className='w-3/4 md:w-3/4 h-auto mx-8 md:mx-auto '>
					<div className='my-3'>
						<label>Name</label><br />
						<input type="text" id="name" placeholder="Enter Your Full Name" required className='w-full block p-2 rounded ' />
					</div>

					<div className='my-3'>
						<label>Email</label>
						<input type="email" id="email" placeholder="Enter Your Email" required className='w-full block p-2 rounded ' />
					</div>

					<div className='my-3'>
						<label>Phone Number</label>
						<input type="number" id="phone" placeholder="Enter Your Contact Number" required className='w-full block p-2 rounded' />
					</div>

					<div className='my-3'>
						<label>Address</label>
						<input type="text" id="address" placeholder="Enter Your Address" required className='w-full block p-2 rounded' />
					</div>

					<div className='my-3'>
						<label>Highest Qualification</label>
						<input type="text" id="qualification" placeholder="Enter Your Highest Qualification" required className='w-full block p-2 rounded' />
					</div>
					<div className='my-3'>
						<label>Resume</label>
						<input type="file" id="resume" accept=".pdf,.doc,.docx" required className='w-full block p-2 rounded bg-white' />
					</div>
					<div id='Button' className='py-3 ml-[40%]'>
						<span className='p-2 px-5 border-2 bg-gradient-45 rounded-full text-[#000435]'>
							<button type="submit" value="Submit" className='transition-transform duration-300 hover:scale-105'>Submit</button>
						</span>
					</div>
				</div>
				{/* Form Ends Here */}
			</div>
		</div>
	)
}
export default Form;
