import React from "react";
import Image from "next/image";
import { getFileIcon } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
    type: string;
    extension: string;
    url?: string;
    imageClassName?: string;
    className?: string
}


const Thumbnail = ({ type, extension, url, imageClassName, className }: Props) => {

    const isImage = type === "image" && extension !== "svg";

    return <figure className={cn(
        'thumbnail',
        className
    )
    }>
        <Image
            unoptimized
            src={isImage && url? url : getFileIcon(extension, type)}
            alt='Thumbnail'
            width={100}
            height={100}
            className={cn(
                'size-8 object-contain',
                imageClassName,
                isImage && 'thumbnail-image'
            )}
        />
    </figure>
};

export default Thumbnail;