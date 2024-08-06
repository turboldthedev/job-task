import fetchProducts from "@/actions/get-products";
import Search from "@/components/Search";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default async function Home() {
  //Anhnii baraagaa duudah funkts
  const data = await fetchProducts();

  return (
    <Search
      data={data.products}
      totalProducts={data.total}
      productsPerPage={20}
    />
  );
}
