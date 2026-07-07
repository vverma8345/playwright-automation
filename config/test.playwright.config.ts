import { defineConfig, devices } from "@playwright/test";
import {baseConfig} from "../playwright.config.js";
import {EnvConfig} from "../tests/helpers/config-fixtures.ts";
import path from "node:path";

 export default defineConfig<EnvConfig>({
 ...baseConfig, //loads all existing based config values
 testDir: path.resolve(process.cwd(),'./tests'),
 use:{
    ...baseConfig.use, // loading again use oject existing values
    envName:"qa",
    appUrl:"https://katalon-demo-cura.herokuapp.com/",
    dbConfig:{
        server:"",
        dbname:"",
        connectionStr:"",
    }
 }
 });


