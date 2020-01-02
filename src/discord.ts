import Arg from './lib/Arg'
import {post} from './lib/Discord'

export async function discord(): Promise<void> {
	let webhook = Arg.v('webhook').replace('https://discordapp.com/api/webhooks/', '') //HACK
	let title = Arg.v('title')
	let description = Arg.v_null('descr')
	let status = Arg.v_enum_null('status', ['success', 'error']) as 'success' | 'error'
	let url = Arg.v_null('url')
	let fields = Arg.v_json_null('fields')
	let qr_url = Arg.v_boolean_null('qr_url') || false

	await post({
		webhook,
		title,
		description,
		status,
		url,
		fields,
		qr_url
	})
}
