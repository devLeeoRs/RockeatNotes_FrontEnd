import { FiPlus, FiSearch } from "react-icons/fi";
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Notes } from "../../components/Notes";
import { Header } from "../../components/Header";
import { ButtonText } from "../../components/ButtonText";

import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    if (tagName === "all") {
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName);

    if (alreadySelected) {
      const tagsFiltred = tagsSelected.filter((tag) => tag != tagName);
      setTagsSelected(tagsFiltred);
    } else {
      setTagsSelected((prevState) => [...prevState, tagName]);
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");

      setTags(response.data);
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`
      );
      setNotes(response.data);
    }

    fetchNotes();
  }, [search, tagsSelected]);

  return (
    <Container>
      <Brand>
        <h1>RockeatNotes</h1>
      </Brand>

      <Header />
      <Menu>
        <li>
          <ButtonText
            title="Todos"
            $isactive={tagsSelected.length === 0}
            onClick={() => handleTagSelected("all")}
          />
        </li>
        {tags.map((tag) => (
          <li key={String(tag.id)}>
            <ButtonText
              title={tag.name}
              onClick={() => {
                handleTagSelected(tag.name);
              }}
              $isactive={tagsSelected.includes(tag.name)}
            />
          </li>
        ))}
      </Menu>

      <Search>
        <Input
          placeholder="pesquisar pelo titulo"
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas Notas "></Section>
        {notes.map((note) => (
          <Notes
            data={note}
            key={String(note.id)}
            onClick={() => handleDetails(note.id)}
          />
        ))}
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
}
