import Recipes from "@/components/section/Recipes";
import RecipesSection from "@/components/section/RecipesSection";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

const Recept = async () => {
  //TODO: Om inloggad, kolla vilka veckor denna prenumererar på och highlighta utfrån det.



  return (
    <Section className="pt-16">
      <h1 className="font-bold font-poppins text-secondary text-5xl ">
        Recept
      </h1>

      <Recipes />

      {/* <RecipesSection limit={12} offset={0} /> */}
      
      
    </Section>
  );
};

export default Recept;

{
  /** COULD BE USEFUL CODE UNDER HERE */
}

// const transferRecipes = async () => {

//   const original = (await getAllRecipes()) || [];

//   const transformedRecipes = original.map((recipe: any) => {
//     return {
//       recepts: {
//         title: recipe.title,
//         slug: recipe.slug,
//         startDate: recipe.createdAt,
//         recipeNumber: 1,
//         steg: recipe.recipeSteps.map(
//           (step: { description: any }) => step.description
//         ),
//         ingredients: recipe.recipeSteps.map(
//           (step: { ingredients: { text: any; amount: any; unit: any } }) =>
//             `${step.ingredients.amount} ${step.ingredients.unit} ${step.ingredients.text}`
//         ),
//         nutritionalValues: recipe.nutritionalValues[0],
//         savedIngredients: recipe.savedIngredients.map(String).join(", "),
//         contentAllergies: recipe.ingredients.map(String).join(" "),
//       },
//     };
//   });
//   for (let transformedRecipe of transformedRecipes) {
//     console.log("Adding recipe to Hygraph:", transformedRecipe);
//     const recept = transformedRecipe.recepts;
//     const mutation = `
//   mutation AddRecept($recept: ReceptCreateInput!) {
//     createRecept(data: $recept) {
//      id
//     }
//   }
// `;
//     await sendMutation(mutation, { recept });
//     console.log("Recipe added successfully!");
//   }
// };

// //transferRecipes();
