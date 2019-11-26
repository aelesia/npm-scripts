import {spawn, spawnSync, SpawnSyncOptions, SpawnSyncReturns} from 'child_process'
import Shell from "./Shell"

export default class Build {
	static async build_apk(password: string) {
		// await Shell.dir_sh('root', 'npx jetify')
		// await Shell.dir_sh('android', `./gradlew clean assembleRelease -Ppassword=${password}`)
	}

	static async build_bundle(password: string) {
		// await Shell.dir_sh('root', 'npx jetify')
		// await Shell.dir_sh('android', `./gradlew clean bundleRelease -Ppassword=${password}`)
		await Shell.sh_2('./gradlew clean bundleRelease -Ppassword=${password}', {cwd:Shell.find_path('android')})
	}
}
