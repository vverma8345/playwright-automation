import fs from 'node:fs';
import { parse } from "csv-parse/sync";
import {log} from '../helpers/logger';
/**
 * Reads a CSV file from the given file path and returns the parsed data as an array of objects.
 * @param filePath 
 * @returns Array of objects
 */
function readCsvFile(filePath: string): any[] {
      const csvDataStr = fs.readFileSync(filePath, { encoding: "utf8" });
    const csvDataArray = parse(csvDataStr, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    })
    return csvDataArray;
}

/**
 * Reads a file from the given file path and returns its content as a string.
 * @param filePath 
 * @returns File content as a string
 */

function readFile(filePath: string): any {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }
    log('info', `Reading file: ${filePath}`);
    const data = fs.readFileSync(filePath, { encoding: "utf8" });
    return data;
}


/**
 * writes data to a file at the given file path. If the file does not exist, it will be created.
 * If the file already exists, its content will be overwritten.
 * @param filePath 
 * @param data 
 */
function writeFile(filePath: string, data: string): void {
    try {
        
    fs.writeFileSync(filePath, data, { encoding: "utf8" });
    log('info', `File written: ${filePath}`);
    } catch (error) {
        log('error', `Error writing file: ${filePath}. Error: ${error}`);
        throw error;
    }
}

export default { readCsvFile, readFile , writeFile };