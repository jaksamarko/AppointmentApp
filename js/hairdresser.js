var hLength=-1,nCut=false,nColorize=false;

function estimateDuration() {
    return (hLength+1)*15*nCut+nColorize*60
}

let updEv=()=>{
    const tempDur=estimateDuration(),h=Math.floor(tempDur/60),m=tempDur%60,tempEv={
        duration: h+":"+m,
        title:$("#nameField").val()+"("+h+"óra "+m+"perc)",
        editable: true,
        durationEditable:false,
        id: "own"
    }

    $("#event").attr('data-event',JSON.stringify(tempEv)).toggleClass("noclick",false).text("Időpont"+"("+h+"óra "+m+"perc)")
}