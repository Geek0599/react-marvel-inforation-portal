import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import './hero-catalogue.scss'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import HeroCard from '../HeroCard/HeroCard'
import HeroAside from '../HeroAside/HeroAside'
import useMarvelService from '../../services/MarvelService'
import useCachingService from '../../utils/CachingDataService';

const initialHeroCards = 9
const itemsToLoad = 6;

const setContent = (procces, componentView, skeletonComp, errorComp, items) => {
	switch (procces){
		case "waiting":
			return skeletonComp
			break
		case "loading":
			return items.length ? (
				<>
					{componentView}
					{skeletonComp}
				</>
			) : skeletonComp;
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

const HeroCatalogue = ({classModificator}) => {
	const {getAllCharacters, clearError, procces, setProcces} = useMarvelService()
	const [characters, setCharacters] = useState([])
	const [heroIdActive, setHeroIdActive] = useState(null)
	const [heroEnded, setHeroEnded] = useState(false)
	const [offset, setOffset] = useState(0)
	const {setContentToSessionStorage, getContentFromSessionStorage} = useCachingService()
	useEffect(()=>{
		loadHeroes(initialHeroCards, null)
	},[])

	const loadHeroes = async (limit, offset, isLoadingDataMore) => {
		clearError()
		const offsetFromStorage = getContentFromSessionStorage('offsetHeroCatalogue')
		const dataFromStorage = getContentFromSessionStorage('heroListLoaded')
		if(dataFromStorage && !isLoadingDataMore){
			setCharacters(dataFromStorage)
			setOffset(offsetFromStorage)
			const heroIdActiveCached = getContentFromSessionStorage('heroIdActive')
			if(heroIdActiveCached){
				setHeroIdActive(heroIdActiveCached)
			}
			setProcces('confirmed')
		}else{
			const res = await getAllCharacters(limit, offset)
			if(res.length === 0) setHeroEnded(true)
			setCharacters((prev)=>{
				const data = [...prev, ...res.data]
				setContentToSessionStorage('heroListLoaded', data)
				return data
			})
			const newOffset = res.offset + (!characters.length ? initialHeroCards : itemsToLoad)
			setContentToSessionStorage('offsetHeroCatalogue', newOffset)
			setOffset(newOffset)
			setProcces('confirmed')
		}
	}

	const renderSkeletons = (count) => {
		return Array(count).fill(null).map((_, index)=><Skeleton key={index}/>)
	}

	const renderItems = (characters, heroIdActive, setHeroIdActive) => {
		return characters.map((hero, index)=><HeroCard heroIdActive={heroIdActive} setHeroIdActive={setHeroIdActive} key={index} {...hero}/>)
	}


	return (
		<div className={`hero-catalog ${classModificator ? classModificator : ''}`}>
			<div className="hero-catalog__container">
				<div className="hero-list">
					<div className="hero-list__items">
						{setContent(
							procces,
							renderItems(characters, heroIdActive, setHeroIdActive),
							renderSkeletons(!characters.length ? initialHeroCards : itemsToLoad),
							<ErrorMessage style={{maxWidth: '350px', width: '100%', margin: '0 auto'}}/>,
							characters
						)}
					</div>
					{!characters.length && procces === 'loading' && procces !== 'error' ? null : 
						<button disabled={procces === 'loading'} style={heroEnded ? {display: 'none'} : null} onClick={()=>loadHeroes(itemsToLoad, offset, true)} className="hero-list__btn btn btn_red">LOAD MORE</button>
					}
				</div>
				<HeroAside heroId={heroIdActive} />
			</div>
		</div>
	)
}

const Skeleton = ({key}) => {
	return (
		<div key={key} className='hero-card skeleton'>
			<div className="hero-card__image-ibg"></div>
			<div className="hero-card__info">
				<h3 className="hero-card__title title"></h3>
			</div>
		</div>
	)
}

HeroCatalogue.propTypes = {
	classModificator : PropTypes.string
}

export default HeroCatalogue;