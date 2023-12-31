import Image from "next/image";

interface CustomArrowProps {
  percentage: number;
  isClosed: boolean;
}

const getArrowImageSource = ({
  percentage,
  isClosed,
}: CustomArrowProps) => {
  if (isClosed) {
    return "/images/arrow-gray.svg";
  }

  if (percentage > 75) {
    return "/images/arrow-red-primary.svg";
  }

  if (percentage > 50) {
    return "/images/arrow-red-40.svg";
  }

  if (percentage > 25) {
    return "/images/arrow-red-30.svg";
  }

  return "/images/arrow-red-20.svg";
};

const CustomArrow = ({ isClosed, percentage }: CustomArrowProps) => {
  return (
    <Image src={getArrowImageSource({ isClosed, percentage })} alt="arrow" width={10} height={10} />
  );
};

export default CustomArrow;
