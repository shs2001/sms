$(document).ready(function () {
    // var apikey = "wII1K907qp6nw5JNNqzFtDu1d6I9F6MJ48Cn083W";
    var phone = $("#number").val();
    $("#smsForm").on('submit', function (e) {
        e.preventDefault();
        var apikey = $("#api").val();
        var number = $("#number");
        var msg = $("#msg");
        var pettern = /^\d{11}$/;
        if (number.val() == "") {
            $("#numberhelp").html("Please input a Mobile Number!");
        } else {
            $("#numberhelp").html('');
            if (!number.val().match(pettern)) {
                $("#numberhelp").html("Number Invalid !");
            } else {
                $("#numberhelp").html('');
                if (msg.val().length > 0) {
                    $("#msghelp").html("");
                    $("#send").html('Sending <i class="fa fa-spin fa-spinner"> </i>').prop('disabled', true);
                    $.ajax({
                        type: "get",
                        url: "https://api.sms.net.bd/sendsms?api_key="+apikey+"&msg="+msg.val()+"&to="+number.val(),    
                        success: function (result) {
                            console.log(result);
                            $("#send").html('Send').prop('disabled', false);
                            if (result.error == 0) {
                                $(".result").html('<div class="alert alert-success alert-dismissible fade show" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> <span class="sr-only">Close</span> </button> <strong>Successfull !</strong> <p class="mb-0">Your messege {'+ msg.val() +'} successfully send to ' + number.val() + '</p></div>');
                            }
                            else if(result.error == 417){
                                $(".result").html('<div class="alert alert-info alert-dismissible fade show" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> <span class="sr-only">Close</span> </button> <strong>Insufficient balance!</strong> <p class="mb-0">To get some balance <a href="https://sms.net.bd/signup/" class="text-danger" target="_blank"><u>create account here</u></a> and use new API key to send messege!. </p></div>');
                            } 
                            else {
                                $(".result").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> <span class="sr-only">Close</span> </button> <strong>Failed !</strong> <p class="mb-0">Something went Wrong!</p></div>');
                            }
                            console.log(result);
                            $("#msg").val('');
                        }
                    });
                } else {
                    $("#msghelp").html("Messege is too short!");
                }
            }
        }
    });
    setInterval(() => {
        var intervalapikey = $("#api").val();
        if (intervalapikey == "") {
            $("#collapseExample").show('100');
            $("#apihelp").html('API key Required!')
        } else {
            $.ajax({
                type: "get",
                url: "https://api.sms.net.bd/user/balance/?api_key=" + intervalapikey,
                success: function (response) {
                    if (response.error == 0) {
                        $("#apihelp").html('');
                        $("#collapseExample").hide('100');
                        var bal = response.data.balance;
                        function show_float_val(val, upto = 2) {
                            var val = parseFloat(val);
                            return val.toFixed(upto);
                        }
                        if(bal <= 0.5){
                            $("#lowbalance").html('low balance')
                        }
                        $("#balance").html(show_float_val(bal) + ' TK');
                    }
                    if (response.error == 405) {
                        $("#apihelp").html('Invalid API key!');
                        $("#balance").html('');
                    }
                }
            });
        }
    }, 1000);
})
