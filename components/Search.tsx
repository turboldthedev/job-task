"use client";

import fetchProducts from "@/actions/get-products";
import { Product } from "@/types";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SearchProps {
  data: Product[];
  totalProducts: number;
  productsPerPage: number;
}

const Search: React.FC<SearchProps> = ({
  data,
  totalProducts,
  productsPerPage,
}) => {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>(data);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Niit huudsiin too bolon huudaslah logic uildel
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || loading) return;

    setLoading(true);
    try {
      const newProducts = await fetchProducts(
        (newPage - 1) * productsPerPage,
        productsPerPage
      );
      setProducts(newProducts.products);
      setPage(newPage);
    } catch (error) {
      console.error("Failed to load products for new page:", error);
    } finally {
      setLoading(false);
    }
  };

  //Input deer bichigdeh bolgond ajillah query function
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const data = await fetchProducts(0, 20, searchQuery);
        setProducts(data.products);
      } catch (error) {
        console.error("Error during search:", error);
      }
    };

    handleSearch();
  }, [searchQuery]);

  return (
    <Dialog className="relative z-10 " open={open} onClose={() => {}}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-4 ">
        <DialogPanel
          transition
          className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <Combobox
          >
            <div className="relative">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <ComboboxInput
                autoFocus
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
              />
            </div>

            {products.length > 0 && (
              <ComboboxOptions
                static
                className="max-h-[640px] transform-gpu scroll-py-3 overflow-y-auto p-3 "
              >
                {products.map((item) => {
                  return (
                    <Link href={`/product/${item.id}`} key={item.id}>
                      <div
                        key={item.id}
                        className="group flex cursor-default select-none rounded-xl p-3 hover:bg-gray-100"
                      >
                        <div className="flex flex-none items-center justify-center rounded-lg">
                          <Image
                            src={item.images[0]}
                            width={30}
                            height={30}
                            alt="image"
                          />
                        </div>
                        <div className="ml-4 flex-auto">
                          <p className="text-sm font-medium text-gray-700 group-data-[focus]:text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500 group-data-[focus]:text-gray-700">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </ComboboxOptions>
            )}

            {!products && (
              <div className="px-6 py-14 text-center text-sm sm:px-14">
                <ExclamationCircleIcon
                  type="outline"
                  name="exclamation-circle"
                  className="mx-auto h-6 w-6 text-gray-400"
                />
                <p className="mt-4 font-semibold text-gray-900">
                  No results found
                </p>
                <p className="mt-2 text-gray-500">
                  No components found for this search term. Please try again.
                </p>
              </div>
            )}
          </Combobox>

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between p-2">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(page - 1) * productsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(page * productsPerPage, totalProducts)}
                </span>{" "}
                of <span className="font-medium">{totalProducts}</span> results
              </p>
            </div>
            <div>
              <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              >
                <button
                  onClick={() => handlePageChange(page - 1)}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  disabled={page === 1 || loading}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                </button>

                {[...Array(totalPages).keys()].map((i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    aria-current={page === i + 1 ? "page" : undefined}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      page === i + 1
                        ? "bg-indigo-600 text-white"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }`}
                    disabled={loading}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  disabled={page === totalPages || loading}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Search;
