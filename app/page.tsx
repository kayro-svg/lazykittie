'use client';

import Image from "next/image";
import { LazyImage } from "../components/RandomFox";
import { useState, MouseEventHandler, useEffect } from "react";
import { random } from "lodash";
import axios from "axios";
// import { url } from "inspector";

const myRandom = () => random(1, 123);

//comment
//generate simple unique id
const generateId = () => Math.random().toString(36).substr(2, 9);
//comment

export default function Home() {
  const [images, setImages] = useState<Array<IFoxImageItem>>([]);
  //   //uso de eventos y callbacks para gatos
  const addNewFox: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?api_key=live_QQ7Bp4GRUxiSSCiELSkKAwjSzgpcMOdGX3u11RyS86R6ySkidNrdhZzwplG8UU5u');
      const newImageItem: IFoxImageItem = {
        id: response.data[0].id,
        url: response.data[0].url
      };
      setImages([...images, newImageItem])
    } catch (error) {
      console.error(error);
    }
  }
  //uso de eventos y callbacks para foxes
  //  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
  //   const newImageItem: IFoxImageItem ={
  //     id: generateId(),
  //     url: `https://randomfox.ca/images/${myRandom()}.jpg` 
  //   }
  //   setImages([...images, newImageItem ])
  // }
  return (
    <main className="flex min-h-screen flex-col items-center p-10 xs:p-5">
      <h1 className=" font-extrabold mb-5  text-2xl text-orange-950">Hello Cat Lover</h1>
      <span>✨</span>
      <p className="text-center text-orange-950"> This little project consisted in practicing LazyLoading images with Nextjs, React and Typescript</p>
      <span className="mb-5 text-orange-950">✨lets see some kitties✨</span>
      <button onClick={addNewFox} className="flex w-max justify-center  rounded-lg bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >👇🏻 🐈 dont stop clicking 🐈 👇🏻</button>
      <div className="columns-1 space-y-2  gap-2 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-3 mt-4">

        {images.map(({ id, url }) => {
          return (
            <div key={id} className=" group relative cursor-pointer overflow-hidden p-1">
              <LazyImage
                src={url}
                onClick={() => console.log("onclick img")}
                width={320}
                height="auto"
                title="Random Fox"
                className="rounded-lg bg-gray-300"
              />
              <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="pointer-events-none absolute inset-0 bg-black opacity-30 rounded-lg"></div>
                <div className="absolute inset-0 flex flex-col p-8 xs:p-4">
                  <div className="relative z-10 mt-auto break-words text-lg font-semibold text-white xs:text-xs lg:text-lg md:text-base">Look at this distinguish gentlemen.</div>
                </div>
              </div>
            </div>

          )
        })}
      </div>
    </main>

  );
}
