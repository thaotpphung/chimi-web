import { ContentLayout } from '@/components/layouts';
import MealPlanning from '@/features/mealplans/components/page';

const MealPlansRoute = () => {
  return (
    <ContentLayout title="Meal Plans">
      <MealPlanning />
    </ContentLayout>
  );
};

export default MealPlansRoute;
