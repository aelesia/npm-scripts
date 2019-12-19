import Build from './lib/Build'
import Arg from './lib/Arg';

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


function build_android(): void {

}
