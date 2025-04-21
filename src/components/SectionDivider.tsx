
interface SectionDividerProps {
  inverted?: boolean;
}

const SectionDivider = ({ inverted = false }: SectionDividerProps) => {
  return (
    <div className="h-16 w-full overflow-hidden">
      <svg
        className={`h-16 w-full ${inverted ? 'text-raven-white' : 'text-raven-black'}`}
        viewBox="0 0 1440 100"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L1440,0 L1440,100 L0,100 L0,0 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
