import { ContentLayout } from '@/components/layouts';
import Health from '@/features/health/components/page';

const HealthRoute = () => {
  return (
    <ContentLayout title="Health">
      <Health />
    </ContentLayout>
  );
};

export default HealthRoute;
