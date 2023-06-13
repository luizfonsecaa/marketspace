const EXCLUSION_VALUE_ITEM = ['all', undefined, 0, '', null]

const stringifyURL = (obj: object) => {
	let stringify = ''

	for (const [key, value] of Object.entries(obj)) {
		let item = ''

		if (Array.isArray(value)) {
			item = value.map(item => `&${key}=${item}`).join('')
		} else if (EXCLUSION_VALUE_ITEM.indexOf(value) == -1) {
			if (stringify == '') item = `${key}=${value}`
			else item = `&${key}=${value}`
		}

		if (item != '') {
			stringify = `${stringify}${item}`
		}
	}
	return stringify
}

export default stringifyURL
