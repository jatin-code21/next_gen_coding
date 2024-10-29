import { create } from 'zustand';

const useBattleStore = create((set) => ({
    timeleft: 5 * 60, // initial time left is 5 minutes
    battleStartTime: null,
    setTimeLeft: (time) => set({ timeleft: time }),
    setBattleStartTime: (time) => set({ battleStartTime: time }),
    resetBattleStore: () => set({ timeleft: 5 * 60, battleStartTime: null }),
    startTimer: () => {
        const interval = setInterval(() => {
            set((state) => {
                if (state.battleStartTime) {
                    const now = Date.now();
                    const elapsed = Math.floor((now - state.battleStartTime) / 1000);
                    const remaining = Math.max(5 * 60 - elapsed, 0);
                    return { timeleft: remaining };
                }
                return { timeleft: state.timeLeft }; // Keep the current time if no battle start time
            });
        }, 1000);
        return interval;
    },
}));

export default useBattleStore;