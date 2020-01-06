import Build from './lib/Build'
import Arg from './lib/Arg'
import Shell from './lib/Shell'
import Tools from './lib/Tools'
import {spawnSync} from 'child_process'

export async function commit_all(): Promise<void> {
	let email = Arg.v_null('email') || 'actions@github.com'
	let name = Arg.v_null('name') || 'Github Actions'
	let message = Arg.v_null('message') || ''
	let repo = Arg.v('repo')
	let branch = Arg.v('branch')

	await commit(email, name, message, repo, branch)
}

export async function commit_tag(): Promise<void> {
	let email = Arg.v_null('email') || 'actions@github.com'
	let name = Arg.v_null('name') || 'Github Actions'
	let message = Arg.v_null('message') || ''
	let _tag = Arg.v('tag')
	let repo = Arg.v('repo')

	await tag(email, name, _tag, message, repo)
}

async function commit(email: string, name: string, message: string, repo: string, branch: string): Promise<void> {
	let has_commits = Shell.sh_s('git', ['diff-index', 'HEAD'])
	if (has_commits) {
		await Shell.sh_2(`git config user.email ${email}`)
		await Shell.sh_2(`git config user.name "${name}"`)
		await Shell.sh('git', ['commit', '-m', message, '-a'])
		await Shell.sh('git', ['push', repo, `HEAD:${branch}`])
		console.log(`Committed to ${branch}`)
	} else {
		console.log('No changes to commit')
	}
}

async function tag(email: string, name: string, tag: string, message: string, repo: string): Promise<void> {
	await Shell.sh_2(`git config user.email ${email}`)
	await Shell.sh_2(`git config user.name "${name}"`)
	await Shell.sh('git', ['tag', '-a', tag, '-m', message])
	await Shell.sh('git', ['push', repo, tag])
	console.log(`Committed tag: ${tag}`)
}

