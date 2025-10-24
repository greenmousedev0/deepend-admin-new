import type { PropsWithChildren } from "react";
import SimpleLoader from "../SimpleLoader";
import SimpleHeader from "../SimpleHeader";

interface PageSkeletonProps extends PropsWithChildren {
  title: string | React.ReactNode;
}

export default function PageLoader(props: PageSkeletonProps) {
  return (
    <>
      {/*//@ts-ignore*/}
      <SimpleHeader title={props.title}>{props.children}</SimpleHeader>
      <SimpleLoader />
    </>
  );
}
