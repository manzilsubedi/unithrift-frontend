import React from "react";
interface ProductCollection {
  id: number;
  name: string;
  description: string;
  productImageURL: string;
  price: string;
  category: string;
}
export default function ProductCollectionCard(product: ProductCollection) {
  const { name, price,id,productImageURL  } = product;
  return (
    <a href={`/site/product/${id}`} className="group block overflow-hidden">
      <img
        src={productImageURL}
        alt=""
        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
      />

      <div className="relative bg-white pt-3">
        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {name}
        </h3>

        <p className="mt-2">
          <span className="sr-only"> Regular Price </span>

          <span className="tracking-wider text-gray-900"> £{price} GBP </span>
        </p>
      </div>
    </a>
  );
}
