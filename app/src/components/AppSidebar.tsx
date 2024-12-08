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
import { createAvatar } from '@dicebear/core';
import { useUser } from '@/hooks/use-user'
import { micah } from '@dicebear/collection'

// This is sample data.
const data = {
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
				title: 'Collection Link',
				url: 'collection-link',
				icon: Inbox,
			},
			{
				title: 'Settings',
				url: 'settings',
				icon: Settings2,
			},
		],
	},
}

const generateRandomPfp = (name: string) => {
  const avatar = createAvatar(micah, {
    randomizeIds: true,
    seed: name,
    backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf', 'f9e0ae', 'f4f4f4']
  })
  return avatar.toDataUri()
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useUser()
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
				<NavUser user={{ name: `${user?.firstName} ${user?.lastName}`, email: user?.email || '', avatar: generateRandomPfp(`${user?.firstName} ${user?.lastName}`)}} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
