import Image from "next/image";
import { ButtonSize, ButtonStyle } from "types/enums/button.enum";
import styles from "./ShopCard.module.scss";
import CommonBtn from "../CommonBtn/CommonBtn";

interface IShopCardProps {
  name: string;
  address1: string;
  imageUrl: string;
  description: string;
  category: string;
}

const ShopCard = ({
  name, address1, imageUrl, description, category,
}: IShopCardProps) => {
  return (
    <section className={styles.shopCard}>
      <div className={styles.shopImageContainer}>
        <Image src={imageUrl} className={styles.shopImage} alt="shop-card" fill />
      </div>
      <div className={styles.shopDescriptionContainer}>
        <h3 className={styles.subtitle}>{category}</h3>
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.addressContainer}>
          <Image src="/images/location-red.svg" className={styles.icon} alt="location" width={20} height={20} />
          <p className={styles.address}>{address1}</p>
        </div>
        <p className={styles.description}>
          {description}
        </p>
        <div className={styles.buttonContainer}>
          <CommonBtn style={ButtonStyle.OUTLINE} size={ButtonSize.LARGE} type="submit" message="편집하기" responsive />
          <CommonBtn style={ButtonStyle.SOLID} size={ButtonSize.LARGE} type="submit" message="공고 등록하기" responsive />
        </div>
      </div>
    </section>
  );
};

export default ShopCard;
