import { auth } from "../firebase";

export const Logout = () => {
  const onClick = () => {
    auth.signOut();
  };

  return (
    <h1>
      <button onClick={onClick}>logout</button>
    </h1>
  );
};
