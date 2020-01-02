import Build from './lib/Build'
import Arg from './lib/Arg'
import Shell from './lib/Shell'
import Tools from './lib/Tools'

export async function get_build_number(): Promise<void> {
	let build_no = Tools.version_from_git('origin/develop').toString()
	await Shell.sh_2(`echo ${build_no}`)
}

export async function get_version_name(): Promise<void> {
	let version_name = Tools.version_from_package().toString()
	await Shell.sh_2(`echo ${version_name}`)
}
