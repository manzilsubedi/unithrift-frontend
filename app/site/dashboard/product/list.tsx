"use client";
import { fetchApiData, fetchOwnData } from "@/app/lib/fetchData";
import React, { useEffect, useState } from "react";
import ItemCard from "./card";
interface ProductInterface {
  id: string;
  name: string;
  price: string;
  description: string;
  productImageURL: string;
}
export default function List() {
  const [data, setData] = useState<ProductInterface[]>([]);
  useEffect(() => {
    const ownData = async () => {
      const data: ProductInterface[] = await fetchOwnData("product");
      setData(data);
    };
    ownData();
  }, []);

  return (
    <>
      <div className="grid sm:grid-cols-4 gap-4">
        {data.map((item, key) => (
          <ItemCard
            key={key}
            title={item.name}
            price={item.price}
            description={item.description}
            id={item.id}
            productImageURL={item.productImageURL}
          />
        ))}
      </div>
    </>
  );
}
