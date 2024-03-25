
export type StateModel = {
    version: string
    lastChange: number
    selectedMonth: number // timestamp
    tasks: TaskModel[]
    holidays: TaskModel[]
    filterText: string
}

export type TaskModel = {
    id: number
    order: number //for consistent reorder inside one cell
    isEditable: boolean // for holidays
    isCompleted: boolean
    plannedDate: number
    labelText: string
}

export type ActionModel = 
{
    name: ACTION_NAME.SET_SELECTED_MONTH,
    payload: number
} | {
    name: ACTION_NAME.SET_FILTER_TEXT,
    payload: string
} | {
    name: ACTION_NAME.SET_HOLIDAYS_LIST,
    payload: TaskModel[]
} | {
    name: ACTION_NAME.SET_TASKS_LIST,
    payload: TaskModel[]
} | {
    name: ACTION_NAME.TASK_ADD,
    payload: {
        plannedDate: number,
        labelText?: string,
        isEditable?: boolean
    }
} | {
    name: ACTION_NAME.TASK_REMOVE,
    payload: {
        id: number,
    }
} | {
    name: ACTION_NAME.TASK_MODIFY,
    payload: {
        id: number,
        order?: number,
        isCompleted?: boolean
        plannedDate?: number,
        labelText?: string
    }
}

export enum ACTION_NAME {
    SET_SELECTED_MONTH = "SET_SELECTED_MONTH",
    SET_FILTER_TEXT = "SET_FILTER_TEXT",
    SET_HOLIDAYS_LIST = "SET_HOLIDAYS_LIST",
    SET_TASKS_LIST = "SET_TASKS_LIST",
    TASK_ADD = "TASK_ADD",
    TASK_REMOVE = "TASK_REMOVE",
    TASK_MODIFY = "TASK_MODIFY"
}

export interface BasicComponentModel{
    state: StateModel,
    dispatch: (a: ActionModel) => void
}

//its here for convenience in this scale of app 
export const createState: () => StateModel = () => {
    const now = new Date();
    return {
        version: "0.0.1",
        lastChange: now.getTime(),
        selectedMonth: new Date(now.getFullYear(), now.getMonth(), 1).getTime(),
        tasks: [],
        holidays: [],
        filterText: "",
    }
}



export const createTask: (a:{
    plannedDate: number,
    order?: number,
    isEditable?: boolean,
    labelText?:string
}) => TaskModel = 
({plannedDate, order, isEditable = true, labelText = "Task"}) => {
    return {
        id: Math.floor(Math.random() * 1000000),
        order: isEditable ? order ?? 1: 0,//fixed are always fisrt 
        isEditable, // for holidays
        isCompleted: false,
        plannedDate,
        labelText,
        filtered: !isEditable
    }
}