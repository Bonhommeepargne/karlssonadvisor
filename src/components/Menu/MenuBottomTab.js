import React from 'react';

import DefineCompany from '../Main/Search/DefineCompany';
import MenuTree from './MenuTree';
import Store from '../../context';

export default function MenuBottomTab() {

  return (
    <Store.Consumer>
      {(store) => (
        <>
          {store.companyDisplay == '' ? <DefineCompany /> : <MenuTree />}
        </>
        )}
    </Store.Consumer>
  );
}
