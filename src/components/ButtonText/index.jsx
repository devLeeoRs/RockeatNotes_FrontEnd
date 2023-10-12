import { Container } from "./styles";

export function ButtonText({ title, isActive = false, ...Rest }) {
  return (
    <Container type="button" $isactive={isActive} {...Rest}>
      {title}
    </Container>
  );
}
