import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  DropzoneArea, TextWrapper, Wrapper, StyledError,
} from './Dropzone.styled';
import UploadIcon from '../../../assets/icons/upload-icon';

interface DropzoneProps {
  id: string;
  saveFile: (acceptedFiles: File[], id: string) => void;
  filesText: string;
  allowedFiles: {
    [key: string]: string[];
  };
}

const Dropzone = (props: DropzoneProps) => {
  const {
    filesText = 'JPG, GIF or PNG Only please.', saveFile, id, allowedFiles,
  } = props;
  const onDrop = useCallback((file: File[]) => {
    saveFile(file, id);
  }, []);

  const config = !allowedFiles ? { onDrop } : { onDrop, accept: allowedFiles };
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    ...config, maxSize: 2048000,
  });

  return (
    <Wrapper {...getRootProps()}>
      <input id={id} {...getInputProps()} />
      <DropzoneArea>
        <UploadIcon />
        <TextWrapper>
          <p>Click here or drag and drop</p>
          <p>{filesText}</p>
        </TextWrapper>
      </DropzoneArea>
      {fileRejections.length ? fileRejections.map((item) => (
        <StyledError key={item.errors[0].message}>
          {item.errors[0].code === 'file-to-large' ? 'Maximum file size is 2048kb' : item.errors[0].message }
        </StyledError>
      )) : null}
    </Wrapper>
  );
};

export default Dropzone;
