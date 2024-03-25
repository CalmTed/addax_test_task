import React, { FC } from "react";
import styled from "styled-components";
import { ACTION_NAME, ActionModel, TaskModel } from "../models";
import { DAY } from "../constants";
import { ReactSortable, Sortable } from "react-sortablejs";

const CellStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: var(--bg-cell);
    border-radius: 2pt;
    padding: 0.8em;
    align-content: flex-start;
    &.inactive{
        opacity: 0.3;
    }
    &.today{
        & .cellNumber{
            color: var(--color-second)
        }
    }
    & .cellTitle{
        display: flex;
        gap: 0.3em;
        height: 1.5em;
        width: 100%;
        & .cellNumber{
            font-weight: bold;
        }
        & .cellAddButton{
            font-size: 1.5em;
            line-height: 1em;
            padding: 0 0.3em;
            background: var(--color-second);
            color: var(--color-text-inverted);
            border-radius: 2pt;
            opacity: 0;
            user-select: none;
        }
    }
    &:hover:not(.inactive){
        & .cellAddButton{
            opacity: 1;
            cursor: pointer;
        }
        
    }

    & .cellList{
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: calc(100% - 1em);
        height: 100%;
        & .taskItem{
            gap: 0.5em;
            display: flex;
            justify-content: space-evenly;
            padding-right: 0.5em;
            & .taskComplete{
                cursor: pointer;
            }
            & .taskInput{
                width: 100%;
                background: transparent;
            }
            & .taskDelete{
                cursor: pointer;
                visibility: hidden;
            }
        }
        & .taskItem:hover .taskDelete{
            visibility: visible;
        }
    }

`

interface CellComponentModel {
    date: number,
    isActive: boolean
    dispatch: (a: ActionModel) => void
    tasks?: TaskModel[],
}

const Cell: FC<CellComponentModel> = ({ date, isActive, dispatch, tasks = [] }) => {

    const handleTaskAdd = () => {
        dispatch({
            name: ACTION_NAME.TASK_ADD,
            payload: {
                plannedDate: date
            }
        })
    }

    const handleTaskEdit: (a: {
        id: number,
        labelText?: string,
        isCompleted?: boolean,
        order?: number,
        plannedDate?: number,
    }) => void = ({ id, labelText, isCompleted, order, plannedDate }) => {
        dispatch({
            name: ACTION_NAME.TASK_MODIFY,
            payload: {
                id: id,
                labelText,
                isCompleted,
                order,
                plannedDate,
            }
        })
    }

    const handleTaskRemove: (id: number) => void = (id) => {
        dispatch({
            name: ACTION_NAME.TASK_REMOVE,
            payload: {
                id: id
            }
        })
    }

    const handleSetDayData: (list:TaskModel[], target:Sortable | null) => void = (list,target) => {
        if(!target || typeof target?.el?.id !== "string"){
            return;
        }
        const newDate = parseInt(target.el.id)
        const tasksList = list
        .filter(t => t.isEditable)
        .map((t,i) => ({...t, plannedDate: newDate, order: i + 1}));
        dispatch({
            name: ACTION_NAME.SET_TASKS_LIST,
            payload: tasksList
        })
    }

    const monthNumber = new Date(date).getDate();
    const isActiveClassString = isActive ? "" : "inactive ";
    const isTodayClassString = new Date().getTime() >= date && new Date().getTime() < date + DAY ? "today" : "";

    return <CellStyle className={`${isActiveClassString}${isTodayClassString}`}>
        <div className="cellTitle">
            <span className="cellNumber">{monthNumber}</span>
            <span className="cellLabel"></span>
            <span className="cellAddButton button" onPointerUp={handleTaskAdd}>+</span>
        </div>
        {/* <div className="cellList"> */}
        <ReactSortable 
            className="cellList"
            group="cellItems"
            delay={2}
            tag="div"
            animation={150}
            list={tasks}
            setList={(list,target) => handleSetDayData(list,target)}
            filter={".filtered"}
            id={date.toString()}
        >
            {
                tasks.map(t => {
                    const isEnabled = t.isEditable && isActive;
                    return <div key={t.id} className={`taskItem ${isEnabled ? "" : "filtered"}`}>
                        {isEnabled &&
                            <span className="taskComplete button" onPointerUp={() => handleTaskEdit({ id: t.id, isCompleted: !t.isCompleted })}>
                                {t.isCompleted ? "✅" : "⬜"}
                            </span>
                        }
                        {isEnabled &&
                            <input className="taskInput" value={t.labelText} onChange={(e) => handleTaskEdit({ id: t.id, labelText: e.target.value })} />
                        }
                        {isEnabled &&
                            <span className="taskDelete button" onPointerUp={() => handleTaskRemove(t.id)}>❌</span>
                        }
                        {!isEnabled &&
                            <input className="taskInput" value={t.labelText} disabled={true} />
                        }

                    </div>
                })
            }
        </ReactSortable>

        {/* </div> */}
    </CellStyle>
}

export default Cell;