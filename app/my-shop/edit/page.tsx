"use client";

import React, {
  useState, useEffect, useRef, SetStateAction,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { setUserShop } from "redux/slices/userSlice";
import { useRouter } from "next/navigation";
import {
  CustomInput, Dropdown, CommonBtn, InputNumber, Loader,
} from "components/common";
import { FileUploader } from "components/employer";
import { ButtonStyle, ButtonSize } from "types/enums/button.enum";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import usePostShop from "hooks/api/shop/usePostShop";
import useAppSelector from "redux/hooks/useAppSelector";
import usePostImageName from "hooks/api/image/usePostImageName";
import { IShop } from "types/dto";
import useUpdateShop from "hooks/api/shop/useUpdateShop";
import useAppDispatch from "redux/hooks/useAppDispatch";
import styles from "./page.module.scss";

interface IData {
  [key: string]: string;
}

const MyShopEditPage = () => {
  const user = useAppSelector((state) => { return state.user; });
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileEditMode, setFileEditMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [shopData, setShopData] = useState<IData>({
    name: "",
    category: "",
    address1: "",
    address2: "",
    description: "",
    imageUrl: "",
    originalHourlyPay: "",
  });
  const router = useRouter();
  const { postShop, isLoading: isPostLoading, isSuccess: isPostSuccess } = usePostShop();
  const { postImageName } = usePostImageName();
  const presignedUrlRef = useRef("");
  const dispatch = useAppDispatch();
  const { userInfo } = user;
  const shopId = userInfo?.shop?.item.id;
  const [countValidation, setCountValidation] = useState({
    name: 0,
    category: 0,
    address1: 0,
    imageUrl: 0,
    address2: 0,
    description: 0,
    originalHourlyPay: 0,
  });
  const { updateShop, isLoading: updateIsLoading, isSuccess: isUpdateSuccess } = useUpdateShop();

  useEffect(() => {
    if (userInfo?.shop) {
      const initialShopData = {
        name: userInfo?.shop?.item.name ?? "",
        category: userInfo?.shop?.item.category ?? "",
        address1: userInfo?.shop?.item.address1 ?? "",
        address2: userInfo?.shop?.item.address2 ?? "",
        description: userInfo?.shop?.item.description ?? "",
        imageUrl: userInfo?.shop?.item.imageUrl ?? "",
        originalHourlyPay: userInfo?.shop?.item.originalHourlyPay.toString(),
      };
      setShopData(initialShopData as SetStateAction<IData>);
      setPreviewUrl(userInfo?.shop?.item.imageUrl as string);
      setIsEditMode(true);
      setFileEditMode(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleFileSelected = async (
    file: File,
  ) => {
    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
    setFileEditMode(false);
    const postImageRes = await postImageName({ name: file.name });
    if (postImageRes) {
      presignedUrlRef.current = postImageRes.item.url;
      setShopData((prev) => {
        return {
          ...prev,
          imageUrl: postImageRes.item.url.split("?")[0],
        };
      });
    }
  };

  function convertToNumber(inputString: string): number {
    const number = Number(inputString.replace(/,/g, ""));
    return number;
  }

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
    if (
      shopData
      && shopData?.name?.length
      && shopData?.address1?.length
      && shopData?.address2?.length
      && shopData?.description?.length
      && shopData?.originalHourlyPay?.length
    ) {
      if (presignedUrlRef.current !== "") {
        try {
          await fetch(presignedUrlRef.current, {
            method: "PUT",
            body: selectedFile,
          });
        } catch (err) {
          console.error(err);
        }
      }

      const newData = {
        ...shopData,
        originalHourlyPay: convertToNumber(shopData.originalHourlyPay),
      };

      if (isEditMode) {
        const updateShopRes = await updateShop(shopId as string, newData as IShop);
        if (updateShopRes) {
          dispatch(setUserShop({ item: updateShopRes.item, href: "" }));
          router.push("/my-shop");
        }
      } else {
        const postShopRes = await postShop(newData as IShop);
        if (postShopRes) {
          dispatch(setUserShop({ item: postShopRes.item, href: "" }));
          router.push("/my-shop");
        }
      }
    }
  };

  return (
    <div className={styles.layout}>
      <header>
        <span>가게 정보</span>
        <Link href="/my-shop">
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
                  // validationTarget={ValidationTarget.REQUIRED}
            onChange={handleData}
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as
                    React.Dispatch<React.SetStateAction<object>>}
            data={shopData}
            unit="원"
          />
        </div>
        <div className={styles.inputBox}>
          <FileUploader
            name="imageUrl"
            id="imageUrl"
            required
            onFileChange={handleFileSelected}
            previewUrl={previewUrl}
            isEditMode={fileEditMode}
            rendering={rendering}
            countValidation={countValidation}
            validationTarget={ValidationTarget.REQUIRED}
            setCountValidation={setCountValidation as
                    React.Dispatch<React.SetStateAction<object>>}
            data={shopData}
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
          <CommonBtn
            type="submit"
            style={ButtonStyle.SOLID}
            size={ButtonSize.LARGE}
          >
            {
            // eslint-disable-next-line no-nested-ternary
            updateIsLoading || isPostLoading || isUpdateSuccess || isPostSuccess
              ? <Loader />
              : isEditMode
                ? "편집하기"
                : "등록하기"
}
          </CommonBtn>
        </div>
      </form>
    </div>
  );
};

export default MyShopEditPage;
