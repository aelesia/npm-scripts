import Build from './lib/Build'
import Arg from './lib/Arg';

export async function build_android(): Promise<void> {
	let params: object | undefined = Arg.v_json_null('params')
	let type: any = Arg.v_enum('type', ['apk', 'aab']) // HACK: Should not be 'any'

	await Build.android({params, type})
}

