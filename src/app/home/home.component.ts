import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService} from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  dishErrorMsg: string;
  promotionErrorMsg: string;

  constructor(private dishservice: DishService,
  private promotionservice: PromotionService,
  @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
    errormsg => this.dishErrorMsg = <any>errormsg);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
    errormsg => this.promotionErrorMsg = <any>errormsg);
  }

}
