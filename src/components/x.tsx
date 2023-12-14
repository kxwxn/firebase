import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

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

const DeleteBtn = styled.button`
  background: skyblue;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export const X = ({ username, photo, x, userId, id }: ITweet) => {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this X?");

    if (!ok || user?.uid == userId) return;
    try {
      await deleteDoc(doc(db, "X", id));
      if (photo) {
        const photoRef = ref(storage, `X/${user?.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{x}</Payload>
        {user?.uid === userId ? (
          <DeleteBtn onClick={onDelete}>Delete</DeleteBtn>
        ) : null}
      </Column>

      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
};
