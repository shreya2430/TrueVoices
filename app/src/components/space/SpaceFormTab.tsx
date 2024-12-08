import { cn } from '@/lib/utils'
import { Space } from '@/types/space'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TestimonialPage } from '../TestimonialPage'
import { Thankyou } from '../Thankyou'
import { Form } from '../ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ExtrasettingsForm } from './ExtrasettingsForm'
import { GeneralForm } from './GeneralForm'
import { ThankyouForm } from './ThankyouForm'

type SpaceFormTabProps = {
	className?: string
	onSubmit: (data: Space) => void
	id: string
	children?: React.ReactNode
}

export const SpaceFormTab = ({
	className,
	onSubmit,
	id,
	children
}: SpaceFormTabProps) => {
	const form = useFormContext<Space>()

	return (
		<Tabs
			defaultValue="general"
			className={cn("flex gap-12 w-full", className)}
		>
			<div className="w-[34rem]">
				<TabsContent value="general">
					<TestimonialPage
						className="border rounded-md"
						preview
						space={form.watch()}
					/>
				</TabsContent>
				<TabsContent value="thankyou">
					<Thankyou
						className="border rounded-md"
						preview
						space={form.watch()}
					/>
				</TabsContent>
				<TabsContent value="extrasetting">
					<TestimonialPage
						className="border rounded-md"
						preview
						space={form.watch()}
					/>
				</TabsContent>
			</div>
			<Form {...form}>
				<form
					id={id}
					className="flex flex-col justify-between min-h-max flex-1"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="space-y-4">
						<TabsList className="w-full">
							<TabsTrigger
								className="w-full"
								value="general"
							>
								General
							</TabsTrigger>
							<TabsTrigger
								className="w-full"
								value="thankyou"
							>
								Thank You
							</TabsTrigger>
							<TabsTrigger
								className="w-full"
								value="extrasetting"
							>
								Extra Setting
							</TabsTrigger>
						</TabsList>
						<TabsContent value="general">
							<GeneralForm />
						</TabsContent>
						<TabsContent value="thankyou">
							<ThankyouForm />
						</TabsContent>
						<TabsContent value="extrasetting">
							<ExtrasettingsForm />
						</TabsContent>
					</div>
					{children}
				</form>
			</Form>
		</Tabs>
	)
}
