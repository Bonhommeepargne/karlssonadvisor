import React, { useState }  from "react";
import firebase from "../../../firebase";
import * as fb from "../../../firebase";

function useAuth() {
  const [authUser, setAuthUser] = useState({user: null, userInfo: null, companyDisplay: null, 
    newCompanyDisplay: null, companyArray: null, pushCompanyArray: null }); 

  const newCompanyDisplay = (code) => {
    setAuthUser((oldState) => {
      oldState.companyDisplay = code;
      return { ...oldState };
    });
  }

  const pushCompanyArray = (comp) => {
    setAuthUser((oldState) => {
      oldState.companyArray.push(comp);
      return { ...oldState };
    });
  }

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      var userCred = user;
      setAuthUser({user: userCred, userInfo: null});
      if (user) {
        fb.getUser(user.uid).then(data=> {
          setAuthUser({user: userCred, userInfo: data, companyDisplay: '4482154', newCompanyDisplay: newCompanyDisplay,
          companyArray: [], companyArray: [], pushCompanyArray: pushCompanyArray});
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
