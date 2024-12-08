import { Dashboard } from '@/components/Dashboard'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { CarouselWall } from './components/CarouselWall'
import { Intermediate } from './components/Intermediate'
import LandingPage from './components/LandingPage/LandingPage'
import { MasonryWall } from './components/MasonryWall'
import { LoginPage } from './components/pages/LoginPage'
import { RegisterPage } from './components/pages/RegisterPage'
import { ResetPassword } from './components/pages/ResetPassword'
import PaymentPage from './components/payment'
import PricingPage from './components/Pricing/PricingPage'
import { SpaceForm } from './components/space/SpaceForm'
import { UpdateSpcaeForm } from './components/space/UpdateSpcaeForm'
import { TestimonialPage } from './components/TestimonialPage'
import { TestimonialsList } from './components/testimonials/TestimonialsList'
import { WallOfLove } from './components/WallofLove'
import { ProtectedRoute } from './route/ProtectedRoute'
import Profile from './components/profile'
import { Toaster } from 'sonner'
import { CollectionLink } from './components/CollectionLink'

function App() {
	const isAuthenticated = () => {
		const user = localStorage.getItem('user')
		if (user) {
			return true
		}
		return false
	}

	return (
		<>
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
					<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
						<Route
							path="/dashboard"
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
							path="/dashboard/:spaceName"
							element={<Dashboard />}
						>
							<Route
								path=""
								element={<TestimonialsList />}
							/>
							<Route
								path='collection-link'
								element={<CollectionLink />}
							/>
							<Route
								path="space-form"
								element={<SpaceForm open />}
							/>
							<Route
								path="all"
								element={<TestimonialsList />}
							/>
							<Route
								path="video"
								element={<TestimonialsList />}
							/>
							<Route
								path="text"
								element={<TestimonialsList />}
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
						<Route
							path="/payment"
							element={<PaymentPage />}
						/>
						<Route
							path="/profile"
							element={<Profile />}
						/>
					</Route>
				</Routes>
			</Router>
			<Toaster richColors />
		</>
	)
}

export default App
