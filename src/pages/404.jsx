import React from 'react'
import { Helmet } from 'react-helmet'
import {Link} from "react-router-dom";
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'

const Page404 = () => {
	return (
		<>
			<Helmet>
    			<title>Page doesn't exist! Error 404</title>
				<meta name="description" content="" />
			</Helmet>
			<div className='page__container' style={{'display': 'flex', "flexDirection": 'column', "justifyContent": 'center'}}>
				<ErrorMessage style={{'margin': '0 auto 30px auto', 'max-width': '300px'}} />
				<p style={{'textAlign': 'center', 'marginBottom': '20px', 'fontSize': '30px'}}>Page doesn't exist!</p>
				<Link to='/' style={{'textAlign': 'center', "color": '#9F0013', "fontWeight": '600', 'fontSize': '23px'}}>Back to main page</Link>
			</div>
		</>
	)
}
export default Page404;