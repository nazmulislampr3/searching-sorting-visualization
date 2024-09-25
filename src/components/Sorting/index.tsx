import { useEffect, useRef } from "react";
import { SortingType } from "../../types";
import getIndexes from "../../lib/utils/getIndexex";
import cn from "../../lib/utils/cn";
import Lines from "../Lines";
import useLines from "../../lib/hooks/useLines";

const Sorting = ({ type }: { type: SortingType }) => {
  const {
    indexes,
    move,
    numbers,
    onSortingNumbers,
    order,
    setIndexes,
    setMove,
    setOrder,
    setOnSortingNumbers,
    transition,
  } = useLines({});

  const asc = order === "asc";
  const dsc = order === "dsc";

  const length = numbers.length;

  const timeOutIds = useRef<any[]>([]);

  const bubbleSort = () => {
    const nums = [...numbers];
    let t = 1;
    for (let i = 0; i <= length - 2; i++) {
      for (let j = 0; j <= length - 2; j++) {
        const timeoutId = setTimeout(() => {
          setMove(false);
          const current = nums[j];
          const next = nums[j + 1];
          setIndexes({ current: j, compareTo: j + 1 });

          if (asc ? current > next : current < next) {
            nums[j] = next;
            nums[j + 1] = current;
            setMove(true);
            setOnSortingNumbers(nums);
          }

          timeOutIds.current = timeOutIds.current.filter(
            (id) => id !== timeoutId
          );
        }, t * transition);
        timeOutIds.current.push(timeoutId);
        t++;
      }
    }
  };

  const insertionSort = () => {
    const nums = [...numbers];
    let t = 1;
    for (let i = 1; i <= length - 1; i++) {
      for (let j = i - 1; j >= 0; j--) {
        const timeoutId = setTimeout(() => {
          setMove(false);
          const current = nums[j + 1];
          const compareTo = nums[j];
          setIndexes({ current: j + 1, compareTo: j });
          if (asc ? compareTo > current : compareTo < current) {
            setMove(true);
            nums[j] = current;
            nums[j + 1] = compareTo;
            setOnSortingNumbers(nums);
          }
          timeOutIds.current = timeOutIds.current.filter(
            (id) => id !== timeoutId
          );
        }, t * transition);
        timeOutIds.current.push(timeoutId);
        t++;
      }
    }
  };

  const selectionSort = () => {
    let nums = [...numbers];
    let t = 1;
    for (let i = 0; i <= length - 2; i++) {
      let tempIdx = i;
      for (let j = i + 1; j <= length; j++) {
        const timeoutId = setTimeout(() => {
          setMove(false);
          const temp = nums[tempIdx];
          const current = nums[i];
          if (j === length) {
            nums[i] = temp;
            nums[tempIdx] = current;
            setIndexes({ current: tempIdx, temp: i });
            if (asc ? current > temp : current < temp) {
              setMove(true);
            }
            setOnSortingNumbers(nums);
          } else {
            const compareTo = nums[j];
            if (asc ? temp > compareTo : temp < compareTo) {
              tempIdx = j;
            }

            setIndexes({ current: i, compareTo: j, temp: tempIdx });
          }
          timeOutIds.current = timeOutIds.current.filter(
            (id) => id !== timeoutId
          );
        }, t * transition);
        timeOutIds.current.push(timeoutId);
        t++;
      }
    }
  };

  const cleanup = () => {
    timeOutIds.current.forEach((id) => clearTimeout(id));
    timeOutIds.current = [];
  };

  const reset = () => {
    setOnSortingNumbers(numbers);
    setIndexes(null);
  };

  useEffect(() => {
    reset();
    switch (type) {
      case "bubble":
        bubbleSort();
        break;
      case "insertion":
        insertionSort();
        break;
      case "selection":
        selectionSort();
        break;
      default:
        break;
    }

    return cleanup;
  }, [type, numbers, order]);

  useEffect(() => {
    setOrder("asc");
  }, [type]);

  useEffect(() => {
    if (timeOutIds.current.length === 0) {
      setTimeout(() => {
        setIndexes(null);
        setMove(false);
      }, transition);
    }
  }, [timeOutIds.current]);

  const numberIndexes = getIndexes(numbers, [...onSortingNumbers]);

  return (
    <div className="w-full h-full sorting">
      <div className="w-full h-full flex flex-col gap-10 items-center">
        <div className="flex gap-10">
          <button
            className={cn("orderBtn bg-slate-600", {
              "bg-green-500": asc,
            })}
            onClick={() => setOrder("asc")}
          >
            Ascending
          </button>
          <button
            className={cn("orderBtn bg-slate-600", {
              "bg-green-500": dsc,
            })}
            onClick={() => setOrder("dsc")}
          >
            Descending
          </button>
        </div>
        <Lines
          indexes={indexes}
          move={move}
          numberIndexes={numberIndexes}
          numbers={numbers}
          transition={transition}
        />
      </div>
    </div>
  );
};

export default Sorting;
