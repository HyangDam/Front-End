type ProgressDotsProps = {
  step: number;
  total: number;
};

function ProgressDots({ step, total }: ProgressDotsProps) {
  return (
    <div className="mb-7 flex gap-[5px]">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{ flexGrow: i === step ? 2.5 : 1 }}
          className={`h-0.5 rounded-sm transition-all duration-300 ${
            i <= step ? "bg-sage" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

export default ProgressDots;
