import { Link, useLocation } from "react-router-dom";
import menu from "../lib/menu";
import cn from "../lib/utils/cn";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { IoMdArrowDropright } from "react-icons/io";

const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <div
      className={cn(
        "absolute w-full lg:static lg:w-80 h-full -left-full top-0 bg-blue-200 shadow-lg shadow-black flex items-center transition-all z-50",
        {
          "left-0": isOpen,
        }
      )}
    >
      <ImCancelCircle
        className="absolute top-5 right-5 font-bold text-xl text-slate-700 cursor-pointer lg:hidden"
        onClick={() => setIsOpen(false)}
      />
      <IoMdArrowDropright
        className="absolute left-full text-4xl text-slate-800 cursor-pointer bg-blue-200 shadow-lg shadow-slate-400"
        onClick={() => setIsOpen(true)}
      />

      <div className="flex flex-col gap-5 overflow-y-auto max-h-full w-full py-6 px-8 scrollbar1">
        {menu.map(({ name, path: path1, submenu }, index) => {
          return (
            <div key={index}>
              <div
                className={cn("font-bold text-lg md:text-2xl text-slate-800", {
                  "text-teal-700": pathname.includes(path1),
                })}
              >
                {!submenu ? <Link to={path1}>{name}</Link> : <div>{name}</div>}
              </div>
              {submenu ? (
                <div>
                  {submenu.map(({ name, path: path2 }, index) => (
                    <div
                      className={cn(
                        "ml-3 text-lg font-semibold text-slate-700",
                        {
                          "text-teal-600": pathname.includes(path2),
                        }
                      )}
                      key={index}
                    >
                      <Link to={`${path1}${path2}`}>{name}</Link>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
