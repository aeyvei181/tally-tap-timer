import { Card } from "@/components/ui/card";
import { Counter } from "@/types/counter";
import { formatDistanceToNow, format } from "date-fns";
import { Clock, Calendar, CalendarCheck } from "lucide-react";

interface CounterCardProps {
  counter: Counter;
  onClick: () => void;
}

export const CounterCard = ({ counter, onClick }: CounterCardProps) => {
  const duration = counter.endTime
    ? new Date(counter.endTime).getTime() - new Date(counter.startTime).getTime()
    : Date.now() - new Date(counter.startTime).getTime();

  const formatDuration = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <Card
      onClick={onClick}
      className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-card border-2"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">{counter.name}</h3>
          <div className="text-3xl font-bold text-primary">{counter.count}</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="text-muted-foreground">Started</div>
              <div className="font-medium">{format(new Date(counter.startTime), "PPP 'at' p")}</div>
            </div>
          </div>
          
          {counter.endTime && (
            <div className="flex items-start gap-2 text-sm">
              <CalendarCheck className="w-4 h-4 mt-0.5 text-muted-foreground" />
              <div>
                <div className="text-muted-foreground">Ended</div>
                <div className="font-medium">{format(new Date(counter.endTime), "PPP 'at' p")}</div>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Duration: {formatDuration(duration)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
