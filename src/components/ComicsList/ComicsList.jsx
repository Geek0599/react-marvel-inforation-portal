import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useMarvelService from '../../services/MarvelService';
import useCachingService from '../../services/CachingDataService';

import ComicsCard from '../../components/ComicsCard/ComicsCard'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

import './comics-list.scss'


const initialComicsLoad = 8
const itemsToLoad = 12

const ComicsList = ({classModificator}) => {
	const {loading, error, getAllComics} = useMarvelService()
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
			})
		}
	})
	return (
		<div className={`comics ${classModificator}`}>
			<div className="comics__container">
				<div className={`comics__items ${error ? 'error': null}`}>
					{error ? <ErrorMessage style={{"maxWidth": '100%'}} /> : null}
					{comics.length > 0 && !error ? comics.map((comic, index)=>{
						return <ComicsCard key={index} {...comic} />
					}) : null}
					{loading && !error ? Array(!comics.length ? initialComicsLoad : itemsToLoad).fill(null).map((_,index)=><ComicsCard key={index} isLoading={true} />) : null}
				</div>
				{!comics.length && loading && !error ? null : 
					<button disabled={loading} style={itemsEnd ? {'display': "none"} : null} onClick={()=>loadComics(itemsToLoad, offset, true)} className="comics__btn btn btn_red">LOAD MORE</button>
				}
			</div>
		</div>
	)
}

ComicsList.propTypes = {
	classModificator : PropTypes.string
}

export default ComicsList;