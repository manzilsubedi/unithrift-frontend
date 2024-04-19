// `app/page.tsx` is the UI for the `/` URL
"use client";
import { getCookie } from "cookies-next";
import CardLayout from "../components/homepage/cardLayout";
import CollectionGrid from "../components/homepage/collectionGrid";
import FeatureProduct from "../components/homepage/featureProduct";
import HeroSection from "../components/homepage/heroSection";

export default function Page() {
  return (
    <>
      {/* {getCookie("userId")} */}
      <HeroSection />
      <CardLayout />
      <FeatureProduct />
      <CardLayout />
      <CollectionGrid />
    </>
  );
}
