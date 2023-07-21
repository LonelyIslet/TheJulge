import Image from "next/image";
import Link from "next/link";
import CommonBtn from "components/common/CommonBtn/CommonBtn";
import { ButtonSize, ButtonStyle } from "types/enums/button.enum";
import styles from "./ShopCard.module.scss";

interface ShopCardProps {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  description: string;
  category: string;
}

const ShopCard = ({
  id, name, address, imageUrl, description, category,
}: ShopCardProps) => {
  return (
    <section className={styles.shopCard}>
      <div className={styles.shopImageContainer}>
        <Image
          src={imageUrl}
          className={styles.shopImage}
          alt="Shop Card"
          fill
          priority
        />
      </div>
      <div className={styles.shopDescriptionContainer}>
        <h3 className={styles.subtitle}>{category}</h3>
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.addressContainer}>
          <Image
            src="/images/location-red.svg"
            className={styles.icon}
            alt="Location"
            width={20}
            height={20}
          />
          <p className={styles.address}>{address}</p>
        </div>
        <p className={styles.description}>
          {description}
        </p>
        <div className={styles.buttonContainer}>
          <Link href="/my-shop/edit" className={styles.button}>
            <CommonBtn style={ButtonStyle.OUTLINE} size={ButtonSize.LARGE} type="submit" responsive>편집하기</CommonBtn>
          </Link>
          <Link href={`/shops/${id}/notices/write?id={}`} className={styles.button}>
            <CommonBtn style={ButtonStyle.SOLID} size={ButtonSize.LARGE} type="submit" responsive>공고 등록하기</CommonBtn>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopCard;
