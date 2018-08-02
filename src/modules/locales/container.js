import React, { Component } from 'react';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import {LocaleProvider as MobileLocaleProvider} from 'antd-mobile';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

const antdLocales = {zh_CN,en_US}

const Locales = ({ history,locales={},children})=>{
  const antLocale  = locales.locale.replace('-',"_");
    const antdProps = {
      locale:antdLocales[antLocale],
    };

    let mobileLocale ;
    if(locales.locale.toLowerCase() === 'en-us'){
      mobileLocale = enUS
    }
    return (
      <LocaleProvider {...antdProps}>
        <MobileLocaleProvider locale={mobileLocale}>
        {children}
        </MobileLocaleProvider>
      </LocaleProvider>
    )
}
export default connect(({locales})=>({locales}))(Locales)



