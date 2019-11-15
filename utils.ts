export default class Utils {
	static argv(key: string): string {
		let value: string | number | boolean | null = null
		process.argv.forEach((arg: string, index: number, array) => {
			let k = arg.split(':')[0]
			let v = arg.split(':')[1]
			if (k.toLowerCase() === key) {
				value = v
			}
		})
		if (value) return value
		else throw Error(`Required parameter '${key}' not found. Please re-run with '[command] ${key}:[value]'`)
	}

	static argv_null(key: string): string | null {
		let value: string | number | boolean | null = null
		process.argv.forEach((arg: string, index: number, array) => {
			let k = arg.split(':')[0]
			let v = arg.split(':')[1]
			if (k.toLowerCase() === key) {
				value = v
			}
		})
		return value
	}

	static argv_number(key: string): number {
		let value = this.argv(key)
		let number
		try {
			number = parseInt(value)
			return number
		} catch(e) {
			throw Error(`${key}:${value} must be a number.`)
		}
	}
}
