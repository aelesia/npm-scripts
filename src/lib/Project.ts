import * as fs from 'fs'
import Shell from './Shell'

export default class Project {
	static write_gradle(file_path: string, build_number?: number, version_name?: string) {
		let original = fs.readFileSync(file_path, 'utf-8')
		let file = original

		if (build_number)
			file = file.replace(/versionCode ([\d]+)?/g, `versionCode ${build_number}`)
		if (version_name)
			file = file.replace(/versionName (("[\d\.\w-]*)+)?/g, `versionName "${version_name}"`)
		fs.writeFileSync(file_path, file, 'utf-8')

		if (original !== file) {
			fs.writeFileSync(file_path, file, 'utf-8')
			console.log(`Updated ${file_path} -`
				+ (build_number ? ' versionCode:' + build_number : '')
				+ (version_name ? ' versionName:' + version_name : '')
			)
		}
	}

	static write_xcode(project_name: string, build_number?: number, version_name?: string) {
		let info_files_path = Project.find_all_info_plist_paths(project_name)
		let project_path = Project.find_xcode_proj(project_name)

		info_files_path.forEach(file_path=>{
			this.write_xcode_info(file_path, build_number, version_name)
		})
		this.write_xcode_project(project_path, build_number, version_name)
	}

	private static write_xcode_project(file_path: string, build_number?: number, version_name?: string) {
		let original = fs.readFileSync(file_path, 'utf-8')
		let file = original

		if (build_number)
			file = file.replace(/CURRENT_PROJECT_VERSION = .*;/g, `CURRENT_PROJECT_VERSION = ${build_number};`)
		if (version_name)
			file = file.replace(/MARKETING_VERSION = .*;/g, `MARKETING_VERSION = ${version_name};`)

		if (original !== file) {
			fs.writeFileSync(file_path, file, 'utf-8')
			console.log(`Updated ${file_path} -`
				+ (build_number ? ' CURRENT_PROJECT_VERSION:' + build_number : '')
				+ (version_name ? ' MARKETING_VERSION:' + version_name : '')
			)
		}
	}

	private static write_xcode_info(file_path: string, build_number?: number, version_name?: string) {
		let original = fs.readFileSync(file_path, 'utf-8')
		let file = original

		if (build_number)
			file = Project.set_plist_string(file, 'CFBundleVersion', build_number.toString())
		if (version_name)
			file = Project.set_plist_string(file, 'CFBundleShortVersionString', version_name)

		if (original !== file) {
			fs.writeFileSync(file_path, file, 'utf-8')
			console.log(`Updated ${file_path} - `
				+ (build_number ? ' CFBundleVersion:' + build_number : '')
				+ (version_name ? ' CFBundleShortVersionString:' + version_name : '')
			)
		}
	}

	private static find_all_info_plist_paths(project: string): string[] {
		let paths = Shell.sh_array('find', [`ios/${project}*`, '-type', 'f', '-name', 'Info.plist'], {shell:true})
		if (paths.length!=0)
			return paths
		throw Error(`XCode Info.plist cannot be located at ios/${project}. Please specify with the params "project_name:[name]"`)
	}

	static find_xcode_proj(project: string): string {
		let path = Shell.sh_s('find', [`ios/${project}*`, '-type', 'f', '-name', 'project.pbxproj'], {shell:true})
		if (path.includes('project.pbxproj'))
			return path
		throw Error(`XCode project.pbxproj cannot be located at ios/${project}. Please specify with the params "project_name:[name]"`)
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
