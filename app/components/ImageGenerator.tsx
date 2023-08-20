"use client";

import { CSSProperties, useState, useRef, ChangeEvent } from "react";
import {
  generateRandomGradientStyle,
  generateRandomSolidStyle,
  getRandomColor,
  getRandomDirection,
} from "../utils/color";
import Modal from "./Modal";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { formattedDate } from "../utils/date";
import { useInput } from "../hooks/useInput";

export default function ImageGenerator() {
  const { inputValues, handleInputChange } = useInput({
    title: "",
    subTitle: "",
    tag: "",
  });
  const [imageUrl, setImageUrl] = useState<string>("");
  const [backgroundStyle, setBackgroundStyle] = useState<CSSProperties>({
    textUnderlineOffset: "8px",
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const divImageRef = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!divImageRef.current) return;
    try {
      const imageRef = divImageRef.current;
      const canvas = await html2canvas(imageRef, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, `thumbnail-${formattedDate}.png`);
        }
      });
    } catch (error) {
      console.error("Error converting div to Image", error);
    }
  };

  const generateRandomColorBackground = () => {
    const randomColor = getRandomColor();
    setBackgroundStyle({
      ...backgroundStyle,
      background: generateRandomSolidStyle(randomColor),
    });
  };

  const generateRandomGradientBackground = () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const direction = getRandomDirection();
    const gradientStyle = generateRandomGradientStyle(
      color1,
      color2,
      direction
    );
    setBackgroundStyle({
      ...backgroundStyle,
      background: gradientStyle,
    });
  };

  const generateImageBackground = () => {
    setBackgroundStyle({
      ...backgroundStyle,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "cover",
    });

    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const rowStyle = `flex md:flex-row gap-4 mx-auto justify-between w-full items-center`;
  const inputStyle = `border-2 border-blue-500 w-full md:w-1/3 rounded-md p-1 placeholder:italic placeholder:text-slate-400 block bg-white rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm`;
  const buttonStyle = `bg-blue-500 rounded-md p-1 text-white w-1/3`;

  return (
    <>
      <div className="flex flex-col space-y-6 mx-auto w-10/12">
        <div className={`${rowStyle} flex-col`}>
          <span className="w-full md:w-1/4">내용 입력</span>
          <input
            id="title"
            type="text"
            name="title"
            value={inputValues.title}
            required
            placeholder="제목을 입력하세요."
            className={inputStyle}
            onChange={handleInputChange}
          />
          <input
            id="subTitle"
            type="text"
            name="subTitle"
            value={inputValues.subTitle}
            required
            className={inputStyle}
            placeholder="부제목을 입력하세요."
            onChange={handleInputChange}
          />
          <input
            id="tag"
            type="text"
            name="tag"
            value={inputValues.tag}
            required
            className={inputStyle}
            placeholder="태그를 입력하세요."
            onChange={handleInputChange}
          />
        </div>
        <hr />
        <div className={rowStyle}>
          <span className="w-1/4">배경 설정</span>
          <button
            type="button"
            className={buttonStyle}
            onClick={generateRandomGradientBackground}
          >
            그라데이션
          </button>
          <button
            type="button"
            className={buttonStyle}
            onClick={generateRandomColorBackground}
          >
            단색
          </button>
          <button
            id="image"
            type="button"
            value={imageUrl}
            className={buttonStyle}
            onClick={openModal}
          >
            이미지 URL
          </button>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col">
          <div
            className="w-full max-w-3xl h-96 mx-auto flex flex-col justify-between bg-black"
            style={backgroundStyle}
            ref={divImageRef}
          >
            <div className="h-2/3 justify-center flex flex-col rounded-t-lg">
              <h1 className="text-white text-center text-4xl mt-10 underline underline-offset-8">
                {inputValues.title || "제목을 입력하세요"}
              </h1>
              <h2 className="text-white text-center text-2xl mt-10 underline underline-offset-8">
                {inputValues.subTitle || "부제목을 입력하세요"}
              </h2>
            </div>
            <div className="text-center mb-4 ">
              <p className="text-white w-full underline underline-offset-8">
                {inputValues.tag || "태그를 입력하세요"}
              </p>
            </div>
          </div>
        </div>
        <button
          className={`${buttonStyle} mx-auto p-4`}
          onClick={generateImage}
        >
          Generate
        </button>
      </div>

      <Modal
        isVisible={showModal}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        onClose={closeModal}
        setBackgroundImage={generateImageBackground}
      />
    </>
  );
}
