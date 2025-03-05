import { ContentLayout } from '@/components/layouts';
import Dashboard from '@/features/dashboard/components/dashboard';
import { useUser } from '@/lib/auth';

const DashboardRoute = () => {
  const user = useUser();
  return (
    <ContentLayout title="Dashboard">
      <Dashboard />
    </ContentLayout>
  );
};

export default DashboardRoute;
