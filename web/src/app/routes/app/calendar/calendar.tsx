import { ContentLayout } from '@/components/layouts';
import Calendar from '@/features/calendar/components/page';

const CalendarRoute = () => {
  return (
    <ContentLayout title="Calendar">
      <Calendar />
    </ContentLayout>
  );
};

export default CalendarRoute;
