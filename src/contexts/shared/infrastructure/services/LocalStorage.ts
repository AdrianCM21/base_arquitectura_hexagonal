import { randomUUID } from "crypto";
import { config } from "../../../../config";
import { Storage as StorageService } from "../../domain/services/Storage";
import fs from 'fs';
import path from "path";
import { DirectoryNotAllowed } from "../exceptions/DirectoryNotAllowed";

export class LocalStorage implements StorageService {
    private storagePath;
    private tmpPath;
    
    constructor() {
        this.storagePath = config.storage.localStoragePath;
        this.tmpPath = config.storage.temporalStoragePath;
    }

    save(content: string | Buffer, pathToFile: string): void {
        const fullPath = path.join(this.storagePath, pathToFile);
        const dirPath = path.dirname(fullPath);
        fs.mkdirSync(dirPath, {recursive: true});
        fs.writeFileSync(fullPath, content);
    }

    loadToTmp(pathToFile: string): string {
        const fullPath = path.join(this.storagePath, pathToFile);
        const extension = path.extname(fullPath);
        const name = `${randomUUID()}${extension}`;
        const dest = path.join(this.tmpPath, name);
        fs.copyFileSync(fullPath, dest);
        return dest;
    }

    removeFromTmp(pathToFile: string): void {
        const dir = path.dirname(pathToFile);
        if(dir != "." && dir != this.tmpPath)
            throw new DirectoryNotAllowed("El directorio no corresponde al de archivos temporales.");
        const  name = path.basename(pathToFile);
        const fullPath = path.join(this.tmpPath, name);
        fs.unlinkSync(fullPath);
    }

    getContent(pathToFile: string): string | Buffer {
        const content = fs.readFileSync(path.join(this.storagePath,pathToFile)).toString();
        return content;
    }

    // persistTmpFile(pathToTmpFile: string, pathToPermanentFile: string): void {
    //     if (pathToTmpFile.includes("..") || pathToPermanentFile.includes(".."))
    //         throw new DirectoryNotAllowed("El archivo no puede ser guardado en un directorio superior.");
    //     const tmp = path.join(this.tmpPath, pathToTmpFile);
    //     const perm = path.join(this.storagePath, pathToPermanentFile);
    //     const dirPath = path.dirname(perm);
    //     fs.mkdirSync(dirPath, {recursive: true});
    //     fs.copyFileSync(tmp, perm);
    // }

}