import {spawn, spawnSync, SpawnSyncOptions, SpawnSyncReturns} from 'child_process'

export default class Shell {
	static sh_s(command: string, args?: string[]): string {
		return spawnSync(command, args).stdout.toString().replace('\n', '')
	}

	static sh_i(command: string, args?: string[]): number {
		return parseInt(spawnSync(command, args).stdout.toString())
	}

	static pwd(): string {
		return this.sh_s('pwd')
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
		return this.sh(b, c, options)
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
		let pwd = this.pwd()
		switch(location) {
			case 'android':
			case 'ios':
				if (pwd.endsWith(`${location}`)) {
					return this.sh_2(command)
				} else if (pwd.includes(`/${location}/`)) {
					let a = pwd.split('/').length-1
					let b = pwd.split('/').findIndex(it=>{return it===location})
					let c = a-b
					let d = ''
					for (let i=0; i<c; i++) {
						d+='../'
					}
					return this.sh_2(command, {cwd:`${d}`})
				} else {
					return this.sh_2(command, {cwd:`${location}`})
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
					return this.sh_2(command, {cwd:`${d}`})
				} else {
					return this.sh_2(command, {})
				}
				break
			default:
				throw Error(`Invalid location type: ${location}`)
		}
	}
}
