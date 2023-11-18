import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { Helmet } from 'react-helmet'

import './hero-comics.scss'

function formatDate(inputDate) {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	const dateParts = inputDate.split(/[-T:]/);
	const year = dateParts[0];
	const monthIndex = parseInt(dateParts[1]) - 1; // Месяцы в JavaScript начинаются с 0
	const day = dateParts[2];
	const timeZoneOffset = parseInt(dateParts[5]) / 100; // Сдвиг временной зоны в часах

	const date = new Date(Date.UTC(year, monthIndex, day));
	date.setHours(date.getHours() + timeZoneOffset); // Учитываем сдвиг временной зоны

	const monthName = months[monthIndex];
	const formattedDate = `${monthName} ${day}, ${year}`;

	return formattedDate;
}

const setContent = (procces, componentView, skeletonComp, errorComp) => {
	switch (procces){
		case "waiting":
			return skeletonComp
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

const HeroComics = ({classModificator}) => {
	const {getHeroOrComic, procces, setProcces} = useMarvelService()
	const [data, setData] = useState(null)
	const {comicId, heroId} = useParams()
	const id = comicId || heroId
	const type = heroId ? 'Characters' : 'Comics';
	const isComics = type === 'Comics' ? true : false;
	
	useEffect(()=>{
		loadData()
	},[id])


	const loadData = () => {
		getHeroOrComic(id, type.toLowerCase()).then((data)=> {
			setData(data)
		}).then(()=>setProcces('confirmed'))
	}

	const titleMetaChange = (type, data) => {
		const typePage = type.substring(0, type.length - 1);
		const name = data ? ' - ' + (data.name || data.title) : ''
		const afterType = name && typePage === 'Comic' ? " " + "Book" : ''
		return (
			<Helmet>
				<title>{typePage}{name}</title>
				<meta name="description" content={`${typePage}${afterType}${name}`} />
			</Helmet>
		)
	}

	return (
		<>
			{titleMetaChange(type, data)}
			{setContent(
				procces,
				<View classModificator={classModificator} isComics={isComics} data={data}/>,
				<Skeleton classModificator={classModificator} isComics={isComics} />,
				<div className="page__container d-flex d-flex_center">
					<ErrorMessage style={{maxWidth: '100%'}} />
				</div>
			)}
		</>
	)
}

const View = ({classModificator, isComics, data}) => {
	return (
		<div className={`character ${classModificator ? classModificator : '' }`}>
			<div className="character__container">
				<div className={`character__image-body ${isComics ? 'character__image-body_comics' : ''}`}>
					<div className="character__img-ibg">
						<img src={`${data?.imgUrl ? data.imgUrl : data.thumbnail}`} alt={`${data?.name ? data.name : data.title}`} />
					</div>
				</div>
				<div className="character__row">
					<div className="character__row-title">
						<h1 className="character__title title">{data?.name ? data.name : data.title}</h1>
						{isComics ? (<Link to={'/comics'} className="character__btn-back">Back to all</Link>) : null}
					</div>
					<div className="character__text">{data?.description ? data.description : 'There is no description about this character'}</div>
					{isComics ? (
						<>
							{data.onsaleDate ? <div className="character__label"><strong>On save Date:</strong> {formatDate(data.onsaleDate.date)}</div> : null}
							<div className="character__label">{data.pages} pages</div>
							<div className="character__label"><strong>Language:</strong> {data.language}</div>
							<div className="character__price">{data.price}</div>
						</>
					) : null}
					{
						!isComics && data.homePage ?
						<a href={data.homePage} className='character__btn btn btn_red' target='_blank'>HOMEPAGE MARVEl</a> : null
					}
					{!isComics && data.comics ?
						<>
							<h2 className="character__comics-title title">Comics:</h2>
							<ul className='character__list'>
								{data.comics.length ? data.comics.map((comic) => {
									const comicId = comic.resourceURI.split('/').pop();
									return <li className='character__item' key={comicId}><Link className='character__link' to={`/comics/${comicId}`}>{comic.name}</Link></li>
								}) : 
								<li className='character__item character__link'>There is no comics about this character.</li>
								}
							</ul>
						</>
						: null}
				</div>
			</div>
		</div>
	)
}

const Skeleton = ({classModificator, isComics}) => (
	<div className={`character skeleton ${classModificator ? classModificator : '' }`}>
		<div className="character__container">
			<div className={`character__image-body ${isComics ? 'character__image-body_comics' : ''}`}>
				<div className="character__img-ibg"></div>
			</div>
			<div className="character__row">
				<div className="character__row-title">
					<div className="character__title title"></div>
					{isComics ? (<a href="#" className="character__btn-back"></a>) : null}
				</div>
				<div className="character__text"></div>
				{isComics ? (
					<>
						<div className="character__label"></div>
						<div className="character__label"></div>
						<div className="character__price"></div>
					</>
				) : null}
			</div>
		</div>
	</div>
)

HeroComics.propTypes = {
	classModificator: PropTypes.string
}

export default HeroComics;