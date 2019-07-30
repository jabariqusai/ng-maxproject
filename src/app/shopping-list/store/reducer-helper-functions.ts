import { Ingredient } from 'src/app/shared/ingredient.model';

export const appendToIngredients = (originalArray: Ingredient[], newItems: Ingredient[]): Ingredient[] => {
  const result = originalArray.slice();
  newItems.forEach(newItem => {
    const index = result.findIndex((element: Ingredient) => (element.name.toLowerCase() === newItem.name.toLowerCase()));
    index === -1 ? result.push(newItem) : (result[index].amount += newItem.amount);
  });
  return result;
};
