"use client";

import React, {
  useState, useEffect, useCallback, useRef,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CustomInput, Dropdown, CommonBtn, Loader, InputNumber, Trigger,
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
import loading from "@/kenny/loading";
import { IShop, IUser } from "types/dto";
import usePostImageName from "hooks/api/image/usePostImageName";
import useUpdateShop from "hooks/api/shop/useUpdateShop";
import styles from "./page.module.scss";

// interface FileData {
//   item: {
//     url: string
//   }
// }

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

const MyShopEditPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState("");
  const [presignedUrl, setPresignedUrl] = useState("");
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
  console.log(shopData);
  console.log(previewUrl);

  const router = useRouter();
  const { postShop } = usePostShop();
  const { updateShop, isLoading: updateIsLoading } = useUpdateShop();
  const user = useAppSelector((state) => { return state.user; });
  const { userInfo } = user;
  const userId = userInfo?.id as string;
  const { data, isLoading } = useGetUserInfoQuery(userId);
  const { postImageName } = usePostImageName();
  const shopId = useRef();

  const [countValidation, setCountValidation] = useState({
    name: 0,
    category: 0,
    address1: 0,
    imageUrl: 0,
    address2: 0,
    description: 0,
    originalHourlyPay: 0,
  });

  interface IUserData {
    item: {
      shop: {
        item: IData;
      },
    }
  }

  useEffect(() => {
    if (!isLoading && data && data.item && data.item.shop) {
      const initialShopData = {
        name: data.item.shop.item.name,
        category: data.item.shop.item.category,
        address1: data.item.shop.item.address1,
        address2: data.item.shop.item.address2,
        description: data.item.shop.item.description,
        imageUrl: data.item.shop.item.imageUrl,
        originalHourlyPay: data.item.shop.item.originalHourlyPay,
      };
      shopId.current = data.item.shop.item.id;
      setShopData(initialShopData);
      setPreviewUrl((data as IUserData)?.item.shop.item.imageUrl);
      setIsEditMode(true);
    }
  }, [data, isLoading]);

  console.log(data);
  console.log(shopData);

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
  }; // 인풋 누를떄 data에 추가됨

  const handleFileSelected = async (
    file: File,
  ) => {
    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
    setIsEditMode(false);
    const postImageRes = await postImageName({ name: File.name });
    if (postImageRes) {
      setShopData((prev) => {
        return {
          ...prev,
          imageUrl: postImageRes.item.url,
        };
      });
    }

    console.log(shopData);
    console.log(shopId.current);

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
      const updateShopRes = await updateShop(shopId.current, shopData);
      console.log(updateShopRes);
      if (updateShopRes) {
        router.push("/my-shop");
      }
    };
    console.log(selectedFile?.name);

    //   const handleUpdateProfile = async () => {
    //     const userId = user.userInfo?.id;
    //     if (!userId) {
    //       return;
    //     }
    //     const body = {
    //       name: "김카멜", phone: "010-8768-9603", address: "서울시 강서구" as Address1, bio: "사막같이 열악한 환경속에서도 낙타마냥 일하겠습니다.",
    //   };
    //     const res = await updateProfile(userId, body);  // 이렇게 useUpdateProfile훅이 리턴하는 요청함수를 이벤트핸들러에서 호출하는 식으로 하시면 됩니다.
    //     if(res) {  // 에러 핸들링은 커스텀 내부에서 수행합니다. 다만 에러가 발생했을 시 updateProfile은 받아온 데이터 대신 undefined를 리턴하므로 안전하게 하기 위해서는 이렇게 if(res) 블록에서 요청 성공 후 수행할 코드를 쓰시면 될겁니다.
    //       console.log(res);
    //     }
    // };
    // return (
    //   <>
    //     <div className={styles.layout}>
    //       {updateIsLoading
    //         ? (
    //           <header>
    //             <span>가게 정보</span>
    //             <Link href="/my-profile">
    //               <Image src="/images/close.svg" alt="닫기 버튼" width={30} height={30} />
    //             </Link>
    //           </header>
    //           {isLoading ? <Trigger />
    //         : (
    //           <form className={styles.form} onSubmit={handleSubmit}>
    //             <div className={styles.inputBox}>
    //               <CustomInput
    //                 element="text"
    //                 type="text"
    //                 label="가게 이름"
    //                 placeholder="입력"
    //                 id="name"
    //                 name="name"
    //                 required
    //                 onChange={handleData}
    //                 validationTarget={ValidationTarget.REQUIRED}
    //                 rendering={rendering}
    //                 countValidation={countValidation}
    //                 setCountValidation={setCountValidation as
    //                   React.Dispatch<React.SetStateAction<object>>}
    //                 data={shopData}
    //               />
    //               <Dropdown
    //                 type="category"
    //                 label="분류"
    //                 id="category"
    //                 name="category"
    //                 onChange={handleData}
    //                 required
    //                 rendering={rendering}
    //                 countValidation={countValidation}
    //                 data={shopData}
    //               />
    //               <Dropdown
    //                 type="address"
    //                 label="주소"
    //                 id="address1"
    //                 name="address1"
    //                 onChange={handleData}
    //                 required
    //                 rendering={rendering}
    //                 countValidation={countValidation}
    //                 data={shopData}
    //               />
    //               <CustomInput
    //                 element="text"
    //                 type="text"
    //                 label="상세 주소"
    //                 placeholder="입력"
    //                 id="address2"
    //                 name="address2"
    //                 required
    //                 onChange={handleData}
    //                 validationTarget={ValidationTarget.REQUIRED}
    //                 rendering={rendering}
    //                 countValidation={countValidation}
    //                 setCountValidation={setCountValidation as
    //                   React.Dispatch<React.SetStateAction<object>>}
    //                 data={shopData}
    //               />
    //               <InputNumber
    //                 label="기본 시급"
    //                 placeholder="입력"
    //                 required
    //                 id="originalHourlyPay"
    //                 name="originalHourlyPay"
    //                 validationTarget={ValidationTarget.REQUIRED}
    //                 onChange={handleData}
    //                 rendering={rendering}
    //                 countValidation={countValidation}
    //                 setCountValidation={setCountValidation as
    //                   React.Dispatch<React.SetStateAction<object>>}
    //                 data={shopData}
    //                 unit="원"
    //               />
    //             </div>
    //             <div className={styles.inputBox}>
    //               <FileUploader
    //                 name="imageUrl"
    //                 id="imageUrl"
    //                 required
    //                 onFileChange={handleFileSelected}
    //                 previewUrl={previewUrl}
    //                 isEditMode={isEditMode}
    //                 rendering={rendering}
    //                 countValidation={countValidation}
    //                 validationTarget={ValidationTarget.REQUIRED}
    //                 setCountValidation={setCountValidation as
    //                   React.Dispatch<React.SetStateAction<object>>}
    //                 data={shopData}
    //               />
    //             </div>
    //             <div className={styles.textbox}>
    //               <CustomInput
    //                 element="textarea"
    //                 label="가게 설명"
    //                 placeholder="입력"
    //                 id="description"
    //                 name="description"
    //                 onChange={handleData}
    //                 data={shopData}
    //               />
    //             </div>
    //             <div className={styles.submitButton}>
    //               <CommonBtn
    //                 type="submit"
    //                 style={ButtonStyle.SOLID}
    //                 size={ButtonSize.LARGE}
    //               >
    //                 등록하기
    //               </CommonBtn>
    //             </div>
    //           </form>
    //         )}
    //       )
    //       : <Trigger />
    //       }
    //     </div>
    //   </>
    // );
  };

  return (
    <div className={styles.layout}>
      {updateIsLoading ? (
        <header>
          <span>가게 정보</span>
          <Link href="/my-profile">
            <Image src="/images/close.svg" alt="닫기 버튼" width={30} height={30} />
          </Link>
        </header>
      ) : (
        <Trigger />
      )}
      {isLoading ? (
        <Trigger />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            {/* CustomInput, Dropdown, InputNumber, FileUploader 컴포넌트들의 내용 */}
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
            <CommonBtn type="submit" style={ButtonStyle.SOLID} size={ButtonSize.LARGE}>
              등록하기
            </CommonBtn>
          </div>
        </form>
      )}
    </div>
  );
};
export default MyShopEditPage;
