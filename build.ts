import Arg from './lib/Arg'
import Build from './lib/Build'

(async function() {
	try {
		let password: string = Arg.v('password')

		await Build.build_bundle(password)
		process.exit(0)
	} catch(e) {
		if (e) {
			console.log('ERROR: ' + e.message)
		}
		process.exit(1)
	}
}())

