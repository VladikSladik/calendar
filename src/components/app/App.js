import './App.css';
import moment from "moment";
import {Header} from "../Header/Header";
import {Menu} from "../Menu/Menu";
import {Calendar} from "../Calendar/Calendar";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {MenuButton} from "./App.styled";

moment.locale('RU')

const AppWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  max-height: 100vh;
  position: relative;
`;

const EventForm = styled.div`
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  padding: 12px;
  background: #fff;
  display: flex;
  transform: translate(-50%, -50%);
  width: 290px;
  flex-direction: column;
  gap: 8px;
  filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25));
`;


const EventInput = styled.input`
  padding: 6px 12px;
  color: #CFCFCF;
  border: 1px solid #CFCFCF;
  box-shadow: inset 0px 0px 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

const EventTextarea = styled.textarea`
  resize: none;
  height: 125px;
  padding: 6px 12px;
  color: #CFCFCF;
  border: 1px solid #CFCFCF;
  box-shadow: inset 0px 0px 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-top: 16px;
`;

const EventClose = styled.button`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  background: none;
`;

const EventButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const EventButton = styled(MenuButton)`

`;

function App() {
    // moment.updateLocale('en', {week: {dow: 1}})
    const dayCount = 42;
    const [today, setToday] = useState(moment());
    const [events, setEvents] = useState([]);

    const [event, setEvent] = useState();

    const emptyEvent = {
        title: "",
        description: "",
        date: moment().format("X")
    }

    const [method, setMethod] = useState("")

    const starDay = today.clone().startOf('month').startOf('week');
    const endDay = starDay.clone().add(dayCount, 'days');


    const url = "http://localhost:5000/events"
    useEffect(() => {
        fetch(`${url}?date_gte=${starDay.format('X')}&date_lte=${endDay.format('X')}`)
            .then(res => res.json())
            .then(res => setEvents(res))
    }, [today])


    const [showForm, setShowForm] = useState(false);

    const openFormHandler = (method, eventUpdate, dayClick) => {
        setShowForm(prev => !prev)
        setMethod(method);
        if (method === 'Update') {
            setEvent(eventUpdate)
            console.log(eventUpdate)
        }

        if (method === 'Create') {
            setEvent({
                title: "",
                description: "",
                date: dayClick.format('X')
            })
            console.log(eventUpdate)
        }

        if (method === "Close") {
            setEvent("");
            console.log(event)
        }

    }

    const changeEventHandler = (text, field) => {
        setEvent(prevState => ({
            ...prevState,
            [field]: text
        }))
        console.log(event)
    }

    const eventFetchHandler = () => {
        const fetchUrl = method === 'Update' ? `${url}/${event.id}` : `${url}`;
        const httpMethod = method === 'Update' ? 'PATCH' : 'POST';

        fetch(fetchUrl, {
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
            .then(res => res.json())
            .then(res => {
                if (method === 'Update') {
                    setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl))
                } else {
                    setEvents(prevState => [...prevState, res]);
                }
                openFormHandler("Close")
            })
    }

    const eventDelete = () => {
        const fetchUrl = `${url}/${event.id}`;
        const httpMethod = 'DELETE';

        fetch(fetchUrl, {
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
            .then(res => res.json())
            .then(res => {
                setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id ))
                openFormHandler("Close")
            })
    }


    const prevMonth = () => {
        setToday((prev) => prev.clone().subtract(1, "month"));
    }

    const nextMonth = () => {
        setToday((prev) => prev.clone().add(1, "month"));
        console.log(1)
    }

    const nowMonth = () => {
        setToday(moment());
        console.log(2312)
    }


    return (
        <AppWrapper>
            {showForm ? (
                <EventForm>
                    <EventClose onClick={() => openFormHandler("close",)}>X</EventClose>
                    <EventInput onChange={(e) => changeEventHandler(e.target.value, "title")}
                                value={event ? event.title : undefined}
                                type="text"
                                placeholder="Событие"/>
                    <EventInput value={event ? event.description : undefined}
                                onChange={(e) => changeEventHandler(e.target.value, "description")}
                                type="text"
                                placeholder="Участники"/>
                    <EventTextarea placeholder="Описание"></EventTextarea>
                    <EventButtonsWrapper>
                        <EventButton onClick={eventFetchHandler}>Готово</EventButton>
                        { method === "Update" ? (
                            <EventButton onClick={eventDelete}>Удалить</EventButton>
                        ) : null}

                    </EventButtonsWrapper>
                </EventForm>
            ) : null}

            <div>
                <Header> </Header>
                <Menu prevMonth={prevMonth} nextMonth={nextMonth} nowMonth={nowMonth} today={today}> </Menu>
                <Calendar starDay={starDay} today={today} dayCount={dayCount} events={events}
                          openFormHandler={openFormHandler}></Calendar>
            </div>
        </AppWrapper>
    );
}

export default App;
