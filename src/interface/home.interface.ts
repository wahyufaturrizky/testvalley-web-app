import { CommonResponseType } from "@/interface/common.interface";
interface MediaPublicationType {
  seq: number;
  type: string;
  uri: string;
  mimeType: string;
  deviceType: null;
}

interface PriceInfoPublicationType {
  price: number;
  discountPrice: number;
  discountRate: number;
}

interface DiscountPublicationType {
  id: number;
  name: null;
  type: string;
  calcMethod: string;
  value: number;
  activeFrom: null;
  activeTo: null;
  qty: number;
  remain: null;
}

interface PublicationType {
  id: number;
  title: string;
  code: string;
  productId: number;
  prdType: number;
  detailEntity: string;
  offeringType: string;
  rating: number;
  isExistResidual: boolean;
  isAdult: number;
  preface: string;
  prefaceIconUrl: string;
  productName: string;
  brandName: string;
  media: MediaPublicationType[];
  isTrial: boolean;
  tagsOnImage: string[];
  tagsOnDesc: string[];
  priceInfo: PriceInfoPublicationType;
  discounts: DiscountPublicationType[];
  applyCoupon: boolean;
}

interface ItemCollectionType {
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  uuid: string;
  name: string;
  body: null;
  collectionId: number;
  key: string;
  seq: number;
  entityType: string;
  entityId: number;
  optionKey: null;
  publication: PublicationType;
  prdType: number;
}

interface MediaCollectionType {
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  uuid: string;
  mimeType: string;
  uri: string;
  fileName: string;
  objectKey: string;
  deviceType: null;
  collectionId: number;
  seq: number;
  itemKey: null;
  type: string;
}

interface ThumbnailCollectionType {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  uuid: string;
  mimeType: string;
  uri: string;
  fileName: string;
  objectKey: string;
  deviceType: null;
  collectionId: number;
  seq: number;
  itemKey: null;
  type: string;
}

interface TagType {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  id: number;
  code: string;
  name: string;
  description: null;
  type: string;
}

interface TaggingsCollectionType {
  createdAt: "2023-09-22T08:47:04.339Z";
  updatedAt: "2023-09-22T08:47:04.339Z";
  deletedAt: null;
  collectionId: 1928;
  tagId: 371905;
  isOpen: true;
  tag: TagType;
}

export interface CollectionType {
  id: number;
  type: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  trialPeriod: null;
  installmentPrice: null;
  installmentPeriod: null;
  rating: number;
  startDate: null;
  endDate: null;
  viewType: null;
  createdAt: string;
  items: ItemCollectionType[];
  media: MediaCollectionType[];
  thumbnail: ThumbnailCollectionType;
  taggings: TaggingsCollectionType[];
  singleCollections: [];
}

export interface DataResponseType extends CommonResponseType {
  data: {
    items: CollectionType[];
    totalCount: number;
  };
}
