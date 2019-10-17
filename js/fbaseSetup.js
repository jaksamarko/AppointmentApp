var db,evRef,privRef;
function fbaseSetup() {
    db = firebase.firestore();
    evRef = db.collection('events')
    privRef = db.collection('private')
}

function docFix(doc) {return JSON.parse(JSON.stringify(doc));}

function uplEv(ev){
    evRef.add(docFix({start:ev.start, end:ev.end})).then(function(docRef){
        privRef.doc(docRef.id).set(docFix({
            start:ev.start,
            end:ev.end,
            name:$("#nameField").val(),
            pNum:$("#phoneField").val(),
            pw:$("#pwField").val(),
            /*Additional parameters*/
        }))
    })
}
/*
function delEvPw(pw,list,day) {
    if(pw!==undefined && pw.length>0) {
        for(n in list) {
            if(list[n].pw===pw) {
                var evDate=new Date(list[n].start)
                if(evDate.getDay()===day) {
                    console.log(list[n]);
                    delEv(list[n].id).then(function(){

                    }).catch(function(error){

                    })
                }
            }
        }
    }
}

function delEvPn(pn,list,day) {
    if(pn!==undefined && pn.length>0) {
        for(n in list) {
            if(list[n].pNum===pn) {
                var evDate=new Date(list[n].start)
                if(evDate.getDay()===day) {
                    delEv(list[n].id).then(function(){

                    })
                }
            }
        }
    }
}*/

function delEvBy(pn,pw,list,day) {
    for(var n in list) {
        if(list[n].pNum===pn||(pw!==undefined&&list[n].pw===pw)) {
            var evDate=new Date(list[n].start);
            if(evDate.getDay()===day) {
                delEv(list[n].id).then(function(){

                })
            }
        }
    }
}

function delEv(id) {
    evRef.doc(id).delete().then(function(){
        return privRef.doc(id).delete();
    })
}
