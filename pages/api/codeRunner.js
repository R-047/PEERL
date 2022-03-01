const { exec } = require("child_process");
import fs from "fs"
import path from "path";
import shortUUID from 'short-uuid'
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig()
const { ROOT_DIR } = publicRuntimeConfig


export default async function handler(req, res) {
	if (req.method == 'POST') {
		const language = req.body.language;
		const code = req.body.code
		const result = await ExecCode(language, code)
		console.log(result)
		
		res.status(200).json({ data: result })




	} else {
		res.status(400).json({ method: 'POST ONLY' })
	}





}


const ExecCode = (lang, stub) => {
	return new Promise(async (res, rej) => {
		let result = undefined
		switch (lang) {
			case "javascript":
				result = await handleFile("node", "js", stub)
				res(result)
				break;
			case "python":
				result = await handleFile("python", "py", stub)
				res(result)
				break;
			case "typescript":
				console.log("typescript", code)
				break;
			default:
				res(result)
		}
	})

}

const handleFile = (command, ext, code) => {
	return new Promise((res, rej) => {
		const code_path = path.join(ROOT_DIR, "stubs", `${shortUUID().new()}.${ext}`)
		var writeStream = fs.createWriteStream(code_path);
		writeStream.write(code);
		writeStream.end();
		exec(`${command} ${code_path}`, (error, stdout, stderr) => {

			const exec_obj = {
				stdout: stdout,
				stderr: stderr,
				err: error
			}
			res(exec_obj)
			fs.unlink(code_path, (err) => {
				if (err) throw err;
				console.log('path/file.txt was deleted');
			})
		});
	})

}