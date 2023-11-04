import React from 'react';
import { Helmet } from 'react-helmet';
import './comics.scss';
import Banner from '../../components/Banner/Banner'
import ComicsList from '../../components/ComicsList/ComicsList';

const Comics = () => {
	return (
		<>
			<Helmet>
    			<title>Comics Catalogue</title>
				<meta name="description" content="All Marvel comics from Marvel Api service." />
			</Helmet>
			<Banner classModificator="page__banner" />
			<ComicsList classModificator="page__comics" />
		</>
	)
}
export default Comics;