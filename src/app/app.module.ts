import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AddPlacePage} from "../pages/add-place/add-place";
import {PlacePage} from "../pages/place/place";
import {SetLocationPage} from "../pages/set-location/set-location";
import {AgmCoreModule} from "@agm/core";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import {PlacesService} from "../services/PlacesService";
import { File } from '@ionic-native/file';
import {IonicStorageModule} from "@ionic/storage";
import {AddPlacePageModule} from "../pages/add-place/add-place.module";
import {PlacePageModule} from "../pages/place/place.module";
import {SetLocationPageModule} from "../pages/set-location/set-location.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // AddPlacePage,
    // PlacePage,
    // SetLocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-R6RzsDHsr2Dc60-qEOebEEY_3ekZYEM'
    }),
    IonicStorageModule.forRoot(),
    AddPlacePageModule,
    PlacePageModule,
    SetLocationPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera,
    PlacesService,
    File
  ]
})
export class AppModule {}
