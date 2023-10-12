import { NoteItem } from "../../components/NoteItem";
import { TextArea } from "../../components/TextArea";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "./styles";
import { api } from "../../services/api";
import { useState } from "react";

export function New() {
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleBack() {
    navigate(-1);
  }

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink]);
    setNewLink("");
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link != deleted));
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag != deleted));
  }

  async function handleCreateNote() {
    if (!title) {
      return alert("Digite o título da nota ");
    }

    if (newLink) {
      return alert(
        "Você deixou um link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio "
      );
    }

    if (newTag) {
      return alert(
        "Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio "
      );
    }

    const note = {
      title,
      description,
      tags,
      links,
    };

    await api.post("/notes", note);
    alert("Nota Criada com sucesso");
    navigate(-1);
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota </h1>
            <ButtonText onClick={handleBack} title="voltar" />
          </header>
          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            placeholder="Observaçoes"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis " />
          {links.map((link, index) => (
            <NoteItem
              key={String(index)}
              value={link}
              onClick={() => handleRemoveLink(link)}
            />
          ))}
          <NoteItem
            IsNew
            placeholder="Novo Link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            onClick={handleAddLink}
          />

          <Section title="Marcadores" />
          <div className="tags">
            {tags.map((tag, index) => (
              <NoteItem
                value={tag}
                onClick={() => handleRemoveTag(tag)}
                key={String(index)}
              />
            ))}

            <NoteItem
              IsNew
              placeholder="Novo Tag"
              onChange={(e) => setNewTag(e.target.value)}
              value={newTag}
              onClick={handleAddTag}
            />
          </div>

          <Button title="Salvar" onClick={handleCreateNote} />
        </Form>
      </main>
    </Container>
  );
}
