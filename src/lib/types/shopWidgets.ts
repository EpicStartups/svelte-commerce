import type { WidgetStyle, Img, Text } from './baseWidgets'

export type StoreWidget = SimpleQuoteProps | SideQuoteProps
export type StoreWidgetType = 'SimpleQuote' | 'SideQuote'

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
