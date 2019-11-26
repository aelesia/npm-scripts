import * as fs from 'fs'
import Utils from './lib/utils'
import Project from './lib/project'
import Tools from './lib/tools'

const { spawnSync } = require('child_process')

try {
	let xcode_path: string = Utils.argv_null('xcode_path') || Project.find_xcode_proj()
	let gradle_path: string = Utils.argv_null('gradle_path') || 'android/app/build.gradle'
	let build_src: string | undefined = Utils.argv_enum_null('build_src', ['git'])
	let version_src: string | undefined = Utils.argv_enum_null('version_src', ['package.json'])
	let build_number: number | undefined
	let version_name: string | undefined
	let platform: string | undefined = Utils.argv_enum_null('platform', ['android', 'ios', 'both']) || 'both'
	let version_suffix: string | undefined = Utils.argv_null('version_suffix')


	build_number = (build_src === 'git') ? Tools.version_from_git() : Utils.argv_number_null('build_number')
	version_name = (version_src === 'package.json') ? Tools.version_from_package() : Utils.argv_null('version_name')
	version_name = version_suffix ? `${version_name}-${version_suffix}` : version_name

	if (platform !== 'ios') {
		Project.write_gradle(gradle_path, build_number, version_name)
	}
	if (platform !== 'android') {
		Project.write_xcode(xcode_path, build_number, version_name)
	}
	process.exit(0)
} catch(e) {
	// console.error(e.stack)
	console.error('ERROR: ' + e.message)
	process.exit(1)
}
