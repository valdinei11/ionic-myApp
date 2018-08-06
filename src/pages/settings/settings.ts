import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  rootPage = ProfilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  openHome() {
    this.navCtrl.push(HomePage);
  }

  openProfile() {
    this.navCtrl.push(ProfilePage);
  }

  openAbout() {
    this.navCtrl.push(AboutPage);
  }
}