#!/usr/bin/env node

import Arg from './lib/Arg'
import Project from './lib/Project'
import Tools from './lib/Tools'
import {increment} from "./src/increment";

try {
	let command = Arg.command_enum(['increment', 'build_android'])
	if ('increment' === command) {
		increment()
	} else if ('build_android' === command) {

	} else {
		throw Error('IllegalStateException: No command found, should have been validated already')
	}
} catch (e) {
	console.error('ERROR: ' + e.stack)
	process.exit(1)
}
