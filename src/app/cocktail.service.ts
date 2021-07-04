import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  readonly API_PROVIDER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

  constructor(private http: HttpClient) {}

  getFilterItems(filter: string,key: string){
    const url = this.API_PROVIDER_URL + 'list.php?'+filter+'=list';
    return this.http.get<any>(url).pipe(
      map(x => x.drinks.map((x: any) => x[key])),
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);
      })
    );
  }

  getFilteredCocktails(filter: string,subFilter: string){
    const url = this.API_PROVIDER_URL + 'filter.php?'+filter+'='+subFilter;
    return this.http.get<any>(url).pipe(
      map(x => x.drinks),
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);
      })
    );
  }

  searchForCocktailsMatchingQuery(filter: string,query: string){
    const url = this.API_PROVIDER_URL + 'search.php?'+filter+'='+query;
    return this.http.get<any>(url).pipe(
      map(x => x.drinks),
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);
      })
    );
  }

  getDetailsOfCocktailById(id: number){
    const url = this.API_PROVIDER_URL + 'lookup.php?i='+id;
    return this.http.get<any>(url).pipe(
      map(x => x.drinks),
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);
      })
    );
  }
}
