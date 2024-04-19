"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { PiSwap } from "react-icons/pi";
import Link from "next/link";
import {
  fetchApiData,
  fetchProductData,
  getProductApiData,
} from "@/app/lib/fetchData";
import ItemCard from "@/app/components/card";
import { useParams } from "next/navigation";
interface ProductInterface {
  id: string;
  name: string;
  price: string;
  description: string;
  categoryId: string;
  postedBy: string;
  contactDetails: string;
  productImageURL: string;
}
export default function Page() {
  const { id } = useParams();
  // console.log("Product ID: " + id);
  const [products, setProduct] = useState<ProductInterface[]>([]);

  const [data, setData] = useState<ProductInterface>();
  // console.log(data[0]);

  useEffect(() => {
    const productData = async () => {
      const url = "product/"+id ;
      // console.log("url:",url);
      const response: ProductInterface = await getProductApiData(url);
      // console.log("response data: ", response);
      setData(response);
    };

    productData();
    const fetchData = async () => {
      // console.log(response);
      const data: ProductInterface[] = await fetchApiData("product");
      const latestData = data.slice(0, 4);
      // console.log(data);
      setProduct(latestData);
    };
    fetchData();
  }, []);

  // console.log("product data", data);

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link href="/site">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="">Products</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="/product/1">Product Details</Link>
        </BreadcrumbItem>
      </Breadcrumbs>

      <div className="grid sm:grid-cols-2 items-center gap-4 py-6">
        <div>
          <img
            src={data?.productImageURL}
            className=" rounded-2xl"
            alt=""
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className=" font-bold text-4xl">{data?.name}</h1>
            <p className=" font-medium text-teal-600">£{data?.price} GBP</p>
            <p className=" font-medium">
              Posted by:{''}
              <Link href={``} className="underline">
                {data?.postedBy}
              </Link>
            </p>
          </div>

          <div className="flex gap-2 justify-center">
            {/* emailto:suryamankedem@gmail.com */}
            <Button color="primary" size="lg" className="w-full text-white">
              Buy Now
            </Button>

            <Button color="primary" variant="bordered" size="lg">
              Give
            </Button>
          </div>
        </div>
      </div>
      <div className="py-10">
        <div><p>{data?.description}</p></div>
      </div>

      <div>
        <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
          {products.map((item) => (
            <ItemCard
              id={item.id}
              title={item.name}
              price={item.price}
              description={item.description}
              productImageURL={item.productImageURL}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
