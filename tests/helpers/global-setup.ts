import { chromium, type FullConfig } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export default async function globalSetup(config: FullConfig) {
    console.log(`[INFO]: Starting the global setup...`)

    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
        console.log(`[INFO]: Detecting local runs...`);
        //delete allure reports
        const resultDir = path.resolve(process.cwd(), 'allure-results');
        console.log(`>> resultDir: ${resultDir}`)

        if (fs.existsSync(resultDir)) {
            fs.rmSync(resultDir, { recursive: true, force: true });
            console.log(`[INFO]: Allure report deleted for local run`)

        }

        console.log(`[INFO]: Completed the global setup...`)

     
        //set login cookies global variable
        process.env.LOGIN_COOKIES = undefined
    }



}

