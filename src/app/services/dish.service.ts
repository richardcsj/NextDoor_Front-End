import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';


@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise(res => {
      //simulate server latency wit 2 seconds delay
      setTimeout(() => res(DISHES), 2000);
    });
  }

  getDish(id: number): Promise<Dish> {
    return new Promise(res => {
      //simulate server latency wit 2 seconds delay
      setTimeout(() => res(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(res => {
      //simulate server latency wit 2 seconds delay
      setTimeout(() => res(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });
  }
}
