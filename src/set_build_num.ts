import Arg from './lib/Arg'
import Project from './lib/Project'
import Tools from './lib/Tools'

export function set_build_num(): void {
	let project_name: string            = Arg.v_null('project_name') || Tools.project_name_from_package()
	let gradle_path: string 			= Arg.v_null('gradle_path') || 'android/app/build.gradle'
	let src: string | undefined 		= Arg.v_enum_null('src', ['git', 'time'])
	let platform: string 				= Arg.v_enum_null('platform', ['android', 'ios', 'both']) || 'both'
	let offset: number | undefined 		= Arg.v_number_null('offset')
	let base_num: number | undefined	= Arg.v_number_null('base_num')

	let build_number: number
	if ('git' === src)  		build_number = Tools.version_from_git('develop', offset)
	else if ('time' === src) 	build_number = Tools.version_from_epoch(offset)
	else 							build_number = Arg.v_number('num')
	if (base_num) 					build_number += base_num

	if (platform !== 'ios') {
		Project.write_gradle(gradle_path, build_number, undefined)
	}
	if (platform !== 'android') {
		Project.write_xcode(project_name, build_number, undefined)
	}
}
