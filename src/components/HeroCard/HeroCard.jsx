import React from 'react'
import PropTypes from 'prop-types'
import useCachingService from '../../utils/CachingDataService';
import './hero-card.scss'

const HeroCard = ({heroIdActive, name, imgUrl, id, setHeroIdActive}) => {
	const {setContentToSessionStorage} = useCachingService()
	const handlerClick = (e, id)=>{
		e.preventDefault()
		setHeroIdActive(id)
		setContentToSessionStorage('heroIdActive', id)
	}
	return (
		<a href="#" onClick={(e)=>handlerClick(e, id)} className={`hero-card ${heroIdActive === id ? '_active' : ''}`}>
			<div className="hero-card__image-ibg">
				<img src={imgUrl} alt={name} />
			</div>
			<div className="hero-card__info">
				<h3 className="hero-card__title title">{name}</h3>
			</div>
		</a>
	)
}

HeroCard.propTypes = {
	heroIdActive: PropTypes.number,
	id: PropTypes.number,
	name: PropTypes.string,
	imgUrl: PropTypes.string,
	setHeroIdActive: PropTypes.func
}

export default HeroCard;