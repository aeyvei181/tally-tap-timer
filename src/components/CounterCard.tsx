import { Card } from "@/components/ui/card";
import { Counter } from "@/types/counter";
import { formatDistanceToNow } from "date-fns";
import { Clock, Calendar } from "lucide-react";

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
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDistanceToNow(new Date(counter.startTime), { addSuffix: true })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(duration)}</span>
          </div>
        </div>

        {counter.endTime && (
          <div className="text-xs text-muted-foreground">
            Ended {formatDistanceToNow(new Date(counter.endTime), { addSuffix: true })}
          </div>
        )}
      </div>
    </Card>
  );
};
