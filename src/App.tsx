import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
import EventDetailPage from "./pages/event/Eventdetail";
import FoodDetailPage from "./pages/food/Fooddetail"; // Import FoodDetailPage

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
          <Switch>
            {/* Home */}
            <Route exact path="/home" component={Home} />
            {/* Authentication */}
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route
              exact
              path="/complete-profile"
              render={() => (
                <CompleteProfile onComplete={() => setIsProfileUpdated(true)} />
              )}
            />
            {/* Admin Dashboard */}
            <Route path="/admin-dashboard" component={Dashboard} />
            {/* Profile */}
            <Route exact path="/profile">
              <Profile isProfileUpdated={isProfileUpdated} />
            </Route>
            <Route exact path="/edit-profile" component={EditProfile} />
            {/* Pages */}
            <Route exact path="/aboutus" component={Us} />
            <Route exact path="/destination" component={Destination} />
            <Route exact path="/food" component={Food} />
            <Route exact path="/event" component={Event} />
            {/* Detail Pages */}
            <Route exact path="/event/:eventid" component={EventDetailPage} />
            <Route exact path="/food/:foodid" component={FoodDetailPage} />
            {/* Default Route */}
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
