import Arg from './lib/Arg'
import Project from './lib/Project'
import Tools from './lib/Tools'

export function set_ver_name(): void {
	let xcode_path: string 			= 	Arg.v_null('xcode_path') || Project.find_xcode_proj()
	let gradle_path: string 		= 	Arg.v_null('gradle_path') || 'android/app/build.gradle'
	let platform: string 			= 	Arg.v_enum_null('platform', ['android', 'ios', 'both']) || 'both'
	let src: string | undefined 	= 	Arg.v_enum_null('src', ['package.json'])
	let suffix: string | undefined 	= 	Arg.v_null('suffix')

	let ver_name: string | undefined = (src === 'package.json') ?
		Tools.version_from_package() : Arg.v('name')
	if (suffix) ver_name = `${ver_name}-${suffix}`

	if (platform !== 'ios') {
		Project.write_gradle(gradle_path, undefined, ver_name)
	}
	if (platform !== 'android') {
		Project.write_xcode(xcode_path, undefined, ver_name)
	}
}
