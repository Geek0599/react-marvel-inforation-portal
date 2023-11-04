import React from 'react'
import Banner from '../../components/Banner/Banner'
import HeroComics from '../../components/HeroComics/HeroComics'

import './about-character-comics.scss'

const AboutCharacterComics = () => {
	return (
		<>
			<Banner classModificator="page__banner" />
			<HeroComics classModificator="page__character" />
		</>
	)
}
export default AboutCharacterComics;