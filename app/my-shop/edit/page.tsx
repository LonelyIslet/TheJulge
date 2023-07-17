"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { CustomInput, Dropdown, CommonBtn } from "components/common";
import { FileUploader } from "components/employer";
import { ButtonStyle, ButtonSize } from "types/enums/button.enum";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import { CATEGORY } from "constants/dropdown/dropdownData";
import styles from "./page.module.scss";

interface FileData {
  item: {
    url: string
  }
}

interface IData {
  [key: string]: string;
}

// const shopData = {
//   name: "The Zoo",
//   category: "기타",
//   address1: "서울시 강서구",
//   address2: "화곡로 302(화곡동)",
//   description: "화곡동에 위치한 카페 겸 실내 동물원입니다.",
//   imageUrl: "https://images.unsplash.com/photo-1630906086851-65a063a8cdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
//   originalHourlyPay: 30000,
// };

const shopData: IData | null = null;

const MyShopEditPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState("");
  const [presignedUrl, setPresignedUrl] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [data, setData] = useState<IData | undefined>();

  console.log(data);

  const [countValidation, setCountValidation] = useState({
    name: 0,
    category: 0,
    address1: 0,
    imageUrl: 0,
    address2: 0,
    description: 0,
    originalHourlyPay: 0,
  });

  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NzU5ZGQ1ZC0wZjliLTRlNDUtOGI1Zi0yZTI2ZmIwM2JlYTciLCJpYXQiOjE2ODk2MDc1MzJ9.DJtNt2GS7QQ0cfOx5ExezPKXw-j4NlUW-oRsSDyy-a4";

  useEffect(() => {
    if (shopData) {
      setPreviewUrl((shopData as IData).imageUrl);
      setData(shopData as IData);
      setIsEditMode(true);
    }
  }, []);

  const handleData = (event:
    React.ChangeEvent<HTMLInputElement |
      HTMLTextAreaElement> |
    React.MouseEvent<HTMLButtonElement>) => {
    if (event.type === "click") {
      const target = event.target as HTMLButtonElement;
      setData((prev) => {
        return {
          ...prev,
          [target.name]: target.textContent as string,
        };
      });
    } else if (event.type === "change") {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      setData((prev) => {
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

  const handleImageUrl = useCallback(async () => {
    try {
      const response = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ name: selectedFile?.name }),
      });
      const fileData = await response.json() as FileData;
      const { url } = fileData.item;
      const imageUrl = url.split("?")[0];
      setPresignedUrl(url);
      setData((prev) => {
        return {
          ...prev,
          imageUrl,
        };
      });
    } catch (err) {
      console.error(err);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      handleImageUrl()
        .catch((err) => { console.error(err); });
    }
  }, [selectedFile, handleImageUrl]);

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

  const postShop = async (): Promise<void> => {
    try {
      console.log("post 실행됨");
      const response = await fetch("/api/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(JSON.stringify(data));

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
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
    const isContainedCategory = CATEGORY.includes(data?.category as string);

    if (data?.name
      && data?.address1
      && data?.address2
      && data?.description
      && data?.originalHourlyPay
      && isContainedCategory
      && presignedUrl
    ) {
      // try {
      //   console.log("post 실행됨");
      //   // const res = await fetch("/api/shops", {
      //   //   method: "POST",
      //   //   headers: {
      //   //     "Content-Type": "application/json",
      //   //     Authorization: `Bearer ${TOKEN}`,
      //   //   },
      //   //   body: JSON.stringify(data),
      //   // });
      //   console.log(res);
      // } catch (err) {
      //   console.error(err);
      // }
    }
  };

  return (
    <div className={styles.layout}>
      <header>
        <span>가게 정보</span>
        <Link href="/my-profile">
          <Image src="/images/close.svg" alt="닫기 버튼" width={30} height={30} />
        </Link>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <CustomInput
            element="text"
            type="text"
            label="가게 이름"
            placeholder="입력"
            id="name"
            name="name"
            essential
            onChange={handleData}
            validationTarget={ValidationTarget.ESSENTIAL}
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
            data={data}
          />
          <Dropdown
            type="category"
            label="분류"
            id="category"
            name="category"
            onChange={handleData}
            essential
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
          />
          <CustomInput
            element="text"
            type="text"
            label="주소"
            placeholder="입력"
            id="address1"
            name="address1"
            essential
            onChange={handleData}
            validationTarget={ValidationTarget.ESSENTIAL}
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
            data={data}
          />
          <CustomInput
            element="text"
            type="text"
            label="상세 주소"
            placeholder="입력"
            id="address2"
            name="address2"
            essential
            onChange={handleData}
            validationTarget={ValidationTarget.ESSENTIAL}
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
            data={data}
          />
          <CustomInput
            element="text"
            type="number"
            label="기본 시급"
            placeholder="입력"
            id="originalHourlyPay"
            name="originalHourlyPay"
            essential
            onChange={handleData}
            validationTarget={ValidationTarget.ESSENTIAL}
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
            data={data}
          />
        </div>
        <div className={styles.inputBox}>
          <FileUploader
            name="imageUrl"
            id="imageUrl"
            essential
            onFileChange={handleFileSelected}
            previewUrl={previewUrl}
            isEditMode={isEditMode}
            rendering={rendering}
            countValidation={countValidation}
            validationTarget={ValidationTarget.ESSENTIAL}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
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
            data={data}
          />
        </div>
        <div className={styles.submitButton}>
          <CommonBtn type="submit" style={ButtonStyle.SOLID} size={ButtonSize.LARGE}>등록하기</CommonBtn>
        </div>
      </form>
      {/* <div>{`미리보기 URL : ${previewUrl}`}</div>
      <div>{`presinged URL : ${presignedUrl}`}</div>
      <div>{data && `이미지 경로 : ${data?.imageUrl}`}</div> */}
    </div>
  );
};

export default MyShopEditPage;
