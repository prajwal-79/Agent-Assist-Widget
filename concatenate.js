const fs = require('fs-extra');
const concat = require('concat');
 
(async function build() {
    const files = [
        './dist/agent-assist/runtime.js',
        './dist/agent-assist/polyfills.js',
        './dist/agent-assist/main.js',
    ]
 
await fs.ensureDir('dist/agent-assist/elements')
await concat(files, 'dist/agent-assist/elements/agent-assist.js');
await fs.copyFile('./dist/agent-assist/styles.css', 'dist/agent-assist/elements/styles.css')
})()