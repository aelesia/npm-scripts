import {spawn, spawnSync, SpawnSyncOptions, SpawnSyncReturns} from 'child_process'

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

	static argv_null(key: string): string | undefined {
		let value: string | number | boolean | undefined = undefined
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

	static argv_number_null(key: string): number | undefined {
		let value = this.argv_null(key)
		if (value == null) return undefined
		let number
		try {
			number = parseInt(value)
			return number
		} catch(e) {
			throw Error(`${key}:${value} must be a number.`)
		}
	}

	static sh_s(command: string, args?: string[]): string {
		return spawnSync(command, args).stdout.toString().replace('\n', '')
	}

	static sh_i(command: string, args?: string[]): number {
		return parseInt(spawnSync(command, args).stdout.toString())
	}

	static pwd(): string {
		return Utils.sh_s('pwd')
	}

	static async sh_2(command: string, options?: SpawnSyncOptions): Promise<null> {
		let a = command.split(' ')
		let b = a[0]
		let c: string[] = []
		a.forEach((it)=> {
			if (it !== b) {
				c.push(it)
			}
		})
		return Utils.sh(b, c, options)
	}

	static async sh(command: string, args: string[], options?: SpawnSyncOptions): Promise<null> {
		let process = spawn(command, args, {...options, ...{stdio: 'inherit'}})
		return new Promise<any>((resolve, reject) => {
			process.on('exit', (code)=>{
				code==0 ? resolve() : reject()
			})
		})
	}

	static async dir_sh(location: 'android' | 'ios' | 'root', command: string): Promise<null> {
		let pwd = Utils.pwd()
		switch(location) {
			case 'android':
			case 'ios':
				if (pwd.endsWith(`${location}`)) {
					return Utils.sh_2(command)
				} else if (pwd.includes(`/${location}/`)) {
					let a = pwd.split('/').length-1
					let b = pwd.split('/').findIndex(it=>{return it===location})
					let c = a-b
					let d = ''
					for (let i=0; i<c; i++) {
						d+='../'
					}
					return Utils.sh_2(command, {cwd:`${d}`})
				} else {
					return Utils.sh_2(command, {cwd:`${location}`})
				}
				break
			case 'root':
				if (pwd.includes('/android') || pwd.includes('/ios')) {
					let a = pwd.split('/').length-1
					let b = pwd.split('/').findIndex(it=>{return it==='android' || it==='ios'})
					let c = a-b
					let d = ''
					for (let i=0; i<=c; i++) {
						d+='../'
					}
					return Utils.sh_2(command, {cwd:`${d}`})
				} else {
					return Utils.sh_2(command, {})
				}
				break
			default:
				throw Error(`Invalid location type: ${location}`)
		}
	}
}
