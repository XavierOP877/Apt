import React, { createContext, useContext, ReactNode } from 'react';

interface SwapContextType {
  apiKey: string;
  clientId: string;
  widgetStyles: { widget: { width: string } };
  tokenPickerView: string;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

const PANORA_WIDGET_API_KEY = "oLujOsvnXgFY9TjN5VxS@u@kmq+wWjcyTEnVL4LEPf5pwNtYdR90EfeBDj33F^4E";
const KEYLESS_GOOGLE_CLIENT_ID = "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";

export const SwapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const config: SwapContextType = {
    apiKey: PANORA_WIDGET_API_KEY,
    clientId: KEYLESS_GOOGLE_CLIENT_ID,
    widgetStyles: {
      widget: { width: "450px" },
    },
    tokenPickerView: "MODAL",
  };

  return <SwapContext.Provider value={config}>{children}</SwapContext.Provider>;
};

export const useSwap = (): SwapContextType => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error("useSwap must be used within a SwapProvider");
  }
  return context;
};
    