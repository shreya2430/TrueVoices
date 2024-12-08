import { AppSidebar } from '@/components/AppSidebar'
import { Separator } from '@/components/ui/separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import { useUser } from '@/hooks/use-user'
import { useGetUserQuery } from '@/store/user-store'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Badge } from './ui/badge'


export const Dashboard = () => {
	const { user, setUser } = useUser()
	const { data: getuser, isLoading, isSuccess } = useGetUserQuery(user?.id || '', { skip: !user, refetchOnMountOrArgChange: true })

	useEffect(() => {
		if (isSuccess) {
			setUser((prev) => ({
				firstName: getuser.firstName,
				lastName: getuser.lastName,
				email: getuser.email,
				videoCredits: getuser.videoCredits,
				textCredits: getuser.textCredits,
				id: getuser._id,
				token: prev ? prev.token : '',
			}))
		}
	}, [isSuccess])

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className='grid grid-flow-row auto-rows-[min-content_1fr] auto-cols-fr'>
				<header className="flex h-16 shrink-0 z-30 mx-1 sticky top-0 bg-background rounded-lg items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4 w-full">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 h-6"
						/>
						<div className="flex justify-between items-center w-full">
							<h1 className="text-xl font-semibold">{'Dashboard'}</h1>
							<div className="flex gap-3 items-center">
								<Badge
									variant={'default'}
									className="px-3 py-1"
								>
									Video
									<Separator
										orientation="vertical"
										className="mx-1.5 h-3"
									/>
									{isLoading ? '...' : user ? user.videoCredits : 2}
								</Badge>
								<Badge
									variant={'default'}
									className="px-3 py-1"
								>
									Text
									<Separator
										orientation="vertical"
										className="mx-1.5 h-3"
									/>
									{isLoading ? '...' : user ? user.textCredits : 2}
								</Badge>
							</div>
						</div>
					</div>
				</header>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	)
}
