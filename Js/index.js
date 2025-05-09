const { PythonShell } = require('python-shell');

async function runPythonScript(a, b) {
    const options = {
        mode: 'json',
        pythonPath: process.platform === 'win32'
            ? './python_env/Scripts/python'
            : './python_env/bin/python',
        args: [a, b]
    };

    try {
        const results = await PythonShell.run('./python_scripts/calculate.py', options);
        return results[0]; // python-shell returns results as array
    } catch (err) {
        throw err;
    }
}

// Run the script
(async () => {
    try {
        const result = await runPythonScript(10, 3.5);
        console.log('Python Script Results:');
        console.log(`Sum: ${result.sum}`);
        console.log(`Product: ${result.product}`);
        console.log(`Random Numbers: ${result.numpy_random}`);
    } catch (err) {
        console.error('Error:', err);
    }
})();



// const { spawn } = require('child_process');
// const { pythonShell } = require('python-shell');

// // Run a Python script with arguments
// const pythonProcess = spawn('python', ['./script.py', 'arg1', 'arg2']);

// pythonProcess.stdout.on('data', (data) => {
//     console.log(`Python output: ${data}`);
// });

// pythonProcess.stderr.on('data', (data) => {
//     console.log(`Python error: ${data}`);
// });

// // Handle process completion
// pythonProcess.on('close', (code) => {
//     console.log(`Python process exited with code ${code}`);
// });

// let options = {
//     mode: 'text',
//     pythonOptions: ['-u'], // get print results in real-time
//     scriptPath: './', // Path to your script
//     args: ['arg1', 'arg2'] // Arguments for the script
// };

// pythonShell.run('script.py', options, function (err, results) {
//     if (err) throw err;
//     console.log('Python script results:', results);
// });