import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { X } from "./x";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export interface ITweet {
  id: string;
  photo?: string;
  x: string;
  userId: string;
  username: string;
  createdAt: number;
}

export const Timeline = () => {
  const [x, setX] = useState<ITweet[]>([]);
  //   const fetchX = async () => {
  //     const xQuery = query(collection(db, "X"), orderBy("createdAt", "desc"));

  //     //     const snapshot = await getDocs(xQuery);
  //     //     const xS = snapshot.docs.map((doc) => {
  //     //       const { x, createdAt, userId, username, photo } = doc.data();
  //     //       return { x, createdAt, userId, username, photo, id: doc.id };
  //     //     });
  //     await onSnapshot(xQuery, (snapshot) => {
  //       const unsubscribe =
  //       const xS = snapshot.docs.map((doc) => {
  //         const { x, createdAt, userId, username, photo } = doc.data();
  //         return { x, createdAt, userId, username, photo, id: doc.id };
  //       });
  //       setX(xS);
  //     });
  //   };

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchX = async () => {
      const xQuery = query(
        collection(db, "X"),
        orderBy("createdAt", "desc"),
        limit(20)
      );

      //     const snapshot = await getDocs(xQuery);
      //     const xS = snapshot.docs.map((doc) => {
      //       const { x, createdAt, userId, username, photo } = doc.data();
      //       return { x, createdAt, userId, username, photo, id: doc.id };
      //     });
      unsubscribe = await onSnapshot(xQuery, (snapshot) => {
        const xS = snapshot.docs.map((doc) => {
          const { x, createdAt, userId, username, photo } = doc.data();
          return { x, createdAt, userId, username, photo, id: doc.id };
        });
        setX(xS);
      });
    };
    fetchX();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      {x.map((item) => (
        <X key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};
