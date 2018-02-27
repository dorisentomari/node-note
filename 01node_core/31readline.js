const readline = require('readline');
const fs = require('fs');
let file = fs.createReadStream('./fs.js');
let out = fs.createWriteStream('./anotherFs.js');
let index = 1;
out.write('/*line' + index.toString() + ": */");
let rl = readline.createInterface({
	input: file,
	output: out,
	terminal: true
});
rl.on('line', (line) => {
	if (line === '') {
		rl.close();
	} else {
		index++;
		out.write('/*line' + index.toString() + ': */');
	}
});