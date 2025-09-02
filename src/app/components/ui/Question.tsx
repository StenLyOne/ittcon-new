interface Props {
  question: string;
  answer: string;
  isOpen: boolean;
  id: number;
  onToggle: () => void;
}

export function Question({ question, answer, isOpen, onToggle }: Props) {
  return (
    <div
      className={`group w-full border-b ${
        isOpen ? "gap-5" : "gap-0"
      } flex flex-col py-7 border-green-dark transition-gap duration-200`}
    >
      {/* Заголовок + иконка */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 text-left cursor-pointer"
      >
        <h4 className="text-title">{question}</h4>

        {/* Иконка: hover → scale, isOpen → поворот */}
        <div
          className={`${
            !isOpen
              ? "group-hover:rotate-90 group-hover:bg-gray-100"
              : " group-hover:bg-gray-100"
          } relative w-[32px] h-[32px] transition-all duration-200 rounded-full  group-hover:scale-110 will-change-transform`}
        >
          {/* горизонтальная */}
          <span className="absolute left-1/2 top-1/2 h-[2px] w-[22px] -translate-x-1/2 -translate-y-1/2 bg-blue" />
          {/* вертикальная */}
          <span
            className={`absolute left-1/2 top-1/2 h-[2px] w-[22px] -translate-x-1/2 -translate-y-1/2 bg-blue 
                        transition-transform duration-200 ease-out
                        ${isOpen ? "rotate-0" : "rotate-90"}`}
          />
        </div>
      </button>

      {/* Контент с grid */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out 
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
      >
        <div className="min-h-0">
          <p className="text-body-text">{answer}</p>
        </div>
      </div>
    </div>
  );
}
