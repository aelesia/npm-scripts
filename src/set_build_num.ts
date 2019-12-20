import Arg from './lib/Arg'
import Project from './lib/Project'
import Tools from './lib/Tools'

export function set_build_num(): void {
	let xcode_path: string 				= Arg.v_null('xcode_path') || Project.find_xcode_proj()
	let gradle_path: string 			= Arg.v_null('gradle_path') || 'android/app/build.gradle'
	let build_src: string | undefined 	= Arg.v_enum_null('src', ['git', 'time'])
	let platform: string 				= Arg.v_enum_null('platform', ['android', 'ios', 'both']) || 'both'
	let base_num: number | undefined	= Arg.v_number_null('base_num')

	let build_number: number
	if ('git' === build_src)  		build_number = Tools.version_from_git('develop')
	else if ('time' === build_src) 	build_number = Tools.version_from_epoch()
	else 							build_number = Arg.v_number('num')
	if (base_num) 					build_number += base_num

	if (platform !== 'ios') {
		Project.write_gradle(gradle_path, build_number, undefined)
	}
	if (platform !== 'android') {
		Project.write_xcode(xcode_path, build_number, undefined)
	}
}
