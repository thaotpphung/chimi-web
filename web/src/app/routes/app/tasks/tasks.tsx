import { ContentLayout } from '@/components/layouts';
import Tasks from '@/features/tasks/components/page';

const TasksRoute = () => {
  return (
    <ContentLayout title="Tasks">
      <Tasks />
    </ContentLayout>
  );
};

export default TasksRoute;
