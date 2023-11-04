import React from 'react'
import spinner from './spinner.svg'
import './spinner.scss'

const Spinner = () => {
	return (
		<div className="spinner">
			<img src={spinner} alt="Spinner Loader" />
		</div>
	)
}
export default Spinner;