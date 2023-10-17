import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { Hero } from '../Hero';
const hero: Hero = { id: 1, name: "Test" };
describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  beforeEach(() => {

    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero']);
    mockHeroService.getHeroes.and.returnValue(of([hero]));
    mockHeroService.addHero.and.returnValue(of({ id: 0, name: "new hero" }));
    mockHeroService.deleteHero.and.returnValue(of(undefined));
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'detail/:id', component: HeroDetailComponent }
        ])
      ],

      declarations: [HeroesComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }]
    });
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockHeroService.getHeroes).toHaveBeenCalled();
    expect(component.heroesList).toEqual([{ id: 1, name: "Test" }]);
  });
  it("should add", async () => {
    //given
    let hero = { name: "new hero" };
    //when
    component.add(hero.name);
    expect(mockHeroService.addHero).toHaveBeenCalledWith(hero as Hero);

    expect(component.heroesList).toContain({ id: 0, name: "new hero" })
  });
  it('should delete', () => {
    //given

    //let toDelete: Hero = { id: 1, name: "Test" }
    //when
    component.delete(hero);
    fixture.detectChanges();
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(hero.id);
    expect(component.heroesList).not.toContain(hero);
  })
});
