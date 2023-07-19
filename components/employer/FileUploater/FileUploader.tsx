"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import useInputValidation from "hooks/useInputValidation";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import styles from "./FileUploader.module.scss";

const cx = classNames.bind(styles);
interface ICountValidation {
  [key: string]: number;
}

interface FileUploaderProps {
  name: string,
  id: string
  previewUrl: string,
  isEditMode: boolean,
  validationTarget?: ValidationTarget;
  countValidation?: ICountValidation;
  rendering: boolean
  // essential?: boolean
  onFileChange: (file: File) => void;
  // setCountValidation: React.Dispatch<React.SetStateAction<object>>;
}

const FileUploader = ({
  name,
  id,
  onFileChange,
  previewUrl,
  isEditMode,
  rendering,
  countValidation,
  validationTarget,
  // setCountValidation,
  // essential,
}: FileUploaderProps) => {
  const [change, setChange] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    validation, validationContent, handleBlur, toggle,
  } = useInputValidation(
    validationTarget as ValidationTarget,
    previewUrl,
    name,
    // required,
    // setCountValidation,
  );

  useEffect(() => {
    setChange(!change);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, rendering]);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target as HTMLInputElement;
    const file: File = fileInput.files?.[0] as File;
    onFileChange(file);
  };

  return (
    <div className={styles.filePreviewer}>
      <label className={styles.label} htmlFor={id}>가게 이미지</label>
      <div className={styles.previewArea} onClick={handleFileClick} role="presentation">
        {previewUrl && <Image src={previewUrl} alt={previewUrl} className={cx("shopImage", { isEditMode })} fill />}
        {isEditMode && previewUrl
          && (
            <div className={styles.previewContainer}>
              <Image src="/images/camera-white.svg" className={styles.previewImg} alt="camera" width={32} height={32} />
              <p className={styles.previewMessage}>이미지 변경하기</p>
            </div>
          )}
        {!isEditMode && !previewUrl
          && (
            <div className={styles.previewContainer}>
              <Image src="/images/camera-gray.svg" className={styles.previewImg} alt="camera" width={32} height={32} />
              <p className={styles.previewMessage}>이미지 추가하기</p>
            </div>
          )}
      </div>
      <input
        ref={fileInputRef}
        id={id}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        onBlur={handleBlur}
      />
      {validationTarget && !!countValidation?.[name] && !validation && (
        <p className={change ? `${styles.validation}` : `${styles.swing}`}>{validationContent}</p>
      )}
    </div>
  );
};

export default FileUploader;
