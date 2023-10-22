export interface Img extends WidgetStyle {
	src: string
	alt?: string
}

export interface Text extends WidgetStyle {
	text: string
}

export interface WidgetStyle {
	color?: string
	weight?: string
	font?: string
	backgroundColor?: string
}

export interface Text2 extends WidgetStyle {
	content: string
}
