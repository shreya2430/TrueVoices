import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'

function App() {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<div>
				<LandingPage />
			</div>
		</QueryClientProvider>
	)
}

export default App
