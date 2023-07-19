"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CustomInput, Dropdown, CommonBtn, Loader, InputNumber,
} from "components/common";
import { FileUploader } from "components/employer";
import { ButtonStyle, ButtonSize } from "types/enums/button.enum";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import { CATEGORY } from "constants/dropdown/dropdownData";
import usePostShop from "hooks/api/shop/usePostShop";
import useToast from "hooks/useToast";
import { store } from "redux/store";
import { apiSlice } from "redux/slices/apiSlice";
import useUpdateProfile from "hooks/api/user/useUpdateProfile";
import useAppSelector from "redux/hooks/useAppSelector";
import { useGetUserInfoQuery } from "redux/api/userApi";
import styles from "./page.module.scss";

// interface FileData {
//   item: {
//     url: string
//   }
// }

// interface IData {
//   [key: string]: string;
// }

// const shopData = {
//   name: "The Zoo",
//   category: "기타",
//   address1: "서울시 강서구",
//   address2: "화곡로 302(화곡동)",
//   description: "화곡동에 위치한 카페 겸 실내 동물원입니다.",
//   imageUrl: "https://images.unsplash.com/photo-1630906086851-65a063a8cdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
//   originalHourlyPay: 30000,
// };

const MyShopEditPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState("");
  const [presignedUrl, setPresignedUrl] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [shopData, setShopData] = useState({
    name: "The Zoo",
    category: "기타",
    address1: "서울시 강서구",
    address2: "화곡로 302(화곡동)",
    description: "화곡동에 위치한 카페 겸 실내 동물원입니다.",
    imageUrl: "https://images.unsplash.com/photo-1630906086851-65a063a8cdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
    originalHourlyPay: 30000,
  });
  console.log(shopData);

  const router = useRouter();
  const { postShop } = usePostShop();
  const user = useAppSelector((state) => { return state.user; });
  const { userInfo } = user;
  const userId = userInfo?.id as string;
  const { data, error, isLoading } = useGetUserInfoQuery(userId);

  const [countValidation, setCountValidation] = useState({
    name: 0,
    category: 0,
    address1: 0,
    imageUrl: 0,
    address2: 0,
    description: 0,
    originalHourlyPay: 0,
  });

  const handleData = (event:
    React.ChangeEvent<HTMLInputElement |
      HTMLTextAreaElement> |
    React.MouseEvent<HTMLButtonElement>) => {
    if (event.type === "click") {
      const target = event.target as HTMLButtonElement;
      setShopData((prev) => {
        return {
          ...prev,
          [target.name]: target.textContent as string,
        };
      });
    } else if (event.type === "change") {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      setShopData((prev) => {
        return {
          ...prev,
          [target.name]: target.value,
        };
      });
    }
  };

  const handleFileSelected = (
    file: File,
  ) => {
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsEditMode(false);
  };

  // useEffect(() => {
  //   if (shopData) {
  //     setPreviewUrl((shopData as IData).imageUrl);
  //     setData(shopData as IData);
  //     setIsEditMode(true);
  //   }
  // }, []);

  // const handleImageUrl = useCallback(async () => {
  //   try {
  //     const response = await fetch("/api/images", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${TOKEN}`,
  //       },
  //       body: JSON.stringify({ name: selectedFile?.name }),
  //     });
  //     const fileData = await response.json() as FileData;
  //     const { url } = fileData.item;
  //     const imageUrl = url.split("?")[0];
  //     setPresignedUrl(url);
  //     setData((prev) => {
  //       return {
  //         ...prev,
  //         imageUrl,
  //       };
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [selectedFile]);

  // useEffect(() => {
  //   if (selectedFile) {
  //     handleImageUrl()
  //       .catch((err) => { console.error(err); });
  //   }
  // }, [selectedFile, handleImageUrl]);

  // const uploadFiletoA3 = async (): Promise<void> => {
  //   try {
  //     await fetch(presignedUrl, {
  //       method: "PUT",
  //       body: selectedFile,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const postShop = async (): Promise<void> => {
  //   try {
  //     console.log("post 실행됨");
  //     const response = await fetch("/api/shops", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${TOKEN}`,
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     console.log(response);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  console.log(JSON.stringify(data));

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setRendering(!rendering);
    setCountValidation({
      name: 1,
      category: 1,
      imageUrl: 1,
      address1: 1,
      address2: 1,
      description: 1,
      originalHourlyPay: 1,
    });
  };
  // const isContainedCategory = CATEGORY.includes(data?.category as string);

  // if (
  //   // shopData?.name
  //   // && shopData?.address1
  //   // && shopData?.address2
  //   // && shopData?.description
  //   // && shopData?.originalHourlyPay
  //   // && isContainedCategory
  //   // && presignedUrl
  // ) {
  //   try {
  //     //post
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    // if (!isLoading && (!userId || !data?.item.shop)) {
    //   router.replace("/");
    // }
    // setShopData(data?.item?.shop?.item);
    // setPreviewUrl(data?.item?.shop?.item?.imageUrl);
    setIsEditMode(true);
  }, [data, userId, router]);

  console.log(shopData);
  console.log(isEditMode);

  // trigger(userInfo?.shop?.item?.id as string);
  // 유저 정보 가져오기
  // http://localhost:3000/api/shops/{shop_id} (가게 정보 조회 /shops/{shop_id})
  // 1. 유저 업거나 일반 유저일 경우 => /로 라우팅
  // 3. 사장: shopid가   : GET http://localhost:3000/api/shops/{shop_id} (가게 정보 조회 /shops/{shop_id})

  // 로그인 상태 판별: 로컬 스토리지에 토큰 있는지, 올바른지 확인, 올바르면 자동 로그인 중 => 토큰으로 유저 정보 요청(까보기)

  return (
    <div className={styles.layout}>
      <header>
        <span>가게 정보</span>
        <Link href="/my-profile">
          <Image src="/images/close.svg" alt="닫기 버튼" width={30} height={30} />
        </Link>
      </header>
      {isLoading ? <Loader />
        : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <CustomInput
                element="text"
                type="text"
                label="가게 이름"
                placeholder="입력"
                id="name"
                name="name"
                required
                onChange={handleData}
                validationTarget={ValidationTarget.REQUIRED}
                rendering={rendering}
                countValidation={countValidation}
                setCountValidation={setCountValidation as
                  React.Dispatch<React.SetStateAction<object>>}
                data={shopData}
              />
              <Dropdown
                type="category"
                label="분류"
                id="category"
                name="category"
                onChange={handleData}
                required
                rendering={rendering}
                countValidation={countValidation}
                data={shopData}
              />
              <Dropdown
                type="address"
                label="주소"
                id="address1"
                name="address1"
                onChange={handleData}
                required
                rendering={rendering}
                countValidation={countValidation}
                data={shopData}
              />
              <CustomInput
                element="text"
                type="text"
                label="상세 주소"
                placeholder="입력"
                id="address2"
                name="address2"
                required
                onChange={handleData}
                validationTarget={ValidationTarget.REQUIRED}
                rendering={rendering}
                countValidation={countValidation}
                setCountValidation={setCountValidation as
                  React.Dispatch<React.SetStateAction<object>>}
                data={shopData}
              />
              <InputNumber
                label="기본 시급"
                placeholder="입력"
                required
                id="originalHourlyPay"
                name="originalHourlyPay"
                validationTarget={ValidationTarget.REQUIRED}
                onChange={handleData}
                rendering={rendering}
                countValidation={countValidation}
                setCountValidation={setCountValidation}
                data={shopData}
                unit="원"
              />
            </div>
            <div className={styles.inputBox}>
              <FileUploader
                name="imageUrl"
                id="imageUrl"
                // required
                onFileChange={handleFileSelected}
                previewUrl={previewUrl}
                isEditMode={isEditMode}
                rendering={rendering}
                countValidation={countValidation}
                validationTarget={ValidationTarget.REQUIRED}
                setCountValidation={setCountValidation as
                  React.Dispatch<React.SetStateAction<object>>}
              />
            </div>
            <div className={styles.textbox}>
              <CustomInput
                element="textarea"
                label="가게 설명"
                placeholder="입력"
                id="description"
                name="description"
                onChange={handleData}
                data={shopData}
              />
            </div>
            <div className={styles.submitButton}>
              <CommonBtn type="submit" style={ButtonStyle.SOLID} size={ButtonSize.LARGE}>등록하기</CommonBtn>
            </div>
          </form>
        )}
    </div>
  );
};

export default MyShopEditPage;
