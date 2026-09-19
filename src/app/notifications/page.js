import NotificationsListView from "@/components/notifications/NotificationsListView";
import { NOTIFICATIONS } from "@/lib/site-data";

export const metadata = {
  title: "Notifications | Insura",
  description: "Latest notifications, updates and attachments from Insura.",
};

export default function NotificationsPage() {
  return <NotificationsListView notifications={NOTIFICATIONS} />;
}
