"use client";

import { CollectionType } from "@/interface/home.interface";
import { useCollections } from "@/service/useHomeService";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [dataCollectionList, setDataCollectionList] = useState<CollectionType[]>([]);

  const { getValues } = useForm({
    defaultValues: {
      prearrangedDiscount: "",
      type: "SINGLE",
      viewType: "TILE",
    },
  });

  const {
    data: dataCollection,
    isPending: isPendingCollection,
    isSuccess: isSuccessCollection,
  } = useCollections({
    query: {
      prearrangedDiscount: getValues("prearrangedDiscount"),
      type: getValues("type"),
      viewType: getValues("viewType"),
    },
  });

  useEffect(() => {
    if (isSuccessCollection) {
      const { data } = dataCollection;
      const { items } = data;

      setDataCollectionList(items);
    }
  }, [isSuccessCollection, dataCollection]);

  return (
    <main className="flex min-h-screen flex-col h-lvh overflow-auto">
      <div className="sticky top-0"></div>

      {isPendingCollection && <Spin fullscreen />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {dataCollectionList.map((item: CollectionType) => {
            return <div key={item.id}>{item.title}</div>;
          })}
        </div>
      </div>
    </main>
  );
}
