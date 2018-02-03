import { Component, OnInit } from '@angular/core';
import { flyInOut } from '../animations/app.animation';
import { expand } from '../animations/app.animation';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
  flyInOut(),
  expand()
  ]
})
export class AboutComponent implements OnInit {

  lat: number = 33.9539216;
  lng: number = -84.1217713;
  

  constructor() { }

  ngOnInit() {
  }

}
