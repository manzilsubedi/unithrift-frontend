"use client";
import React, { useEffect, useState } from "react";
import ProductCollectionCard from "../card";
// import fetchApiData from "@/app/lib/fetchData";
import { fetchApiData } from "@/app/lib/fetchData";

import { useParams } from "next/navigation";

interface ProductCollection {
  id: number;
  name: string;
  description: string;
  productImageURL: string;
  price: string;
  categoryId: string;
}
export default function ProductCollection() {
  const { id } = useParams();
  // console.log("category id:", id);
  const [productCollection, setProductCollection] = useState<
    ProductCollection[]
  >([]);
  useEffect(() => {
    const productCollection = async () => {
      const data: ProductCollection[] = await fetchApiData("product");
      // console.log(productCollection);
      // filter product collection based on category
      const filteredProductCollection = data.filter(
        (item) => item.categoryId === id
      );
      // console.log("filter data:",filteredProductCollection);

      setProductCollection(filteredProductCollection);
    };
    productCollection();
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 text-center">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>

          <p className="mt-4  text-gray-500">
            Welcome to Our Exclusive Product Collection, where every item has
            been meticulously chosen to bring you the best in quality,
            functionality, and style. From cutting-edge electronics to must-have
            gadgets, each product embodies innovation and excellence. Explore
            our carefully curated selection and discover the perfect addition to
            elevate your life.
          </p>
        </header>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex rounded border border-gray-100">
            <button className="inline-flex size-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </button>

            <button className="inline-flex size-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
          </div>

          <div>
            <label htmlFor="SortBy" className="sr-only">
              SortBy
            </label>

            <select
              id="SortBy"
              className="h-10 rounded border-gray-300 text-sm"
            >
              <option>Sort By</option>
              <option value="Title, DESC">Title, DESC</option>
              <option value="Title, ASC">Title, ASC</option>
              <option value="Price, DESC">Price, DESC</option>
              <option value="Price, ASC">Price, ASC</option>
            </select>
          </div>
        </div>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productCollection.map((item) => (
            <li>
              <ProductCollectionCard
                id={item.id}
                name={item.name}
                price={item.price}
                description={""}
                productImageURL={item.productImageURL}
                category={""}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
