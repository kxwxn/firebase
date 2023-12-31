import styled from "styled-components";
import { PostTweetForm } from "../components/postTweetForm";
import { Timeline } from "../components/timeline";

const Wrapper = styled.div`
  /* display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr; */
`;

export const Home = () => {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
};
