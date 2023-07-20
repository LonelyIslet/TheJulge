/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { FormEvent, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CommonBtn, CustomInput, InputNumber } from "components/common";
import { ButtonSize, ButtonStyle } from "types/enums/button.enum";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import convertToNumber from "utils/formattingStringTonumber";
import convertToISODate from "utils/formattingData";
import usePostNotice from "hooks/api/notice/usePostNotice";
import useUpdateNotice from "hooks/api/notice/useUpdateNotice";
import styles from "./EditNoticeForm.module.scss";

const EditNoticeForm = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { postNotice } = usePostNotice();
  const { updateNotice } = useUpdateNotice();

  const [rendering, setRendering] = useState(false);

  const [countValidation, setCountValidation] = useState({
    hourlyPay: 0,
    startsAt: 0,
    workhour: 0,
    description: 0,
  });

  const [data, setData] = useState({
    hourlyPay: "",
    startsAt: "",
    workhour: "",
    description: "",
  });

  const handleData = (
    event:
    React.ChangeEvent<HTMLInputElement |
    HTMLTextAreaElement> |
    React.MouseEvent<HTMLButtonElement>,
  ) => {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setRendering(!rendering);
    setCountValidation({
      hourlyPay: 1,
      startsAt: 1,
      workhour: 1,
      description: 1,
    });
    const formattedData = {
      hourlyPay: convertToNumber(data.hourlyPay),
      startsAt: convertToISODate(data.startsAt),
      workhour: convertToNumber(data.workhour),
      description: data.description,
    };

    if (formattedData.hourlyPay > 100
      && formattedData.startsAt.length > 0
      && formattedData.workhour > 0
      && formattedData.description.length > 0) {
      // 초기 글쓰기
      if (!searchParams.get("id")) {
        const response = await postNotice(params.shopId, formattedData);
        router.push("/");
      } else {
        const response = await updateNotice(params.shopId, searchParams.get("id") as string, formattedData);
        router.push("/");
      }
    }
  };

  return (
    <div className={styles.layout}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <InputNumber
            label="시급"
            placeholder="입력"
            id="hourlyPay"
            name="hourlyPay"
            onChange={handleData}
            data={data}
            required
            unit="원"
            validationTarget={ValidationTarget.HOURLY_PAY}
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
          />
          <CustomInput
            label="시작 일시"
            placeholder="입력"
            element="text"
            id="startsAt"
            name="startsAt"
            type="text"
            onChange={handleData}
            data={data}
            required
            rendering={rendering}
            validationTarget={ValidationTarget.DATE}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
          />
          <InputNumber
            label="업무 시간"
            placeholder="입력"
            id="workhour"
            name="workhour"
            onChange={handleData}
            data={data}
            required
            unit="시간"
            validationTarget={ValidationTarget.REQUIRED}
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
          />
        </div>
        <CustomInput
          element="textarea"
          label="공고 설명"
          placeholder="입력"
          id="description"
          name="description"
          onChange={handleData}
          data={data}
          required
          validationTarget={ValidationTarget.REQUIRED}
          rendering={rendering}
          countValidation={countValidation}
          setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
        />
        <CommonBtn
          type="submit"
          style={ButtonStyle.SOLID}
          size={ButtonSize.LARGE}
        >
          등록하기
        </CommonBtn>
      </form>
    </div>
  );
};

export default EditNoticeForm;
