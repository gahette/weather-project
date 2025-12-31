import { FC, SVGProps } from "react";

declare module "*.svg?react" {
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}