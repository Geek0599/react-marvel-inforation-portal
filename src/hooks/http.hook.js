import { useState, useCallback } from 'react'

//waiting
//loading
//confirmed
//error

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [procces, setProcces] = useState('waiting')

	const request = useCallback(async (url, method = 'GET', body = null, headers = {"Content-Type": 'application/json'})=> {
		setLoading(true);
		setProcces('loading')
		try {
			const response = await fetch(url, {method, body, headers})
			
			if(!response.ok){
				throw new Error(`Could not fetch ${url}, status: ${response.status}`)
			}
			
			const data = await response.json()
			setLoading(false)
			return data

		} catch (error) {
			setLoading(false)
			setError(error.message)
			setProcces('error')
			throw error;
		}
	},[])
	const clearError = useCallback(() => setError(false),[])
	return {
		loading, 
		error, 
		request, 
		clearError,
		procces,
		setProcces
	}
}