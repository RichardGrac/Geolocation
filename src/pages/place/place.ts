import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Place} from "../../models/Place";
import {PlacesService} from "../../services/PlacesService";

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  place: Place;
  index : number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private placesService: PlacesService) {
    this.place = this.navParams.get('place');
    // console.log('place.path: ' + this.place.imagePath);
    this.index = this.navParams.get('index');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }


  onDelete() {
    console.log('index will be deleted: ' + this.index);
    this.placesService.deletePlace(this.index);
    this.onLeave();
  }
}
