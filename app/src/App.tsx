import { Dashboard } from '@/components/Dashboard';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { CarouselWall } from './components/CarouselWall';
import { Display } from './components/Display';
import { Intermediate } from './components/Intermediate';
import LandingPage from './components/LandingPage/LandingPage';
import { MasonryWall } from './components/MasonryWall';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { SpaceForm } from './components/space/SpaceForm';
import { TestimonialPage } from './components/TestimonialPage';
import { WallOfLove } from './components/WallofLove';
import PricingPage from './components/Pricing/PricingPage'
import { UpdateSpcaeForm } from './components/space/UpdateSpcaeForm'
import { ResetPassword } from './components/pages/ResetPassword';



function App() {
  return (
		<GoogleOAuthProvider clientId="GOOGLE_CLIENT_ID">
			<Router>
				<Routes>
					<Route
						path="/"
						element={<LandingPage />}
					/>
					<Route
						path="/register"
						element={<RegisterPage />}
					/>
					<Route
						path="/pricing"
						element={<PricingPage />}
					/>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route
						path="/reset-password"
						element={<ResetPassword />}
					/>
					<Route
						path="/:spaceName/collect"
						element={<TestimonialPage />}
					/>
					<Route
						path="/route"
						element={<Intermediate />}
					/>
					<Route
						path="/space-form"
						element={<SpaceForm open />}
					/>
					<Route
						path="/display/carousel/:spaceName"
						element={<CarouselWall />}
					/>
					<Route
						path="/display/masonry/:spaceName"
						element={<MasonryWall />}
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
							element={<SpaceForm open />}
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
							element={<WallOfLove />}
						/>
						<Route
							path="settings"
							element={<UpdateSpcaeForm />}
						/>
					</Route>
				</Routes>
			</Router>
		</GoogleOAuthProvider>
	)
}

export default App
