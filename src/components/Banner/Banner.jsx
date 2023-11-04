import React from "react";
import PropTypes from 'prop-types'
import './banner.scss'
import avangersGroup from '../../resources/img/avengers-group.png';
import avengersLogo from '../../resources/img/avengers-logo.png';

const Banner = ({classModificator}) => {
	return (
		<div className={`banner ${classModificator ? classModificator : ''}`}>
			<div className="banner__container">
				<div className="banner__body">
					<div className="banner__img">
						<img src={avangersGroup} alt="Avangers-group" />
					</div>
					<div className="banner__text title">
						<p>New comics every week!</p>
						<p>Stay tuned!</p>
					</div>
					<div className="banner__img">
						<img src={avengersLogo} alt="Avengers-logo" />
					</div>
				</div>
			</div>
		</div>
	)
}
export default Banner;

Banner.propTypes = {
	classModificator : PropTypes.string
}