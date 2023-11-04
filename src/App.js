import './styles/style.scss'
import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wrapper from './components/Wrapper/Wrapper';
import Header from './components/Header/Header';
import Spinner from './components/Spinner/Spinner'
import ButtonGoUp from './components/ButtonGoUp/ButtonGoUp';

const Page404 = lazy(()=> import('./pages/404'))
const Home = lazy(()=> import('./pages/Home/Home'))
const Comics = lazy(()=> import('./pages/Comics/Comics'))
const AboutCharacterComics = lazy(()=> import('./pages/AboutCharacterComics/AboutCharacterComics'))

const App = () => {
  return (
	<Router>
		<Wrapper> 
			<Header/>
			<main className="page">
				<Suspense fallback={<div className='page__container'><Spinner/></div>}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/comics"element={<Comics />} />
						<Route path="/comics/:comicId" element={<AboutCharacterComics />} />
						<Route path="/characters/:heroId" element={<AboutCharacterComics />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</Suspense>
			</main>
			<ButtonGoUp />
		</Wrapper>
	</Router>
  );
}

export default App;
