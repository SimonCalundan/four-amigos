import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useFullscreen } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });

const navigation = [
  { name: "Ordre", href: "/admin", current: true },
  { name: "Menu redigering", href: "/admin/menu", current: false },
  { name: "Indstillinger", href: "/admin/indstillinger", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ activeLink }) {
  /* Use fullscreen */
  const { toggle, fullscreen } = useFullscreen();
  return (
    <>
      <div className={`${jost.className}`}>
        <Disclosure as="nav" className="bg-[#BF5B22]">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-auto w-52 grayscale contrast-200 invert"
                        src="/logo.png"
                        alt="Your Company"
                        draggable="false"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              activeLink === item.name
                                ? "bg-[#F6EDDF] text-[#BF5B22]"
                                : "text-white hover:bg-[#f6eddf3b] hover:text-white",
                              "rounded-md px-3 py-2 text-lg font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={toggle}
                      className="h-full flex items-center gap-2 text-white text-lg font-medium px-3 py-2"
                    >
                      fullscreen
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-maximiz h-6"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                        <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                        <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                        <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
                      </svg>
                    </button>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-[#F6EDDF] p-2 text-[#BF5B22] ">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-[#F6EDDF] text-[#BF5B22]"
                          : "text-white hover:bg-[#f6eddf3b] hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
