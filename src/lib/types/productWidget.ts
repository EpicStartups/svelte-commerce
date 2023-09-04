import type { Img, Text, WidgetStyle } from './baseWidgets'

export type ProductWidget =
	| SimpleQuoteProps
	| SideQuoteProps
	| ParallelQuoteProps
	| ImageGridProps
	| TextEditorProps
	| RowSlidersProps

export type ProductWidgetType =
	| 'SimpleQuote'
	| 'SideQuote'
	| 'ParallelQuote'
	| 'ImageGrid6'
	| 'ImageGrid12'
	| 'RowSliders'
	| 'TextEditor'

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

export interface RowSlidersProps extends WidgetStyle {
	type: 'RowSliders'
	img: Img[]
}

export interface TextEditorProps extends WidgetStyle {
	type: 'TextEditor'
	content: string
	bgImg?: Img | null
}
