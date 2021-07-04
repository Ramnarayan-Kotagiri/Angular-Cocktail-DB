import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CocktailService } from './cocktail.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,FormsModule],
      declarations: [
        AppComponent
      ],
      providers:[
        CocktailService
      ]
    });
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angularCocktailDb'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angularCocktailDb');
  });

  it('filters are declared and initialized', () => {
    expect(component['filters']).toEqual([
      { name: 'c', value: 'strCategory' },
      { name: 'i', value: 'strIngredient1' },
      { name: 'g', value: 'strGlass' },
      { name: 'a', value: 'strAlcoholic' },
    ]);
  })

  it('searchEnabled is set to false', ()=> {
    expect(component['searchEnabled']).toEqual(false);
  })
});
