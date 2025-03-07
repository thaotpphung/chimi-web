import { ContentLayout } from '@/components/layouts';
import Recipes from '@/features/recipes/components/page';

const RecipesRoute = () => {
  return (
    <ContentLayout title="Meal Plans">
      <Recipes />
    </ContentLayout>
  );
};

export default RecipesRoute;
