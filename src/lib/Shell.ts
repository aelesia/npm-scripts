import {spawn, spawnSync, SpawnSyncOptions, SpawnSyncReturns} from 'child_process'

export default class Shell {

	/**
	 * Executes shell command and returns output as a string
	 * Also removes trailing newline.
	 */
	static sh_s(command: string, args?: string[], options?: SpawnSyncOptions): string {
		return spawnSync(command, args, options).stdout.toString().replace('\n', '')
	}

	static echo(text: string): void {
		spawnSync('echo', ['text'])
	}

	/**
	 * Executes shell command and returns each line output as part of a string array
	 * Also removes last line
	 */
	static sh_array(command: string, args?: string[], options?: SpawnSyncOptions): string[] {
		let array = spawnSync(command, args, options).stdout.toString().split('\n')
		array.pop()
		return array
	}

	/**
	 * Executes shell command and returns output as a number
	 */
	static sh_i(command: string, args?: string[], options?: SpawnSyncOptions): number {
		return parseInt(spawnSync(command, args, options).stdout.toString())
	}

	/**
	 * Returns the current directory as a string
	 */
	static pwd(): string {
		return this.sh_s('pwd')
	}

	/**
	 * @experimental
	 * Similar to sh() but arguments are sent together as one combined string instead of an array
	 */
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

	/**
	 * Executes an async shell command while piping output to std:io
	 */
	static async sh(command: string, args: string[], options?: SpawnSyncOptions): Promise<null> {
		let process = spawn(command, args, {...options, ...{stdio: 'inherit'}})
		return new Promise<any>((resolve, reject) => {
			process.on('exit', (code)=>{
				code==0 ? resolve() : reject(new Error('Process exited with code!=0'))
			})
		})
	}

	/**
	 * @deprecated - Please don't use this
	 */
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

	/**
	 * @deprecated - Please don't use this
	 * Passes in a relative path and attempts to locate it by searching current directory, child directory, or ancestors
	 */
	static find_path(relative_path: string): string {
		let pwd = Shell.pwd()

		if (relative_path === '(root)') {
			let nested = pwd.split('/').length
			for (let i=0; i<nested; i++) {
				let cwd = '.' + '/..'.repeat(i)
				if (this.is_root_node_dir({cwd})) {
					let a = pwd.split('/')
					let b = ''
					for (let j=0; j<nested-i; j++) {
						b += a[j] + '/'
					}
					b = b.slice(0, b.length-1)
					return b
				}
			}
			throw Error(`Unable to locate package.json in ancestors of '${pwd}'`)
		}

		else if (pwd.includes(relative_path)) {
			if (pwd.endsWith(relative_path)) {
				return pwd
			} else {
				let start = pwd.indexOf(relative_path)
				let end = start+relative_path.length
				return pwd.slice(0, end)
			}
		}

		else {
			if (spawnSync('test', ['-d', relative_path]).status === 0) {
				return pwd + '/' + relative_path
			} else {
				throw Error(`Path: '${relative_path}' cannot be found in '${pwd}'`)
			}
		}
	}

	/**
	 * Returns true if this is the root of a node directory
	 * (root node directories are determined by the presence of package.json)
	 */
	static is_root_node_dir(options?: SpawnSyncOptions): boolean {
		return spawnSync('test', ['-f', 'package.json'], options).status === 0
	}
}
