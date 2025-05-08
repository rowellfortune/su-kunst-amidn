import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import {useNavigate} from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import { API } from "aws-amplify";
import { onError } from "../../lib/errorLib";
import "./NewNote.css";
import type { OpencallType } from "@/types/note";

export default function NewOpencall() {
  const file = useRef<null | File>(null);
  const nav = useNavigate();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function createNote(note: OpencallType) {
    return API.post("notes", "/notes", {
      body: note,
    });
  }
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      await createNote({ content });
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if ( event.currentTarget.files === null ) return
    file.current = event.currentTarget.files[0];
  }

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            value={content}
            as="textarea"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="file">
          <Form.Label>Attachment</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <Stack>
          <LoaderButton
            size="lg"
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Create
          </LoaderButton>
        </Stack>
      </Form>
    </div>
  );
}
