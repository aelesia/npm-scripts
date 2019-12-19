#!/usr/bin/env node

import Arg from './lib/Arg'
import Project from './lib/Project'
import Tools from './lib/Tools'

try {
	let command = Arg.command_enum(['increment', 'build_android'])
	if ('increment' === command) {

	} else if ('build_android' === command) {

	} else if (false) {

	} else {
		throw Error('IllegalStateException: No command found, should have been validated already')
	}
	// console.log(process.argv[2])
	// let xcode_path: string = Arg.v_null('xcode_path') || Project.find_xcode_proj()
	// let gradle_path: string = Arg.v_null('gradle_path') || 'android/app/build.gradle'
	// let build_src: string | undefined = Arg.v_enum_null('build_src', ['git'])
	// let version_src: string | undefined = Arg.v_enum_null('version_src', ['package.json'])
	// let platform: string = Arg.v_enum_null('platform', ['android', 'ios', 'both']) || 'both'
	// let version_suffix: string | undefined = Arg.v_null('version_suffix')
	//
	// let build_number: number | undefined = (build_src === 'git') ?
	// 	Tools.version_from_git('develop') : Arg.v_number_null('build_number')
	// let version_name: string | undefined = (version_src === 'package.json') ?
	// 	Tools.version_from_package() : Arg.v_null('version_name')
	//
	// version_name = version_suffix ? `${version_name}-${version_suffix}` : version_name
	//
	// if (platform !== 'ios') {
	// 	Project.write_gradle(gradle_path, build_number, version_name)
	// }
	// if (platform !== 'android') {
	// 	Project.write_xcode(xcode_path, build_number, version_name)
	// }
} catch (e) {
	console.error('ERROR: ' + e.stack)
	process.exit(1)
}
