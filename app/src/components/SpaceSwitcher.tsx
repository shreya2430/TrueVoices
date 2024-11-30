import * as React from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { useNavigate, useParams } from 'react-router-dom'

type Space = {
	name: string
	logo: React.ElementType
	plan: string
}

type SpaceSwitcherProps = {
	spaces: Record<string, Space>
}

export function SpaceSwitcher({ spaces }: SpaceSwitcherProps) {
	const { isMobile } = useSidebar()
	const { space } = useParams()
	const navigate = useNavigate()
	const activeTeam = space ? spaces[space] : Object.values(spaces)[0]

	const toSlug = (str: string) =>
		str
			.toLowerCase()
			.replace(/[^a-z0-9\s]/g, '')
			.trim()
			.replace(/[\s+]+/g, '_')

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<activeTeam.logo className="size-4" />
							</div>
							<div className="grid flex-auto text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{activeTeam.name}
								</span>
								<span className="truncate text-xs">{activeTeam.plan}</span>
							</div>
              <span className='size-6 text-center leading-6 text-xs rounded-full bg-sidebar-primary text-sidebar-primary-foreground'>{Object.keys(spaces).length}</span>
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
						{Object.values(spaces).map((space, index) => (
							<DropdownMenuItem
								key={space.name}
								onClick={() => navigate(`/dashboard/${toSlug(space.name)}`)}
								className="gap-2 p-2"
							>
								<div className="flex size-8 items-center justify-center rounded-sm border">
									<space.logo className="size-4 shrink-0" />
								</div>
								{space.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator className='bg-sidebar-accent'/>
						<DropdownMenuItem className="gap-2 p-2" onSelect={() => navigate('space-form')}>
							<div className="flex size-8 items-center justify-center rounded-md border bg-background">
								<Plus className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">Add team</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
