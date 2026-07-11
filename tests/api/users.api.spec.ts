import { test, expect, request } from "@playwright/test";
import { log } from "../helpers/logger";
import constants from "../../data/constants.json";
import testData from "../../data/test-data";

test.describe('API Tests', () => {
    let envConfig = undefined; // Placeholder for environment configuration

    test.beforeEach(async ({ request }, testInfo) => {
        // assign to outer scope so tests can access envConfig
        envConfig = testInfo.config as any;
        // provide a sensible default if config doesn't include apiUrl
        if (!envConfig?.apiUrl) {
            envConfig = { ...envConfig, apiUrl: process.env.API_URL || 'https://reqres.in/api' };
        }
    });

    //TODO: move the baseUrl to config file and read from there
    //const baseUrl = 'https://reqres.in/api';

    test('Should get list of users', async ({ request }) => {

        // make GET call to the API endpoint
        await log('info', `making GET call using ${envConfig.apiUrl}${constants.REQ_END_POINTS.GET_USERS_LIST}`);

        const response = await request.get(`${envConfig.apiUrl}${constants.REQ_END_POINTS.GET_USERS_LIST}`, {
            headers: {
                //TODO: move the API key to .env file and read from there
                'x-api-key': process.env.API_KEY
            }
        });

        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
        const responseBody = await response.json();
        expect(responseBody.page).toBe(1);

        await log('info', `GET call successful with response: ${JSON.stringify(responseBody)}`);

        expect(responseBody.data[0].email).toBe('george.bluth@reqres.in');
        const userData = responseBody.data[0];
        await log('info', `User Data: ${JSON.stringify(userData)}`);

    });

    test('Should create a new user', async ({ request }) => {

        //TODO: goes to test-data.ts file and read the data from there

        /* const newUser = {
             name: "John Wick",
             job: "QA Engineer",
             id: "444",
             createdAt: "2025-11-01T01:02:01.122Z"
         };
 
         */
        const newUser = testData.apiUserCreation()[0];
        await log('info', `making POST call using ${envConfig.apiUrl}${constants.REQ_END_POINTS.CREATE_USER} with data: ${JSON.stringify(newUser)}`);

        const response = await request.post(`${envConfig.apiUrl}${constants.REQ_END_POINTS.CREATE_USER}`, {
            headers: {
                'x-api-key': process.env.API_KEY,
                'Content-Type': 'application/json'
            },
            data: newUser
        });

        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe('Created');
        const responseBody = await response.json();
        expect(responseBody.name).toBe(newUser.name);
        expect(responseBody.job).toBe(newUser.job);

        await log('info', `POST call successful with response: ${JSON.stringify(responseBody)}`);
        console.log('Created User Data:', JSON.stringify(responseBody));
    });
});


/*

var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://reqres.in/api/users',
  'headers': {
    'x-api-key': 'reqres_ba485e52f0d14486a57121297f9074e2',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": "John",
    "job": "pistol",
    "id": "987",
    "createdAt": "2025-01-01T01:02:01.122Z"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

*/