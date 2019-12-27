import Arg from './lib/Arg'
import {post} from './lib/Discord'

export async function notify(): Promise<void> {
	let title = Arg.v('title')
	let description = Arg.v_null('descr')
	let status = Arg.v_enum_null('status', ['success', 'error']) as 'success' | 'error'
	let url = Arg.v_null('url')
	let fields = Arg.v_json_null('fields')

	await post({
		title,
		description,
		status,
		url,
		fields
	})
}
