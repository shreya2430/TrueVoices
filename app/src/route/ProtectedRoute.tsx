import { Navigate, Outlet } from 'react-router-dom'

type ProtectedRouteProps = {
	// Props definition goes here
	isAuthenticated: () => boolean
}

export const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
	return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
}
