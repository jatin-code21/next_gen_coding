// src/components/BattleLayout.jsx
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useBattleStore from '@/store/battleStore';

export default function BattleLayout() {
  const { battleStartTime, startTimer } = useBattleStore();

  useEffect(() => {
    if (battleStartTime) {
      const intervalId = startTimer();
      return () => clearInterval(intervalId);
    }
  }, [battleStartTime, startTimer]);

  return <Outlet />;
}