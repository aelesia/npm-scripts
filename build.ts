import Utils from './utils'

async function build_apk(password: string) {
	await Utils.dir_sh('root', 'npx jetify')
	await Utils.dir_sh('android', `./gradlew clean assembleRelease -Ppassword=${password}`)
}

async function build_bundle(password: string) {
	await Utils.dir_sh('root', 'npx jetify')
	await Utils.dir_sh('android', `./gradlew clean bundleRelease -Ppassword=${password}`)
}

(async function() {
	try {
		let password: string = Utils.argv('password')

		await build_bundle(password)
		process.exit(0)
	} catch(e) {
		if (e) {
			console.log('ERROR: ' + e.message)
		}
		process.exit(1)
	}
}())

