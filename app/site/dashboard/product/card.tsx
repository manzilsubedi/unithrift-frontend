"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  Modal,
  useDisclosure,
  ModalBody,
  ModalContent,
  Input,
  Select,
  SelectItem,
  ModalHeader,
  ModalFooter,
  Textarea,
} from "@nextui-org/react";
import Link from "next/link";
import { PiNotePencil, PiTrash } from "react-icons/pi";
import {
  deleteApiData,
  fetchApiData,
  postImageApiData,
  putImageApiData,
} from "@/app/lib/fetchData";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
interface ProductInterface {
  id: string;
  title: string;
  price: string;
  description: string;
  productImageURL: string;
}
interface CategoryInterface {
  id: number;
  categoryName: string;
}
export default function ItemCard(product: ProductInterface) {
  const { id, title, price, description, productImageURL } = product;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [category, setCategory] = useState<CategoryInterface[]>([]);
  const [file, setFile] = useState<File | null>(null); // State to hold the selected file

  var userId = getCookie("userId");
  // console.log(userId);

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    postedBy: userId || "",
    categoryId: "",
    contactDetails: "",
    productImage: file || "",
    productImageURL: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      // console.log(response);
      const data = fetchApiData("category");
      // console.log(data);
      setCategory(await data);
    };
    fetchData();
    const fetchProductData = async () => {
      const data = fetchApiData("product/" + id);
      // console.log(data);
      setFormData(await data);
    };
    fetchProductData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleDelete(id: string) {
    if (window.confirm("Are you sure you want to delete?")) {
      // Perform the deletion logic here

      const res = await deleteApiData("product/" + id);
      if (res === true) {
        router.refresh();
        console.log(`Deleting item with id ${id}`);
      }
    } else {
      // Handle cancellation
      console.log("Deletion cancelled");
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // console.log("handle image", e.target.files[0]);
      setFile(e.target.files[0]);
    }
    // console.log("file:",file);
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log("onSubmit:", formData.name);

    const newFormData = new FormData();

    newFormData.append("name", formData.name);
    newFormData.append("description", formData.description);
    newFormData.append("price", formData.price);
    newFormData.append("postedBy", formData.postedBy);
    newFormData.append("categoryId", formData.categoryId);
    newFormData.append("contactDetails", formData.contactDetails);
    newFormData.append("productImage", formData.productImage);

    console.log("onSubmit:", newFormData.get("productImage"));
    try {
      const url = "product/" + id;
      const response = await putImageApiData(newFormData, url);

      // console.log(response.data);
      // Display success message and close form
      router.push("/site/dashboard/product");
    } catch (error) {
      console.error(error);
      // Display error message
    }
  };
  // console.log("getProduct data:", formData);

  return (
    <>
      <div className="group block">
        <img
          src={productImageURL}
          alt=""
          className="h-[350px] w-full object-cover sm:h-[450px] rounded-2xl"
        />

        <div className="mt-3 flex justify-between text-sm">
          <div>
            <h3 className=" font-semibold text-teal-900 group-hover:underline group-hover:underline-offset-4">
              <Link href={`/site/product/${id}`}>{title}</Link>
            </h3>

            <p className="mt-1.5 text-pretty text-xs text-gray-500">
              {description}
            </p>
          </div>

          <p className="text-teal-900 font-semibold">£{price} </p>
        </div>
        <div className="flex justify-between items-center py-2">
          <Button
            href={``}
            className="underline flex items-center hover:text-teal-600"
            onPress={onOpen}
          >
            <PiNotePencil className=" pr-2 w-6 h-6" />
            Modify
          </Button>
          <Link
            href={``}
            color="danger"
            className="underline flex items-center hover:text-red-600"
            onClick={() => handleDelete(id)}
          >
            <PiTrash className=" pr-2 w-6 h-6" />
            Remove
          </Link>
        </div>
      </div>

      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Product Info
              </ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit}>
                  <div className="py-2">
                    <Input
                      isRequired
                      label="Product name"
                      placeholder="Enter your Product name"
                      variant="bordered"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      name="name"
                    />
                    {/* {errors.name && (
                          <p className="text-red-500">{errors.name}</p>
                        )} */}
                  </div>
                  <Textarea
                    label="Product Description"
                    placeholder="Enter your Product Description"
                    variant="bordered"
                    className="max-w-full"
                    value={formData.description}
                    onChange={handleInputChange}
                    name="description"
                  />
                  <div className="flex py-2 px-1 justify-between gap-2">
                    <Input
                      isRequired
                      label="Price"
                      placeholder="Enter your Price"
                      variant="bordered"
                      value={formData.price}
                      onChange={handleInputChange}
                      name="price"
                      type="text"
                    />

                    <Select
                      label="Category"
                      placeholder="Select your Category"
                      variant="bordered"
                      className="max-w-full"
                      value={formData.categoryId}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          categoryId: event.target.value,
                        })
                      }
                      name="category"
                    >
                      {category.map((item) => (
                        <SelectItem value={item.id} key={item.id}>
                          {item.categoryName}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="py-2">
                    <Input
                      isRequired
                      label="Contact Details"
                      placeholder="Enter your Contact Number or Email"
                      variant="bordered"
                      value={formData.contactDetails}
                      onChange={handleInputChange}
                      name="contactDetails"
                      type="text"
                    />
                  </div>
                  <div className="py-2">
                    {/* <Input
                          // key={formData.productImage} // Add key prop
                          isRequired
                          label="Product Image"
                          type="file"
                          placeholder="Enter your Product Image"
                          variant="bordered"
                          name="productImage"
                          
                          
                          onChange={handleInputChange}
                        /> */}
                    <img
                      src={formData.productImageURL}
                      className="py-2 rounded-xl w-60"
                    />

                    <input
                      type="file"
                      name="productImage"
                      placeholder="Enter your Product Image"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      className="text-white"
                      onPress={onClose}
                    >
                      Save All Product Info
                    </Button>
                  </div>
                </form>
              </ModalBody>
              {/* <ModalFooter></ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
