"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { CommonBtn, CustomInput, InputNumber } from "components/common";
import { ButtonSize, ButtonStyle } from "types/enums/button.enum";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import useAppSelector from "redux/hooks/useAppSelector";
import convertToNumber from "utils/formattingStringTonumber";
import convertToISODate from "utils/formattingData";
import { usePostNoticeMutation } from "redux/api/noticeApi";
import styles from "./EditNoticeForm.module.scss";

const EditNoticeForm = () => {
  const params = useParams();
  const { postNotice } = usePostNoticeMutation();

  const user = useAppSelector((state) => { return state.user; });
  const [rendering, setRendering] = useState(false);

  const [countValidation, setCountValidation] = useState({
    hourlyPay: 0,
    startsAt: 0,
    workhour: 0,
    description: 0,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState({
    hourlyPay: "", // 넘버 타입
    startsAt: "", // 문자열
    workhour: "", // 넘버
    description: "", // 문자열
  });

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
      && !formattedData.startsAt.length
      && formattedData.workhour > 0) {
      const response = await postNotice({ shopId: params.shopId, body: formattedData });
      console.log(response);
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
