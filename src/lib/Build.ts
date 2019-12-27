import {spawn, spawnSync, SpawnSyncOptions, SpawnSyncReturns} from 'child_process'
import Shell from './Shell'

interface Options {
	type: 'apk' | 'aab'
	params?: object
}

export default class Build {
	static async android(opt: Options) {
		await Shell.dir_sh('root', 'npx jetifier')
		await Shell.sh_2(`./gradlew clean ${this.parse_type(opt.type)}Release${this.parse_gradle_params(opt.params)}`,
			{cwd:Shell.find_path('android')})
	}

	/*______________________________________________________________________*/

	private static parse_type(type: string): string {
		if ('apk'===type.toLowerCase()) return 'build'
		else if ('aab'===type.toLowerCase()) return 'assemble'
		else throw Error(`IllegalArgumentException: ${type} is not valid`)
	}

	private static parse_gradle_params(params?: object): string {
		let str = ''
		if (params==null) return str
		Object.keys(params).forEach(key => {
			// @ts-ignore
			let value = params[key]
			str+= ` -P${key}=${value}`
		})
		return str
	}
}
