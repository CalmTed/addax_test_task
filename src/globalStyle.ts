import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
        --bg: #eee;
        --bg-cell: #ddd;
        --color-main: #7500FF;
        --color-second: #9133FF;
        --color-third: #84F400;
        --color-text: #222;
        --color-text-inverted: #fff;
    }
    *:focus{
        outline: 1pt solid var(--color-third);
    }
    button{
        border: none;
        background: var(--color-second);
        border-radius: 3pt;
        padding: 0.5em 0.8em;
        font-size: 1.1em;
        color: var(--color-text-inverted);
        cursor: pointer;
        transform-origin: center;
    }
    button:hover, .buton:hover{
        scale: 1.02;
        cursor: pointer;
    }
    button:active, .button:active{
        scale: 0.99;
    }
    input{
        border: none;
        border-radius: 3pt;
    }
    input::placeholder{
        color: var(--color-text-inverted);
        opacity: 0.5;
    }
    html{
        height: 100vh;
    }
    body{
        margin: 0;
        font-family: sans-serif;
        color: var(--color-text);
        height: 100%;
    }
    #root, #App{
        background: var(--bg);
        height: 100%;
    }
`