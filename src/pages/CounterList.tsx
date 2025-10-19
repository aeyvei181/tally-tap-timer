import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CounterCard } from "@/components/CounterCard";
import { CreateCounterDialog } from "@/components/CreateCounterDialog";
import { getCounters } from "@/lib/storage";
import { Counter } from "@/types/counter";

export const CounterList = () => {
  const navigate = useNavigate();
  const [counters, setCounters] = useState<Counter[]>([]);

  const loadCounters = () => {
    setCounters(getCounters());
  };

  useEffect(() => {
    loadCounters();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tally Counter
          </h1>
          <p className="text-muted-foreground">Track anything with classic tally marks</p>
        </div>

        <div className="flex justify-center mb-8">
          <CreateCounterDialog onCounterCreated={loadCounters} />
        </div>

        {counters.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">No Counters Yet</h2>
            <p className="text-muted-foreground">Create your first counter to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {counters.map((counter) => (
              <CounterCard
                key={counter.id}
                counter={counter}
                onClick={() => navigate(`/counter/${counter.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
