import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import Cell from "./cell";
import { ACTION_NAME, ActionModel, BasicComponentModel, StateModel } from "../models";
import { DAY, MONTH_NAMES, WEEK_DAY_LABEL } from "../constants";

const BodyStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: calc(100% - 4em);
    #body-header{
        flex-wrap: nowrap;
        padding: 0 2em;
        display: flex;
        height: min-content;
        align-intems: center;
        width: 100%;
        margin: 0.5em 0;

        #navigation{
            display: flex;
            gap: 0.3em;
        }
        #month-title{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.4em;
        }
    }

`;

const CellWrapperStyle = styled.div`
    width: 100%;
    height: calc(100% - 3.4em);
    --col-width: calc(100% / 7);
    --rowsNumber: 5;
    --row-height: calc(var(--h100percent) / var(--rowsNumber));
    --h100percent: calc(100% - 1.5em);
    #weekDayLabels{
        height: 2.5em;
        width: 100%;
        display: flex;
        .w-d-label{
            display: flex;
            width: var(--col-width);
            align-items: flex-end;
            justify-content: center;
            font-size: 1;
            opacity: 0.6;
        }
        .w-d-label:nth-last-child(2), .w-d-label:nth-last-child(1){
            color: var(--color-main);
        }
    }
    #gridWrapper{
        height: calc(100% - 3.4em);
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(var(--rowsNumber), var(--row-height));
        gap: 5pt;
        padding: 5pt;

        &.fourRows{
            --rowsNumber: 4;
        }
        &.sixRows{
            --rowsNumber: 6;
        }
    }
`;

const renderCells: (state: StateModel, dispatch: (a: ActionModel) => void) => ReactElement = (state,dispatch) => {
    const selectedDate = new Date(state.selectedMonth);
    const monthStartWeekday = selectedDate.getDay();
    // calculates number of days shown of previus month
    const daysNeededToAdd = monthStartWeekday === 0 ? 6 : monthStartWeekday - 1;
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 0).getDate();
    const numberOfWeeksShown = Math.ceil((daysNeededToAdd + daysInMonth) / 7);
    const initialSelectedDate = selectedDate.getTime() - DAY * daysNeededToAdd;
    const gridRowsClassString = numberOfWeeksShown === 4 ? "fourRows" : numberOfWeeksShown === 6 ? "sixRows" : ""

    return <CellWrapperStyle>
        <div id="weekDayLabels">
            {
                WEEK_DAY_LABEL.map( (label) =>
                    <div className="w-d-label" key={label}>{label}</div>
                )
            }
        </div>
        <div id="gridWrapper" className={gridRowsClassString}>
            {
                new Array(numberOfWeeksShown * 7).fill("").map( (n,i) => {
                    const dayDate = initialSelectedDate + (DAY * i);
                    const isActive = dayDate >= selectedDate.getTime() && dayDate < selectedDate.getTime() + (daysInMonth * DAY)
                    
                    const filteredTasks = state.tasks.filter(task => task.labelText.includes(state.filterText))
                    const cellTasks = [...state.holidays,...filteredTasks]
                        .filter(t => t.plannedDate >= dayDate && t.plannedDate < dayDate + DAY)
                        .sort((ta,tb) => ta.order - tb.order)
                    
                    return <Cell
                        key={dayDate}
                        isActive={isActive}
                        date={dayDate}
                        tasks={cellTasks}
                        dispatch={dispatch}
                    />
                })

            }
        </div>
    </CellWrapperStyle>
}





const Body: FC<BasicComponentModel> = ({state, dispatch}) => {
    const selectedDate = new Date(state.selectedMonth)
    const monthTitleText = `${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    const handleSetMonth = (n: number) => {
        if(!n){return;}
        dispatch({
            name: ACTION_NAME.SET_SELECTED_MONTH,
            payload: n
        })
    }
    const now = new Date();
    const switcersOptions = [
        new Date(now.getFullYear(), now.getMonth(), 1).getTime(),
        new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1).getTime(),
        new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1).getTime(),
    ]
    return <BodyStyle>
        <div id="body-header">
            <div id="navigation">
                <button onPointerUp={() => handleSetMonth(switcersOptions[0])}>Today</button>
                <button onPointerUp={() => handleSetMonth(switcersOptions[1])}>▲</button>
                <button onPointerUp={() => handleSetMonth(switcersOptions[2])}>▼</button>
            </div>
            <div id="month-title">{ monthTitleText }</div>
        </div>
        {renderCells(state, dispatch)}
    </BodyStyle>
}

export default Body;