import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {Place} from "../../models/Place";
import {PlacesService} from "../../services/PlacesService";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(public navCtrl: NavController,
              private placesService: PlacesService,
              private modalCtrl: ModalController) {

  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter home.ts');
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
    modal.onDidDismiss(() =>{
      this.places = this.placesService.loadPlaces();
    });
  }

  ngOnInit(): void {
    this.placesService.fetchPlaces()
      .then(
        (places: Place[]) => this.places = places
      );
  }
}
