import React, { useState } from "react";
import firebase from "../../../firebase";
import * as fb from "../../../firebase";
import { getSectorESG, getUpdateDate } from '../../../requests/request';
import transformData from '../../../util/transformData';
import _ from 'lodash';

function useAuth() {
  const [authUser, setAuthUser] = useState({
    user: null, userInfo: null, updateUser: null,
    sectorArray: null, pushSectorArray: null, indexSector: null, newIndexSector: null, indexCompanyRow: null,
    indexCompanyCol: null, newIndexCompany: null,
    watchList: null, storeWatchList: null, allSecurities: [], storeAllSecurities: null,
    updateDate: null
  });

  const pushSectorArray = (compArray) => {
    setAuthUser((oldState) => {
      oldState.sectorArray.push(compArray);
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
      oldState.watchList = list;
      return { ...oldState };
    });
  }

  const storeAllSecurities = (list) => {
    setAuthUser((oldState) => {
      oldState.allSecurities = list;
      return { ...oldState };
    });
  }

  const newIndexSector = (n) => {
    setAuthUser((oldState) => {
      oldState.indexSector = n;
      return { ...oldState };
    });
  }

  const newIndexCompany = ({ row, col }) => {
    setAuthUser((oldState) => {
      oldState.indexCompany.row = row;
      oldState.indexCompany.col = col;
      return { ...oldState };
    });
  }

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {

      var userCred = user;
      var dataObj;
      var companyInSector;
      var ESGData
      var dataUser;

      if (user) {
        fb.getUser(user.uid).then((data) => {
          // console.log('data user ok')
          dataUser = data;
          if (dataUser == undefined) { dataUser = null }
          if (!dataUser) {
            return Promise.all([0, getUpdateDate()]);
          } else {
            if (!dataUser.company) {
              return Promise.all([0, getUpdateDate()]);
            } else {
              return Promise.all([getSectorESG('SASBIndustryGroupCode', data.company.s), getUpdateDate()]);
            }
          };
        }).then((mult) => {
          ESGData = mult[0];
          if (ESGData != 'empty data') {
            if (!dataUser) {
              setAuthUser({ user: userCred, userInfo: {} });
            } else {
              if (!dataUser.company) {
                setAuthUser({
                  user: userCred, userInfo: dataUser, updateUserInfo: updateUserInfo,
                  sectorArray: [], pushSectorArray: pushSectorArray, indexSector: null,
                  newIndexSector: newIndexSector, indexCompany: { row: 0, col: 0 }, newIndexCompany: newIndexCompany,
                  watchList: [], storeWatchList: storeWatchList, allSecurities: [], storeAllSecurities: storeAllSecurities,
                  updateDate: mult[1].data.date
                })
              } else {
                dataObj = transformData(ESGData.data, mult[1].data.date);
                companyInSector = _.findIndex(dataObj, function (o) { return o.Sedol7 == dataUser.company.c; });

                setAuthUser({
                  user: userCred, userInfo: dataUser, updateUserInfo: updateUserInfo,
                  sectorArray: [dataObj], pushSectorArray: pushSectorArray, indexSector: 0,
                  newIndexSector: newIndexSector, indexCompany: { row: 0, col: companyInSector }, newIndexCompany: newIndexCompany,
                  watchList: [], storeWatchList: storeWatchList, allSecurities: [], storeAllSecurities: storeAllSecurities,
                  updateDate: mult[1].data.date
                });
              }
            }
          } else {
            if (dataUser.company) {
              delete dataUser.company
            }
            setAuthUser({
              user: userCred, userInfo: dataUser, updateUserInfo: updateUserInfo,
              sectorArray: [], pushSectorArray: pushSectorArray, indexSector: null,
              newIndexSector: newIndexSector, indexCompany: { row: 0, col: 0 }, newIndexCompany: newIndexCompany,
              watchList: [], storeWatchList: storeWatchList, allSecurities: [], storeAllSecurities: storeAllSecurities,
              updateDate: mult[1].data.date
            });
          }
        }).catch(err => console.log('Erreur useAuth : ', err))
      } else {
        setAuthUser({ user: - 1, userInfo: -1 });
      }
    });

    return () => unsubscribe();
  }, []);

  return authUser;
}

export default useAuth;
