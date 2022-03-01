import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import CardMedia from "@mui/material/CardMedia";

interface UserCardMediaProps {
  originImageUrl: string;
}
export default function UserCardMedia({
  originImageUrl
}: UserCardMediaProps): React.ReactElement {
  const { isLoading, isSuccess, data: imageUrl } = useQuery(
    "getImageUrl",
    async () => {
      if (originImageUrl) {
        const url = (await fetch(originImageUrl)).url;
        return url;
      }
      return "";
    },
    {
      enabled: !!originImageUrl,
      suspense: true
    }
  );

  useEffect(() => {
    console.log("is loading?", isLoading);
    console.log("is Success?", isSuccess);
    console.log("original", originImageUrl);
    console.log("imageUrl", imageUrl);
  }, [isLoading, isSuccess, originImageUrl, imageUrl]);

  return (
    <CardMedia component="img" height="140" image={imageUrl} alt="user image" />
  );
}
