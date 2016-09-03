import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'partiu-star',
    template: `<span class="star" [class.selected]="active" (click)="handleRate($event)">&#9733;</span>`,
    styles: [`
    .star {
      color: #efefef;
      cursor: pointer;
      font-size: 2rem;
      transition: color .4s ease-in-out;
    }
    .star.selected {
      color: #FFD600;
    }
  `]
})
export class StarComponent {

    @Input() active: boolean;
    @Input() position: number;
    @Output() rate = new EventEmitter();

    handleRate() {
        this.rate.emit(this.position);
    }
}

@Component({
    selector: 'partiu-rating',
    template: `
    <div class="stars">
      <partiu-star
        *ngFor="let star of stars"
        [active]="star <= rating"
        (rate)="onRate($event)"
        [position]="star">
      </partiu-star>
    </div>
  `,
})
export class RatingComponent implements OnChanges {

    @Input() starCount: number;
    @Input() rating: number;
    @Output() rate = new EventEmitter();

    stars: number[] = [1, 2, 3, 4, 5];

    constructor() {
        // const count = this.starCount < 0 ? 5 : this.starCount;
    }

    onRate(star) {
        this.rate.emit(star);
        this.rating = star;
    }
}
