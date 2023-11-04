import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import './random-hero.scss'
import decorationBg from '../../resources/img/decoration-bg.png'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const RandomHero = ({classModificator}) => {
	const {loading, error, getRandomHero, clearError} = useMarvelService(true)
	const [state, setState] = useState({
		id: null,
		name: null,
		imgUrl: null,
		description: null,
		wiki: null,
		homePage: null,
		comics: null
	})
	useEffect(()=>{
		onHeroLoaded()
	},[])

	const onHeroLoaded = () =>{
		clearError()
		getRandomHero().then((res)=>{
			setState((prev)=>{
				return {
					...prev,
					...res
				}
			})
		})
	}

	return (
		<div className={`random-hero ${classModificator ? classModificator : ''}`}>
			<div className="random-hero__container ">
				<div className="random-hero__controlls random-hero-controlls">
					<img src={decorationBg} alt="decoraton-bg" className="random-hero-controlls__bg" />
					<h2 className="random-hero-controlls__title title">
						<p>Random character for today!</p>
						<p>Do you want to get to know him better?</p>
					</h2>
					<h3 className="random-hero-controlls__text title">Or choose another one</h3>
					<button onClick={onHeroLoaded} className="random-hero-controlls__btn btn btn_red">TRY IT</button>
				</div>
				<div className={`random-hero__info-block random-hero-info ${loading ? 'skeleton' : ''}`}>
					{loading ? <Skeleton/> : 
						error ? (<ErrorMessage style={{ alignSelf: 'center', height: '165px', width: '165px'}} />) : 
						(<>
								<div className="random-hero-info__img-body">
									<div className="random-hero-info__image-ibg">
										<img src={state.imgUrl} alt={state.name} />
									</div>
								</div>
								<div className="random-hero-info__content">
									<div className="random-hero-info__title title">{state.name}</div>
									<div className="random-hero-info__text">{state.description ? state.description : 'There is no description about this character'}</div>
									<div className="random-hero-info__buttons">
										<Link to={`/characters/${state.id}`} className="random-hero-info__button btn btn_red">HOMEPAGE</Link>
										<a rel="noreferrer" target='_blank' href={state.wiki} className="random-hero-info__button btn">WIKI</a>
									</div>
								</div>
						</>)}
				</div>
			</div>
		</div>
	)
}

const Skeleton = ()=> {
	return (<>
		<div className="random-hero-info__img-body">
			<div className="random-hero-info__image-ibg">
			</div>
		</div>
		<div className="random-hero-info__content">
			<div className="random-hero-info__title title"></div>
			<div className="random-hero-info__text"></div>
			<div className="random-hero-info__buttons">
				<div className="random-hero-info__button btn btn_red"></div>
				<div className="random-hero-info__button btn"></div>
			</div>
		</div></>)
}

RandomHero.propTypes = {
	classModificator : PropTypes.string
}

export default RandomHero;