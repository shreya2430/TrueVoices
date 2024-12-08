"use client"

import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  Sparkles
} from "lucide-react"

import {
  AvatarFallback,
  AvatarImage,
  Avatar as ShadcnAvatar,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Avatar from 'boring-avatars'
import { useNavigate } from "react-router-dom"

interface NavUserProps {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function NavUser({
  user,
}: NavUserProps) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<ShadcnAvatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={user.avatar}
									alt={user.name}
								/>
								<AvatarFallback className="rounded-lg">
									<Avatar
										name={user.name}
										className="h-8 w-8 rounded-lg"
										square
										variant="beam"
									/>
								</AvatarFallback>
							</ShadcnAvatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={8}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<ShadcnAvatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={user.avatar}
										alt={user.name}
									/>
									<AvatarFallback className="rounded-lg">
										<Avatar
											name={user.name}
											className="h-8 w-8 rounded-lg"
											square
											variant="beam"
										/>
									</AvatarFallback>
								</ShadcnAvatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => navigate('/pricing')}>
								<Sparkles />
								Buy Credits
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => navigate('/profile')}>
								<BadgeCheck />
								Profile
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
