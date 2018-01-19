import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';
import { flyInOut } from '../animations/app.animation';
import { expand } from '../animations/app.animation';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
  flyInOut(),
  expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes : Dish[];
  errorMsg: string;

  constructor(private dishService: DishService,
  @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
     this.dishService.getDishes()
     .subscribe(dishes => this.dishes = dishes,
     errormsg => this.errorMsg = <any>errormsg);
  }

}
