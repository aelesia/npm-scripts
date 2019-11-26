import * as fs from 'fs'
import Utils from './utils'

export default class Project {
	static write_gradle(file_path: string, build_number?: number, version_name?: string) {
		let file = fs.readFileSync(file_path, 'utf-8')
		if (build_number)
			file = file.replace(/versionCode ([\d]+)?/g, `versionCode ${build_number}`)
		if (version_name)
			file = file.replace(/versionName (("[\d\.\w-]*)+)?/g, `versionName "${version_name}"`)
		fs.writeFileSync(file_path, file, 'utf-8')

		console.log(`Updated ${file_path} -`
			+ (build_number ? ' versionCode:'+build_number : '')
			+ (version_name ? ' versionName:'+version_name : '')
		)
	}

	static write_xcode(file_path: string, build_number?: number, version_name?: string) {
		let file = fs.readFileSync(file_path, 'utf-8')
		if (build_number)
			file = file.replace(/CURRENT_PROJECT_VERSION = .*;/g, `CURRENT_PROJECT_VERSION = ${build_number};`)
		if (version_name)
			file = file.replace(/MARKETING_VERSION = .*;/g, `MARKETING_VERSION = ${version_name};`)
		fs.writeFileSync(file_path, file, 'utf-8')

		console.log(`Updated ${file_path} -`
			+ (build_number ? ' CURRENT_PROJECT_VERSION:'+build_number : '')
			+ (version_name ? ' MARKETING_VERSION:'+version_name : '')
		)
	}

	static find_xcode_proj(): string {
		let path = Utils.sh_s('find', ['ios', '-type', 'f', '-name', 'project.pbxproj'])
		if (path.includes('project.pbxproj'))
			return path
		else
			throw Error('XCode project.pbxproj cannot be located. Please specify with the params "xcode_path:[path]"')
	}
}
