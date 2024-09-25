import { useEffect, useRef, useState } from "react";
import useLines from "../../lib/hooks/useLines";
import { SearchingType } from "../../types";
import Lines from "../Lines";
import { FaSearch } from "react-icons/fa";

const Searching = ({ type }: { type: SearchingType }) => {
  const defaultSearchValue = "12";
  let { numbers, indexes, setIndexes, transition, setNumbers, defaultNumbers } =
    useLines({});
  const [searchValue, setSearchValue] = useState<string>(defaultSearchValue);
  const [sorted, setSorted] = useState<boolean>(false);
  const searchNumber = Number(searchValue);
  const length = numbers.length;

  const timeoutIds = useRef<number[]>([]);

  const linearSearch = () => {
    let t = 1;
    for (let i = 0; i <= length - 1; i++) {
      const timeoutId = setTimeout(() => {
        const current = numbers[i];
        setIndexes({ current: i });
        if (current === searchNumber) {
          cleanup();
        }
        timeoutIds.current = timeoutIds.current.filter(
          (id) => id !== timeoutId
        );
      }, t * transition);
      t++;
      timeoutIds.current.push(timeoutId);
    }
  };

  const binarySearch = () => {
    const handleTimeout = (
      { mid, start, end }: { mid: number; start: number; end: number },
      ms: number
    ) => {
      const timeoutId = setTimeout(() => {
        setIndexes({ current: mid, start, end });
        timeoutIds.current = timeoutIds.current.filter(
          (id) => id !== timeoutId
        );
      }, ms);
      timeoutIds.current.push(timeoutId);
    };

    let start = 0;
    let end = length - 1;
    let loop = true;
    let t = 1;
    while (start <= end && loop) {
      const mid = Math.floor((start + end) / 2);
      if (numbers[mid] === searchNumber) {
        loop = false;
      } else {
        if (numbers[mid] < searchNumber) {
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }
      handleTimeout({ mid, start, end }, t * transition);
      t++;
    }
  };

  const reset = () => {
    setIndexes(null);
  };

  const search = () => {
    reset();
    cleanup();
    switch (type) {
      case "linear":
        linearSearch();
        break;
      case "binary":
        binarySearch();
        break;
      default:
        break;
    }
  };

  const cleanup = () => {
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current = [];
  };

  useEffect(() => {
    setSearchValue(defaultSearchValue);
    if (type === "binary") {
      setNumbers([...numbers].sort((a, b) => a - b));
      setSorted(true);
    }

    if (type === "linear") {
      setSorted(false);
      setNumbers(defaultNumbers);
    }

    if (searchValue) {
      if (type === "binary") {
        if (sorted) {
          search();
        }
      } else {
        search();
      }

      return cleanup;
    }
  }, [type, sorted]);

  useEffect(() => {
    if (timeoutIds.current.length === 0 && indexes?.current) {
      if (Number(searchValue) !== numbers[indexes.current]) {
        setTimeout(() => {
          setIndexes(null);
        }, transition);
      }
    }
  }, [timeoutIds.current]);

  return (
    <div className="w-full h-full searching">
      <div className="w-full h-full flex flex-col gap-10">
        <div className="flex items-center justify-center">
          <input
            className="px-2 py-1 font-bold text-xl outline-none shadow-lg shadow-slate-400"
            type="number"
            placeholder="Enter a value"
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
            onKeyDown={({ key }) => key === "Enter" && search()}
          />
          <button
            className="bg-slate-800 h-full aspect-square flex items-center justify-center text-slate-200 shadow-lg shadow-slate-400 text-lg"
            onClick={() => search()}
          >
            <FaSearch />
          </button>
        </div>
        <Lines indexes={indexes} numbers={numbers} transition={transition} />
      </div>
    </div>
  );
};

export default Searching;
