import { Component } from '@angular/core';
import {
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  Platform,
  ToastController
} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import { Geolocation } from '@ionic-native/geolocation';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {PlacesService} from "../../services/PlacesService";
// import {File} from '@ionic-native/file';
// import {Entry, File, FileError} from '@ionic-native/file';
// More about File: https://ionicframework.com/docs/native/file/
// import { normalizeURL } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location ={
    lat: 21.8805527,
    lng: -102.2968988
  };

  locationIsSet = false;
  imageUrl = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private camera: Camera,
              private placesServices: PlacesService, private platform: Platform,
              // private file: File
  ) {
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    this.placesServices.addPlace(
      form.value.title,
      form.value.description,
      this.location,
      this.imageUrl
    );

    /* Reset of all the variables*/
    form.reset();
    this.location = {
      lat: 21.8805527,
      lng: -102.2968988
    };
    this.imageUrl = '';
    this.locationIsSet = false;
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, locationIsSet: this.locationIsSet});
    modal.onDidDismiss((data) => {
      if(data){
        this.location = data.location;
        console.log("On Modal Didmiss --" + this.location);
        this.locationIsSet = true;
      }
    });
    modal.present();
  }

  onLocate() {
    this.platform.ready().then(() => {
      const loader = this.loadingCtrl.create({
        content: 'Obteniendo Localización...'
      });
      loader.present();
      this.geolocation.getCurrentPosition().then((resp) => {
        loader.dismiss();
        this.location.lat = resp.coords.latitude;
        this.location.lng = resp.coords.longitude;
        this.locationIsSet = true;
      }).catch((error) => {
        loader.dismiss();
        console.log('Error getting location', error);
        const toast = this.toastCtrl.create({
          message: "No se pudo obtener su ubicación actual, por favor seleccionela manualmente.",
          duration: 2500
        });
        toast.present();
      });
    });
  }

  // onTakePhoto() {
  //   const options: CameraOptions = {
  //     // quality: 100,
  //     // destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     // mediaType: this.camera.MediaType.PICTURE
  //     correctOrientation: true
  //   };
  //
  //   // this.camera.getPicture(options).then((imageData) => {
  //   //   // imageData is either a base64 encoded string or a file URI
  //   //   // If it's base64:
  //   //   this.imageUrl = 'data:image/jpeg;base64,' + imageData;
  //   // }, (err) => {
  //   //   // Handle error
  //   // });
  //
  //   // const options: CameraOptions = {
  //   //   quality: 100,
  //   //   destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
  //   //   encodingType: this.camera.EncodingType.JPEG,
  //   //   mediaType: this.camera.MediaType.PICTURE
  //   // };
  //   //
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64:
  //     // imageData = 'data:image/jpeg;base64,' + imageData;
  //     const currentName = imageData.replace(/^.*[\\\/]/, '');
  //     const path = imageData.replace(/[^\/]*$/, '');
  //     console.log('photo path: ' + path);
  //     const newFileName = new Date().getUTCMilliseconds() + '.jpg';
  //     console.log('currentName: ' + currentName);
  //     console.log('newFileName: ' + newFileName);
  //     /* We're gonna move the file to a real path in the device. Then (.then) we get the nativeURL
  //     * and we clean the camera buffer and remove the file of the older Path */
  //     this.file.moveFile(path, currentName, this.file.dataDirectory, newFileName)
  //       .then((data: Entry) => {
  //         console.log('dataDirectory: ' + this.file.dataDirectory);
  //         console.log('imageUrl = ' + data.nativeURL);
  //         this.imageUrl = data.nativeURL;
  //         // this.imageUrl = this.detectImageData(imageData);
  //         this.camera.cleanup();
  //         // this.file.removeFile(path, currentName);
  //       })
  //       .catch(
  //         (err: FileError) => {
  //           this.imageUrl = '';
  //           console.error('ERROR saving picture: ' + err.message);
  //           const toast = this.toastCtrl.create({
  //             message: 'No se pudo guardar la imagen, por favor intentelo de nuevo',
  //             duration: 2500
  //           });
  //           toast.present();
  //           this.camera.cleanup();
  //         }
  //       );
  //     // this.imageUrl = this.detectImageData(imageData);
  //
  //
  //     console.log("imageData: " + imageData);
  //   }, (err) => {
  //     // Handle error
  //     console.error('ERROR: taking picture: ' + err.message);
  //     const toast = this.toastCtrl.create({
  //       message: 'No se pudo tomar la imagen, por favor intentelo de nuevo',
  //       duration: 2500
  //     });
  //     toast.present();
  //   });
  //   console.log('ImageURL you are gonna see: ' + this.imageUrl);
  // }

  onTakePhoto() {
    this.platform.ready().then(() => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.imageUrl = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
        console.log('error getting picture: '+ err);
      });
    });
  }

  /*detectImageData(imageData: any){
    //get photo from the camera based on platform type
    if (this.platform.is('ios')){
      return normalizeURL(imageData);
    }else{
      return "data:image/jpeg;base64," + imageData;
    }
  }*/
}
