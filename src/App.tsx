import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./routes/home";
import { Profile } from "./routes/profile";
import { Login } from "./routes/login";
import { Signup } from "./routes/signup";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/loadingScreen";
import { auth } from "./firebase";
import styled from "styled-components";
import { ProtectedRoute } from "./components/protectedRoute";
import { Logout } from "./routes/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "signout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing:border-box;
  }
  body{
    background-color:black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 
    sans-serif
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState("true");
  const init = async () => {
    //wait for firebase
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
