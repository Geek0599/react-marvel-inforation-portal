import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import useMarvelService from '../../services/MarvelService'

import './find-hero.scss'

const FindHero = ({classModificator}) => {
	const {getChracterByName, error} = useMarvelService()
	return (
		<div className={`find-hero ${classModificator ? classModificator : ''}`}>
			{error ? 
				<ErrorMessage style={{'maxWidth': '100%'}} />
			: 
				<Form getChracterByName={getChracterByName}/>
			}
		</div>
	)
}

const Form = ({getChracterByName}) => {
	const [character, setCharacter] = useState(null)
	const [isNoFound, setIsNoFound] = useState(false)

	const findCharacter = async (name) => {
		const upperCaseFirstName = name.substring(0,1).toUpperCase() + name.substring(1, name.length)
		return await getChracterByName(upperCaseFirstName)
	}
	return (
		<>
			<div className="find-hero__title title">Or find a character by name:</div>
			<Formik
				initialValues={{
					character_name: ''
				}}
				validate={(values)=>{
					const errors = {}

					if(!values.character_name){
						errors.character_name = 'This field is required'
					}else if (values.character_name.length < 2){
						errors.character_name = 'To find character type min 2 letters'
					}

					return errors
				}}
				onSubmit={async (data)=>{
					const dataCharacter = await findCharacter(data.character_name)
					if(dataCharacter){
						setCharacter(dataCharacter)
					}else{
						setCharacter(null)
						setIsNoFound(true)
					}

				}}
			>
				{
					({isSubmitting, handleBlur, handleChange, handleSubmit, errors, touched, values})=>(
						<>
							<form onSubmit={handleSubmit} action="#" className="find-hero__row">
								<input type="text" name='character_name' placeholder="Enter name" className="find-hero__input"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.character_name}
								/>
								<button disabled={isSubmitting} type="submit" className="find-hero__btn btn btn_red">FIND</button>
							</form>
							<div className="find-hero__row">
								{errors.character_name && touched.character_name ? 
								<div className="find-hero__message _error">{errors.character_name}</div> 
								: isNoFound && !character ? <div className="find-hero__message _error">The character was no found. Check the name and try again.</div> : null  } 
								{character ? <div className="find-hero__message _succes">There is! Visit {character.name} page?</div> : null}
								{character ? <Link to={`/characters/${character.id}`} className="find-hero__btn btn">TO PAGE</Link> : null}
							</div>
						</>
					)
				}
			</Formik>
		</>
	)
}

FindHero.propTypes = {
	classModificator: PropTypes.string
}

Form.propTypes = {
	getChracterByName: PropTypes.func
}

export default FindHero;