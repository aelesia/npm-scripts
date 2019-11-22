import {spawn, spawnSync, SpawnSyncOptions, SpawnSyncReturns} from 'child_process'
import Utils from "./utils"

export default class Build {
	static async build_apk(password: string) {
		await Utils.dir_sh('root', 'npx jetify')
		await Utils.dir_sh('android', `./gradlew clean assembleRelease -Ppassword=${password}`)
	}

	static async build_bundle(password: string) {
		await Utils.dir_sh('root', 'npx jetify')
		await Utils.dir_sh('android', `./gradlew clean bundleRelease -Ppassword=${password}`)
	}
}
