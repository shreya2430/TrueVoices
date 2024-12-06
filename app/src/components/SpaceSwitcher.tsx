import { ChevronsUpDown, Plus } from 'lucide-react'
import * as React from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { useGetAllSpaceQuery } from '@/store/space-store'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
export function SpaceSwitcher() {
	const { isMobile } = useSidebar()
	const { space } = useParams()
	const navigate = useNavigate()
	const { data: spaceData, isSuccess } = useGetAllSpaceQuery()
	const spaceSwitcher = React.useMemo(() => {
		if (!isSuccess) return {}
		return Object.fromEntries(
			spaceData.map((space) => [
				space.spaceName,
				{
					name: space.spaceName,
					url: space.spaceLogo,
				},
			])
		)
	}, [isSuccess, spaceData])

	const activeTeam = space
		? spaceSwitcher[space]
		: Object.values(spaceSwitcher)[0]

	const toSlug = (str: string) =>
		str
			.toLowerCase()
			.replace(/[^a-z0-9\s]/g, '')
			.trim()
			.replace(/[\s+]+/g, '_')

	return (
		<>
			{isSuccess && (
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
										<Avatar className="size-8 rounded-lg">
											<AvatarImage src={activeTeam.url} alt={activeTeam.name} />
											<AvatarFallback className="rounded-lg">{activeTeam.name.toUpperCase().substring(0,2)}</AvatarFallback>
										</Avatar>
									</div>
									<div className="grid flex-auto text-left text-sm leading-tight">
										<span className="truncate font-semibold">
											{activeTeam.name}
										</span>
									</div>
									<span className="size-6 text-center leading-6 text-xs rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
										{Object.keys(spaceSwitcher).length}
									</span>
									<ChevronsUpDown className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
								align="start"
								side={isMobile ? 'bottom' : 'right'}
								sideOffset={8}
							>
								<DropdownMenuLabel className="text-xs text-muted-foreground">
									Spaces
								</DropdownMenuLabel>
								{Object.values(spaceSwitcher).map((space) => (
									<DropdownMenuItem
										key={space.name}
										onClick={() => navigate(`/dashboard/${toSlug(space.name)}`)}
										className="gap-2 p-2"
									>
										<div className="flex size-8 items-center justify-center rounded-sm border">
										<Avatar className="size-8 rounded-sm">
											<AvatarImage src={space.url} alt={space.name} />
											<AvatarFallback className="rounded-sm">{space.name.toUpperCase().substring(0,2)}</AvatarFallback>
										</Avatar>
										</div>
										{space.name}
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator className="bg-sidebar-accent" />
								<DropdownMenuItem
									className="gap-2 p-2"
									onSelect={() => navigate('space-form')}
								>
									<div className="flex size-8 items-center justify-center rounded-md border bg-background">
										<Plus className="size-4" />
									</div>
									<div className="font-medium text-muted-foreground">
										Add space
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			)}
		</>
	)
}
