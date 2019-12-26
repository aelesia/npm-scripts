#!/usr/bin/env node
import Arg from './src/lib/Arg'
import {build_android} from './src/build_android'
import {set_ver_name} from './src/set_ver_name'
import {set_build_num} from './src/set_build_num';
import {replace_files} from "./src/replace_files";
import {post} from "./src/lib/Discord";

(async function() {	try {

	let command = Arg.v_first_enum(['increment', 'set_ver_name', 'set_build_num', 'replace_files', 'discord'])
	if ('build_android' === command) {
		await build_android()
	} else if ('set_ver_name' === command) {
		set_ver_name()
	} else if ('set_build_num' === command) {
		set_build_num()
	} else if ('replace_files' === command) {
		replace_files()
	} else if ('discord' === command) {
		await post({title:'test title', description:'test description', status:'error', url:'https://www.google.com', fields:{param1:'a', param2:'b', param3:true, param4:0}})
	} else {
		throw Error('IllegalStateException: No command found, should have been validated already')
	}

} catch (e) {
	console.error(e.message)
	process.exit(1)
}}())
