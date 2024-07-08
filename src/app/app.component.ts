import {Component, HostListener} from '@angular/core';
import {FormControl,  FormGroup} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import { Router} from "@angular/router";
import {LoginControllerService} from "./authenticate/login-controller.service";
import {CookiesGestionnaireService} from "./authenticate/CookiesGestionnaire.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   screenWidth = window.innerWidth;
   orgscreenWidth = window.screen.availWidth;
  nav:boolean=false;
  title = 'E-Bank';
  signinForm:any=new FormGroup({
  a : new FormControl(null)
})
  display_menu : boolean=false;
  currentUrl: string = window.location.href;
  constructor(
      public cookieGestionnaireService:CookiesGestionnaireService,
      private LoginControllerService:LoginControllerService,
      public CookieService:CookieService,
      private router:Router

  ) {
    console.log("orgscreenWidth",this.orgscreenWidth)
    window.addEventListener('resize', this.onResize.bind(this));

console.log(this.screenWidth)
    console.log(window.location.href.split("/")[window.location.href.split("/").length-1]); // Outputs the current URL to the console


    // this.LoginControllerService.check_login();
// if( this.cookieGestionnaireService.MenusParCompte){
    console.log("this.cookieGestionnaireService.MenusParCompte",this.cookieGestionnaireService.MenusParCompte)

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth)

  }
  toggleNav(){
    this.nav=!this.nav;

  }
  logout() {
    this.cookieGestionnaireService.clearCookies();
    this.router.navigateByUrl("auth");
  }

  redirectversForm(link: string) {
    // Navigate to a dummy route first
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      // Then navigate to the desired route and reload the page
      this.router.navigate([`/${link}`]).then(() => {
        window.location.reload();
      });
    });
  }
  // redirectversForm(link:string){
  //   this.router.navigate([`/${link}`])
  //
  //   window.location.reload();
  // }

  protected readonly window = window;
}
