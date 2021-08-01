import React, { useState } from 'react';
import './board-create.css';
const BoardCreate = () => {
  function readMultipleImage(e) {
    const input = e.target;
    const multipleContainer = document.getElementById('multiple-container');

    // 인풋 태그에 파일들이 있는 경우
    if (input.files) {
      // 이미지 파일 검사 (생략)
      console.log(input.files);
      // 유사배열을 배열로 변환 (forEach문으로 처리하기 위해)
      const fileArr = Array.from(input.files);
      const $colDiv1 = document.createElement('div');
      const $colDiv2 = document.createElement('div');
      $colDiv1.classList.add('column');
      $colDiv2.classList.add('column');
      fileArr.forEach((file, index) => {
        const reader = new FileReader();
        const $imgDiv = document.createElement('div');
        const $img = document.createElement('img');
        $img.classList.add('image');
        const $label = document.createElement('label');
        $label.classList.add('image-label');
        $label.textContent = file.name;
        $imgDiv.appendChild($img);
        $imgDiv.appendChild($label);
        reader.onload = (e) => {
          $img.src = e.target.result;
          console.log($img);
          $imgDiv.style.width = $img.width * 1 + 'px';
          $imgDiv.style.height = $img.height * 1 + 'px';
        };

        console.log(file.name);
        if (index % 2 === 0) {
          $colDiv1.appendChild($imgDiv);
        } else {
          $colDiv2.appendChild($imgDiv);
        }

        reader.readAsDataURL(file);
      });
      multipleContainer.appendChild($colDiv1);
      multipleContainer.appendChild($colDiv2);
    }
  }

  return (
    <>
      <input
        type="file"
        id="input-multiple-image"
        multiple
        onChange={readMultipleImage}
      />
      <div id="multiple-container"></div>
    </>
  );
};

export default BoardCreate;
