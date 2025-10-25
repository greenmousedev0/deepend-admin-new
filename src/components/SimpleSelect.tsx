import apiClient, { type ApiResponse } from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, type PropsWithChildren } from "react";

interface SimpleSelect<T> extends PropsWithChildren {
  route: string;
  value: any;
  onChange: (value: string) => void;
  label?: string;
  render: (item: T) => any;
}

export default function SimpleSelect<T>(props: SimpleSelect<T>) {
  const query = useQuery<ApiResponse>({
    queryKey: ["select", props.route],
    queryFn: async () => {
      const response = await apiClient.get(`${props.route}`, {
        params: {
          limit: 50,
        },
      });
      return response.data;
    },
  });

  const label = props.label || "Select";
  if (query.isLoading)
    return (
      <div className="w-full">
        <label htmlFor="" className="mb-2 fieldset-label">
          {label}
        </label>
        <select disabled name="" className="select w-full" id="">
          <option value="">Loading</option>
        </select>
      </div>
    );

  if (query.isError)
    return (
      <div className="w-full ">
        <label htmlFor="" className="mb-2 fieldset-label">
          {label}
        </label>
        <select disabled name="" className="select w-full" id="">
          <option value="">Error loading options</option>
        </select>
      </div>
    );

  const items: T[] = query.data?.payload ?? [];

  return (
    <div className="w-full">
      <label htmlFor="" className="mb-2 fieldset-label">
        {label}
      </label>
      <select
        value={props.value}
        onChange={(e) => {
          // console.log(e.target.value);
          props.onChange(e.target.value);
        }}
        className="select w-full"
      >
        {items.map((item, idx) => props.render(item))}
      </select>
    </div>
  );
}
