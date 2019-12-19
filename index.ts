#!/usr/bin/env node
import Arg from './src/lib/Arg'
import {increment} from './src/increment'

try {
	let command = Arg.v_first_enum(['increment', 'build_android'])
	if ('increment' === command) {
		increment()
	} else if ('build_android' === command) {
		throw Error('NotImplementedException')
	} else {
		throw Error('IllegalStateException: No command found, should have been validated already')
	}
} catch (e) {
	console.error('ERROR: ' + e.stack)
	process.exit(1)
}
