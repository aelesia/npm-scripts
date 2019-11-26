import * as fs from 'fs'
import Arg from './lib/Arg'
import Shell from "./lib/Shell"

const { spawnSync } = require('child_process')

function version_from_git(): number {
	let total_commits = Shell.sh_i('git', ['rev-list', '--count', 'HEAD'])
	let branch_commits_from_dev = Shell.sh_i('git', ['rev-list', '--count', 'origin/develop..HEAD'])
	let dev_commits = total_commits - branch_commits_from_dev
	return dev_commits*1000 + branch_commits_from_dev
}

try {
	// let xcode_path: string = Utils.argv('xcode_path')

	process.exit(0)
} catch(e) {
	console.error('ERROR: ' + e.message)
	process.exit(1)
}
