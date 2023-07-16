"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./FileUploader.module.scss";

const cx = classNames.bind(styles);

interface FileUploaderProps {
  shopImageUrl?: string,
}

const FileUploader = ({ shopImageUrl }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!shopImageUrl) return;
    setPreviewUrl(shopImageUrl);
    setImageUrl(shopImageUrl);
    setIsEditMode(true);
  }, [shopImageUrl]);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDUzZmVjOS01NjdjLTQ2MDktODQ0Zi1hZWIzOTgxMTEyN2UiLCJpYXQiOjE2ODk0Mzg5Mjd9.4NnBka67bMT7Yyrrk-1DkbtjhJdsDC4vqhMbDGDye2M";

  interface MyResponse {
    item: {
      url: string
    }
  }

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setIsEditMode(false);
    }
  };

  const removeQueryFromUrl = (url: string): string => {
    return url.split("?")[0];
  };

  const handleUpload = (): void => {
    if (selectedFile) {
      fetch("/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: selectedFile.name }),
      })
        .then((response: Response) => { return response.json(); })
        .then((data: MyResponse) => {
          const { url } = data.item;
          fetch(url, {
            method: "PUT",
            body: selectedFile,
          })
            .then(() => {
              setImageUrl(removeQueryFromUrl(url));
            })
            .catch((err: Error) => {
              console.error(err);
            });
        })
        .catch((err: Error) => {
          console.error(err);
        });
    }
  };

  return (
    <div className={styles.filePreviewer}>
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
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button type="submit" onClick={handleUpload}>제출</button>
      <div>{`이미지 경로 : ${imageUrl}`}</div>
    </div>
  );
};

export default FileUploader;
