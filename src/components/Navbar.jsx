import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logowhite, close, menu } from "../assets/images";
import { BiUserCircle } from "react-icons/bi";
import TopButtons from "./TopButtons";

const Navbar = ({ toggleToCel }) => {
	const [toggle, setToggle] = useState(false);
	const [toggle2, setToggle2] = useState(false);
	const changeToCells = () => {
		toggleToCel(true)
	}
	const changeToFer = () => {
		toggleToCel(false);
	}
	return (
		<div>
			<nav className='fixed inset-x-0 bg-[#000a18] items-center justify-between py-6 px-16 max-[750px]:px-10 max-[300px]:px-6 z-[200] flex'>
				{/* sidebar */}
	
				<div className=' flex items-center space-x-8  max-[750px]:space-x-0'>
					<span className='flex flex-row w-1/4 items-center justify-center space-x-2 '>
						<button name='metric' className=' text-xl text-white font-light'
						onClick={changeToCells}
						>
							&deg;C
						</button>
						<p className='text-white text-xl mx-1'> |</p>
						<button name='imperial' className=' text-xl text-white font-light'
						onClick={changeToFer}
						>
							&deg;F
						</button>
					</span>

				</div>
			</nav>

		</div>
	);
};

export default Navbar;
