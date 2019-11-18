import Utils from './utils'

async function build_with_password(password: string) {
	await Utils.dir_sh('root', 'npx jetify')
	await Utils.dir_sh('android', `./gradlew clean bundleRelease -Ppassword=${password}`)
}

(async function() {
	try {
		let password: string = Utils.argv('password')
		await build_with_password(password)
		process.exit(0)
	} catch(e) {
		console.log('ERROR: ' + e.message)
		process.exit(1)
	}
}())

