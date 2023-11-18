import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useMarvelService from '../../services/MarvelService';
import useCachingService from '../../utils/CachingDataService';

import ComicsCard from '../../components/ComicsCard/ComicsCard'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

import './comics-list.scss'


const initialComicsLoad = 8
const itemsToLoad = 12

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

const ComicsList = ({classModificator}) => {
	const {getAllComics, procces, setProcces} = useMarvelService()
	const {setContentToSessionStorage, getContentFromSessionStorage} = useCachingService()
	const [comics, setComics] = useState([])
	const [offset, setOffset] = useState(0)
	const [itemsEnd, setItemsEnd] = useState(false)
	useEffect(()=>{
		loadComics(8, offset)
	},[])


	const loadComics = useCallback((limit, offset, isLoading) => {
		const cachedComicsList = getContentFromSessionStorage('cachedComicsList')
		if(cachedComicsList && !isLoading){
			setComics(cachedComicsList)
			setProcces('confirmed')
		}else{
			getAllComics(limit, offset).then((res)=>{
				if(!res.data.length) setItemsEnd(true)
				setComics((prev)=>{
					const data = [...prev, ...res.data]
					setContentToSessionStorage('cachedComicsList', data)
					return data
				})
				const newOffset = res.offset + (!comics.length ? initialComicsLoad : itemsToLoad)
				setContentToSessionStorage('comicsListOffset', newOffset)
				setOffset(newOffset)
			}).then(()=>setProcces('confirmed'))
		}
	})


	const renderItems = (comics) => {
		return comics.map((comic, index) => <ComicsCard key={index} {...comic} />)
	}

	const renderSkeletons = (comics, initialComicsLoad, itemsToLoad) => {
		return Array(!comics.length ? initialComicsLoad : itemsToLoad).fill(null)
																						  .map((_,index)=><ComicsCard key={index} isLoading={true} />)
	}

	return (
		<div className={`comics ${classModificator}`}>
			<div className="comics__container">
				<div className={`comics__items ${procces === 'error' ? 'error': null}`}>
					{setContent(
						procces,
						renderItems(comics),
						renderSkeletons(comics, initialComicsLoad, itemsToLoad),
						<ErrorMessage style={{"maxWidth": '100%'}} />,
						comics
					)}
				</div>
				{!comics.length && procces === 'loading' && procces !== 'error' ? null : 
					<button disabled={procces === 'loading'} style={itemsEnd ? {'display': "none"} : null} onClick={()=>loadComics(itemsToLoad, offset, true)} className="comics__btn btn btn_red">LOAD MORE</button>
				}
			</div>
		</div>
	)
}

ComicsList.propTypes = {
	classModificator : PropTypes.string
}

export default ComicsList;