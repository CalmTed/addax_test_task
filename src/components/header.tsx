import React, { FC } from "react";
import styled from "styled-components";
import { ACTION_NAME, BasicComponentModel } from "../models";

const HeaderStyle = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    background: var(--color-main);
    color: var(--color-text-inverted);
    padding: 0.1em 2em;
    #headerTitle{
        font-size: 1.6em;
        font-weight: 900;
        margin: 0.4em 0;
    }
    input{
        background: var(--color-second);
        font-size: 1.2em;
        color: var(--color-text-second);
        padding: 0.3em;
    }
`

const Header: FC<BasicComponentModel> = ({state, dispatch}) => {
    const handleChange = (newValue: string) => {
        dispatch({
            name: ACTION_NAME.SET_FILTER_TEXT,
            payload: newValue
        })
    }
    return <HeaderStyle>
        <div id="headerTitle">🗓 Calendar</div>
        <div>
            <input type="text" placeholder="Filter tasks" value={state.filterText} onChange={(e) => handleChange(e.target.value)} />
        </div>
    </HeaderStyle>
}

export default Header;