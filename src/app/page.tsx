"use client";
import ImageNext from "@/component/Image";
import Input from "@/component/Input";
import Text from "@/component/Text";
import useDebounce from "@/hook/useDebounce";
import { CollectionType, BannerListType } from "@/interface/home.interface";
import { useCollections, useMainBannerAll } from "@/service/useHomeService";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./page.css";

export default function Home() {
  const [dataCollectionList, setDataCollectionList] = useState<CollectionType[]>([]);
  const [dataBannerList, setDataBannerList] = useState<BannerListType[]>([]);

  const { getValues, watch, control } = useForm({
    defaultValues: {
      prearrangedDiscount: "",
      search: "",
      type: "SINGLE",
      viewType: "TILE",
    },
  });

  const debounceSearch = useDebounce(watch("search"), 1000);

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

  const {
    data: dataBanner,
    isPending: isPendingBanner,
    isSuccess: isSuccessBanner,
  } = useMainBannerAll();

  useEffect(() => {
    if (isSuccessCollection) {
      const { data } = dataCollection;
      const { items } = data;

      setDataCollectionList(items);
    }

    if (isSuccessBanner) {
      setDataBannerList(dataBanner?.data);
    }
  }, [isSuccessCollection, dataCollection, dataBanner, isSuccessBanner]);

  const isLoading = isPendingCollection || isPendingBanner;

  return (
    <main className="flex min-h-screen flex-col h-lvh overflow-auto">
      {isLoading && <Spin fullscreen />}

      {/* Header */}
      <div className="sticky top-0 p-6 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <ImageNext
                alt="logo"
                width={130}
                height={26}
                priority
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/logo/logo-new.svg`}
              />

              <div className="flex items-center gap-1 cursor-pointer">
                <ImageNext
                  alt="icon-category"
                  width={16}
                  height={16}
                  priority
                  src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/common/icon-category.svg`}
                />

                <Text label="카테고리" className="text-base text-green" />
              </div>
            </div>

            <Controller
              control={control}
              name="search"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  onChange={onChange}
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  name="search"
                  type="text"
                  required
                  placeholder="살까말까 고민된다면 검색해보세요!"
                  prefixIcon={
                    <ImageNext
                      alt="icon-search"
                      width={24}
                      height={24}
                      priority
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/common/search.svg`}
                    />
                  }
                  classNameInput="rounded w-[300px] border-0 p-3 ps-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm"
                />
              )}
            />

            <div className="flex items-center gap-2 cursor-pointer">
              <ImageNext
                alt="icon-category"
                width={28}
                height={28}
                priority
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/common/home-event.svg`}
              />

              <ImageNext
                alt="icon-search"
                width={1}
                height={14}
                priority
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/common/vertical-bar.svg`}
              />

              <Text label="카테고리" className="text-base text-green" />
            </div>
          </div>
        </div>
      </div>

      {/* Swiper */}
      <div className="relative h-[300px]">
        <Swiper
          pagination={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {dataBannerList?.map((itemBanner: BannerListType) => {
            return (
              <SwiperSlide key={itemBanner?.title}>
                <ImageNext
                  alt={itemBanner?.title}
                  width={1007}
                  height={336}
                  priority
                  src={itemBanner?.pcImageUrl || "placeholder-profile.png"}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
        {dataCollectionList.map((item: CollectionType) => {
          return <div key={item.id}>{item.title}</div>;
        })}
      </div>
    </main>
  );
}
