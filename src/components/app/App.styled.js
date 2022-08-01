import styled from "styled-components";

export const CalendarWrapper = styled.div `
  background: #949494;
  display: grid;
  grid-template-columns: repeat(7,1fr);
  grid-template-rows: repeat(6,1fr);
  grid-gap: 1px;
  margin-right: 10px;
  border: 1px solid #949494;
  height: 600px ;
`;

export const CalendarDay = styled.div `
  padding: 10px;
  background: ${props => props.isToday ? '#eb8c8c' : props.weekend ? '#f0eded' : '#FFF'};
  background: ${props => props.notMonth ? '#666666' : ''};
  color: ${props => props.notMonth ? '#a4a4a4' : '#6B6B6B'};
`;

export const CalendarRow = styled.div `
  display: flex;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
`;
export const CalendarRowItem = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

export const CalendarEvent = styled.span `
  font-weight: bold;
  cursor: pointer;
`

export const NavWrapper = styled.div `
    margin-bottom: 12px;
    display: flex;
`;

export const MenuButton = styled.button `
  padding: 2px 6px;
  border-radius: 4px;
  box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export const MenuDate = styled.span `
  font-size: 18px;
  font-weight: 400;
  margin: 0 24px;
  color: #292929;
`;

export const NowDateButton = styled(MenuButton)`
  margin-left: 16px;
`;
