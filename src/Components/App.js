import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Suspense } from "react";
import { routes } from "../router";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
