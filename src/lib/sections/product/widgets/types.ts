export type ProductWidget = SimpleQuoteProps | SideQuoteProps | ParallelQuoteProps | ImageGridProps
export type ProductWidgetType =
	| 'SimpleQuote'
	| 'SideQuote'
	| 'ParallelQuote'
	| 'ImageGrid6Props'
	| 'ImageGrid12Props'

export interface SimpleQuoteProps {
	type: 'SimpleQuote'
	bgImg?: Img | null
	heading: Text
	description: Text
}

export interface SideQuoteProps {
	type: 'SideQuote'
	bgImg?: Img | null
	heading: Text
	description: Text
	isReverse: boolean
}

export interface ParallelQuoteProps {
	type: 'ParallelQuote'
	bgImg?: Img | null
	firstQuote: {
		heading: Text
		description: Text
	}
	secondQuote: {
		heading: Text
		description: Text
	}
}

export interface ImageGridProps {
	type: 'ImageGrid6Props' | 'ImageGrid12Props'
	header: Text
	images: Img[]
}

export interface Img {
	src: string
	alt?: string
}

export interface Text {
	text: string
	color?: string
	weight?: string
	font?: string
}

export interface Button {
	text: string
	color?: string
	link?: string
}
