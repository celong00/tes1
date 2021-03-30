import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { FotothingService } from '../Services/fotothing.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  urlImageStorage : string[] = [];
  urlName : string[] =[];
  constructor(private afStorage : AngularFireStorage,
    public fotoService : FotothingService,private router: Router) { }

  async ngOnInit() {
    
  }
  async ionViewDidEnter(){
    await this.fotoService.loadFoto();
    this.tampilkanData();
  }
  PickPhoto(check:string){
    this.router.navigate(['/tab4',check])
  }
  uploadFoto(){
    for (var index in this.fotoService.dataFoto){
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
      this.afStorage.upload(imgFilepath,this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url)=>{
          this.urlImageStorage.unshift(url);
          console.log(url)
        });
      });
    }
  }
  tampilkanData(){
    this.urlImageStorage=[];
    this.urlName=[];
    var refImage = this.afStorage.storage.ref('imgStorage');
    
    console.log(refImage)
    refImage.listAll().then((res)=>{
      res.items.forEach((itemRef)=>{
        this.urlName.unshift(itemRef.name);
        console.log(this.urlName)
        itemRef.getDownloadURL().then(url=>{
          this.urlImageStorage.unshift(url);
        })
      });
    }).catch((error)=>{
      console.log(error)
    })
  }

}
