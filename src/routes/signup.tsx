import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/authComponents";
import { GitHubBtn } from "../components/gitHubButton";

export const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setNamse] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("event", e);
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setNamse(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User Credential", credential.user);
      await updateProfile(credential.user, {
        displayName: name,
      });
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
    // create an account
    // set the name of the user
    // redirect to the home page
    console.log(name, email, password);
  };

  return (
    <Wrapper>
      <Title>JOIN 𝕏 </Title>
      <Form onSubmit={onSubmit}>
        <Input
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
          onChange={onChange}
        />
        <Input
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
          onChange={onChange}
        />
        <Input
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
          onChange={onChange}
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Sign up"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login"> log in here! &rarr;</Link>
      </Switcher>
      <GitHubBtn />
    </Wrapper>
  );
};
