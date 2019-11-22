import Utils from './lib/utils'
import Build from './lib/build'

(async function() {
	try {
		let password: string = Utils.argv('password')

		await Build.build_bundle(password)
		process.exit(0)
	} catch(e) {
		if (e) {
			console.log('ERROR: ' + e.message)
		}
		process.exit(1)
	}
}())

