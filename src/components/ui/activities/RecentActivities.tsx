
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Activity = {
  id: string | number;
  title: string;
  description: string;
  time: string;
  avatar?: string;
  statusColor?: string;
};

type RecentActivitiesProps = {
  activities: Activity[];
};

const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  return (
    <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-xl font-bold text-gray-800">Recent Activities</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
          View All
        </Button>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0 transition-all hover:bg-muted/20 p-2 rounded-md"
              style={{animationDelay: `${index * 75}ms`}}
            >
              <div
                className={`w-3 h-3 rounded-full mt-2 ${
                  activity.statusColor || "bg-primary"
                } animate-pulse`}
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800 activity-item">{activity.title}</p>
                  <p className="text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">{activity.time}</p>
                </div>
                <p className="text-sm text-gray-700 activity-item">{activity.description}</p>
              </div>
            </div>
          ))}

          {activities.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No recent activities
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
