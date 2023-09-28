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
import {
  Form, Wrapper, Title, Row, Divider, FilesWrapper, StyledError, StyledCheckbox, StyledAlert, AlertWrapper,
} from './BookingNewsletter.styled';
import Alert from '../../../../shared/Alert/Alert';
import { axiosInstance } from '../../../../../axios';
import { msalInstance } from '../../../../..';
import { silentRequest } from '../../../../../authConfig';
import LoadingOverlay from '../../../../shared/LoadingOverlay/LoadingOverlay';
import PackagesAdv from '../../../Listings/PackagesAdv/PackagesAdv';

interface EditorRef {
  saveDraft: () => void;
  pasteDraft: () => void;
  getContent: () => string;
}

const BookingNewsletter = () => {
  const [params] = useSearchParams();
  const editorRef = useRef<EditorRef>(null);
  const [error, setError] = useState<string | null>(null);
  const [send, setSend] = useState<null | { emailCount: number }>(null);
  const [loading, setLoading] = useState(false);
  const [hasDraft, setHasDraft] = useState(Boolean(localStorage.getItem(`${params.get('id')}-${params.get('type')}`)));

  const formik = useFormik({
    initialValues: {
      subject: '',
      attachment1: {} as File,
      attachment2: {} as File,
      marketing: false,
      classSignupEmail: false,
    },
    validationSchema: Yup.object().shape({
      subject: Yup.string().required('Subject is required field'),
      notification: Yup.string().max(297, 'Notification can not be more than 297 characters'),
    }),
    onSubmit: async () => {
      setLoading(true);
      await axiosInstance.post('/Report/sendnewsletteremail', {
        subject: formik.values.subject,
        message: editorRef.current?.getContent(),
        attachment: formik.values.attachment1,
        attachment2: formik.values.attachment2,
        token: await msalInstance.acquireTokenSilent(silentRequest).then((res) => res.accessToken),
        marketingEmail: formik.values.marketing,
        classSignupEmail: formik.values.classSignupEmail,
      }).then((res) => {
        if (error) setError(null);
        if (res.status === 200) {
          // eslint-disable-next-line prefer-destructuring
          const data = res.data;
          setSend({
            emailCount: data.emailCount,
          });
        } else {
          throw new Error('Something went wrong');
        }

        setLoading(false);
      }).catch((err) => {
        setLoading(false);
        setError(err.message);
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
          Your message has been sent to
          {' '}
          <strong>{send.emailCount}</strong>
          {' '}
          {send.emailCount === 1 ? 'recipient' : 'recipients'}
          {' '}
          via email.
        </p>
      </Alert>
      <br />
      <GreenButton onClick={() => navigate('/dashboard/reporting?type=bookings')}>Back</GreenButton>
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
          <Title>Message bookings</Title>
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
            <Editor initialValue="" ref={editorRef} draftName={`${params.get('id')}-${params.get('type')}`} />
          </Row>
          <Divider />
          <Row>
            <Label
              text="Marketing Email"
              content={{
                title: 'Marketing Email',
                text: 'If this is a marketing email, please check this box. Messages that are sent for the purpose of marketing will not be sent to those that have unsubscribed. They will also include an unsubscribe link in the body of the email.',
              }}
              inputId=""
            />
            <StyledCheckbox name="marketing" onChange={formik.handleChange} checked={formik.values.marketing} />
          </Row>
          <Divider />
          <Row>
            <Label
              text="Class Sign up Email"
              content={{
                title: 'Class Sign up Email',
                text: "This will include a link in the email to allow customer's to easily register themselves on a class list.",
              }}
              inputId=""
            />
            <StyledCheckbox name="classSignupEmail" onChange={formik.handleChange} checked={formik.values.classSignupEmail} />
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
            <GreenButton type="submit">Send Newsletter</GreenButton>
            <SecondaryButton onClick={saveDraft}>Save As Draft</SecondaryButton>
            {hasDraft ? <SecondaryButton onClick={pasteDraft}>Use Draft</SecondaryButton> : null}
          </Row>
        </Form>
        <PackagesAdv />
      </Wrapper>
    </>
  );
};

export default BookingNewsletter;
