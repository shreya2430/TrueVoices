import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import { Dashboard } from '@/components/Dashboard'
import { SpaceForm } from './components/space/SpaceForm'
import { Display } from './components/Display'
import { TestimonialPage } from './components/TestimonialPage';
import { Intermediate } from './components/Intermediate';

function App() {
  return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<LandingPage />}
				/>
				<Route
					path="/:spaceName/collect"
					element={<TestimonialPage />}
				/>
				<Route 
					path='/route'
					element={<Intermediate />}
				/>
				<Route
					path='/space-form'
					element={<SpaceForm open />}
				/>
				<Route
					path="/dashboard/:space"
					element={<Dashboard />}
				>
						<Route
							path=""
							element={<Display />}
						/>
						<Route
							path="space-form"
							element={<SpaceForm open/>}
						/>
						<Route
							path="all"
							element={<Display />}
						/>
						<Route
							path="video"
							element={<Display />}
						/>
						<Route
							path="text"
							element={<Display />}
						/>
						<Route 
							path="wall-of-love"
							element={<Display />}
						/>
						<Route
							path="settings"
							element={<Display />}
						/>
					</Route>
			</Routes>
		</Router>
	)
}

export default App
