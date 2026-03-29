interface HrProps {
  className?: string;
}

export function Hr({ className = "my-5" }: HrProps) {
  return (
    <hr
      className={`w-full border-t border-slate-500 dark:border-slate-700 ${className}`}
    />
  );
}
