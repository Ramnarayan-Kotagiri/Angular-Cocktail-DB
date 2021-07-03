import { Component } from '@angular/core';
import { CocktailService } from './cocktail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  title = 'angularCocktailDb';
  hiddenStatus = 'Hide';
  categories: any = [];
  glasses: any = [];
  ingredients: any = [];
  alcoholicType: any = [];
  filters = [
    { name: 'c', value: 'strCategory' },
    { name: 'i', value: 'strIngredient1' },
    { name: 'g', value: 'strGlass' },
    { name: 'a', value: 'strAlcoholic' },
  ];
  appliedFilterItems: any = [];
  activeFilter:string = '';
  activeSubFilter:string = '';
  query = '';
  searchEnabled = false;
  results:any = [];
  filtersEnabled = false;

  constructor(private cocktail: CocktailService) {}

  chooseFilter(event: any) {
    this.activeFilter = event.target.value;
    this.query = ''
    if (this.activeFilter === 's' || this.activeFilter === 'f') {
      this.searchEnabled = true;
      this.filtersEnabled = false;
    } else {
      this.searchEnabled = false;
      let objectKey = this.filters
        .filter((x) => x.name === event.target.value)
        .map((x) => x.value);
      this.cocktail.getFilterItems(event.target.value, objectKey[0]).subscribe(
        (resp: any) => {
          if (resp) {
            this.appliedFilterItems = resp;
          }
        },
        (error: any) => {
          alert('ERROR: There was an error fetching the sub filters');
        }
      );
    }
  }

  chooseSubFilter(event: any){
    this.activeSubFilter = event.target.value;
    this.cocktail.getFilteredCocktails(this.activeFilter,this.activeSubFilter).subscribe(
      (resp) => {
        this.results = resp;
        this.filtersEnabled = true;
      },
      (error: any) => {
        alert('ERROR: There was an error fetching the filtered cocktails result.');
      })
  }

  searchBy(){
  this.cocktail.searchForCocktailsMatchingQuery(this.activeFilter,this.query).subscribe(
    (resp)=> {
      this.results = resp;
      this.filtersEnabled = true;
    },
    (error: any) => {
      alert('ERROR: There was an error fetching the filtered cocktails result.');
    }
  )
  }
}
