import React, { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";


export function checkForANonEmptyObject(obj) {
    for (const i in obj) return true;
    return false;
}

export default function Datalist(props) {
  const { items, divCss, overflow } = props;
  const [selected, setSelected] = useState(
    checkForANonEmptyObject(props.selected) ? props.selected : ""
  );
  useEffect(() => {
    props.onChange(selected);
  }, [selected]);
  const [query, setQuery] = useState("");
  const classes = `${divCss} appearance-none rounded-lg text-sm w-full  placeholder-gray-500 text-gray-900 focus:outline-none ring-1 ring-[#e5e5e5] focus:ring-[#899ada] ring-offset-2 focus-visible:ring-[#899ada] hover:ring-[#899ada]`;
  const filteredItems =
    query === ""
      ? items
      : items.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <div className={`${classes} relative`}>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(item) => (item.name ? item.name : "")}
              placeholder={props.placeholder}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 ">
              {selected && selected.image ? (
                <img
                  className="h-8 w-8 rounded-full mx-4"
                  src={selected.image}
                  onError={() => console.log("error")}
                />
              ) : null}
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${overflow} z-50`}
            >
              {filteredItems.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2  p-1 ${
                        active ? "text-orange bg-light-gray" : "text-gray-500"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate pl-4 group flex rounded-md items-center w-full text-sm  ${
                            selected || props?.selected?.name == item.name
                              ? "font-medium"
                              : "font-normal"
                          }`}
                        >
                          {item.image && (
                            <img
                              className="h-6 w-6 rounded-full mr-2"
                              src={item.image}
                              onError={() => console.log("error")}
                            />
                          )}
                          {item.name}
                        </span>
                        {selected || props?.selected?.name == item.name ? (
                          <span
                            className={`absolute inset-y-0  flex items-center pr-3 right-0 ${
                              active ? "" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
