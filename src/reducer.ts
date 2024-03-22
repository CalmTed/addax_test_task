import { ACTION_NAME, ActionModel, StateModel } from "./models";

export const reduce: (state: StateModel, action: ActionModel) => StateModel = (state, action) => {
    let newState: StateModel | undefined;
    switch(action.name){
        case ACTION_NAME.SET_SELECTED_MONTH: 
            if(!action.payload || typeof action.payload !== "number" || action.payload < 0){
                break;
            }
            newState = {
                ...state,
                selectedMonth: action.payload
            }
        break;
        case ACTION_NAME.SET_FILTER_TEXT: 
            if(
                typeof action?.payload !== "string"
                || action.payload.length > 50
                ){
                    break;
                }
            newState = {
                ...state,
                filterText: action.payload
            }
        break;
        case ACTION_NAME.TASK_ADD: 
        break;
        case ACTION_NAME.TASK_REMOVE: 
        break;
        case ACTION_NAME.TASK_MODIFY: 
        break;
        case ACTION_NAME.TASK_SWAP_ORDER: 
        break;
    }

    //changing only if state has changed
    if(newState){
        return {
            ...newState,
            lastChange: new Date().getTime()
        };
    }else{
        return state;
    }
}