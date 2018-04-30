import {Place} from "../models/Place";
import {Location} from "../models/location";
import { Storage } from "@ionic/storage";
import {Injectable} from "@angular/core";
import { File } from "@ionic-native/file";

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage,
              private file: File){}

  addPlace(title: string, description: string, location: Location, imageUrl: string) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
    this.storage.set('places', this.places)
    .then()
      .catch(
        err => {
          // If the Saved was not successful: We grid the last place added in order to not affect the Real memory device
          this.places.splice(this.places.indexOf(place), 1);
        }
      )
  }

  loadPlaces(){
    return this.places.slice();
  }

  fetchPlaces(){
    return this.storage.get('places')
    .then(
      (places: Place[]) => {
        //If places is not null this.places = places. If is null places = empty[]
        this.places = places != null ? places : [];
        return this.places.slice();
      }
    )
      .catch(
        err => {
          console.log(err);
        }
      )
  }

  deletePlace(index: number){
    const place = this.places[index];
    this.places.splice(index, 1);
    // This will Override the 'Places' Data Key
    this.storage.set('places', this.places)
      .then(
        () => {
          this.removeFile(place);
          console.log('Lugar removido')
        }
      )
      .catch(
        err => {
          console.log(err);
          console.log('No se pudo remover el Lugar')
        }
      );
  }

  /*
  * This method will delete the corresponding Image saved in the Device.
  * */
  private removeFile(place: Place){
    const currentName = place.imagePath.replace(/^.*[\\\/]/, '');
    console.log('currentName will be deleted: ' + currentName);
    this.file.removeFile(this.file.dataDirectory, currentName)
      .then(
        () => console.log('Imagen removida')
      )
      .catch(
        () => {
          console.log('No se pudo remover la imagen');
          this.addPlace(place.title, place.description, place.location, place.imagePath);
        }
      );
  }
}
