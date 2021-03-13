import React  from "react";
import firebase from "../../../firebase";
import * as fb from "../../../firebase";

function useAuth() {
  const [authUser, setAuthUser] = React.useState({user: null, userInfo: null});

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      var userCred = user;
      setAuthUser({user: userCred, userInfo: null});
      if (user) {
        fb.getUser(user.uid).then(data=> {
          setAuthUser({user: userCred, userInfo: data});
        }).catch(err=> console.log(err))
      } else {
        setAuthUser({user: -1, userInfo: -1});
      }
    });

    return () => unsubscribe();
  }, []);

  return authUser;
}

export default useAuth;
