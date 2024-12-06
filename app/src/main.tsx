import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/Providers/ThemeProvider'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import './i18n';


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</ThemeProvider>
		</Provider>
	</StrictMode>
)
