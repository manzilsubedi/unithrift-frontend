"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";

import ProductTable from "./list";
import { PiCross, PiPlus, PiX, PiXCircle } from "react-icons/pi";
import {
  fetchApiData,
  postApiData,
  postImageApiData,
} from "@/app/lib/fetchData";
import SuccessAlert from "@/app/components/alert/success";
import DangerAlert from "@/app/components/alert/fail";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import List from "./list";
interface CategoryInterface {
  id: number;
  categoryName: string;
}
// interface FormData {
//   name: string;
//   description: string;
//   price: string;
//   postedBy: string;
//   categoryId: string;
//   contactDetails: string;
//   productImage: string;
// }
export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [successAlert, setSuccessAlert] = useState("");
  const [dangerAlert, setDangerAlert] = useState("");
  const [category, setCategory] = useState<CategoryInterface[]>([]);
  const [file, setFile] = useState<File|null>(null); // State to hold the selected file

  var userId = getCookie("userId");
  // console.log(userId);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    postedBy: userId || "",
    categoryId: "",
    contactDetails: "",
    productImage: file ||"",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle file input change

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("handle image", e.target.files[0]);
      setFile(e.target.files[0]);
    }
    // console.log("file:",file);
  };

  // console.log("successAler: ", successAlert);
  // console.log("categoryAler: ", category);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // console.log(response);
      const data = fetchApiData("category");
      // console.log(data);
      setCategory(await data);
    };
    fetchData();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("onSubmit:", formData.name);

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
      const response = await postImageApiData(newFormData, "product");

      // console.log(response.data);
      // Display success message and close form
      router.push("/site/dashboard/product");
    } catch (error) {
      console.error(error);
      // Display error message
    }
  };

  
 

  return (
    <>
      <div className="flex flex-col gap-4">
        {successAlert !== "" ? <SuccessAlert msg={successAlert} /> : <></>}
        {dangerAlert !== "" ? <DangerAlert msg={dangerAlert} /> : <></>}

        <div className=" ">
          <Button onPress={onOpen} color="primary" className="text-white">
            Add New Product <PiPlus />
          </Button>
          <Modal
            isOpen={isOpen}
            size="full"
            onOpenChange={onOpenChange}
            placement="top-center"
          >
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
                          // value={formData.name}
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
                        // value={formData.description}
                        onChange={handleInputChange}
                        name="description"
                      />
                      <div className="flex py-2 px-1 justify-between gap-2">
                        <Input
                          isRequired
                          label="Price"
                          placeholder="Enter your Price"
                          variant="bordered"
                          // value={formData.price}
                          onChange={handleInputChange}
                          name="price"
                          type="text"
                        />

                        <Select
                          label="Category"
                          placeholder="Select your Category"
                          variant="bordered"
                          className="max-w-full"
                          // value={formData.categoryId}
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
                          // value={formData.contactDetails}
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
        </div>
        <hr />
        <div className="text-center">
          <header className=" flex  flex-col justify-center">
            <h2 className="text-xl font-bold text-teal-900 sm:text-3xl">
              Product Collection
            </h2>

            <p className="mt-4  text-gray-500">
              Welcome to Your Dashboard: Where You're in Control of Your Product
              Collection. Customize, Edit, or Add New Items to Tailor Your
              Offerings to Your Customers' Preferences. With Flexibility at Your
              Fingertips, Curate a Selection That Reflects Your Unique Style and
              Vision.
            </p>
          </header>

          <div className="mt-8 flex items-center justify-between py-4">
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

          <List />
        </div>
      </div>
    </>
  );
}
