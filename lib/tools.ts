import Utils from './utils'
import * as fs from 'fs'

export default class Tools {
	static version_from_git(): number {
		let total_commits = Utils.sh_i('git', ['rev-list', '--count', 'HEAD'])
		let branch_commits_from_dev = Utils.sh_i('git', ['rev-list', '--count', 'origin/develop..HEAD'])
		let dev_commits = total_commits - branch_commits_from_dev
		return dev_commits * 1000 + branch_commits_from_dev
	}

	static version_from_package(): string {
		let file = fs.readFileSync('package.json', 'utf-8')
		let pkg = JSON.parse(file)
		if (!pkg.version) {
			throw Error('No version defined in package.json')
		}
		return pkg.version
	}
}
