import React, { useState }  from "react";
import firebase from "../../../firebase";
import * as fb from "../../../firebase";
import { getCompanyESG } from '../../../requests/request'

function useAuth() {
  const [authUser, setAuthUser] = useState({user: null, userInfo: null, updateUser: null, companyDisplay: null, 
    companyDisplayName: null, newCompanyDisplay: null,
    companyArray: null, pushCompanyArray: null, 
    sectorDisplay: null, sectorDisplayName: null, newSectorDisplay: null, 
    sectorArray: null, pushSectorArray: null,
    watchList: null, storeWatchList: null, allSecurities: null, storeAllSecurities: null }); 

  const newCompanyDisplay = ({code, name}) => {
    setAuthUser((oldState) => {
      oldState.companyDisplay = code;
      oldState.companyDisplayName = name;
      return { ...oldState };
    });
  }

  const newSectorDisplay = ({code, name }) => {
    setAuthUser((oldState) => {
      oldState.sectorDisplay = code;
      oldState.sectorDisplayName = name;
      return { ...oldState };
    });
  }

  const pushCompanyArray = (comp) => {
    setAuthUser((oldState) => {
      oldState.companyArray.push(comp);
      return { ...oldState };
    });
  }

  const pushSectorArray = (comp) => {
    setAuthUser((oldState) => {
      oldState.sectorArray.push(comp);
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
      console.log('connected')

      var userCred = user;
      setAuthUser({user: userCred, userInfo: null});
      if (user) {
        var dataUser;
        fb.getUser(user.uid).then((data)=> {
          console.log('data user ok')

          dataUser = data;
          if (!data.company) {
            return 0;
          } else { 
            return getCompanyESG(data.company.c)
          };
        }).then((ESGData) => {
          console.log('data company retrieved.')

          if (!dataUser.company || !ESGData.data.NAME) {
            setAuthUser({user: userCred, userInfo: dataUser, updateUserInfo: updateUserInfo, companyDisplay: '',
              companyDisplayName: '', newCompanyDisplay: newCompanyDisplay, 
              companyArray: [], pushCompanyArray: pushCompanyArray, 
              sectorDisplay: '', sectorDisplayName: '', newSectorDisplay: newSectorDisplay,
              sectorArray: [], pushSectorArray: pushSectorArray,
              watchList: [], storeWatchList: storeWatchList, allSecurities: [], storeAllSecurities: storeAllSecurities});
          } else {
            setAuthUser({user: userCred, userInfo: dataUser, updateUserInfo: updateUserInfo, companyDisplay: dataUser.company.c,
              companyDisplayName: dataUser.company.n, newCompanyDisplay: newCompanyDisplay, 
              companyArray: [ ESGData.data ], pushCompanyArray: pushCompanyArray, 
              sectorDisplay: ESGData.data.SASBSubSectorCode, sectorDisplayName: ESGData.data.SASBSubSector, newSectorDisplay: newSectorDisplay,
              sectorArray: [], pushSectorArray: pushSectorArray,
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
