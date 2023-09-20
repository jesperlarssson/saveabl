"use client";

interface MealKitTileProps {
  weekNumber: number;
  portions?: number;
  nrRecipes?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPause?: () => void;
}

const MealKitTile: React.FC<MealKitTileProps> = async ({
  weekNumber,
  portions,
  nrRecipes,
  onChange,
  onPause,
}) => {
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loadingRecipes, setLoadingRecipes] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       const recipes: Recipe[] = await axios.post(
//         "/api/recipes/for-week-number",
//         {
//           weekNumber: weekNumber,
//         }
//       );
//       setRecipes(recipes);
//       setLoadingRecipes(false);
//     };
//     fetchRecipes();
//   }, []);

//   const RecipeTile = ({ recipe }: { recipe: Recipe }) => {
//     return (
//       <Link href={recipe.slug} className="flex flex-col">
//         <Image src={recipe.image.url} alt={recipe.title} />
//         <p>{recipe.title}</p>
//       </Link>
//     );
//   };
  return (
    <div>
      <h3>{`Matkasse v.${weekNumber}`}</h3>
      {/* {!loadingRecipes && (
        <div className="grid grid-cols-3 gap-2">
          {recipes.map((recipe) => {
            return <RecipeTile key={recipe.slug} recipe={recipe} />;
          })}
        </div>
      )} */}
    </div>
  );
};

export default MealKitTile;
