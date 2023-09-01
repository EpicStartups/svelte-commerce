import type { Img, Text, WidgetStyle } from './baseWidgets'

export type ProductWidget = SimpleQuoteProps | SideQuoteProps | ParallelQuoteProps | ImageGridProps
export type ProductWidgetType =
	| 'SimpleQuote'
	| 'SideQuote'
	| 'ParallelQuote'
	| 'ImageGrid6'
	| 'ImageGrid12'

export interface SimpleQuoteProps extends WidgetStyle {
	type: 'SimpleQuote'
	bgImg?: Img | null
	heading: Text
	description: Text
}

export interface SideQuoteProps extends WidgetStyle {
	type: 'SideQuote'
	bgImg?: Img | null
	heading: Text
	description: Text
	isReverse: boolean
	sideImg?: Img | null
}

export interface ParallelQuoteProps extends WidgetStyle {
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
	type: 'ImageGrid6' | 'ImageGrid12'
	header: Text
	images: Img[]
}
