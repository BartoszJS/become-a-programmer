import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Plans from "@/components/Plans";
import useAuth from "@/hooks/useAuth";
import useSubscriptionAngular from "@/hooks/useSubscriptionAngular";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { client } from "../client";
import Video from "@/types/Video";

const angular = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<any[]>([]);
  const [full, setFull] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const angularAccess = useSubscriptionAngular(user);
  const [showComponent, setShowComponent] = useState(false);
  const [trial, setTrial] = useState(false);

  useEffect(() => {
    const query = `*[_type == "angular"]{
        id,
        title,
        "imageUrl": image.asset->url,
        full,
        intro,
        description,
       }`;
    client
      .fetch(query)
      .then((data) => {
        data.sort((a: Video, b: Video) => a.id - b.id);
        setVideos(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      setFull(videos[0].full);
      setDescription(videos[0].description);
    }
  }, [videos]);

  const handleContextMenu = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    setInterval(() => {
      setTrial(true);
    }, 2000);
    setInterval(() => {
      setShowComponent(true);
    }, 8000);
  }, []);

  if (!angularAccess && !videos) {
    return (
      <div>
        <div className='w-screen h-screen flex justify-center align-middle'>
          <Loader color='dark:fill-gray-300' />
        </div>
      </div>
    );
  } else if (!angularAccess) {
    if (showComponent) {
      return <Plans />;
    } else {
      return (
        <div>
          <Head>
            <title>Become A Programmer</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Header />
          {trial && (
            <div>
              <h1 className='text-red-600 z-1000 text-5xl absolute left-0 right-0 top-20 mx-auto w-fit'>
                Trial Access
              </h1>
              <h1 className='text-white-400 z-1000 text-4xl absolute left-0 right-0 top-32 mx-auto w-fit'>
                buy a full course
              </h1>
            </div>
          )}
          <div className='mt-[60px] grid-container grid grid-cols-5'>
            <div className='item2 col-span-4 bg-black '>
              <video
                onContextMenu={handleContextMenu}
                controls
                controlsList='nodownload'
                aria-disabled='true'
                autoPlay
                style={{
                  outline: "none",
                  boxShadow: "none",
                  maxHeight: "80vh",
                  marginTop: "0px",
                  width: "100%",
                  zIndex: 50,
                }}
                src={`https://h1114051.domeny.host/${full}`}
              ></video>
              <div className='flex mt-[2vh] text-xs mx-[10%]'>
                <p>{description}</p>
              </div>
            </div>
            <div className='item1 col-span-1 mx-1'>
              <div className='flex flex-col'>
                {videos.map((video, index) => (
                  <div
                    className='w-[100%] cursor-pointer'
                    onClick={() => {
                      setFull(video.full);
                      setTitle(video.title);
                      setDescription(video.description);
                    }}
                    key={index}
                  >
                    <span>{video.id + " " + video.title}</span>
                    <img
                      className='opacity-100 h-full'
                      alt='banner'
                      src={video.imageUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <Head>
        <title>Become A Programmer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='mt-[60px] grid-container grid grid-cols-5'>
        <div className='item2 col-span-4 bg-black '>
          <video
            onContextMenu={handleContextMenu}
            controls
            controlsList='nodownload'
            aria-disabled='true'
            autoPlay
            style={{
              outline: "none",
              boxShadow: "none",
              maxHeight: "80vh",
              marginTop: "0px",
              width: "100%",
              zIndex: 50,
            }}
            src={`https://h1114051.domeny.host/${full}`}
          ></video>
          <div className='flex mt-[2vh] text-xs mx-[10%]'>
            <p>{description}</p>
          </div>
        </div>
        <div className='item1 col-span-1 mx-1'>
          <div className='flex flex-col'>
            {videos.map((video, index) => (
              <div
                className='w-[100%] cursor-pointer'
                onClick={() => {
                  setFull(video.full);
                  setTitle(video.title);
                  setDescription(video.description);
                }}
                key={index}
              >
                <span>{video.id + " " + video.title}</span>
                <img
                  className='opacity-100 h-full'
                  alt='banner'
                  src={video.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default angular;
