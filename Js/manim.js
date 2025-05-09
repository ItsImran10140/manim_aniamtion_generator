const { spawn } = require('child_process');
const path = require('path');

function generateManimVideo() {
    return new Promise((resolve, reject) => {
        const pythonPath = process.platform === 'win32'
            ? path.join('python_env', 'Scripts', 'python')
            : path.join('python_env', 'bin', 'python');

        const manimProcess = spawn(pythonPath, [
            '-m', 'manim',
            '-ql',  // Medium quality
            path.join('python_scripts', 'text_manim.py'),
            'CreateCircle',
            // Output file
        ]);

        let output = '';

        manimProcess.stdout.on('data', (data) => {
            output += data.toString();
            console.log(`MANIM: ${data}`);
        });

        manimProcess.stderr.on('data', (data) => {
            console.error(`ERROR: ${data}`);
        });

        manimProcess.on('close', (code) => {
            if (code === 0) {
                const match = output.match(/File ready at (.*\.mp4)/);
                resolve(match ? match[1] : 'Video generated (path not found)');
            } else {
                reject(`Manim process exited with code ${code}`);
            }
        });
    });
}

// Run the animation
generateManimVideo()
    .then(videoPath => console.log('Video generated at:', videoPath))
    .catch(err => console.error('Error:', err));