import { Component } from '@angular/core';
import { FormHero } from '../hero-new';

@Component({
  selector: 'app-hero-form-component',
  templateUrl: './hero-form-component.component.html',
  styleUrls: ['./hero-form-component.component.scss']
})
export class HeroFormComponentComponent {
  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];

  model = new FormHero(18, 'Dr. IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() { this.submitted = true; }
  newHero(heroForm: any) {
    this.model = new FormHero
      (42, '', '');
    heroForm.reset()
  }
}
