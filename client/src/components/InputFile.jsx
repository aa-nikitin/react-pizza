import React, { useState } from 'react';

const InputFile = ({ name, idFile, onChange, value }) => {
  const [previewFile, setPreviewFile] = useState('');
  const handleChang = (e) => {
    const reader = new FileReader();
    if (e.target && e.target.files[0]) {
      reader.onload = function (e) {
        setPreviewFile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else setPreviewFile('');

    onChange(e);
  };
  return (
    <div className="input-file">
      <label className="input-file__label" htmlFor={idFile}>
        {value ? value.name : 'Загрузить'}
      </label>
      <input
        hidden
        className="input-file__file"
        name={name}
        id={idFile}
        type="file"
        onChange={handleChang}
        accept="image/x-png,image/jpeg"
      />
      {previewFile && (
        <label className="input-file__preview" htmlFor={idFile}>
          <img className="input-file__img-preview" src={previewFile} alt="" />
        </label>
      )}
    </div>
  );
};

export { InputFile };
