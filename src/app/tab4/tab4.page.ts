import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private route: ActivatedRoute) { }
  linkPOTO : String;
  tampil:boolean;
  ngOnInit() {
    if(this.route.snapshot.paramMap.get("check")){
      let linknow = this.route.snapshot.paramMap.get("check");
      this.linkPOTO = linknow
      this.tampil = true
    }else{
      this.tampil = false
    }
  }

}
