// ============================================================================
// 既存アプリへの統合コード
// 既存のApp.jsやmain.jsに追加
// ============================================================================

import React from 'react';
import LiveSystemStatus from './components/LiveSystemStatus';
import api from './services/api';

// 既存のAppコンポーネントにラップして追加
export const withTKGBankIntegration = (ExistingApp) => {
  return (props) => (
    <>
      <ExistingApp {...props} />
      <LiveSystemStatus />
    </>
  );
};

// グローバルAPIアクセス (既存コードから使用可能)
if (typeof window !== 'undefined') {
  window.tkgbank = api;
}

export { api };
