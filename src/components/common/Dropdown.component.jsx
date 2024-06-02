import { Fragment, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FaPlusCircle } from "react-icons/fa";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ heading, elements = [], addClickHandler }) {
  // console.log(elements);
  let handleUserAdd = (x) => {
    addClickHandler({ ...x });
  };
  return (
    <Menu as="div" className="relative inline-block text-left w-[250px]">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 border-1 border-gray-300 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {heading}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {elements.map((x) => (
            <Menu.Item key={x.id}>
              {({ active }) => (
                <a
                  href="#"
                  key={x.id}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div
                    className="flex gap-1 justify-between"
                    onClick={(e) => {
                      // e.stopPropagation();
                      handleUserAdd(x);
                    }}
                  >
                    <div className="flex gap-2">
                      <img
                        src={x.image}
                        className="rounded-full w-[30px] h-[30px]"
                      />
                      <p>{x.title}</p>
                    </div>

                    <FaPlusCircle size={20} />
                  </div>
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
