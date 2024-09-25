import { Indexes } from "../../lib/hooks/useLines";
import cn from "../../lib/utils/cn";

const Lines = (options: {
  numbers: number[];
  transition: number;
  numberIndexes?: number[];
  move?: boolean;
  indexes: Indexes;
}) => {
  const { numbers, transition, numberIndexes, move = false, indexes } = options;
  const containerHeight = 80;
  const lineMaxHeight = 95;
  const minHeight = 100 - lineMaxHeight;
  const max = Math.max(...numbers);
  const unitHeight = lineMaxHeight / max;
  const length = numbers.length;

  return (
    <div className="w-full h-full relative">
      {numbers.map((num, idx) => {
        const index = numberIndexes ? numberIndexes[idx] : idx;
        const current = indexes?.current === index;
        const compareTo = indexes?.compareTo === index;
        const temp = indexes?.temp === index;
        const disable =
          (indexes?.start as number) > index ||
          (indexes?.end as number) < index;
        return (
          <div
            key={idx}
            className={cn("h-full absolute transition-all", {
              "opacity-60": disable,
            })}
            style={{
              left: `${(100 / length) * index}%`,
              width: `${100 / length}%`,
              transition: `${transition}ms`,
            }}
          >
            <div className="absolute w-4/5 h-full left-1/2 -translate-x-1/2 flex flex-col gap-1.5">
              <div
                className="w-full shrink-0 relative"
                style={{
                  height: `${containerHeight}%`,
                }}
              >
                <div
                  className={cn(
                    "absolute bottom-0 left-0 w-full bg-slate-600 h-full shadow-xl shadow-slate-500",
                    {
                      current,
                      temp,
                      compareTo,
                    }
                  )}
                  style={{
                    height: `${minHeight + unitHeight * num}%`,
                  }}
                ></div>
              </div>
              <div className="h-full relative">
                <div
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-1/3 max-w-full aspect-square"
                  )}
                >
                  <div
                    className={cn(
                      "w-full aspect-square bg-slate-600 absolute left-0 top-1/2 -translate-y-1/2 rounded-full text-slate-200 font-bold flex items-center justify-center text-sm lg:text-2xl shadow-xl shadow-slate-500 transition-all",
                      {
                        current,
                        temp,
                        compareTo,
                        "-translate-y-[150%]": move && current,
                        "translate-y-1/2": move && (compareTo || temp),
                      }
                    )}
                  >
                    {num}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Lines;
