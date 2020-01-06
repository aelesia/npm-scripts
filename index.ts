#!/usr/bin/env node
import Arg from './src/lib/Arg'
import {build_android} from './src/build_android'
import {set_ver_name} from './src/set_ver_name'
import {set_build_num} from './src/set_build_num'
import {replace_files} from './src/replace_files'
import {discord} from './src/discord'
import {test} from './src/test'
import {get_build_number, get_version_name} from './src/tools'
import {upload} from './src/s3'
import {commit_all, commit_tag} from './src/git';

(async function() {	try {

	let command = Arg.v_first_enum(['build_android', 'set_ver_name', 'set_build_num', 'replace_files', 'discord', 'get_version_name', 'get_build_no', 'test', 'upload', 'commit_all', 'commit_tag'])
	if ('build_android' === command) {
		await build_android()
	} else if ('set_ver_name' === command) {
		set_ver_name()
	} else if ('set_build_num' === command) {
		set_build_num()
	} else if ('replace_files' === command) {
		replace_files()
	} else if ('discord' === command) {
		await discord()
	} else if ('get_build_no' === command) {
		await get_build_number()
	} else if ('get_version_name' === command) {
		await get_version_name()
	} else if ('upload' === command) {
		await upload()
	} else if ('commit_all' === command) {
		await commit_all()
	} else if ('commit_tag' === command) {
		await commit_tag()
	} else if ('test' === command) {
		await test()
	} else {
		throw Error('IllegalStateException: No command found, should have been validated already')
	}

} catch (e) {
	console.error((e?.name ?? 'Error') + ': ' + e?.message)
	process.exit(1)
}}())
