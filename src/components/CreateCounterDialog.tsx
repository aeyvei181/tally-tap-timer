import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Counter } from "@/types/counter";
import { addCounter } from "@/lib/storage";
import { toast } from "sonner";

interface CreateCounterDialogProps {
  onCounterCreated: () => void;
}

export const CreateCounterDialog = ({ onCounterCreated }: CreateCounterDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("Please enter a counter name");
      return;
    }

    const newCounter: Counter = {
      id: crypto.randomUUID(),
      name: name.trim(),
      count: 0,
      startTime: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    addCounter(newCounter);
    toast.success(`Counter "${name}" created!`);
    setName("");
    setOpen(false);
    onCounterCreated();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          New Counter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Counter</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Counter Name</Label>
            <Input
              id="name"
              placeholder="e.g., Gym Visits, Books Read..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>
          <Button onClick={handleCreate} className="w-full">
            Create Counter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
