import React, { useState }  from "react";
import firebase from "../../../firebase";
import * as fb from "../../../firebase";
import { getCompanyESG } from '../../../requests/request'

function useAuth() {
  const [authUser, setAuthUser] = useState({user: null, userInfo: null, updateUser: null, companyDisplay: null, 
    newCompanyDisplay: null, companyArray: null, pushCompanyArray: null, 
    watchList: null, storeWatchList: null, allSecurities: null, storeAllSecurities: null }); 

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

  const updateUserInfo = (data) => {
    setAuthUser((oldState) => {
      for (const key in data) {
      oldState.userInfo[key] = data[key];
      }
      return { ...oldState };
    });
  }

  const storeWatchList = (list) => {
    setAuthUser((oldState) => {
      oldState.watchList =  list;
      return { ...oldState };
    });
  }

  const storeAllSecurities = (list) => {
    setAuthUser((oldState) => {
      oldState.allSecurities = list;
      return { ...oldState };
    });
  }

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      var userCred = user;
      setAuthUser({user: userCred, userInfo: null});
      if (user) {
        var dataUser;
        fb.getUser(user.uid).then((data)=> {
          dataUser = data;
          if (!data.company) {
            return 0;
          } else { 
            return getCompanyESG(data.company.c)
          };
        }).then((ESGData) => {
          if (!dataUser.company || !ESGData.data.NAME) {
            setAuthUser({user: userCred, userInfo: dataUser, updateUserInfo: updateUserInfo, companyDisplay: '',
              newCompanyDisplay: newCompanyDisplay, companyArray: [], pushCompanyArray: pushCompanyArray, 
              watchList: [], storeWatchList: storeWatchList, allSecurities: [], storeAllSecurities: storeAllSecurities});
          } else {
            setAuthUser({user: userCred, userInfo: dataUser, updateUserInfo: updateUserInfo, companyDisplay: dataUser.company.c,
              newCompanyDisplay: newCompanyDisplay, companyArray: [ ESGData.data ], pushCompanyArray: pushCompanyArray, 
              watchList: [], storeWatchList: storeWatchList, allSecurities: [], storeAllSecurities: storeAllSecurities});
          }
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
