import { motion } from "framer-motion";

interface TallyMarkProps {
  index: number;
  isStrike: boolean;
}

const TallyMark = ({ index, isStrike }: TallyMarkProps) => {
  if (isStrike) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: -45 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="h-1 w-16 bg-tally-strike rounded-full shadow-lg" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="w-2 h-16 bg-tally-mark rounded-full shadow-md"
      style={{ transformOrigin: "bottom" }}
    />
  );
};

interface TallyGroupProps {
  count: number;
}

export const TallyGroup = ({ count }: TallyGroupProps) => {
  const marks = [];
  const sticksBeforeStrike = count % 5 === 0 ? 4 : (count % 5) - 1;
  const hasStrike = count % 5 === 0 && count > 0;

  for (let i = 0; i < Math.min(count, 4); i++) {
    marks.push(<TallyMark key={i} index={i} isStrike={false} />);
  }

  return (
    <div className="relative flex items-center justify-center gap-2 h-20 w-24">
      {marks}
      {hasStrike && <TallyMark key="strike" index={4} isStrike={true} />}
    </div>
  );
};

interface TallyDisplayProps {
  count: number;
}

export const TallyDisplay = ({ count }: TallyDisplayProps) => {
  const groups = Math.floor(count / 5);
  const remainder = count % 5;

  return (
    <div className="flex flex-wrap gap-8 items-center justify-center">
      {Array.from({ length: groups }).map((_, i) => (
        <TallyGroup key={`group-${i}`} count={5} />
      ))}
      {remainder > 0 && <TallyGroup key="remainder" count={remainder} />}
    </div>
  );
};
