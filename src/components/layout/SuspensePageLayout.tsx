import type { QueryObserverResult } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import SimpleHeader from "../SimpleHeader";
import SimpleLoader from "../SimpleLoader";
import type { JSX } from "react/jsx-runtime";
import { extract_message } from "@/helpers/auth";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/api/apiClient";
import type React from "react";

interface QueryPageLayoutProps extends PropsWithChildren {
  query: QueryObserverResult | any;
  title?: string | JSX.Element;
  headerActions?: React.ReactNode | any;
}
export default function SuspensePageLayout(props: QueryPageLayoutProps) {
  if (props.query.error) {
    const error = extract_message(props.query.error as AxiosError<ApiResponse>);
    return (
      <>
        <SimpleHeader title={props.title}>{props.headerActions}</SimpleHeader>
        <div className="p-4 h-[520px] grid place-items-center bg-base-300 rounded-md">
          <div className="p-4 space-y-4 ">
            <div className="text-xl font-bold floating-label">{error}</div>
            <button
              className="btn btn-error btn-block"
              onClick={() => props.query.refetch()}
            >
              Reload
            </button>
          </div>
        </div>
      </>
    );
  }
  if (props.query.isSuccess || props.query.data)
    return (
      <>
        <SimpleHeader title={props.title}>{props.headerActions}</SimpleHeader>
        <div className="mt-4">{props.children}</div>
      </>
    );
}
