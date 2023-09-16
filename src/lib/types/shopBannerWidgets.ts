import type { Img, WidgetStyle, Text2 as Text } from './baseWidgets'

export type ShopHeroWidget = SimpleQuoteProps | SideQuoteProps | ParallelQuoteProps

export type ShopHeroWidgetType = 'SimpleQuote' | 'SideQuote' | 'ParallelQuote'

export interface SimpleQuoteProps extends WidgetStyle {
	type: 'SimpleQuote'
	bgImg?: Img | null
	text: Text
}

export interface SideQuoteProps extends WidgetStyle {
	type: 'SideQuote'
	bgImg?: Img | null
	text: Text
	isReverse: boolean
	sideImg?: Img | null
}

export interface ParallelQuoteProps extends WidgetStyle {
	type: 'ParallelQuote'
	bgImg?: Img | null
	firstQuote: Text
	secondQuote: Text
}
