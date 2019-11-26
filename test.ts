import * as fs from 'fs'
import Utils from './lib/utils'
import Project from "./lib/project"
import Tools from "./lib/tools"


function find_path(relative_path: string) {
	let pwd = Utils.pwd()

	// Scenario 1: Path exists in pwd
	if (pwd.includes(relative_path)) {
		// 1A: Path is latest path
		if (pwd.endsWith(relative_path)) {
			return '.'
		// 1B: Path is in the path somewhere
		} else {

		}
	}
	// Scenario 2:
	else {

	}
		// 2A Path exists in current path
	  // 2B Path doesn't exist in current path
}

const { spawnSync } = require('child_process')
try {
	// let xcode_path: string = Project.find_xcode_proj()
	// let gradle_path: string = Utils.argv_null('gradle_path') || 'android/app/build.gradle'
	// let version_name: string | undefined = Utils.argv_null('version_name')
	// let build_number: number | undefined = Utils.argv_number_null('build_number')
	find_path()
	console.log(Tools.version_from_package())
	process.exit(0)
} catch(e) {
	// console.error(e.stack)
	console.error('ERROR: ' + e.message)
	process.exit(1)
}
