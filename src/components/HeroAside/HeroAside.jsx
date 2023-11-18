import React, { useEffect, useState, useRef } from 'react'
import { StickyContainer, Sticky } from 'react-sticky';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService'
import useCachingService from '../../utils/CachingDataService';

import FindHero from '../FindHero/FindHero'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import bgHeroAside from '../../resources/img/bg-hero-catalog.png'
import './hero-aside.scss'

const setContent = (procces, componentView, skeletonComp, errorComp) => {
	switch (procces){
		case "waiting":
			return null
			break
		case "loading":
			return skeletonComp;
			break
		case "confirmed":
			return componentView;
			break
		case "error": 
			return errorComp;
			break
		default:
			throw new Error('Unexpected process state')
	}
}

const HeroAside = ({heroId}) => {
	const {getHeroOrComic, clearError, procces, setProcces} = useMarvelService()
	const {setContentToSessionStorage, getContentFromSessionStorage} = useCachingService()
	const [hero, setHero] = useState(null)
	useEffect(()=>{
		clearError()
		const heroCached = getContentFromSessionStorage('heroAside')
		if(heroCached && heroCached.id === heroId){
			setHero(heroCached)
			setProcces('confirmed')
		}else if(heroId){
			getHeroOrComic(heroId, 'characters').then((hero)=>{
				setHero(hero)
				setContentToSessionStorage('heroAside', hero)
			}).then(()=>setProcces('confirmed'))
		}
	},[heroId])
	
	return (
		<StickyContainer className="hero-aside">
			<Sticky disableIf={window.innerWidth < 992}>
				{({ style, isSticky}) => (
					<div style={{...style, marginTop: isSticky ? '15px' : '0px'}} className="hero-aside__body">
						{
							setContent(
								procces,
								<HeroAsideCard hero={hero}/>,
								<Skeleton />,
								<ErrorMessage style={{maxWidth: '200px', width: '100%', margin: '10px auto 10px auto'}} />
							)
						}
						<FindHero classModificator="hero-aside__wrapper" />
						<div className="hero-aside__bg">
							<img src={bgHeroAside} alt="bg-hero-catalog" />
						</div>
					</div>
				)}
			</Sticky>
		</StickyContainer>
	)
}

const Skeleton = () => {
	return (
		<div className="hero-aside__wrapper skeleton">
			<div className="hero-aside__top top-hero-aside">
				<div className="top-hero-aside__image-body">
					<div className="top-hero-aside__image-ibg">
						
					</div>
				</div>
				<div className="top-hero-aside__row">
					<h2 className="top-hero-aside__title title"></h2>
					<div className='top-hero-aside__btns'>
						<div className="top-hero-aside__btn btn btn_red"></div>
						<div className="top-hero-aside__btn btn"></div>
					</div>
				</div>
			</div>
			<div className="hero-aside__text"></div>
			<h3 className="hero-aside__sub-title"></h3>
			<ul className="hero-aside__list">
				{Array(5).fill(null).map((_,index)=>{
					return (<li key={index} className="hero-aside__item"><div className="hero-aside__link"></div></li>)
				})}
			</ul>
		</div>
	)
}

const HeroAsideCard = ({hero}) => {
	const cardRef = useRef()

	useEffect(()=>{
		if(window.innerWidth < 992 && cardRef.current){
			cardRef.current.scrollIntoView({
				behavior: 'smooth'
			}) 
		}
	},[])

	return (
		<div ref={cardRef} className="hero-aside__wrapper">
			<div className="hero-aside__top top-hero-aside">
				<div className="top-hero-aside__image-body">
					<div className="top-hero-aside__image-ibg">
						<img src={hero.imgUrl} alt={hero.name} />
					</div>
				</div>
				<div className="top-hero-aside__row">
					<h2 className="top-hero-aside__title title">{hero.name}</h2>
					<Link to={`/characters/${hero.id}`} className="top-hero-aside__btn btn btn_red">HOMEPAGE</Link>
					<a rel="noreferrer" target='_blank' href={hero.wiki} className="top-hero-aside__btn btn">WIKI</a>
				</div>
			</div>
			<div className="hero-aside__text">{hero.description ? hero.description : 'There is no description about this character'}</div>
			<h3 className="hero-aside__sub-title">Comics:</h3>
				<ul className="hero-aside__list">
					{hero.comics.length ? hero.comics.map((comics, index)=>{
						const comicsId = comics.resourceURI.split('/').pop();
						return <li key={index} className="hero-aside__item">
									<Link to={`/comics/${comicsId}`} className="hero-aside__link">{comics.name}</Link>
								 </li>
					}) : <li className="hero-aside__item"><div className="hero-aside__link">There are no comics about this character</div></li>}
				</ul>
		</div>
	)
}

HeroAside.propTypes = {
	heroId: PropTypes.number
}


export default HeroAside;