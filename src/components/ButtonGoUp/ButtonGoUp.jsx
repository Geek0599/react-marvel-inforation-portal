import React, { useEffect, useState, useCallback } from 'react'
import './go-up-btn.scss'

const offsetForHide = 200;

const ButtonGoUp = () => {
	const [isShow, setIsShow] = useState(false)
	const handleClick = () => {
		window.scrollY > 0 && window.scrollTo({
			top: 0,
			behavior: "smooth"
	  })
	}

	const scrollListener = useCallback((e) => {
		if (window.scrollY >= offsetForHide) {
			setIsShow(true);
		 } else {
			setIsShow(false);
		 }
	}, [])

	useEffect(()=>{
		window.addEventListener('scroll', scrollListener)
		return () => {
			window.removeEventListener('scroll', scrollListener)
		}
	},[])

	return (
		<button onClick={handleClick} className={`btn-go-up btn ${isShow ? '_show' : ''}`}>Go Up</button>
	)
}
export default ButtonGoUp