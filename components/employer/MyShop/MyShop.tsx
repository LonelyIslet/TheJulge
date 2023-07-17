import {
  CommonLayout, ShopCard,
} from "components/common";

interface MyShopProps {
  name: string,
  address: string,
  imageUrl: string,
  description: string,
  category: string,
}

const MyShop = ({
  name, address, imageUrl, description, category,
}: MyShopProps) => {
  return (
    <CommonLayout position="above">
      <div>
        <h2>내 가게</h2>
      </div>
      <article>
        <ShopCard
          name={name}
          address={address}
          imageUrl={imageUrl}
          description={description}
          category={category}
        />
      </article>
    </CommonLayout>
  );
};

export default MyShop;
