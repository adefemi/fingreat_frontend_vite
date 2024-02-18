import { cn } from "@/lib/utils";
import React from "react";

type ImageHolderProps = {
    imageUrl: string;
    className?: string;
    children?: React.ReactNode;
};

const ImageHolder = ({
    imageUrl,
    className,
    children,
}: ImageHolderProps) => {
    return (
        <div
            style={{ backgroundImage: `url(${imageUrl})` }}
            className={cn("bg-cover bg-center bg-no-repeat", className)}>
            <img src={imageUrl} alt="image" />
            {children}
        </div>
    );
};

export default ImageHolder;