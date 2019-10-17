$.validator.messages.required = '';

let uiInit=()=>{
    //Buttons
    if(isAuth) {
        $("#signout").removeClass("d-none");
        $("#login").addClass("d-none");
    }

    $("#new").validate({
        rules: {
            "task":{
                required:true
            }
        },
        messages: {
            "task": {
                required: "Legalább 1 dolgot válasszon ki!"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#checkError');
        }
    })
    $("#new").submit((ev)=>{
        ev.preventDefault();
        $("#hairLength").children().removeClass("invalid")
        if(hLength!==-1) {
            if(nCut||nColorize) {
                if($("#new")[0].checkValidity()===true) {
                    updEv();
                    $('#eventBox').removeClass("d-none");
                    $('#del').addClass("d-none");
                    $('#new').addClass("d-none");

                    $('html, body').animate({scrollTop:$('#event').position().top}, 'slow');
                }
            } else {
                $(".newchecks").children().addClass("invalid");
            }
        } else {$("#hairLength").children().addClass("invalid");}
        $("#new").addClass("was-validated");
    });
    $('#newBt').click(()=>{
        if(currEv===-1) {
            $('#new').toggleClass("d-none");
            $('#eventBox').addClass("d-none");
            $('#del').addClass("d-none");
        }
    });
    $('#delBt').click(()=>{
        if(user) {
            $('#delAdmin').toggleClass("d-none")
            $('#eventBox').addClass("d-none");
            $('#new').addClass("d-none");
        } else {
            $('#del').toggleClass("d-none");
            $('#eventBox').addClass("d-none");
            $('#new').addClass("d-none");
        }

    });
    $('#eventcancel').click(function(){
        if(currEv!=-1) {
            delEv(currEvId)
            calendar.getEventById("own").remove();
            currEv=-1;currEvId=-1;
            $('#new').toggleClass("d-none");
            $('#eventBox').addClass("d-none");
            $('#del').addClass("d-none");
        }
    })
    $('#del').validate({
        rules: {
            "task":{
                required:true
            }
        }
    })
    $('#del').submit(function(ev){
        ev.preventDefault()

        if($('#del')[0].checkValidity()) {
            delEvBy(undefined,$('#pwFieldDel').val(),evList,calendar.getDate().getDay())
        }
        $('#del').addClass("was-validated");
    })

    $('#delAdmin').validate({
        rules: {
            "task":{
                required:true
            }
        }
    })
    $('#delAdmin').submit(function(ev){
        ev.preventDefault()

        if($('#delAdmin')[0].checkValidity()) {
            delEvBy($('#phoneFieldDel').val(),undefined,evList,calendar.getDate().getDay())
        }
        $('#delAdmin').addClass("was-validated");
    })

    $('#checkCut').click(()=>{
        nCut=$("#checkCut").prop("checked")
    })
    $('#checkColorize').click(()=>{
        nColorize=$("#checkColorize").prop("checked")
    })
    $('#hairLength a').click((e)=>{
        e.preventDefault()
        $(e.target).addClass('active').siblings().removeClass('active')
        hLength=$(e.target).index()
    })
}