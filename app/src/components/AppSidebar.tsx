import {
	Heart,
	Inbox,
	ScrollText,
	Settings2,
	Video
} from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/NavMain'
import { NavUser } from '@/components/NavUser'
import { SpaceSwitcher } from '@/components/SpaceSwitcher'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	navMain: {
		Testimonials: [
			{
				title: 'All',
				url: 'all',
				icon: Inbox,
			},
			{
				title: 'Text',
				url: 'text',
				icon: ScrollText,
			},
			{
				title: 'Video',
				url: 'video',
				icon: Video,
			},
		],
		Manage: [
			{
				title: 'Wall of Love',
				url: 'wall-of-love',
				icon: Heart,
			},
			{
				title: 'Settings',
				url: 'settings',
				icon: Settings2,
			},
		],
	},
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

	return (
		<Sidebar
			collapsible="icon"
			variant="inset"
			{...props}
		>
			<SidebarHeader>
				<SpaceSwitcher />
			</SidebarHeader>
			<SidebarContent>
				{Object.entries(data.navMain).map(([title, items]) => (
					<NavMain
						key={title}
						label={title}
						items={items}
					/>
				))}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
