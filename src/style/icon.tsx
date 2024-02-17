import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const IconSearch = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.0066 19.0065H19.9533L19.58 18.6465C20.8866 17.1265 21.6733 15.1532 21.6733 13.0065C21.6733 8.21984 17.7933 4.33984 13.0066 4.33984C8.21997 4.33984 4.33997 8.21984 4.33997 13.0065C4.33997 17.7932 8.21997 21.6732 13.0066 21.6732C15.1533 21.6732 17.1266 20.8865 18.6466 19.5798L19.0066 19.9532V21.0065L25.6733 27.6598L27.66 25.6732L21.0066 19.0065ZM13.0066 19.0065C9.68663 19.0065 7.00663 16.3265 7.00663 13.0065C7.00663 9.68651 9.68663 7.00651 13.0066 7.00651C16.3266 7.00651 19.0066 9.68651 19.0066 13.0065C19.0066 16.3265 16.3266 19.0065 13.0066 19.0065Z"
      fill="black"
    />
  </svg>
);

export const SearchIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={IconSearch} {...props} />
);
