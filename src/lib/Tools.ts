import Arg from './Arg'
import * as fs from 'fs'
import Shell from './Shell'

export default class Tools {
	/**
	 * @experimental Calculates and returns a version number based on git commits
	 */
	static version_from_git(head: string, offset?: number): number {
		let total_commits = Shell.sh_i('git', ['rev-list', '--count', 'HEAD'])
		let branch_commits_from_dev = Shell.sh_i('git', ['rev-list', '--count', `${head}..HEAD`])
		let dev_commits = total_commits - branch_commits_from_dev
		return (dev_commits * 1000 + branch_commits_from_dev) + (offset ?? 0)
	}

	/**
	 * Calculates and returns a version number based on epoch timestamp / 10
	 *   Note: Timestamp is divided by 10 to extend usage until year 2600 due to Android maximum BUILD_NUMBER = 2.1B
	 *         This means that 2 parallel builds may conflict if they start within 10 seconds of one another
	 */
	static version_from_epoch(offset?: number): number {
		return (new Date().getTime() / 1000 / 10) + (offset ?? 0)
	}

	/**
	 * Returns the version string defined in package.json: {"version": "x.y.z"}
	 */
	static version_from_package(): string {
		let file = fs.readFileSync('package.json', 'utf-8')
		let pkg = JSON.parse(file)
		if (!pkg.version) {
			throw Error('No version defined in package.json')
		}
		return pkg.version
	}

	static project_name_from_package(): string {
		let file = fs.readFileSync('package.json', 'utf-8')
		let pkg = JSON.parse(file)
		if (!pkg.name) {
			throw Error('No project name defined in package.json')
		}
		return pkg.name
	}

}
