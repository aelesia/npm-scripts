import Build from './lib/Build'
import Arg from './lib/Arg'
import Shell from './lib/Shell'
import Tools from './lib/Tools'

export async function get_build_number(): Promise<void> {
	let offset: number | undefined 	= 	Arg.v_number_null('offset')

	let build_no = Tools.version_from_git('origin/develop', offset).toString()
	await Shell.sh_2(`echo ${build_no}`)
}

export async function get_version_name(): Promise<void> {
	let offset: number | undefined 	= 	Arg.v_number_null('offset')

	let version_name = Tools.version_from_package().toString()
	await Shell.sh_2(`echo ${version_name}`)
}
