import {useCallback} from 'react'

const useCachingService = () => {

	const getContentFromSessionStorage = useCallback((key) => {
		if(sessionStorage.getItem(key)){
			return JSON.parse(sessionStorage.getItem(key))
		}
		return null
	}, [])

	const setContentToSessionStorage = useCallback((key, value) => {
		sessionStorage.setItem(key, JSON.stringify(value))
	},[])

	return {getContentFromSessionStorage, setContentToSessionStorage}
}
export default useCachingService