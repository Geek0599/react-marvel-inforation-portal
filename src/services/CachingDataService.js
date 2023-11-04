
const useCachingService = () => {

	const getContentFromSessionStorage = (key) => {
		if(sessionStorage.getItem(key)){
			return JSON.parse(sessionStorage.getItem(key))
		}
		return null
	}

	const setContentToSessionStorage = (key, value) => {
		sessionStorage.setItem(key, JSON.stringify(value))
	}

	return {getContentFromSessionStorage, setContentToSessionStorage}
}
export default useCachingService