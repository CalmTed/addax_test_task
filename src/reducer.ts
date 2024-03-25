import { ACTION_NAME, ActionModel, createTask, StateModel, TaskModel } from "./models";

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
        case ACTION_NAME.SET_TASKS_LIST:
            if(
                typeof action?.payload !== "object" ||
                action.payload.length === 0 ||
                action.payload.filter(t => typeof t?.id === "undefined").length !== 0
            ){
                break;
            }
            const newTasks = state.tasks.map(task => {
                const target = action.payload.find(t => t.id === task.id)
                if(!target){
                    return task;
                }
                return {
                    ...task,
                    plannedDate: target.plannedDate,
                    order: target.order
                } as TaskModel
                
            })
            newState = {
                ...state,
                tasks: newTasks
            }
        break;
        case ACTION_NAME.SET_HOLIDAYS_LIST:
            if(
                typeof action?.payload !== "object" ||
                action.payload.length === 0 ||
                action.payload.filter(t => typeof t?.id === "undefined").length !== 0
            ){
                break;
            }
            newState = {
                ...state,
                holidays: action.payload
            }
        break;
        case ACTION_NAME.TASK_ADD: 
            if(
                typeof action?.payload?.plannedDate !== "number"
            ){
                break;
            }
            const newTask = createTask({plannedDate: action.payload.plannedDate});
            newState = {
                ...state,
                tasks: [...state.tasks, newTask]
            }
        break;
        case ACTION_NAME.TASK_REMOVE: 
            if(
                typeof action?.payload?.id !== "number"
            ){
                break;
            }
            newState = {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.payload.id)
            }
        break;
        case ACTION_NAME.TASK_MODIFY:
            if(
                typeof action?.payload?.id !== "number"
            ){
                break;
            }
            const modifiedTasks = state.tasks.map(t => {
                if(t.id === action.payload.id){
                    return {
                        ...t,
                        order: action.payload?.order ?? t.order,
                        labelText: action.payload?.labelText ?? t.labelText,
                        isCompleted: action.payload?.isCompleted ?? t.isCompleted,
                        plannedDate: action.payload?.plannedDate ?? t.plannedDate
                    }
                }else{
                    return t;
                }
            })
            newState = {
                ...state,
                tasks: modifiedTasks
            }
        break;
        default: console.error("action name doen not exists", action)
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