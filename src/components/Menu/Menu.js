import styled from "styled-components";
import arrow from './arrow.svg'
import {MenuButton, MenuDate, NavWrapper, NowDateButton} from "../app/App.styled";
const MenuWrapper = styled.div `
    margin-bottom: 12px;
`;


const Menu = ({prevMonth,nextMonth,nowMonth, today}) => {

    return (
        <MenuWrapper>
            <NavWrapper>
                <MenuButton onClick={prevMonth} ><img src={arrow}/></MenuButton>
                <MenuDate>
                    <span>{today.format("MMMM")} </span>
                    <span>{today.format("YYYY")}</span>

                </MenuDate>
                <MenuButton onClick={nextMonth}><img style={{transform: "rotate(180deg)"}} src={arrow}/></MenuButton>
                <NowDateButton onClick={nowMonth}>Сегодня</NowDateButton>
            </NavWrapper>
        </MenuWrapper>
    )
}

export {Menu}