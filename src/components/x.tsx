import styled from "styled-components";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 15px;
  background: transparent;
`;
const Column = styled.div``;
const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

export const X = ({ username, photo, x }: ITweet) => {
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{x}</Payload>
      </Column>

      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
};
