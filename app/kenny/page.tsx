"use client";

import { useState, useEffect, useRef } from "react";
import {
  CommonBtn, Modal, NoticeCard, NotificationBoard, PostCard, StatusChip,
} from "components/common";
import { ApplyStatus } from "types/enums/apply.enum";
import { ButtonStyle } from "types/enums/button.enum";
import { ModalType } from "types/enums/modal.enum";
import { IAlert } from "types/dto";
import Popover from "components/common/Popover/Popover";
import useAppSelector from "redux/hooks/useAppSelector";
// import styles from "./page.module.scss";
import mockAlertData from "constants/mock/alerts.json";
import useToast from "hooks/useToast";
import { useGetNoticesQuery } from "redux/api/noticeApi";
import { useUpdateUserInfoMutation } from "redux/api/userApi";
import { isFetchBaseQueryError } from "utils/predicateErrorType";
import useAppDispatch from "redux/hooks/useAppDispatch";
import { setShowModal } from "redux/slices/errorModalSlice";
import useErrorModal from "hooks/useErrorModal";
import useUpdateProfile from "hooks/api/user/useUpdateProfile";
import { Address1 } from "types/shop/address";
import useUpdateShop from "hooks/api/shop/useUpdateShop";
import InfiniteCarousel from "components/common/InfiniteCarousel/InfiniteCarousel";
import data from "constants/mock/notice.json";
import noticeList from "constants/mock/noticeList.json";
import useDisableDraggableChildren from "hooks/useDisableDraggableChildren";


const ALERT_LIST: IAlert[] = mockAlertData.items.map((i) => {
  return i.item as IAlert;
});

const images = [
  "https://unsplash.com/photos/1527pjeb6jg/download?force=false&w=320",
  "https://unsplash.com/photos/9wg5jCEPBsw/download?force=false&w=320",
  "https://unsplash.com/photos/phIFdC6lA4E/download?force=false&w=320",
  "https://unsplash.com/photos/1527pjeb6jg/download?force=false&w=320",
  "https://unsplash.com/photos/9wg5jCEPBsw/download?force=false&w=320",
  "https://unsplash.com/photos/phIFdC6lA4E/download?force=false&w=320",
  "https://unsplash.com/photos/1527pjeb6jg/download?force=false&w=320",
  "https://unsplash.com/photos/9wg5jCEPBsw/download?force=false&w=320",
  "https://unsplash.com/photos/phIFdC6lA4E/download?force=false&w=320",
  "https://unsplash.com/photos/1527pjeb6jg/download?force=false&w=320",
  "https://unsplash.com/photos/9wg5jCEPBsw/download?force=false&w=320",
  "https://unsplash.com/photos/phIFdC6lA4E/download?force=false&w=320"
];

const Page = () => {
  const user = useAppSelector((state) => { return state.user; });
  // const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const { showErrorModal } = useErrorModal();
  // const [errorMsg, setErrorMsg] = useState("");
  const { showToast } = useToast();
  const { data, isLoading } = useGetNoticesQuery({ offset: 0 });
  const { updateProfile } = useUpdateProfile();
  // const [updateProfile, { error }] = useUpdateUserInfoMutation();
  const { updateShop } = useUpdateShop();
  const targetRef = useRef<HTMLDivElement>(null);
  // useDisableDraggableChildren(targetRef);
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(user);
    // console.log(process.env.NODE_ENV);
  }, [user]);

  useEffect(() => {
    if (isLoading) {
      console.log("lodaing...");
    } else {
      console.dir(data?.items);
    }
  }, [data, isLoading]);

  const handleUpdateProfile = async () => {
    const userId = user.userInfo?.id;
    if (!userId) {
      return;
    }
    const body = {
      name: "김카멜", phone: "010-8768-9603", address: "서울시 강서구" as Address1, bio: "사막같이 열악한 환경속에서도 낙타마냥 일하겠습니다.",
    };
    const res = await updateProfile(userId, body);
    if(res) {
      console.log(res);
    }
  };
  const handleUpdateShop = async ()=>{
    const shopId = user.userInfo?.shop?.item.id;
    console.log(user);
    if(!shopId) {
      showErrorModal("먼저 가게를 등록해야 합니다.");
      return;
    };
    const body = {
      name: "The Zoo",
      category: "기타",
      address1: "서울시 강서구",
      address2: "화곡로 302(화곡동)",
      description: "화곡동에 위치한 카페 겸 실내 동물원입니다.",
      imageUrl: "https://images.unsplash.com/photo-1630906086851-65a063a8cdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
      originalHourlyPay: 20000,
    }
    const res = updateShop(shopId, body);
    if(res){
      console.log(res);
    }
  }
  return (
    <main>
      <StatusChip status={ApplyStatus.PENDING} />
      <CommonBtn
        type="button"
        onClick={() => { setIsModalOpen((prev) => { return !prev; }); }}
        style={ButtonStyle.OUTLINE}
      >
        Open Modal
      </CommonBtn>
      <br />
      <CommonBtn onClick={() => { showErrorModal("좆됐습니다"); }}>
        모달 띄우기
      </CommonBtn>
      <CommonBtn
        type="button"
        onClick={() => { showToast("토스트 입니다."); }}
        style={ButtonStyle.SOLID}
      >
        Open Toast
      </CommonBtn>
      <CommonBtn
        type="button"
        onClick={handleUpdateShop}
        style={ButtonStyle.SOLID}
      >
        Update Shop
      </CommonBtn>
      {isModalOpen
        && (
          <Modal
            type={ModalType.ACTION}
            message="신청을 거절하시겠어요?"
            onClose={() => { setIsModalOpen(false); }}
            onClickProceed={() => { showToast("거절 했습니다."); setIsModalOpen(false); }}
          />
        )}
      {/* <div className={styles.formBackground}>
        <AuthForm />
      </div> */}
      <div style={{ position: "relative" }}>
        <button type="button" onClick={() => { setIsPopoverOpen((prev) => { return !prev; }); }}>Open Popover</button>
        {isPopoverOpen && (
          <Popover onClose={() => { setIsPopoverOpen(false); }} bottom="8rem">
            <NotificationBoard
              alertList={ALERT_LIST}
              onClose={() => { setIsPopoverOpen(false); }}
            />
          </Popover>
        )}
      </div>
      {/* <div className={styles.formBackground}>
        <AuthForm />
      </div>
      <div className={styles.formBackground}>
        <AuthForm />
      </div> */}
      <CommonBtn onClick={handleUpdateProfile}>
        update Profile
      </CommonBtn>
      {isErrorModalOpen && (
        <Modal
          type={ModalType.CONFIRM}
          message="sdsa"
          onClose={() => { setIsErrorModalOpen(false); }}
          closeBtnLabel="닫기"
        />
      )}
      {/* {error && <span>에러발생</span>} */}
      <div style={{width: "967PX", height: "405px", margin: "0 auto"}}>
          <InfiniteCarousel itemCount={5} itemsPerView={3}>
            {({index}) => {
              const modulo = index % noticeList.items.length;
              const noticeIndex = modulo < 0 ? noticeList.items.length + modulo : modulo;
              return (
                  <div draggable={false} style={{margin: "0 0.7rem", height: "300px"}}>
                    <PostCard 
                      hourlyPay={noticeList.items[noticeIndex].item.hourlyPay}
                      startsAt={noticeList.items[noticeIndex].item.startsAt}
                      workhour={noticeList.items[noticeIndex].item.workhour}
                      address={noticeList.items[noticeIndex].item.shop.item.address1}
                      imageUrl={noticeList.items[noticeIndex].item.shop.item.imageUrl}
                      originalHourlyPay={noticeList.items[noticeIndex].item.shop.item.originalHourlyPay}
                      closed={noticeList.items[noticeIndex].item.closed}
                      name={noticeList.items[noticeIndex].item.shop.item.name}
                      href={noticeList.items[noticeIndex].item.shop.href}
                    />
                  </div>
              );
            }}
          </InfiniteCarousel>
      </div>
    </main>
  );
};

export default Page;
