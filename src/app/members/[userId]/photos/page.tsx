import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { Image } from "@nextui-org/react";
import React from "react";

export default async function PhotosPage({
  params,
}: {
  params: { userId: string };
}) {
  const photos = await getMemberPhotosByUserId(
    params.userId
  );
  return (
    <CardInnerWrapper
      header="Photos"
      body={
        <div className="grid grid-cols-5 gap-3">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id}>
                <Image
                  src={photo.url}
                  alt="Image of member"
                  className="object-cover aspect-square"
                />
              </div>
            ))}
        </div>
      }
    />
  );
}
