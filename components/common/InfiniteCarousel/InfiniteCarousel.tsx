"use client";

import {
  useCallback, useEffect, useRef, useState,
} from "react";
import Image from "next/image";
import {
  PanInfo, ValueAnimationTransition, animate, motion, useMotionValue,
} from "framer-motion";
import ItemFrame from "./ItemFrame";
import styles from "./InfiniteCarousel.module.scss";

const transition: ValueAnimationTransition = {
  type: "spring",
  bounce: 0,
};

export type DragHandler = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;

interface InfiniteCarouselProps {
  children: ({ index }:{ index:number }) => React.ReactNode;
  itemCount: number;
  itemsPerView?: number;
}

const InfiniteCarousel = ({ children, itemCount, itemsPerView = 3 }: InfiniteCarouselProps) => {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const fillerArray = Array(...Array<number>(itemCount)).map((_, i) => { return i; });
  const fillerArrayReverse = fillerArray.reverse().map((_, i) => { return i * -1; });
  const range = [
    ...new Set([
      ...fillerArrayReverse.reverse(),
      ...fillerArray.reverse(),
      itemCount,
    ]),
  ];
  const calculateNewX = useCallback(
    () => {
      const containerWidth = containerRef.current?.clientWidth;
      const newX = containerWidth ? -index * (containerWidth / itemsPerView) : 0;
      return newX;
    },
    [index, itemsPerView],
  );
  /** 드래그 구현을 위해 추후 활용할 수 있는 코드입니다. */
  // const animationTrigger = (width: number) => { return width / 4; };

  const translate = useCallback((direction: "left" | "right", offset = 1) => {
    const newOffset = offset <= 0 ? 1 : offset;
    if (direction === "left") {
      setIndex(index - 1 * newOffset);
      return;
    }
    setIndex(index + 1 * newOffset);
  }, [index]);

  /* 드래그 구현을 위해 추후 활용할 수 있는 코드입니다. */
  // const handleEndDrag: DragHandler = (e, dragProps) => {
  //   const clientWidth = (containerRef.current?.clientWidth ?? 0) / itemsPerView;
  //   const { offset } = dragProps;
  //   const dragDistanceOffset = Math.floor(Math.abs(offset.x / clientWidth));

  //   if (offset.x > animationTrigger(clientWidth)) {
  //     translate("left", dragDistanceOffset);
  //   } else if (offset.x < -animationTrigger(clientWidth)) {
  //     translate("right", dragDistanceOffset);
  //   } else {
  //     // eslint-disable-next-line no-void, @typescript-eslint/no-floating-promises
  //     animate(x, calculateNewX(), transition);
  //   }
  // };

  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);
    return controls.stop;
  }, [index, calculateNewX, x]);

  // auto-play용 useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      translate("right");
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [translate]);

  return (
    <motion.div
      ref={containerRef}
      className={styles.container}
      draggable="false"
    >
      {range.map((rangeValue: number) => {
        return (
          <ItemFrame
            key={rangeValue + index}
            x={x}
             // onDragEnd={handleEndDrag}
            index={rangeValue + index}
            renderPage={children}
            itemsPerView={itemsPerView}
          />
        );
      })}
      <div className={styles.sliderBtnRow}>
        <button
          className={styles.slideBtn}
          onClick={() => { return translate("left"); }}
        >
          <Image src="/images/prev-button.svg" fill alt="previous" />
        </button>
        <button
          onClick={() => { return translate("right"); }}
          className={`${styles.slideBtn} ${styles.next}`}
        >
          <Image src="/images/next-button.svg" fill alt="previous" />
        </button>
      </div>
    </motion.div>
  );
};

export default InfiniteCarousel;
