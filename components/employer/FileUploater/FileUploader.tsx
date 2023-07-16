"use client";

import React, { useRef } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./FileUploader.module.scss";

const cx = classNames.bind(styles);

interface FileUploaderProps {
  previewUrl: string,
  isEditMode: boolean,
  onFileChange: (file: File | undefined) => void;
}

const FileUploader = ({ onFileChange, previewUrl, isEditMode }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    onFileChange(file);
  };

  return (
    <div className={styles.filePreviewer}>
      <label className={styles.label} htmlFor="file-input">가게 이미지</label>
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
        id="file-input"
        name="file"
        type="file"
        accept="image/*"
        onChange={(e) => { handleFileChange(e); }}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default FileUploader;
