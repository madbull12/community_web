import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  src: string;
  fallback:string;
  className:string;
};

const UserAvatar: FC<Props> = ({ src,fallback,...props }) => {
  return (
    <Avatar {...props}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
