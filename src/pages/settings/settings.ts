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
  buttonGrid: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertController: AlertController) {
    this.alertController = alertController;
    this.buttonGrid = {
      button1: "Edit",
      button2: "Cut",
      button3: "Noise",
      button4: "Highlight",
      button5: "Course Walk",
      button6: "Looking Ahead",
      button7: "Mental",
      button8: "Game Plan",
      button9: "Setup",
      button10: "Tip",
    };
    if (this.storage.get("buttonGrid")) {
      this.storage.get("buttonGrid").then((val) => {
        if (val) {
          this.buttonGrid = val;
        }
      });
    } else {
      this.storage.set("buttonGrid", this.buttonGrid);
    }
  }

  saveButtons() {
    this.storage.set("buttonGrid", this.buttonGrid);
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
