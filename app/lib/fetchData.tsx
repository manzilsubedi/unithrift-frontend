import { getCookie } from "cookies-next";
import React from "react";
const userId = getCookie("userId");

const accessToken = getCookie("accessToken");
export async function fetchApiData(url: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}${url}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return await response.json();
}

export async function fetchOwnData(url: any) {
  const allData = await fetchApiData(url);
  const userName = getCookie("userName");
  // console.log("all data:", allData);
  const ownData = [];
  for (let i = 0; i < allData.length; i++) {
    if (allData[i].postedBy === userName) {
      ownData.push(allData[i]);
    }
  }
  // console.log("own data:", ownData);
  return ownData;
}
export async function fetchProductData(id: any) {
  const allData = await fetchApiData("product");
  // const userName = getCookie("userName");
  // console.log("all data:", allData);
  const ownData = [];
  for (let i = 0; i < allData.length; i++) {
    if (allData[i].id === id) {
      ownData.push(allData[i]);
    }
  }
  // console.log("own data:", ownData);
  return ownData;
}

export async function postApiData(data: any, url: any) {
  // console.log(data);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function postImageApiData(data: any, url: any) {
  // console.log(data);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });
  // Handle response
  if (response.ok) {
    // Form submitted successfully
    console.log("Form submitted successfully");
  } else {
    // Handle error
    console.error("Form submission failed");
  }

  return await response.json();
}
export async function putImageApiData(data: any, url: any) {
  // console.log("from api PUT:", data.get("name"));
  console.log("from api PUT:", url);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}${url}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });
  // Handle response
  if (response.ok) {
    // Form submitted successfully
    console.log("Form submitted successfully");
  } else {
    // Handle error
    console.error("Form submission failed");
  }

  return await response.json();
}

export async function getProductApiData(url: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}${url}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return await response.json();
}

export async function deleteApiData(url: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
}
