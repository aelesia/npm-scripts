import Arg from './lib/Arg'
import * as fs from 'fs'
import Shell from './lib/Shell'

export function replace_files(): void {
	let path: string = 	Arg.v('path')

	parse(path).forEach(it=> {
		if (it[0] && it[1])
			replace(it[0], it[1])
	})
}

function parse(path: string): [string, string][] {
	let file = fs.readFileSync(path, 'utf-8')
	let row = file.trim().split('\n')
	return row.map(it => {
		let files = it.split(/[ ]*=>[ ]*/g)
		if (files.length!==2)
			throw Error(`Invalid syntax in ${path}. Please use the format "file1 => file2"`)
		return [files[0], files[1]]
	})
}

function replace(file1: string, file2: string): void {
	console.log(`Copying ${file1} into ${file2}`)
	Shell.sh_s('cp', ['--', file1, file2])
}
