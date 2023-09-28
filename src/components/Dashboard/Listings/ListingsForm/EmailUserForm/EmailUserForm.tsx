import React, { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Label from '../../../../shared/Label/Label';
import { Input } from '../../../../shared/Input/Input.styled';
import { StyledTextarea } from '../../../../shared/Textarea/Textarea.styled';
import Editor from '../../../../shared/Editor/Editor';
import Dropzone from '../../../../shared/Dropzone/Dropzone';
import { GreenButton, SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import PackagesAdv from '../../PackagesAdv/PackagesAdv';
import {
  Form, Wrapper, Title, Row, Divider, FilesWrapper, StyledError, AlertWrapper,
} from './EmailUserForm.styled';
import Alert from '../../../../shared/Alert/Alert';
import { axiosInstance } from '../../../../../axios';
import { msalInstance } from '../../../../..';
import { silentRequest } from '../../../../../authConfig';
import LoadingOverlay from '../../../../shared/LoadingOverlay/LoadingOverlay';

interface EditorRef {
  saveDraft: () => void;
  pasteDraft: () => void;
  getContent: () => string;
}

const EmailUserForm = () => {
  const [params] = useSearchParams();
  const editorRef = useRef<EditorRef>(null);
  const [error, setError] = useState<string | null>(null);
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasDraft, setHasDraft] = useState(Boolean(localStorage.getItem(`${params.get('to')}-${params.get('type')}`)));

  const formik = useFormik({
    initialValues: {
      subject: '',
      attachment1: {} as File,
      attachment2: {} as File,
    },
    validationSchema: Yup.object().shape({
      subject: Yup.string().required('Subject is required field'),
      notification: Yup.string().max(297, 'Notification can not be more than 297 characters'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await axiosInstance.post('/Report/sendcustomeremail', {
        subject: formik.values.subject,
        message: editorRef.current?.getContent(),
        attachment: formik.values.attachment1,
        attachment2: formik.values.attachment2,
        token: await msalInstance.acquireTokenSilent(silentRequest).then((res) => res.accessToken),
      }).then((data) => {
        if (error) setError(null);
        setSend(true);
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
        setError('Something went wrong');
      });
    },
  });

  const saveFile = (files: File[], id: string) => {
    formik.setFieldValue(id, files[0]);
  };

  const allowedFiles = {
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/pdf': ['.pdf'],
  };

  const saveDraft = () => {
    if (editorRef.current) {
      editorRef.current.saveDraft();
      setHasDraft(true);
    }
  };

  const pasteDraft = () => {
    if (editorRef.current) {
      editorRef.current.pasteDraft();
    }
  };

  const navigate = useNavigate();

  return send ? (
    <AlertWrapper>
      <Alert type="success">
        <p>
          An email was successfully sent to
          <strong>{` ${params.get('to')}`}</strong>
        </p>
      </Alert>
      <br />
      <GreenButton onClick={() => navigate('/dashboard/reporting')}>Back</GreenButton>
    </AlertWrapper>
  ) : (
    <>
      { error ? (
        <AlertWrapper>
          <Alert type="error">Something went wrong</Alert>
          <br />
        </AlertWrapper>
      ) : null }
      { loading ? <LoadingOverlay /> : null }
      <Wrapper>
        <Form onSubmit={formik.handleSubmit}>
          <Title>{`Send message to ${params.get('to') ?? ''}`}</Title>
          <Row className="row">
            <Label
              text="Subject"
              inputId="subject"
            />
            <Input
              name="subject"
              id="subject"
              placeholder="Enter your subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
            />
            {formik.errors.subject ? <StyledError>{formik.errors.subject}</StyledError> : null}
          </Row>
          <Divider />
          <Row className="row">
            <Label
              text="Message"
              inputId=""
            />
            <Editor initialValue="" ref={editorRef} draftName={`${params.get('to')}-${params.get('type')}`} />
          </Row>
          <Divider />
          <FilesWrapper>
            <div className="file">
              <Label
                text="Attachment One"
                content={{
                  title: 'Attachment One',
                  text: 'Maximum file size is 2mb (2048k)',
                }}
                inputId="attachment1"
              />
              <Dropzone filesText="PDF, DOC or DOCX Only please." saveFile={saveFile} id="attachment1" allowedFiles={allowedFiles} />
              {formik.values.attachment1?.name ? <p className="file-name">{formik.values.attachment1?.name}</p> : null}
            </div>
            <div className="file">
              <Label
                text="Attachment Two"
                content={{
                  title: 'Attachment Two',
                  text: 'Maximum file size is 2mb (2048k)',
                }}
                inputId="attachment2"
              />
              <Dropzone filesText="PDF, DOC or DOCX Only please." saveFile={saveFile} id="attachment2" allowedFiles={allowedFiles} />
              {formik.values.attachment2?.name ? <p className="file-name">{formik.values.attachment2?.name}</p> : null}
            </div>
          </FilesWrapper>
          <Divider />
          <Row className="last">
            <GreenButton type="submit">Send</GreenButton>
            <SecondaryButton onClick={saveDraft}>Save As Draft</SecondaryButton>
            {hasDraft ? <SecondaryButton onClick={pasteDraft}>Use Draft</SecondaryButton> : null}
          </Row>
        </Form>
        <PackagesAdv />
      </Wrapper>
    </>
  );
};

export default EmailUserForm;
