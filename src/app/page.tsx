"use client";
import ImageNext from "@/components/Image";
import Input from "@/components/Input";
import Text from "@/components/Text";
import useDebounce from "@/hook/useDebounce";
import {
  CollectionType,
  BannerListType,
  MainShortcutAll,
  ItemCollectionType,
} from "@/interface/home.interface";
import { useCollections, useMainBannerAll, useMainShortcutAll } from "@/service/useHomeService";
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
import { UseFormatAmount } from "@/hook/useFormatAmount";

export default function Home() {
  const [dataCollectionList, setDataCollectionList] = useState<CollectionType[]>([]);
  const [dataBannerList, setDataBannerList] = useState<BannerListType[]>([]);
  const [dataShortcutList, setDataShortcutList] = useState<MainShortcutAll[]>([]);

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

  const {
    data: dataShortcut,
    isPending: isPendingShortcut,
    isSuccess: isSuccessShortcut,
  } = useMainShortcutAll();

  useEffect(() => {
    if (isSuccessCollection) {
      const { data } = dataCollection;
      const { items } = data;

      setDataCollectionList(items);
    }

    if (isSuccessBanner) {
      setDataBannerList(dataBanner?.data);
    }

    if (isSuccessShortcut) {
      setDataShortcutList(dataShortcut?.data);
    }
  }, [
    isSuccessCollection,
    dataCollection,
    dataBanner,
    isSuccessBanner,
    isSuccessShortcut,
    dataShortcut,
  ]);

  const isLoading = isPendingCollection || isPendingBanner || isPendingShortcut;

  const listHotDeal: any = dataCollectionList?.find(
    (filterCollection: CollectionType) => filterCollection.title === "HOT DEAL"
  );

  const listNewIn: any = dataCollectionList?.find(
    (filterCollection: CollectionType) => filterCollection.title === "New In"
  );

  const listTv: any = dataCollectionList?.find(
    (filterCollection: CollectionType) =>
      filterCollection.title === "저렴한 거격과 보장된 성능, 더함 TV"
  );

  const listTopSeven: any = dataCollectionList?.find(
    (filterCollection: CollectionType) =>
      filterCollection.title === "판매량 TOP7  가성비 인기가전 모음"
  );

  const listPC: any = dataCollectionList?.find(
    (filterCollection: CollectionType) =>
      filterCollection.title === "성능보장, PC주변기기 & 스피커 추천"
  );

  const listPhone: any = dataCollectionList?.find(
    (filterCollection: CollectionType) =>
      filterCollection.title === "품절임박! 마지막 수량 한정특가 상품"
  );

  const listGame: any = dataCollectionList?.find(
    (filterCollection: CollectionType) => filterCollection.title === "게임기기 최저가 & 신작 모음"
  );

  const listMouse: any = dataCollectionList?.find(
    (filterCollection: CollectionType) =>
      filterCollection.title === "로지텍 AS보장 정품 마우스/키보드 단독특가"
  );

  const listLcd: any = dataCollectionList?.find(
    (filterCollection: CollectionType) => filterCollection.title === "맥북 클리어런스 세일!"
  );

  return (
    <main className="flex min-h-screen flex-col h-lvh overflow-auto">
      {isLoading && <Spin fullscreen />}

      {/* Header */}
      <div className="sticky top-0 p-6 bg-white z-10">
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
        {/* Shortcut Icon */}
        <div className="flex gap-10 items-center justify-center mt-10">
          {dataShortcutList?.map((itemShortCut: MainShortcutAll) => {
            return (
              <div
                className="flex flex-col items-center gap-2 cursor-pointer justify-center"
                key={itemShortCut.title}
              >
                <ImageNext
                  alt={itemShortCut.title}
                  width={62}
                  height={62}
                  priority
                  src={itemShortCut.imageUrl}
                />

                <Text label={itemShortCut.title} className="text-base text-black" />
              </div>
            );
          })}
        </div>

        {/* Hot Deal */}
        <div className="flex items-start mt-10">
          <div className="w-1/4 flex flex-col">
            <Text label="HOT DEAL" className="text-2xl font-semibold text-black" />
            <Text label="HAPPY HOUR" className="text-xs text-gray" />
          </div>

          <div className="w-3/4 flex gap-2 overflow-x-auto whitespace-nowrap">
            {listHotDeal?.items?.map((itemHotDeal: ItemCollectionType) => {
              return (
                <div key={itemHotDeal.key} className="rounded w-[174px] h-[250px]">
                  <ImageNext
                    alt={itemHotDeal.name}
                    width={174}
                    height={174}
                    priority
                    src={itemHotDeal.publication.media[0].uri}
                    className="w-[174px] h-auto rounded"
                  />

                  <Text
                    label={itemHotDeal.publication.productName}
                    className="text-xs text-black text-pretty"
                  />

                  {/* Price */}
                  <div className="flex mt-2">
                    <Text
                      label={
                        itemHotDeal.publication.priceInfo.couponDiscountRate
                          ? String(itemHotDeal.publication.priceInfo.couponDiscountRate + "%")
                          : " "
                      }
                      className="text-xs text-red text-pretty"
                    />

                    <Text
                      label={String(
                        UseFormatAmount(
                          itemHotDeal.publication.priceInfo.discountPrice ||
                            itemHotDeal.publication.priceInfo.couponDiscountPrice ||
                            itemHotDeal.publication.priceInfo.price
                        )
                      )}
                      className="text-xs text-black text-pretty"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <ImageNext
                      alt={itemHotDeal.name}
                      width={12}
                      height={12}
                      priority
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/star/star-darkgray.svg`}
                      className="w-auto h-auto rounded"
                    />
                    <Text
                      label={String(itemHotDeal.publication.rating)}
                      className="text-xs text-black text-pretty"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* New In */}
        <div className="flex items-start mt-10">
          <div className="w-1/4 flex flex-col">
            <Text label="NEW IN" className="text-2xl font-semibold text-black" />
            <Text label="#주목할만한신상품" className="text-xs text-gray" />
          </div>

          <div className="w-3/4 flex gap-2 overflow-x-auto whitespace-nowrap">
            {listNewIn?.items?.map((itemHotDeal: ItemCollectionType) => {
              return (
                <div key={itemHotDeal.key} className="rounded w-[174px] h-[250px]">
                  <ImageNext
                    alt={itemHotDeal.name}
                    width={174}
                    height={174}
                    priority
                    src={itemHotDeal.publication.media[0].uri}
                    className="w-[174px] h-auto rounded"
                  />

                  <Text
                    label={itemHotDeal.publication.productName}
                    className="text-xs text-black text-pretty"
                  />

                  {/* Price */}
                  <div className="flex mt-2">
                    <Text
                      label={
                        itemHotDeal.publication.priceInfo.couponDiscountRate
                          ? String(itemHotDeal.publication.priceInfo.couponDiscountRate + "%")
                          : " "
                      }
                      className="text-xs text-red text-pretty"
                    />

                    <Text
                      label={String(
                        UseFormatAmount(
                          itemHotDeal.publication.priceInfo.discountPrice ||
                            itemHotDeal.publication.priceInfo.couponDiscountPrice ||
                            itemHotDeal.publication.priceInfo.price
                        )
                      )}
                      className="text-xs text-black text-pretty"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <ImageNext
                      alt={itemHotDeal.name}
                      width={12}
                      height={12}
                      priority
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/star/star-darkgray.svg`}
                      className="w-auto h-auto rounded"
                    />
                    <Text
                      label={String(itemHotDeal.publication.rating)}
                      className="text-xs text-black text-pretty"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TV */}
        <div className="flex items-start mt-10">
          <div className="w-1/4 flex flex-col">
            <Text
              label="저렴한 거격과 보장된 성능, 더함 TV"
              className="text-2xl font-semibold text-black"
            />
            <Text label="사은품 증정이벤트" className="text-xs text-gray" />
          </div>

          <div className="w-3/4 flex gap-2 overflow-x-auto whitespace-nowrap">
            {listTv?.items?.map((itemHotDeal: ItemCollectionType) => {
              return (
                <div key={itemHotDeal.key} className="rounded w-[174px] h-[250px]">
                  <ImageNext
                    alt={itemHotDeal.name}
                    width={174}
                    height={174}
                    priority
                    src={itemHotDeal.publication.media[0].uri}
                    className="w-[174px] h-auto rounded"
                  />

                  <Text
                    label={itemHotDeal.publication.productName}
                    className="text-xs text-black text-pretty"
                  />

                  {/* Price */}
                  <div className="flex mt-2">
                    <Text
                      label={
                        itemHotDeal.publication.priceInfo.couponDiscountRate
                          ? String(itemHotDeal.publication.priceInfo.couponDiscountRate + "%")
                          : " "
                      }
                      className="text-xs text-red text-pretty"
                    />

                    <Text
                      label={String(
                        UseFormatAmount(
                          itemHotDeal.publication.priceInfo.discountPrice ||
                            itemHotDeal.publication.priceInfo.couponDiscountPrice ||
                            itemHotDeal.publication.priceInfo.price
                        )
                      )}
                      className="text-xs text-black text-pretty"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <ImageNext
                      alt={itemHotDeal.name}
                      width={12}
                      height={12}
                      priority
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/star/star-darkgray.svg`}
                      className="w-auto h-auto rounded"
                    />
                    <Text
                      label={String(itemHotDeal.publication.rating)}
                      className="text-xs text-black text-pretty"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Seven */}
        <div className="flex items-start mt-10">
          <div className="w-1/4 flex flex-col">
            <Text
              label="판매량 TOP7 가성비 인기가전 모음"
              className="text-2xl font-semibold text-black"
            />
            <Text label="가격,성능,디자인까지" className="text-xs text-gray" />
          </div>

          <div className="w-3/4 flex gap-2 overflow-x-auto whitespace-nowrap">
            {listTopSeven?.items?.map((itemHotDeal: ItemCollectionType) => {
              return (
                <div key={itemHotDeal.key} className="rounded w-[174px] h-[250px]">
                  <ImageNext
                    alt={itemHotDeal.name}
                    width={174}
                    height={174}
                    priority
                    src={itemHotDeal.publication.media[0].uri}
                    className="w-[174px] h-auto rounded"
                  />

                  <Text
                    label={itemHotDeal.publication.productName}
                    className="text-xs text-black text-pretty"
                  />

                  {/* Price */}
                  <div className="flex mt-2">
                    <Text
                      label={
                        itemHotDeal.publication.priceInfo.couponDiscountRate
                          ? String(itemHotDeal.publication.priceInfo.couponDiscountRate + "%")
                          : " "
                      }
                      className="text-xs text-red text-pretty"
                    />

                    <Text
                      label={String(
                        UseFormatAmount(
                          itemHotDeal.publication.priceInfo.discountPrice ||
                            itemHotDeal.publication.priceInfo.couponDiscountPrice ||
                            itemHotDeal.publication.priceInfo.price
                        )
                      )}
                      className="text-xs text-black text-pretty"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <ImageNext
                      alt={itemHotDeal.name}
                      width={12}
                      height={12}
                      priority
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/star/star-darkgray.svg`}
                      className="w-auto h-auto rounded"
                    />
                    <Text
                      label={String(itemHotDeal.publication.rating)}
                      className="text-xs text-black text-pretty"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PC */}
        <div className="flex items-start mt-10">
          <div className="w-1/4 flex flex-col">
            <Text
              label="성능보장, PC주변기기 & 스피커 추천"
              className="text-2xl font-semibold text-black"
            />
            <Text label="#LG #앱코 #BOSE" className="text-xs text-gray" />
          </div>

          <div className="w-3/4 flex gap-2 overflow-x-auto whitespace-nowrap">
            {listPC?.items?.map((itemHotDeal: ItemCollectionType) => {
              return (
                <div key={itemHotDeal.key} className="rounded w-[174px] h-[250px]">
                  <ImageNext
                    alt={itemHotDeal.name}
                    width={174}
                    height={174}
                    priority
                    src={itemHotDeal.publication.media[0].uri}
                    className="w-[174px] h-auto rounded"
                  />

                  <Text
                    label={itemHotDeal.publication.productName}
                    className="text-xs text-black text-pretty"
                  />

                  {/* Price */}
                  <div className="flex mt-2">
                    <Text
                      label={
                        itemHotDeal.publication.priceInfo.couponDiscountRate
                          ? String(itemHotDeal.publication.priceInfo.couponDiscountRate + "%")
                          : " "
                      }
                      className="text-xs text-red text-pretty"
                    />

                    <Text
                      label={String(
                        UseFormatAmount(
                          itemHotDeal.publication.priceInfo.discountPrice ||
                            itemHotDeal.publication.priceInfo.couponDiscountPrice ||
                            itemHotDeal.publication.priceInfo.price
                        )
                      )}
                      className="text-xs text-black text-pretty"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <ImageNext
                      alt={itemHotDeal.name}
                      width={12}
                      height={12}
                      priority
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/star/star-darkgray.svg`}
                      className="w-auto h-auto rounded"
                    />
                    <Text
                      label={String(itemHotDeal.publication.rating)}
                      className="text-xs text-black text-pretty"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start mt-10">
          <div className="w-1/4 flex flex-col">
            <Text
              label="품절임박! 마지막 수량 한정특가 상품"
              className="text-2xl font-semibold text-black"
            />
            <Text label="고민하면 품절!" className="text-xs text-gray" />
          </div>

          <div className="w-3/4 flex gap-2 overflow-x-auto whitespace-nowrap">
            {listPhone?.items?.map((itemHotDeal: ItemCollectionType) => {
              return (
                <div key={itemHotDeal.key} className="rounded w-[174px] h-[250px]">
                  <ImageNext
                    alt={itemHotDeal.name}
                    width={174}
                    height={174}
                    priority
                    src={itemHotDeal.publication.media[0].uri}
                    className="w-[174px] h-auto rounded"
                  />

                  <Text
                    label={itemHotDeal.publication.productName}
                    className="text-xs text-black text-pretty"
                  />

                  {/* Price */}
                  <div className="flex mt-2">
                    <Text
                      label={
                        itemHotDeal.publication.priceInfo.couponDiscountRate
                          ? String(itemHotDeal.publication.priceInfo.couponDiscountRate + "%")
                          : " "
                      }
                      className="text-xs text-red text-pretty"
                    />

                    <Text
                      label={String(
                        UseFormatAmount(
                          itemHotDeal.publication.priceInfo.discountPrice ||
                            itemHotDeal.publication.priceInfo.couponDiscountPrice ||
                            itemHotDeal.publication.priceInfo.price
                        )
                      )}
                      className="text-xs text-black text-pretty"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <ImageNext
                      alt={itemHotDeal.name}
                      width={12}
                      height={12}
                      priority
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/star/star-darkgray.svg`}
                      className="w-auto h-auto rounded"
                    />
                    <Text
                      label={String(itemHotDeal.publication.rating)}
                      className="text-xs text-black text-pretty"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Game */}
        <div className="flex items-start mt-10">
          <div className="w-1/4 flex flex-col">
            <Text
              label="게임기기 최저가 & 신작 모음게임기기 최저가 & 신작 모음"
              className="text-2xl font-semibold text-black"
            />
            <Text label="#한정수량 특가 #기대신작" className="text-xs text-gray" />
          </div>

          <div className="w-3/4 flex gap-2 overflow-x-auto whitespace-nowrap">
            {listGame?.items?.map((itemHotDeal: ItemCollectionType) => {
              return (
                <div key={itemHotDeal.key} className="rounded w-[174px] h-[250px]">
                  <ImageNext
                    alt={itemHotDeal.name}
                    width={174}
                    height={174}
                    priority
                    src={itemHotDeal.publication.media[0].uri}
                    className="w-[174px] h-auto rounded"
                  />

                  <Text
                    label={itemHotDeal.publication.productName}
                    className="text-xs text-black text-pretty"
                  />

                  {/* Price */}
                  <div className="flex mt-2">
                    <Text
                      label={
                        itemHotDeal.publication.priceInfo.couponDiscountRate
                          ? String(itemHotDeal.publication.priceInfo.couponDiscountRate + "%")
                          : " "
                      }
                      className="text-xs text-red text-pretty"
                    />

                    <Text
                      label={String(
                        UseFormatAmount(
                          itemHotDeal.publication.priceInfo.discountPrice ||
                            itemHotDeal.publication.priceInfo.couponDiscountPrice ||
                            itemHotDeal.publication.priceInfo.price
                        )
                      )}
                      className="text-xs text-black text-pretty"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <ImageNext
                      alt={itemHotDeal.name}
                      width={12}
                      height={12}
                      priority
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/star/star-darkgray.svg`}
                      className="w-auto h-auto rounded"
                    />
                    <Text
                      label={String(itemHotDeal.publication.rating)}
                      className="text-xs text-black text-pretty"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mouse */}
        <div className="flex items-start mt-10">
          <div className="w-1/4 flex flex-col">
            <Text
              label="로지텍 AS보장 정품 마우스/키보드 단독특가"
              className="text-2xl font-semibold text-black"
            />
            <Text
              label="#병행수입 아닌 정품 제품으로 확실한 AS보장!"
              className="text-xs text-gray"
            />
          </div>

          <div className="w-3/4 flex gap-2 overflow-x-auto whitespace-nowrap">
            {listMouse?.items?.map((itemHotDeal: ItemCollectionType) => {
              return (
                <div key={itemHotDeal.key} className="rounded w-[174px] h-[250px]">
                  <ImageNext
                    alt={itemHotDeal.name}
                    width={174}
                    height={174}
                    priority
                    src={itemHotDeal.publication.media[0].uri}
                    className="w-[174px] h-auto rounded"
                  />

                  <Text
                    label={itemHotDeal.publication.productName}
                    className="text-xs text-black text-pretty"
                  />

                  {/* Price */}
                  <div className="flex mt-2">
                    <Text
                      label={
                        itemHotDeal.publication.priceInfo.couponDiscountRate
                          ? String(itemHotDeal.publication.priceInfo.couponDiscountRate + "%")
                          : " "
                      }
                      className="text-xs text-red text-pretty"
                    />

                    <Text
                      label={String(
                        UseFormatAmount(
                          itemHotDeal.publication.priceInfo.discountPrice ||
                            itemHotDeal.publication.priceInfo.couponDiscountPrice ||
                            itemHotDeal.publication.priceInfo.price
                        )
                      )}
                      className="text-xs text-black text-pretty"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <ImageNext
                      alt={itemHotDeal.name}
                      width={12}
                      height={12}
                      priority
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/star/star-darkgray.svg`}
                      className="w-auto h-auto rounded"
                    />
                    <Text
                      label={String(itemHotDeal.publication.rating)}
                      className="text-xs text-black text-pretty"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LCD */}
        <div className="flex items-start mt-10">
          <div className="w-1/4 flex flex-col">
            <Text label="맥북 클리어런스 세일!" className="text-2xl font-semibold text-black" />
            <Text
              label="오직 테스트밸리에서만! 30일 체험해보고 구매하자"
              className="text-xs text-gray"
            />
          </div>

          <div className="w-3/4 flex gap-2 overflow-x-auto whitespace-nowrap">
            {listLcd?.items?.map((itemHotDeal: ItemCollectionType) => {
              return (
                <div key={itemHotDeal.key} className="rounded w-[174px] h-[250px]">
                  <ImageNext
                    alt={itemHotDeal.name}
                    width={174}
                    height={174}
                    priority
                    src={itemHotDeal.publication.media[0].uri}
                    className="w-[174px] h-auto rounded"
                  />

                  <Text
                    label={itemHotDeal.publication.productName}
                    className="text-xs text-black text-pretty"
                  />

                  {/* Price */}
                  <div className="flex mt-2">
                    <Text
                      label={
                        itemHotDeal.publication.priceInfo.couponDiscountRate
                          ? String(itemHotDeal.publication.priceInfo.couponDiscountRate + "%")
                          : " "
                      }
                      className="text-xs text-red text-pretty"
                    />

                    <Text
                      label={String(
                        UseFormatAmount(
                          itemHotDeal.publication.priceInfo.discountPrice ||
                            itemHotDeal.publication.priceInfo.couponDiscountPrice ||
                            itemHotDeal.publication.priceInfo.price
                        )
                      )}
                      className="text-xs text-black text-pretty"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <ImageNext
                      alt={itemHotDeal.name}
                      width={12}
                      height={12}
                      priority
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/star/star-darkgray.svg`}
                      className="w-auto h-auto rounded"
                    />
                    <Text
                      label={String(itemHotDeal.publication.rating)}
                      className="text-xs text-black text-pretty"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* {dataCollectionList.map((item: CollectionType) => {
          return <div key={item.id}>{item.title}</div>;
        })} */}
      </div>
    </main>
  );
}
