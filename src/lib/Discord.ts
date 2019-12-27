import Shell from './Shell'

type DiscordParams = {
	title: string,
	description?: string,
	url?: string,
	status?: 'success' | 'error'
	fields?: object
}

export async function post(params: DiscordParams) {
	let message = {embeds:[{
		title: params.title,
		description: params.description,
		url: params.url,
		color: map_color(params.status),
		fields: map_fields(params.fields)
	}]}
	await Shell.sh('curl', [
		'https://discordapp.com/api/webhooks/632141374677975040/T1mbOgMpZjDztn4HWsmAd00soCQM1KblgbMsfRpayVFvm16IVsMT4LQTPY_Lo4-rO4kI',
		'-F',
		`payload_json=${JSON.stringify(message)}`])
}

function map_fields(fields: any): {name:string, value:string}[] {
	if (!fields) return []
	return Object.keys(fields).map(k=> {
		return {
			name: k,
			value: fields[k]
		}
	})
}

function map_color(status?: 'success' | 'error'): number {
	if ('success' === status) {
		return 3066993
	} else if ('error' === status) {
		return 15158332
	}
	return 7374810
}
