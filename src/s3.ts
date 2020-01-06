import Build from './lib/Build'
import Arg from './lib/Arg'
import AWS from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'
import * as fs from 'fs'
import Shell from './lib/Shell'
import * as crypto from 'crypto'

export async function upload(): Promise<void> {
	let access_key = Arg.v('access_key')
	let secret = Arg.v('secret')
	let bucket_name = Arg.v('bucket_name')
	let file_path = Arg.v('file_path')

	let url = await s3_upload(access_key, secret, bucket_name, file_path)
	await Shell.sh_2(`echo ${url}`)
}

function s3_upload(access_key: string, secret: string, bucket_name: string, file_path: string): Promise<string> {
	return new Promise((res, rej) => {
		const file_content = fs.readFileSync(file_path)
		let file_name = generate_file_name(file_path)
		let bucket  = new S3({
			accessKeyId: access_key,
			secretAccessKey: secret
		})
		bucket.upload({
			Bucket: bucket_name,
			Key: file_name,
			Body: file_content,
			ACL: 'public-read'
		}, (err, data) => {
			if (err) rej(err)
			else res(data.Location)
		})
	})
}

function generate_file_name(file_path: string): string {
	return (file_path.split('/').pop() as string).replace('.', '-') + '-' + crypto.randomBytes(32).toString('hex')
}
