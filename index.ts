const scan: Function = async (path: string) => {
    const fs = require('fs');
    const pathModule = require('path');

    const files: string[] = [];

    const scanDirectory = (dir: string) => {
        fs.readdirSync(dir).forEach((file: string) => {
            const filePath = pathModule.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                scanDirectory(filePath);
            } else {
                files.push(filePath);
            }
        });
    };

    scanDirectory(path);

    return files;
}

const main = async () => {
    const path = process.argv[2];
    if (!path) {
        console.error('Please provide a path to scan.');
        process.exit(1);
    }

    const files = await scan(path);
    console.log(files);
}

main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});

// This code scans a directory and its subdirectories, returning a list of all files found.
