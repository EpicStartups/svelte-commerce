import type { WidgetStyle, Img, Text } from './baseWidgets'

export type StoreWidget =
	| SimpleQuoteProps
	| SideQuoteProps
	| ParallelQuoteProps
	| ImageGridProps
	| TextEditorProps
	| RowSlidersProps

export type StoreWidgetType =
	| 'SimpleQuote'
	| 'SideQuote'
	| 'ParallelQuote'
	| 'ImageGrid6'
	| 'ImageGrid12'
	| 'TextEditor'
	| 'RowSliders'

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

export interface ImageGridProps extends WidgetStyle {
	type: 'ImageGrid6Props' | 'ImageGrid12Props'
	header: Text
	images: Img[]
}

export interface TextEditorProps extends WidgetStyle {
	type: 'TextEditor'
	content: string
	bgImg?: Img | null
}

export interface RowSlidersProps extends WidgetStyle {
	type: 'RowSliders'
	img: Img[]
}
