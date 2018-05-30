import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()

export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {

  }

  storeRecipes() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer xablau');
    const params = new HttpParams().set('auth', token);

    // Modo 1
    // return this.httpClient.put('https://udemy-angular-firebase-5709e.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());

    // Modo 2
    // return this.httpClient.put('https://udemy-angular-firebase-5709e.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: params,
    //   headers: headers
    // });

    // Modo 3 (com progresso)
    const req = new HttpRequest('PUT', 'https://udemy-angular-firebase-5709e.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      reportProgress: true,
      params: params,
      headers: headers
    });

    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();

    return this.httpClient.get<Recipe[]>('https://udemy-angular-firebase-5709e.firebaseio.com/recipes.json?auth=' + token, {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}
