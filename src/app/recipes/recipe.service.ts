import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()

export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Dummy recipe',
      'Dummy recipe description',
      'https://i2.wp.com/www.themakeupdummy.com/wp-content/uploads/2016/10/Raspberry-and-blueberry-Seeds-and-Oats-Bars.-Recipe-without-refined-sugars.-tutorial-by-The-Makeup-Dummy-1024x794.jpg?resize=1024%2C794',
      [
        new Ingredient('Tomato', 3),
        new Ingredient('Banana', 5)
      ]
    ),
    new Recipe(
      'Another Dummy recipe',
      'Another Dummy recipe description',
      'https://i2.wp.com/www.themakeupdummy.com/wp-content/uploads/2016/10/Raspberry-and-blueberry-Seeds-and-Oats-Bars.-Recipe-without-refined-sugars.-tutorial-by-The-Makeup-Dummy-1024x794.jpg?resize=1024%2C794',
      [
        new Ingredient('Cachaça', 1),
        new Ingredient('Lemon', 5)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
