import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {


  dish: Dish;
  dishcopy: any;
  dishIds: number[];
  prev: number;
  next: number;
  errorMsg: string;
  comment: Comment;
  visibility = 'shown';

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at lest 2 characters.'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };

  commentForm: FormGroup;

  constructor(private  dishservice: DishService,
  private location: Location,
  private route: ActivatedRoute,
  private fb: FormBuilder,
  @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

      this.createForm();

      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params
        .switchMap((params: Params) => {
          this.visibility = 'hidden';
          return this.dishservice.getDish(+params['id']);
        })
        .subscribe(dish => { this.dish = dish; this.dishcopy = dish;  this.setPrevNext(dish.id); this.visibility = 'shown';  },
        errormsg => this.errorMsg = <any>errormsg);
    }

    setPrevNext(dishId: number) {
      let index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date= new Date().toISOString();
    console.log(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
      .subscribe(dish => this.dish = dish);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
