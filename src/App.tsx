import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Us from "./pages/us/Us";
import Destination from "./pages/destination/Destination";
import Food from "./pages/food/Food";
import Event from "./pages/event/Event";
import CompleteProfile from "./pages/auth/CompleteProfile";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  // State untuk melacak apakah profil sudah diperbarui
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="/admin-dashboard" component={Dashboard} />
          <Route exact path="/aboutus">
            <Us />
          </Route>
          <Route exact path="/profile">
            <Profile isProfileUpdated={isProfileUpdated} />
          </Route>
          <Route exact path="/edit-profile">
            <EditProfile />
          </Route>
          <Route exact path="/event">
            <Event />
          </Route>
          <Route exact path="/food">
            <Food />
          </Route>
          <Route exact path="/destination">
            <Destination />
          </Route>
          <Route path="/complete-profile">
            <CompleteProfile onComplete={() => setIsProfileUpdated(true)} />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
