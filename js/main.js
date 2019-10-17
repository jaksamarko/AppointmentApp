const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
var evList = [],currEv=-1,currEvId=-1,calendar=-1,evCont,myRef;

document.addEventListener('DOMContentLoaded',function() {
    fbaseAuth();
    fbaseSetup();

    uiInit();
    const calDom = $('#calendar')[0];
    evCont = $('#event');
    var Draggable = FullCalendarInteraction.Draggable;
    if(calendar===-1) {
        var weekLabel='';
        if(!isMobile) {weekLabel=',timeGridWeek';}

        calendar=new FullCalendar.Calendar(calDom,{
            plugins: ['interaction','timeGrid', 'bootstrap'],
            timeZone: 'UTC+2',
            locale: "Hu",
            height: "auto",
            allDaySlot: false,
            themeSystem: 'bootstrap',
            defaultView: 'timeGridDay',
            titleFormat:{month:'long',day:'numeric'},
            editable: false,
            eventOverlap: false,
            selectable: false,
            eventLimit: false,
            minTime: "08:00:00",
            maxTime: "18:00:00",
            slotDuration: "00:15:00",
            hiddenDays: [0,1],
            slotLabelInterval:"01:00",
            firstDay: 1,
            nowIndicator: true,
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'timeGridDay'+weekLabel
            },
            buttonText: {
                prev: "vissza",
                next: "előre",
                today: "Ma",
                month: "Hónap",
                week: "Hét",
                day: "Nap",
                list: "Napló"
            },
            eventAllow: (dropLoc,dragEv)=>{
                if(dropLoc.start>=new Date()) {
                    return true;
                }
            },
            droppable: true,
            eventReceive: (info)=>{
                currEv=info.event.id;
                uplEv(info.event);
                evList.push(info.event)
            },
            drop: function(info) {
                info.draggedEl.parentNode.removeChild(info.draggedEl)
            },
            slotLabelFormat: [
                {hour12: false, hour: '2-digit',omitZeroMinute: false,minute: '2-digit'}
            ],
            eventAfterAllRender: function(){
                // hack to trigger event binding on android chrome, which doesn't trigger mouseover events
                $('.fc-event').each(function(i, element){
                    $(element).trigger('mouseover', {});
                })
            }
        })
        calendar.render();
        new Draggable(evCont[0],{
            itemSelector: '.fc-event',
        })
    }

    if(isAuth) {
        myRef=privRef;
    } else {
        myRef=evRef;
    }

    myRef.onSnapshot((doc)=> {
        doc.docChanges().forEach((change)=> {
            var ev=change.doc,newEv=ev.data();
            newEv.id=ev.id;
            if(currEv!==-1&&(new Date(newEv.start)).getTime()===(new Date(calendar.getEventById(currEv).start)).getTime()) {
                console.log("Inserted!");
                currEvId=newEv.id;
            } else {
                if(change.type === "added") {
                    if(window.user) {
                        newEv.title="Név:"+newEv.name+" Tel:"+newEv.pNum;
                    }
                    calendar.addEvent(newEv);
                    evList.push(newEv);
                }
                if(change.type === "modified") {

                }
            }

            if(change.type === "removed") {
                for(n in evList) {
                    if(evList[n].id===ev.id) {
                        calendar.getEventById(evList[n].id).remove()
                        evList.splice(n,1)
                    }
                }
            }
        });
    })
});