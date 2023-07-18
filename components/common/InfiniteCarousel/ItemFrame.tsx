import { useMemo } from "react";
import { MotionValue, motion } from "framer-motion";
/**
 * 드래그를 위해 추후 활용할 수 있는 코드입니다.
 */
// import useDisableDraggableChildren from "hooks/useDisableDraggableChildren";
// import type { DragHandler } from "./InfiniteCarousel";

interface ItemFrameProps {
  index: number;
  renderPage: ({ index }:{ index: number }) => React.ReactNode;
  x: MotionValue<number>;
  // onDragEnd: DragHandler 드래그를 구현을 위해 추후 활용할 수 있는 코드입니다.
  itemsPerView: number;
}

const ItemFrame = ({
  index, renderPage, x, itemsPerView,
}: ItemFrameProps) => {
  const child = useMemo(() => { return renderPage({ index }); }, [index, renderPage]);
  const itemWidth = 100 / itemsPerView;
  /**
   * 드래그를 위해 추후 활용할 수 있는 코드입니다.
   */
  // const targetRef = useRef<HTMLDivElement>(null);
  // useDisableDraggableChildren(targetRef);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: `${itemWidth}%`,
        height: "100%",
        left: `${index * itemWidth}%`,
        right: `${index * itemWidth}%`,
        x,
      }}
      draggable
      drag="x"
      dragElastic={1}
      /**
       * 드래그를 위해 추후 활용할 수 있는 코드입니다.
       */
      // onDragEnd={onDragEnd}
      // ref={targetRef}
    >
      {child}
    </motion.div>
  );
};

export default ItemFrame;
