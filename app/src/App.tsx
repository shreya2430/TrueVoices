import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import LandingPage from './components/LandingPage/LandingPage'
import { Dashboard } from '@/components/Dashboard'
import { SpaceForm } from './components/space/SpaceForm'
import { Display } from './components/Display'
import { TestimonialPage } from './components/TestimonialPage';
import { Intermediate } from './components/Intermediate';
import { RegisterPage } from './components/pages/RegisterPage';
import { LoginPage } from './components/pages/LoginPage';
import { ResetPasswordPage } from './components/pages/ResetPassword';

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
					path="/login"
					element={<LoginPage />}
				/>
				<Route 
					path='/reset-password'
					element={<ResetPasswordPage />}
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
	</GoogleOAuthProvider>
		
	)
}

export default App
