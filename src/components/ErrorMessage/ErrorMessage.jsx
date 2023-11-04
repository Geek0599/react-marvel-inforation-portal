import React from 'react'
import PropTypes from 'prop-types'
import errorIcon from './connection-error.gif'

const ErrorMessage = ({style}) => {
	return (
		<img src={errorIcon}  style={style}/>
	)
}

ErrorMessage.propTypes = {
	style : PropTypes.object
}

export default ErrorMessage;