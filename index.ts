import * as fs from 'fs'
import Utils from './utils'

const { spawnSync } = require('child_process')


// spawnSync('git', ['clone', url, `${process.cwd()}/${appName}`]);
// spawnSync('echo', ['hello'])
// spawnSync('mkdir', ['heheheehehe'])

// const appName = process.argv[2];
// console.log(process.argv[0])
// console.log(process.argv[1])
// console.log(process.argv[2])


function write_gradle(file_path: string, build_number: number, version_name: string) {
	let file =
		fs.readFileSync(file_path, 'utf-8')
			.replace(/versionCode ([\d]+)?/g, `versionCode ${build_number}`)
			.replace(/versionName (("[\d\.\w]*)+)?/g, `versionName "${version_name}"`)
	fs.writeFileSync(file_path, file, 'utf-8')
}

function write_xcode(file_path: string, build_number: number, version_name: string) {
	let file =
		fs.readFileSync(file_path, 'utf-8')
			.replace(/CURRENT_PROJECT_VERSION = .*;/g, `CURRENT_PROJECT_VERSION = ${build_number};`)
			.replace(/MARKETING_VERSION = .*;/g, `MARKETING_VERSION = ${version_name};`)
	fs.writeFileSync(file_path, file, 'utf-8')
}

try {
	let xcode_path: string = Utils.argv('xcode_path')
	let gradle_path: string = Utils.argv_null('gradle_path') || 'android/app/build.gradle'
	let version_name: string = Utils.argv('version_name')
	let build_number: number = Utils.argv_number('build_number')

	write_xcode(xcode_path, build_number, version_name)
	write_gradle(gradle_path, build_number, version_name)
	console.log(`Updated xcode & gradle with [build_number: ${build_number}, version_name: ${version_name}]`)
	process.exit(0)
} catch(e) {
	console.error('ERROR: ' + e.message)
	process.exit(1)
}
