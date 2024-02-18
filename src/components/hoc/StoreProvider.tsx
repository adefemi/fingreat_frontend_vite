import { UserType } from "@/utils/types";
import { FC, createContext, useReducer, Dispatch, useContext } from "react";

interface StoreProps {
    activeUser: UserType | null;
}

const initialState: StoreProps = {
    activeUser: null,
};

export enum ActionTypes {
    UpdateUser = "updateUser",
}

type ActionType = {
    type: ActionTypes.UpdateUser;
    payload: UserType | null;
};


export const store = createContext<{ state: StoreProps; dispatch: Dispatch<ActionType> } | undefined>(
    undefined
)

const reducer = (state: StoreProps, action: ActionType): StoreProps => {
    switch (action.type) {
        case ActionTypes.UpdateUser:
            return { ...state, activeUser: action.payload };
        default:
            return state;
    }
};

export const StoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <store.Provider value={{ state, dispatch }}>
            {children}
        </store.Provider>
    );
};

//  custom hook to use the store
export const useStore = (): {
    state: StoreProps;
    dispatch: Dispatch<ActionType>;
} => {
    const context = useContext(store);
    if (context === undefined) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return {
        state: context.state,
        dispatch: context.dispatch,
    };
}

export default StoreProvider;