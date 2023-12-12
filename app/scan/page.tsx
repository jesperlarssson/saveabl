"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Head from "next/head";

const Scan = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Quick Links</title>
      </Head>
      <div className="min-w-screen min-h-screen h-full w-full opacity-40">
        <Image
          alt=""
          src="/images/bg-pattern.png"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute top-0 left-0 min-w-screen min-h-screen h-full w-full flex flex-col justify-center items-center px-4">
        <h1 className="font-poppins text-3xl text-maron w-full max-w-xl  text-center pb-2 mb-4 border-b border-light-200">
          Quick Links
        </h1>
        <div className="grid sm:grid-cols-2 gap-4 w-full max-w-xl">
          <button
            onClick={() => router.push("https://www.saveabl.se/recept")}
            className="px-6 py-6  bg-light-200 rounded-md text-maron font-bold text-lg hover:drop-shadow-lg bg-opacity-80 hover:bg-opacity-100 "
          >
            To Recipes
          </button>
          <button
            onClick={() => router.push("https://www.saveabl.se/om-oss")}
            className="px-6 py-6  bg-light-200 rounded-md text-maron font-bold text-lg hover:drop-shadow-lg bg-opacity-80 hover:bg-opacity-100 "
          >
            Learn more about Saveabl
          </button>

          <button
            onClick={() => router.push("https://www.saveabl.com/")}
            className="px-6 py-6  bg-light-200 rounded-md text-maron font-bold text-lg hover:drop-shadow-lg bg-opacity-80 hover:bg-opacity-100 "
          >
            To Main Page
          </button>
          <button
            onClick={() =>
              router.push(
                "https://gordondelivery.com/support/?path=%2Fcategory%2Fvar-ar-min-leverans"
              )
            }
            className="px-6 py-6  bg-light-200 rounded-md text-maron font-bold text-lg hover:drop-shadow-lg bg-opacity-80 hover:bg-opacity-100 "
          >
            Gordon Delivery
          </button>
        </div>
      </div>
    </>
  );
};

export default Scan;
