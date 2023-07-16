"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CustomInput, Dropdown, CommonBtn } from "components/common";
import { FileUploader } from "components/employer";
import { ButtonStyle, ButtonSize } from "types/enums/button.enum";
import styles from "./page.module.scss";

interface MyResponse {
  item: {
    url: string
  }
}

const MyShopEditPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState({});

  const hasShop = false;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDUzZmVjOS01NjdjLTQ2MDktODQ0Zi1hZWIzOTgxMTEyN2UiLCJpYXQiOjE2ODk0Mzg5Mjd9.4NnBka67bMT7Yyrrk-1DkbtjhJdsDC4vqhMbDGDye2M";

  useEffect(() => {
    if (hasShop) {
      setPreviewUrl("https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/839938e7-9518-4d99-960e-1bcbf1b3b7ee.jpeg");
      setIsEditMode(true);
    }
  }, [hasShop]);

  console.log(data);

  const handleFileChangeWithFile = (
    file: File | undefined,
  ): void => {
    setSelectedFile(file);
    const objectUrl = file ? URL.createObjectURL(file) : "";
    setPreviewUrl(objectUrl);
    setIsEditMode(false);
  };

  const handleData = (event:
    React.ChangeEvent<HTMLInputElement |
      HTMLTextAreaElement> |
    React.MouseEvent<HTMLButtonElement>) => {
    if (event.type === "click") {
      const target = event.target as HTMLButtonElement;
      setData((prev) => {
        return {
          ...prev,
          [target.name]: target.textContent,
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

  const handleUploadFile = async (): Promise<void> => {
    const removeQueryFromUrl = (url: string): string => {
      return url.split("?")[0];
    };
    if (selectedFile) {
      try {
        const response = await fetch("/images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: selectedFile.name }),
        });
        const fileData = await response.json() as MyResponse;
        const { url } = fileData.item;
        await fetch(url, {
          method: "PUT",
          body: selectedFile,
        });
        const removedQueryUrl = removeQueryFromUrl(url);
        setImageUrl(removedQueryUrl);
        setData((prev) => {
          return {
            ...prev,
            imageUrl: removedQueryUrl,
          };
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUploadFile() //data에 이미지 파일 추가 
      .then(() => {
        // 유효성 검사 & 폼 제출 ...
      })
      .catch((err) => {
        console.error(err);
      });
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
          />
          <Dropdown
            type="category"
            label="분류"
            id="category"
            name="category"
            onChange={handleData}
          />
          <Dropdown
            type="address" // address1로 등록 
            label="주소"
            id="address1"
            name="address1"
            onChange={handleData}
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
          />
        </div>
        <div className={styles.inputBox}>
          <FileUploader
            onFileChange={handleFileChangeWithFile}
            previewUrl={previewUrl}
            isEditMode={isEditMode}
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
            essential
          />
        </div>
        <div className={styles.submitButton}>
          <CommonBtn type="submit" style={ButtonStyle.SOLID} size={ButtonSize.LARGE}>등록하기</CommonBtn>
        </div>
      </form>
      <div>{`이미지 경로 : ${imageUrl}`}</div>
    </div>
  );
};

export default MyShopEditPage;
