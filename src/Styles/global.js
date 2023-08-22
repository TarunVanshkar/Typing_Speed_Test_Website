import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box;
}
body{
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    margin: 0;
    padding: 0;
    transition: all 0.25s linear;
}

body::-webkit-scrollbar{
    display: none;
}

.canvas{
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    text-align: center;
    align-items: center;
    gap: 0.5rem;
    padding: 2rem;
}

.typingBox{
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}

.hidden-input{
    opacity: 0;
}

.words-container{
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    gap: 1rem;
    font-size: 32px;
    color: ${({ theme }) => theme.textBoxColor}
}

.current{
    border-left: 1px solid;
    animation: blinkingLeft 2s ease infinite;
    @keyframes blinkingLeft{
        0% { border-left-color: ${({ theme }) => theme.background} }
        25% { border-left-color: ${({ theme }) => theme.color} }
        50% { border-left-color: ${({ theme }) => theme.background} }
        75% { border-left-color: ${({ theme }) => theme.color} }
        100% { border-left-color: ${({ theme }) => theme.background} }
    }
}

.right-current{
    border-right: 1px solid;
    animation: blinkingRight 2s ease infinite;
    @keyframes blinkingRight{
        0% { border-left-color: ${({ theme }) => theme.background} }
        25% { border-left-color: ${({ theme }) => theme.color} }
        50% { border-left-color: ${({ theme }) => theme.background} }
        75% { border-left-color: ${({ theme }) => theme.color} }
        100% { border-left-color: ${({ theme }) => theme.background} }
    }
}

.correct{
    color: ${({ theme }) => theme.color};
}

.incorrect{
    color: red;
}

.skipped{
    color: grey;
}

.footer{
    display: flex;
    width: 1000px;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
}

.themes{
    display: flex;
    align-items: center;
    gap: 1rem;
}

.links-container{
    display: flex;
    gap: 1.5rem;
    justify-center: center;
}

.links-container a{
    color: ${({ theme }) => theme.textBoxColor};
}

.upper-menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
}

.counter-modes{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.counter-modes:hover{
    cursor: pointer;
}

.stats-box{
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
}

.left-stats{
    width: 30%;
    padding: 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem
}

.title{
    font-size: 1.2rem;
    color: ${({ theme }) => theme.textBoxColor};
    font-weight: 700;
}

.sub-title{
    font-size: 1.8rem;
    color: ${({ theme }) => theme.color};
}

.right-stats{
    width: 70%;
    padding: 0.5rem;
}

.left-stats button{
    background-color: ${({ theme }) => theme.textBoxColor};
    color: ${({ theme }) => theme.color};
    font-weight: 700;
    padding: 10px 20px;
    border: none
}

.left-stats button:hover{
    cursor: pointer;
}

.header{
    display: flex;
    justify-content: space-between;
    width: 1000px;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}

.logo{
    display: flex;
    align-items: center;
    font-size: 2rem;
    gap: 2rem;
}

.user-container{
    display: grid;
    grid-template-row: auto 1fr auto;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    height: fit-content;
    width: 100vw;
    text-align: center;
    margin: 3rem auto 4rem;
}

.user-graph{
    width: 1000px
}

.graph{
    width: 100%;
}

.user{
    width: 1000px;
    box-sizing: border-box;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.background};
    border-radius: 10px;
    box-shadow: 0px 2px 4px #423d3a;
}

.user-info b{
    font-weight: 700;
}

.user-img{
    border-radius: 50%;
    scale: 130%;
}

.loader{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}


`