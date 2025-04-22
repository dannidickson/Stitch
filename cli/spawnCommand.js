import { spawn } from 'child_process';

const spawnCommand = async (command, args, spawnOptions) => {
    return new Promise((resolve, reject) => {
        const commandAsString = [command, ...args].toString();
        console.log(color.blue(`Running: ${commandAsString}`));

        const outputStream = spawn(command, [...args], spawnOptions);

        outputStream.stdout.on('data', data => {
            stream.info(data.toString());
        });

        outputStream.stderr.on('data', (data) => {
            stream.info(data.toString());
        });

        outputStream.on('close', (code) => {
            if (code !== 0) {
                outro(`Failed on ${commandAsString}`);
                process.exit(1);
            }
            resolve();
        });
    })
}

export default spawnCommand;