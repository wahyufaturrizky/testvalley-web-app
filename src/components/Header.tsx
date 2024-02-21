import ImageNext from "@/components/Image";
import Text from "./Text";

const Header = () => {
  return (
    <div className="sticky top-0 p-6 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
        <div className="flex items-center gap-6">
          <ImageNext
            alt="logo"
            width={130}
            height={26}
            priority
            src="https://www.testvalley.kr/logo/logo-new.svg"
          />

          <div className="flex items-center gap-4">
            <ImageNext
              alt="icon-category"
              width={16}
              height={16}
              priority
              src="https://www.testvalley.kr/common/icon-category.svg"
            />

            <Text label="카테고리" className="text-base text-green" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
