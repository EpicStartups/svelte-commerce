export type StoreWidget = SimpleQuoteProps | SideQuoteProps
export type StoreWidgetType = 'SimpleQuote' | 'SideQuote'

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
