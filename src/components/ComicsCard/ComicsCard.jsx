import React from 'react';
import PropTypes from 'prop-types';
import {Link}  from 'react-router-dom';

import './comics-card.scss';

const ComicsCard = ({isLoading, id, title, thumbnail, price}) => {
	return (
		<>
			{isLoading ? 
				<ComicsCardSkeleton /> : 
				<Link to={`/comics/${id}`} className="comics-card">
					<div className="comics-card__img-ibg">
						<img src={thumbnail} alt={title} />
					</div>
					<div className="comics-card__info">
						<h2 className="comics-card__title title">{title}</h2>
						{price ? <div className="comics-card__price">{price}</div> : null}
					</div>
				</Link>
			}
		</>
	)
}

const ComicsCardSkeleton = () => {
	return (
		<div className="comics-card skeleton">
			<div className="comics-card__img-ibg"></div>
			<div className="comics-card__info">
				<div className="comics-card__title title"></div>
				<div className="comics-card__price"></div>
			</div>
		</div>
	)
}

ComicsCard.propTypes = {
	isLoading: PropTypes.bool,
	id: PropTypes.number,
	title: PropTypes.string,
	thumbnail: PropTypes.string,
	price: PropTypes.string
}

export default ComicsCard;
