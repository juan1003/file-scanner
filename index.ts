import fs from 'fs';
import path from 'path';

// This code scans a directory and its subdirectories, returning a list of all files found.

const scan: Function = async (pathName: string) => {  
    const files: string[] = [];

    const scanDirectory = (dir: string) => {
        fs.readdirSync(dir).forEach((file: string) => {
            const filePath = path.join(dir, file); 
            if (fs.statSync(filePath).isDirectory()) {
                scanDirectory(filePath);
            } else {
                files.push(filePath);
            }
        });
    };

    scanDirectory(pathName);

    return files;
}

async function sizeScan(pathUrl: string) {
    const files: { path: string, size: number }[] = [];

    const scanDirectory = (dir: string) => {
        fs.readdirSync(dir).forEach((file: string) => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                scanDirectory(filePath);
            } else {
                files.push({ path: filePath, size: fs.statSync(filePath).size });
            }
        });
    };

    scanDirectory(pathUrl);

    return files;
}

const main = async () => {
    const path = process.argv[2];
    if (!path) {
        console.error('Please provide a path to scan.');
        process.exit(1);
    }

    const files = await scan(path);
    console.log('Files:', files);  
    const sizes = await sizeScan(path);
    console.log(files, sizes);
}

main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});

// This code scans a directory and its subdirectories, returning a list of all files found.
