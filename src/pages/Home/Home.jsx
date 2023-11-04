import React from 'react'
import { Helmet } from 'react-helmet'
import './home.scss'
import RandomHero from '../../components/RandomHero/RandomHero'
import HeroCatalogue from '../../components/HeroCatalogue/HeroCatalogue'

const Home = () => {
	return (
		<>
			<Helmet>
    			<title>Marvel Information</title>
				<meta name="description" content="Marvel information about all characters and comics from Marvel Api service." />
			</Helmet>
			<RandomHero classModificator="page__random-hero" />
			<HeroCatalogue classModificator="page__hero-cotalog" />
		</>
	)
}

export default Home;