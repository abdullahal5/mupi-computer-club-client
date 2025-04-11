interface FilterButtonProps {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FilterButton({
  active,
  children,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 sticky py-2.5 w-full rounded-full transition-all duration-300 ${
        active
          ? "bg-blue-500 text-white"
          : "bg-blue-500/20 hover:bg-blue-500/30 text-blue-100"
      }`}
    >
      {children}
    </button>
  );
}
