import { ContentLayout } from '@/components/layouts';
import Members from '@/features/members/components/page';

const MembersRoute = () => {
  return (
    <ContentLayout title="Members">
      <Members />
    </ContentLayout>
  );
};

export default MembersRoute;
