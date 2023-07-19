/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CommonBtn from "components/common/CommonBtn/CommonBtn";
import CustomInput from "components/common/CustomInput/CustomInput";
import Dropdown from "components/common/Dropdown/Dropdown";
import { ButtonSize, ButtonStyle } from "types/enums/button.enum";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import inputValidation from "utils/inputValidation";
import { ADDRESS } from "constants/dropdown/dropdownData";
import useAppSelector from "redux/hooks/useAppSelector";
import useUpdateProfile from "hooks/api/user/useUpdateProfile";
import { setUser } from "redux/slices/userSlice";
import useAppDispatch from "redux/hooks/useAppDispatch";
import useToast from "hooks/useToast";
import useErrorModal from "hooks/useErrorModal";
import { Address1 } from "types/shop/address";
import { Loader } from "components/common";
import { IUserUpdateInfo } from "redux/api/userApi";
import styles from "./EditProfile.module.scss";

const EditProfile = () => {
  const [rendering, setRendering] = useState(false);
  const userData = useAppSelector((state) => { return state.user; });
  const dispatch = useAppDispatch();
  const { userInfo } = userData;
  const { updateProfile, isLoading } = useUpdateProfile();
  const router = useRouter();
  const { showToast } = useToast();
  const { showErrorModal } = useErrorModal();
  if (!userInfo) {
    showErrorModal("로그인이 필요합니다.");
    router.push("/");
  }

  const [countValidation, setCountValidation] = useState({
    name: 0,
    phone: 0,
    address: 0,
    bio: 0,
  });

  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    if (userInfo && !userInfo.name) {
      return;
    }
    if (userInfo) {
      setData({
        name: userInfo.name as string,
        phone: userInfo.phone as string,
        address: userInfo.address as Address1,
        bio: userInfo.bio as string,
      });
    }
  }, [userInfo]);

  const handleData = (event:
  React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement> |
  React.MouseEvent<HTMLButtonElement>) => {
    if (event.type === "change") {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      setData((prev) => {
        return {
          ...prev,
          [target.name]: target.value,
        };
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setRendering(!rendering);
    setCountValidation({
      name: 1,
      phone: 1,
      address: 1,
      bio: 1,
    });

    const isContainedAddress = ADDRESS.includes(data.address);
    // 유효성 검사 완료 시 실행되는 함수 입력하면 됩니다.
    if (
      data
      && data?.name?.length
      && inputValidation(ValidationTarget.PHONE, data.phone)
      && isContainedAddress
      && data.bio.length) {
      if (userInfo && userInfo.id) {
        const res = await updateProfile(userInfo.id, data as IUserUpdateInfo);
        if (res) {
          dispatch(setUser({ token: userData.token, userInfo: res.item }));
          showToast("편집이 완료되었습니다.");
          router.push("/my-profile");
        }
      }
    }
  };

  return (
    <div className={styles.layout}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <CustomInput
            element="text"
            type="text"
            label="이름"
            placeholder="입력"
            id="name"
            name="name"
            required
            onChange={handleData}
            validationTarget={ValidationTarget.REQUIRED}
            data={data}
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
          />
          <CustomInput
            element="text"
            type="tel"
            label="연락처"
            placeholder="입력"
            id="phone"
            name="phone"
            required
            onChange={handleData}
            validationTarget={ValidationTarget.PHONE}
            data={data}
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
          />
          <Dropdown
            type="address"
            label="선호 지역"
            id="address"
            name="address"
            onChange={handleData}
            required
            rendering={rendering}
            countValidation={countValidation}
            data={data}
          />
        </div>
        <CustomInput
          element="textarea"
          label="소개"
          placeholder="입력"
          id="bio"
          name="bio"
          onChange={handleData}
          required
          validationTarget={ValidationTarget.REQUIRED}
          data={data}
          rendering={rendering}
          countValidation={countValidation}
          setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
        />
        <CommonBtn
          type="submit"
          style={ButtonStyle.SOLID}
          size={ButtonSize.LARGE}
        >
          {isLoading ? <Loader /> : "등록하기"}
        </CommonBtn>
      </form>
    </div>
  );
};

export default EditProfile;
