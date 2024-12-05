import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
	input: "src/editor.mjs",
	output: {
		file: "editor.bundle.js",
		format: "iife"
	},
	context: "window",
	plugins: [nodeResolve(), commonjs(), json()]
};