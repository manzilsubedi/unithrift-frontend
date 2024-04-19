"use client";

import React from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
interface ProductInterface {
  id: string;
  title: string;
  price: string;
  description: string;
  productImageURL: string;
}
export default function ItemCard(product: ProductInterface) {
  const { id, title, price, description, productImageURL } = product;

  return (
    <>
      <a href={`site/product/${id}`} className="group block">
        <img
          src={productImageURL}
          alt=""
          className="h-[350px] w-full object-cover sm:h-[450px] rounded-2xl"
        />

        <div className="mt-3 flex justify-between text-sm">
          <div>
            <h3 className=" font-semibold text-teal-900 group-hover:underline group-hover:underline-offset-4">
              {title}
            </h3>

            <p className="mt-1.5 text-pretty text-xs text-gray-500">
              {description}
            </p>
          </div>

          <p className="text-teal-900 font-semibold">£{price} </p>
        </div>
      </a>
    </>
  );
}
