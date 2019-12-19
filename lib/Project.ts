import * as fs from 'fs'
import Shell from './Shell'

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

	static write_xcode(xcode_path: string, build_number?: number, version_name?: string) {
		let info_files_path = Project.find_all_info_plist_paths()
		info_files_path.forEach(file_path=>{
			this.write_xcode_info(file_path, build_number, version_name)
		})
		this.write_xcode_project(xcode_path, build_number, version_name)
	}

	private static write_xcode_project(file_path: string, build_number?: number, version_name?: string) {
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

	private static write_xcode_info(file_path: string, build_number?: number, version_name?: string) {
		let file = fs.readFileSync(file_path, 'utf-8')
		if (build_number) {
			file = Project.set_plist_string(file, 'CFBundleVersion', build_number.toString())
		}
		if (version_name) {
			file = Project.set_plist_string(file, 'CFBundleShortVersionString', version_name)
		}
		fs.writeFileSync(file_path, file, 'utf-8')
		console.log(`Updated ${file_path}`)
	}

	private static find_all_info_plist_paths(): string[] {
		return Shell.sh_array('find', ['ios', '-type', 'f', '-name', 'Info.plist'])
	}

	static find_xcode_proj(): string {
		let path = Shell.sh_s('find', ['ios', '-type', 'f', '-name', 'project.pbxproj'])
		if (path.includes('project.pbxproj'))
			return path
		else
			throw Error('XCode project.pbxproj cannot be located. Please specify with the params "xcode_path:[path]"')
	}

	private static set_plist_string(str: string, key: string, value: string): string {
		let match = str.match(new RegExp(`<key>${key}<\\/key>[\\n \\t]*<string>[$()\\d\\w.\\-]*<\\/string>`))
		let match_str
		if (!match) {
			throw Error(`Unable to find key: ${key}`)
		} else {
			match_str = match[0]
		}
		let new_str = match_str.replace(/<string>[$()\d\w.-]*<\/string>/g, `<string>${value}</string>`)
		str = str.replace(new RegExp(`<key>${key}<\\/key>[\\n \\t]*<string>[$()\\d\\w.\\-]*<\\/string>`), new_str)
		return str
	}
}
