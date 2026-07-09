import BasePage  from './base.page';
import { log } from '../helpers/logger';
import { expect,test } from '@playwright/test';

export default class LoginPage extends BasePage { 
    
  constructor(page) {
    super(page);
  }

  /** Elements */
  get usernameInput() {
    return this.page.getByLabel("username");
  }

  get passwordInput() {
    return this.page.getByLabel("Password");
  }

  get loginButton() {
    return this.page.getByRole("button", { name: "Login" });
  }

  get makeAppointmentButton() {
    return this.page.getByRole("link", { name: "Make Appointment" })
  }

  
    /** Actions */

    async loginToCuraApp(url:string,username: string, password: string) {
        log('info',`Navigating to ${url}`);
        await this.navigateTo(url);
        await expect(this.page).toHaveTitle("CURA Healthcare Service");
        await this.makeAppointmentButton.click();

        //login
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        //assertion the url
        await expect(this.page).toHaveURL(`${url}#appointment`);

    }


}