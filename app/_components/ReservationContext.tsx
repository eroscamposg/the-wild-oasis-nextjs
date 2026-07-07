'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface ReservationContextType {
  range: DateRange | undefined;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
}

const initialState: DateRange = {
  from: undefined,
  to: undefined,
};

const ReservationContext = createContext<ReservationContextType>({
  range: initialState,
  setRange: () => {},
  resetRange: () => {},
});

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);

  function resetRange() {
    setRange(initialState);
  }

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (!context) throw new Error('ReservationContext was used outside provider');

  return context;
}

export { ReservationProvider, useReservation };
