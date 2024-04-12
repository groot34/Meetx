'use client'
import { tokenProvider } from "@/actions/stream.actions";

import { useUser } from "@clerk/nextjs";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: {children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  console.log(user);

  useEffect(() => {
    if (!isLoaded || !user) {
      return;
    }
    if (!apiKey) throw new Error("Stream Api key is Missing");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });
    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) {
    return <Loader />;
  }
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
