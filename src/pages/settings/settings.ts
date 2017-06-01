import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';


/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  buttonGrid: string[];
  totalButtons: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertController: AlertController) {
    this.buttonGrid = ["Edit", "Cut", "Noise", "Highlight", "Course Walk", "Looking Ahead", "Mental", "Game Plan", "Setup", "Tip"];
    this.alertController = alertController;
    this.totalButtons = [];
    this.buttonGrid.forEach((button) => {
      storage.get(button).then((val) => {
        this.totalButtons.push(val);
      })
    })
    // TODO: Set up to store each button as it's own key: value pair, then get and push to new array to populate buttons.
    // storage.get("buttons").then((val) => {
    //   this.buttonGrid = val;
    // });
  }

  saveButtons() {
    this.storage.set("buttons", this.buttonGrid);
    let alert = this.alertController.create({
      title: 'Buttons Saved',
      message: 'Go to timer or continue editing?',
      buttons: [
        {
          text: 'Stay Here',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Go to Timer',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }
}
