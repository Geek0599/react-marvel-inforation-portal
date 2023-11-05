import React from 'react'
import { Link, NavLink } from "react-router-dom";

import './header.scss';

const Header = () =>{
	return (
		<header className="header">
			<div className="header__container">
				<Link to="/" className="header__logo"><span>Marvel</span> information portal</Link>
				<nav className="header__nav nav">
					<ul className="nav__list">
						<li className="nav__item">
							<NavLink to="/" className={({isActive}) => "nav__link hover-underline" + (isActive ? ' _active' : "")}>Characters</NavLink>
						</li>
						<li className="nav__item">
							<NavLink to="/comics" className={({isActive})=> "nav__link hover-underline" + (isActive ? ' _active' : "")}>Comics</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header;