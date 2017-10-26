String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var NUM_OF_QUESTIONS = 4
var qURL = "http://34.207.37.153:3001/api/v1/questionnaire/1/all"
var sURL = "http://34.207.37.153:3001/api/v1/questionnaire/submit"

var qq = [];

qq[0] = `<div class="row marketing"> 
          <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-12">
                    <h4>__Q_HEADING__</h4>
                    <p>__Q_CONTENT__</p>
                  </div>
              </div>
              <div class="row" id = "QUESTION___Q_ID__">
                <div class="col-lg-12">
                    <button class="btn btn-md __Q_CLASS__ float-right" href="#" role="button" 
				onclick = "event.preventDefault();submitb(event, __Q_ID__, __Q_OPT1_ID__, \'__UID__\', __DP__)">__Q_OPT1__</button>
                    <span class="float-right">&nbsp;&nbsp;</span>
                    <button class="btn btn-md btn-outline-primary float-right" href="#" role="button" 
				onclick = "event.preventDefault();submitb(event, __Q_ID__, __Q_OPT2_ID__, \'__UID__\', __DP__)">__Q_OPT2__</button>
                  </div>
              </div>
          </div>
        </div><hr />`

qq[1] = `<div class="row marketing">
                <div class="col-lg-12">
                    <div class="row">
                      <div class="col-lg-12">
                          <h4>__Q_HEADING__</h4>
                          <p>__Q_CONTENT__</p>
                        </div>
                    </div>
                    <div class="row" id = "QUESTION___Q_ID__">
                      <div class="col-lg-12">
                        <div class="form-check">
                          <label class="form-check-label">
                            <input type="radio" __Q_CHECKED__ class="form-check-input" value="__Q_OPT1_ID__" name="RADIO__Q_ID__"/> 
                            __Q_OPT1__
                          </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                              <input type="radio" class="form-check-input" value="__Q_OPT2_ID__" name="RADIO__Q_ID__" />
                              __Q_OPT2__
                            </label>
                          </div>
                      </div>
		      <div class="col-lg-12">
		      	<button class="btn btn-md btn-outline-primary" href="#" role="button"
                                onclick = "event.preventDefault();submitc(event, __Q_ID__, \'__UID__\', __DP__)">Submit</button>
		      </div>
                    </div>
                </div>
              </div><hr />`

function contructQuestion(id, type, uiType, data) {
	if(data.answers[0].type == "radio") {
		uiType = 0;
	} else {
		uiType = 1;
	}
	str = qq[uiType];
	// data = data.data
	str = str.replaceAll("__Q_HEADING__", "QUESTION " + id);
	str = str.replaceAll("__Q_CONTENT__", data.question.title);
	str = str.replaceAll("__Q_ID__", data.question.id);
	str = str.replaceAll("__UID__", userid);
	str = str.replaceAll("__Q_OPT1_ID__", data.answers[0].id);
	str = str.replaceAll("__Q_OPT1__", data.answers[0].title);
	str = str.replaceAll("__Q_OPT2_ID__", data.answers[1].id);
	str = str.replaceAll("__Q_OPT2__", data.answers[1].title);
	str = str.replaceAll("__DP__", type);
	if(type == 0) {
		// dp
		str = str.replaceAll("__Q_CLASS__", "btn-primary")
		str = str.replaceAll("__Q_CHECKED__", 'checked="checked"')
	}	
	else {
		str = str.replaceAll("__Q_CLASS__", "btn-outline-primary")
		str = str.replaceAll("__Q_CHECKED__", "")
	}
	return str;
}

	
function submitb(event, qid, q_opt_id, uid, dp) {
	var url = sURL.replace(":questionId", qid);
	var data = { "uid":uid, "qid":qid, "ansId":q_opt_id, "DP" :dp }
	$.post(url, data)
  		.done(function( data ) {
    			console.log("Data sent");
			$("#QUESTION_" + qid).find("button").attr("disabled","disabled");
  	});
	return false;
}


function submitc(event, qid, uid, dp) {
	val = $('input[name="RADIO' + qid  + '"]:checked').val()
	if(val) {
		var url = sURL.replace(":questionId", qid);
        	var data = { "uid":uid, "qid":qid, "ansId": val, "DP" :dp }
        	$.post(url, data)
           	     .done(function( data ) {
                        console.log("Data sent");
			$("#QUESTION_" + qid).find("input").attr("disabled","disabled");
			$("#QUESTION_" + qid).find("button").attr("disabled","disabled");
        	});
	}
	else {
		alert("Please select an option");
	}
	return false;
}


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

//userid = guid();
userid = "test"

jQuery.ajax({
                url: qURL,
                success: function (data) {
			data = data.data;
			for(i = 0; i < data.length; ++i) {
				console.log(data[i])
				type = Math.floor(Math.random() * 2);
                        	// uiType = Math.floor(Math.random() * 2);
                        	uiType = 0;
                        	str = contructQuestion(i + 1, type, uiType, data[i]);
                        	document.getElementById("container").innerHTML = document.getElementById("container").innerHTML + str;
			}
                },
                method : 'GET'
        });



