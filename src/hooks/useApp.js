import { useContext } from "react";

import { AppContext } from "../context/AppContextValue";

export const useApp = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useApp must be used inside an AppProvider");
    }

    return context;
};
