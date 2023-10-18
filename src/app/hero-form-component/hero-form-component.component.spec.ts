import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormComponentComponent } from './hero-form-component.component';

describe('HeroFormComponentComponent', () => {
  let component: HeroFormComponentComponent;
  let fixture: ComponentFixture<HeroFormComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroFormComponentComponent]
    });
    fixture = TestBed.createComponent(HeroFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
