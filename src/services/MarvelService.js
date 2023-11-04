import { useHttp } from "../hooks/http.hook";

// 103f999334a84e9a8a918cc7a340cd44
const useMarvelService = () => {
	const {error, loading, request, clearError} = useHttp()
	const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
	const _apiKey = "apikey=05b82317d7d0892626ed59432f7b58a1";
	
	const getAllCharacters = async (limit, offset) => {
		const response = await request(`${_apiBase}characters?${_apiKey}${limit ? `&limit=${limit}` : `&limit=9`}${offset ? `&offset=${offset}`:''}`);
		return { data: response.data.results.map(_transformResponseHero), offset: response.data.offset}
	}

	const getAllComics = async (limit, offset) => {
		const response = await request(`${_apiBase}comics?${_apiKey}${limit ? `&limit=${limit}` : `&limit=8`}${offset ? `&offset=${offset}`:''}`);
		console.log(response.data.results.map(_transformResponseComic));
		return { data: response.data.results.map(_transformResponseComic), offset: response.data.offset}
	}

	const getChracterByName = async (name) => {
		const response = await request(`${_apiBase}characters?${_apiKey}&name=${name}`);
		return response.data.results.length ? _transformResponseHero(response.data.results[0]) : null
	}

	const getHeroOrComic = async (id, type) => {
		const response =  await request(`${_apiBase}${type}/${id}?${_apiKey}`)
		if(type === 'characters'){
			return _transformResponseHero(response.data.results[0])
		}else if (type === 'comics'){
			return _transformResponseComic(response.data.results[0])
		}else{
			return null
		}
	}
	const getRandomHero = async () => {
		const response = await request(`${_apiBase}characters?${_apiKey}&offset=${_getRandomInt(0, 1563)}&limit=1`)
		return _transformResponseHero(response.data.results[0])
	}
	const _getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * ((max + 1) - min)) + min;
	}
	const _transformResponseHero = (hero) => {
		return {
			id: hero.id,
			name: hero.name,
			description: hero.description,
			imgUrl: hero.thumbnail.path + '.' + hero.thumbnail.extension,
			homePage: hero.urls[0].url,
			wiki: hero.urls[1].url,
			comics: hero.comics.items
		}
	}

	const _transformResponseComic = (comic) => {
		return {
			id : comic.id,
			thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
			title: comic.title,
			description: comic.description !== "" ? comic.description : 'There is no description',
			pages: comic.pageCount ? comic.pageCount : 'There is no about number of',
			language: comic.textObjects.language || 'en-us',
			price: comic.prices[0].price ?  comic.prices[0].price + '$' : 'Price is not available',
			onsaleDate : comic.dates.find((data)=> data.type === 'onsaleDate')
		}
	}

	return {loading, error, getAllCharacters, getHeroOrComic, getRandomHero, clearError, getAllComics, getChracterByName}
}

export default useMarvelService;