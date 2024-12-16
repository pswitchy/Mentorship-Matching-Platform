"use client";

import { auth } from "@/auth";
import { Photo, Role } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import React from "react";
import { Button, Image } from "@nextui-org/react";
import clsx from "clsx";
import {
  ImCheckmark,
  ImCross,
} from "react-icons/im";
import { useRole } from "@/hooks/useRole";
import {
  approvePhoto,
  rejectPhoto,
} from "@/app/actions/adminActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  photo: Photo | null;
};

export default function MemberImage({
  photo,
}: Props) {
  const role = useRole();
  const isAdmin = role === "ADMIN";
  const router = useRouter();

  if (!photo) return null;

  const approve = async (photoId: string) => {
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const reject = async (photo: Photo) => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className={clsx("rounded-2xl", {
            "opacity-40":
              !photo.isApproved && !isAdmin,
          })}
          priority
        />
      ) : (
        <Image
          src={photo?.url || "/images/user.png"}
          alt="Image of user"
        />
      )}
      {!photo?.isApproved && !isAdmin && (
        <div className="absolute bottom-2 w-full bg-slate-200 p-1">
          <div className="flex justify-center text-danger font-semibold">
            Awaiting approval
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="flex flex-row gap-2 mt-2">
          <Button
            onClick={() => approve(photo.id)}
            color="success"
            variant="bordered"
            fullWidth
          >
            <ImCheckmark size={20} />
          </Button>
          <Button
            onClick={() => reject(photo)}
            color="danger"
            variant="bordered"
            fullWidth
          >
            <ImCross size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
