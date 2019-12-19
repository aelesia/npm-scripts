import * as fs from 'fs'
import Arg from './lib/Arg'
import Project from './lib/Project'
import Tools from './lib/Tools'
import Shell from "./lib/Shell"
import Build from "./lib/Build"


// function find_path(relative_path: string): string {
// 	let pwd = Shell.pwd()
//
// 	if (pwd.includes(relative_path)) {
// 		if (pwd.endsWith(relative_path)) {
// 			return pwd
// 		} else {
// 			let start = pwd.indexOf(relative_path)
// 			let end = start+relative_path.length
// 			return pwd.slice(0, end)
// 		}
// 	}
//
// 	else {
// 		if (spawnSync('test', ['-d', relative_path]).status === 0) {
// 			return pwd + '/' + relative_path
// 		} else {
// 			throw Error(`Path: '${relative_path}' cannot be found in '${pwd}'`)
// 		}
// 	}
// }


(async function() {
	try {
		// let password: string = Arg.v('password')

		// await Build.build_bundle(password)
		// console.log(Shell.find_path('(root)'))
		// console.log(Project.write_xcode(1231231,'2.3.3-release'))
		console.log(Tools.version_from_git())
		process.exit(0)
	} catch(e) {
		console.log('ERROR: ' + e.message)
		process.exit(1)
	}
}())
