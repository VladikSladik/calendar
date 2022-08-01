import moment from "moment";
import {useState} from "react";
import {CalendarDay, CalendarEvent, CalendarRow, CalendarRowItem, CalendarWrapper} from "../app/App.styled";




const Calendar = ({starDay,today,dayCount,events,openFormHandler}) => {

    const day = starDay.clone().subtract(1,'day');


    const allDays = [...Array(dayCount)].map(() => day.add(1,'day').clone())
    return (
        <CalendarWrapper>
            {
                allDays.map((day,dayId) => {
                    return(

                        <CalendarDay
                            key={day.format('DDMMYYYY')}
                            weekend={day.day() === 6 || day.day() === 0}
                            isToday={(day.format('DDMMYYYY')) === (moment().format('DDMMYYYY'))}
                            notMonth ={(day.format('MM') !== today.format('MM'))}
                            onDoubleClick={(e) => {
                                if (!e.target.classList.contains('event')) {
                                    openFormHandler('Create',"" , day)
                                }
                            }}
                            >
                            <CalendarRow justifyContent={'flex-start'}>
                                <CalendarRowItem className="123">
                                    {dayId <= 6 ? <span>{day.format('dddd')}&nbsp;</span> : null}
                                    <span>{day.format('D')}</span>
                                </CalendarRowItem>
                            </CalendarRow>
                            {
                                events.filter(event => event.date >= day.format("X") && event.date <= day.clone().endOf("day").format("X"))
                                    .map(event => (
                                        <CalendarRow key={event.date} onDoubleClick={() => openFormHandler('Update', event)}>
                                            <CalendarEvent className="event">{event.title}</CalendarEvent>
                                        </CalendarRow>
                                    ))
                            }
                        </CalendarDay>
                    )
                })
            }
        </CalendarWrapper>
    );

};

export {Calendar}