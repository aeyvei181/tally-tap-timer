import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TallyDisplay } from "@/components/TallyMark";
import { ArrowLeft, Trash2, StopCircle, RotateCcw } from "lucide-react";
import { getCounter, updateCounter, deleteCounter } from "@/lib/storage";
import { Counter } from "@/types/counter";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const CounterView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [counter, setCounter] = useState<Counter | null>(null);

  const loadCounter = () => {
    if (id) {
      const found = getCounter(id);
      if (found) {
        setCounter(found);
      } else {
        toast.error("Counter not found");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    loadCounter();
  }, [id]);

  const handleTap = () => {
    if (counter && !counter.endTime) {
      const newCount = counter.count + 1;
      updateCounter(counter.id, { count: newCount });
      setCounter({ ...counter, count: newCount });
    }
  };

  const handleEnd = () => {
    if (counter) {
      updateCounter(counter.id, { endTime: new Date().toISOString() });
      loadCounter();
      toast.success("Counter ended");
    }
  };

  const handleReset = () => {
    if (counter) {
      updateCounter(counter.id, { 
        count: 0, 
        startTime: new Date().toISOString(),
        endTime: undefined 
      });
      loadCounter();
      toast.success("Counter reset");
    }
  };

  const handleDelete = () => {
    if (counter) {
      deleteCounter(counter.id);
      toast.success("Counter deleted");
      navigate("/");
    }
  };

  if (!counter) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <div className="flex gap-2">
            {!counter.endTime ? (
              <Button variant="outline" onClick={handleEnd} className="gap-2">
                <StopCircle className="w-4 h-4" />
                End
              </Button>
            ) : (
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            )}
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Counter?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{counter.name}" and all its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="bg-card rounded-3xl shadow-2xl p-8 border-2">
          <h1 className="text-4xl font-bold text-center mb-2 text-foreground">
            {counter.name}
          </h1>
          
          <div className="text-center text-sm text-muted-foreground mb-8">
            Started {formatDistanceToNow(new Date(counter.startTime), { addSuffix: true })}
            {counter.endTime && ` • Ended ${formatDistanceToNow(new Date(counter.endTime), { addSuffix: true })}`}
          </div>

          <div 
            onClick={handleTap}
            className={`min-h-[400px] flex flex-col items-center justify-center gap-8 rounded-2xl transition-all ${
              counter.endTime 
                ? 'bg-muted cursor-not-allowed' 
                : 'bg-gradient-to-br from-secondary to-background cursor-pointer hover:shadow-inner active:scale-95'
            }`}
          >
            <div className="text-8xl font-bold text-primary">
              {counter.count}
            </div>
            
            <div className="flex-1 flex items-center justify-center py-8">
              <TallyDisplay count={counter.count} />
            </div>

            {!counter.endTime && (
              <div className="text-muted-foreground text-lg">
                Tap anywhere to count
              </div>
            )}
            
            {counter.endTime && (
              <div className="text-muted-foreground text-lg">
                Counter ended
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
