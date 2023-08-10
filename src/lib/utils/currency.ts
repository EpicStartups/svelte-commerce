import type { FormattedAmount } from '$lib/types'

export type Currency = 'MYR' | 'USD' | 'GBP' | 'SGD'

const USDollar = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
})

const MYR = Intl.NumberFormat('ms-MY', {
	style: 'currency',
	currency: 'MYR'
})

const SGD = Intl.NumberFormat('en-SG', {
	style: 'currency',
	currency: 'SGD'
})

const GBP = Intl.NumberFormat('en-GB', {
	style: 'currency',
	currency: 'GBP'
})

export const formatCurrency = (number: number | null, currency: Currency): FormattedAmount => {
	if (number === null) {
		return {
			value: `${currency}`,
			currency,
			raw: 0
		}
	}
	return {
		value: convertCurrency(number, currency),
		currency,
		raw: number
	}
}

export const convertCurrency = (number: number | null, currency: Currency) => {
	if (number === null) {
		return `${currency} NaN`
	}
	switch (currency) {
		case 'MYR':
			return MYR.format(number / 100)
		case 'USD':
			return USDollar.format(number / 100)
		case 'GBP':
			return GBP.format(number / 100)
		case 'SGD':
			return GBP.format(number / 100)
		default:
			return `${currency} ${number / 100}`
	}
}

export const convertCurrencyNumber = (number: number | null, currency: Currency) => {
	return Number(convertCurrency(number, currency))
}
