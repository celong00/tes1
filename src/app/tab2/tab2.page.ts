import { Photo } from './../Services/fotothing.service';
import { Component } from '@angular/core';
import { FotothingService } from '../Services/fotothing.service';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  urlImageStorage : string[] = [];
  ImageStorage:Photo[] = [];
  counter = 0;
  cek : Photo
  constructor(private afStorage : AngularFireStorage,public fotoService:FotothingService) {
    
  }
  async ngOnInit(){
   await this.fotoService.loadFoto();
   this.ImageStorage = this.fotoService.dataFoto
  }
  TambahFoto(){
    this.fotoService.tambahFoto()
  }
  SelectedFoto(dataFoto: Photo){
    for(var i = 0;i<this.ImageStorage.length; i++){
      console.log(this.ImageStorage[i].nama + " === "+ dataFoto.nama)
      if(this.ImageStorage[i].nama == dataFoto.nama){
        console.log(this.ImageStorage[i].selected)
        if(this.ImageStorage[i].selected == true){
          this.ImageStorage[i].selected = false;
        }else{
          this.ImageStorage[i].selected = true;
        }
      }
    }
  }
  async UploadFoto(){
    this.counter = 0;
    for (var index in this.ImageStorage){
      if(this.ImageStorage[index].selected == true){
        const imgFilepath = `imgStorage/${this.ImageStorage[index].filePath}`;
        this.afStorage.upload(imgFilepath,this.ImageStorage[index].dataImage).then(() => {
          this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url)=>{
            this.urlImageStorage.unshift(url);
            console.log(url)
          });
        });
        this.counter = 1;
      }
    }
    if(this.counter==1){
      await alert("UPLOADED!!")
    }else{
      await alert("You must pick at least 1 Photo to upload")
    }
  }

}
