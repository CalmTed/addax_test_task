import React, { FC } from "react";
import styled from "styled-components";
import { ActionModel, TaskModel } from "../models";
import { DAY } from "../constants";

const CellStyle = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    background: var(--bg-cell);
    border-radius: 2pt;
    padding: 0.8em;
    font-weight: bold;
    &.inactive{
        opacity: 0.3;
    }
    &.today{
        color: var(--color-second)
    }

`

interface CellComponentModel {
    date: number,
    isActive: boolean
    dispatch: (a: ActionModel) => void
    tasks?: TaskModel[],
}

const Cell: FC<CellComponentModel> = ({ date, isActive, dispatch, tasks = [] }) => {
    const monthNumber = new Date(date).getDate();
    const isActiveClassString = isActive ? "" : "inactive ";
    const isTodayClassString = new Date().getTime() >= date && new Date().getTime() < date + DAY ? "today" : "";
    return <CellStyle className={`${isActiveClassString}${isTodayClassString}`}>
        {monthNumber}
    </CellStyle>
}

export default Cell;