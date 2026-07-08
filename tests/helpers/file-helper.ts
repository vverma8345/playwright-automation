import fs from 'node:fs';
import { parse } from "csv-parse/sync";

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

export default { readCsvFile };