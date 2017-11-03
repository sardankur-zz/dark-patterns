import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import check from './img/check.png'

class App extends Component {

    constructor() {
        super()
        this.state = {
            qurl : 'http://34.207.37.153:3001/api/v1/questionnaire/:questionnaireId/all',
            surl : 'http://34.207.37.153:3001/api/v1/questionnaire/submit',
            questionnaireId : 2,
            questionnaire : undefined,
            uuid: uuid.v4()
        }
    }


    getQuestions() {
        $.ajax({
            url: this.state.qurl.replace(":questionnaireId", this.state.questionnaireId),
            dataType:'json',
            cache: false,
            success: function(data){
                this.setState({level: data.level, isDp : Math.floor(Math.random() * 2) === 1 ? true : false, questionnaire: data.data}, function(){
                    console.log(this.state.isDp === true ? "Dark Patterns enabled" : "Dark Patterns disabled");
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
                alert("Failed to get questions.")                
            }
        });
    }

    submitAnswer(qid, aid, uuid, isDp, success, failure) {
        var url = this.state.surl;
        var data = { "uid":uuid, "qid":qid, "ansId":aid, "dp" :isDp }
        $.post(url, data)
            .done(success)
            .fail(failure)
    }

    componentWillMount() {
        this.getQuestions();
    }

    componentDidMount(){
        // this.getQuestions();
    }


    render() {

        let questionnaireUI;
        if(this.state.questionnaire) {
            questionnaireUI = this.state.questionnaire.map((item, index) => {
                let q,h,l;

                h = <QuestionHeader index={index+1} question={item} key={item.question.id} />;                

                if(!this.state.isDp || this.state.level === 0) {                    
                    if (item.question.type === 'button')
                        q = <ButtonQuestion0 isDp = {this.state.isDp} uuid={this.state.uuid} index={index+1} question={item} submitAnswer={this.submitAnswer.bind(this)} />;
                    else if (item.question.type === 'radio')
                        q = <RadioQuestion0 isDp = {this.state.isDp} uuid={this.state.uuid} index={index} question={item} submitAnswer={this.submitAnswer.bind(this)} />;
                }
                else {                    
                    if (this.state.level === 1) {
                        if (item.question.type === 'button')
                            q = <ButtonQuestion1 isDp = {this.state.isDp} uuid={this.state.uuid} index={index+1} question={item} submitAnswer={this.submitAnswer.bind(this)} />;
                        else if (item.question.type === 'radio')
                            q = <RadioQuestion1 isDp = {this.state.isDp} uuid={this.state.uuid} index={index} question={item} submitAnswer={this.submitAnswer.bind(this)} />;
                    }
                    else {
                        if (item.question.type === 'button')
                            q = <ButtonQuestion2 isDp = {this.state.isDp} uuid={this.state.uuid} index={index+1} question={item} submitAnswer={this.submitAnswer.bind(this)} />;
                        else if (item.question.type === 'radio')
                            q = <RadioQuestion2 isDp = {this.state.isDp} uuid={this.state.uuid} index={index} question={item} submitAnswer={this.submitAnswer.bind(this)} />;
                    }
                }

                if(index < this.state.questionnaire.length - 1) l = <hr />

                q = <div id={"question_" + item.question.id} key={item.question.id} ><div key={item.question.id} className="row marketing"><div className="col-lg-12">{h}{q}</div></div>{l}</div>
                return(q)
            })
        }

        return (
            <div className="container">                
                <Header />                
                {questionnaireUI}
                <Footer />
            </div>
        );
    }
}


class Header extends Component {

    constructor() {
        super();
        this.state = {
            title : 'Questionnaire',
            sub_title : `Responses are completely anonymous and cannot be traced back to the respondent. Additionally,
                         your responses are combined with those of many others and summarized
                         in a report to further protect your anonymity.`
        }
    }

    render() {
        return (
            <header className="header">
                <h2 className="text-muted">{this.state.title}</h2>
                <br />
                <p className="lead text-muted text-justify note-background">{this.state.sub_title}</p>
            </header>
        )
    }
}

class Footer extends Component {

    constructor() {
        super();
        this.state = {
            note : 'This study is to understand dark patterns in the web. You can find more information about dark patterns on ',
            link : 'http://darkpatterns.org',
            linkTitle : 'darkpatterns.org'
        }
    }

    render() {
       return (
            <footer className="footer">
                <p className="lead text-muted text-justify note-background">{this.state.note} <a href={this.state.link}>{this.state.linkTitle}</a></p>
            </footer>
        )
    }
}

class QuestionHeader extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h6><strong>Q{this.props.index}.</strong> <img style={{display:"none"}} src ={check} width = "30" height = "30" alt=""/></h6>
                    <p>{this.props.question.question.title}</p>
                  </div>
            </div>
        )
    }
}

class QuestionCount extends Component {
    render() {
        return (            
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="20" style={{width:"25%"}} aria-valuemin="0" aria-valuemax="100"></div>
            </div>            
        )
    }
}


class ButtonQuestion0 extends Component {

    handleClick(qid, aid, uuid, isDp, event) {
        event.preventDefault();
        this.props.submitAnswer(qid, aid, uuid, isDp,
            function() {
                $("#question_" + qid).find("button").attr("disabled","disabled");
                $("#question_" + qid).find("img").css("display","inline");
            },
            function() {
                alert("Response submission failed");
            }
        )
    }

    getMainUI(buttonUI) {
        return (
            <div className="row">
                <div className="col-lg-12">
                    {buttonUI}
                </div>
            </div>
        )
    }

    render() {

        let buttonUI;
        buttonUI = this.props.question.answers.map((answer, index) => {
            let space = (index === this.props.question.answers.length - 1) ? <span className="float-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : <span className="float-right"></span>
            return(
                <span key = {"Q" + this.props.question.question.id + "A" + answer.id}>
                    {space}
                    <button className="btn float-right btn-md btn-outline-primary"
                        onClick={this.handleClick.bind(this, this.props.question.question.id, answer.id, this.props.uuid, this.props.question.question.isDp)} > {answer.title} </button>
                </span>
            )
        })

        return (this.getMainUI(buttonUI))
    }
}

class ButtonQuestion1 extends ButtonQuestion0 {

    render() {

        let buttonUI;
        buttonUI = this.props.question.answers.map((answer, index) => {
            let buttonClass = (answer.dp) ? 'btn-link btn-sm btn-sm-pad' : 'btn-outline-primary btn-lg'
            let space = (index === this.props.question.answers.length - 1) ? <span className="float-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : <span className="float-right"></span>

            return(
                <span key = {"Q" + this.props.question.question.id + "A" + answer.id}>
                    {space}
                    <button className={"btn float-right " + buttonClass}
                        onClick={this.handleClick.bind(this, this.props.question.question.id, answer.id, this.props.uuid, this.props.question.question.isDp)} > {answer.title} </button>
                </span>
            )
        })

        return (this.getMainUI(buttonUI))
    }
}



class ButtonQuestion2 extends ButtonQuestion0 {

    render() {

        let buttonUI;
        buttonUI = this.props.question.answers.map((answer, index) => {
            let buttonClass = (answer.dp) ? 'btn-success btn-lg btn-block' : 'btn-link btn-sm btn-block';
            let style = (answer.dp) ? {paddingTop:"1rem", paddingBottom:"1rem"} : {}
            let space = (index === this.props.question.answers.length - 1) ? <span className="float-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : <span className="float-right"></span>

            return(
                <span key = {"Q" + this.props.question.question.id + "A" + answer.id}>
                    {space}
                    <button className={"btn float-right " + buttonClass} style={style}
                        onClick={this.handleClick.bind(this, this.props.question.question.id, answer.id, this.props.uuid, this.props.question.question.isDp)} > {answer.title} </button>
                </span>
            )
        })

        return (this.getMainUI(buttonUI))
    }
}




class RadioQuestion0 extends Component {

    handleClick(qid, aid, uuid, isDp, event) {
        event.preventDefault();
        let val = parseInt($("#question_" + qid).find('input[name="radio_' + qid  + '"]:checked').val(), 10)

        if(val) {
            this.props.submitAnswer(qid, val, uuid, isDp,
                function() {
                    $("#question_" + qid).find("button").attr("disabled","disabled");
                    $("#question_" + qid).find("input").attr("disabled","disabled");
                    $("#question_" + qid).find("img").css("display","inline");
                },
                function() {
                    alert("Response submission failed");
                }
            )
        }
        else {
            alert("Please select an option.");
        }
    }

    render() {

        let radioUI;
        radioUI = this.props.question.answers.map((answer, index) => {
            return (
                <div key = {"Q" + this.props.question.question.id + "A" + answer.id} className="form-check">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" value={answer.id} name={"radio_" + this.props.question.question.id }/>
                        &nbsp;&nbsp;{answer.title}
                    </label>
                </div>
            )
        })

        return (
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    {radioUI}
                </div>
                <div className="col-lg-6 col-md-12">
                    <button className="btn btn-md btn-outline-primary" style={{position:"absolute", bottom: "0px", right: "0px"}}
                        onClick={this.handleClick.bind(this, this.props.question.question.id, undefined, this.props.uuid, this.props.question.question.isDp)}>Submit</button>
                </div>
            </div>
        )
    }
}

class RadioQuestion1 extends RadioQuestion0 {

    render() {

        let radioUI;
        radioUI = this.props.question.answers.map((answer, index) => {
            return (
                <div key = {"Q" + this.props.question.question.id + "A" + answer.id} className="form-check">
                    <label className="form-check-label">
                        <input type="radio" defaultChecked={answer.dp}
                            className="form-check-input" value={answer.id} name={"radio_" + this.props.question.question.id }/>
                        &nbsp;&nbsp;{answer.title}
                    </label>
                </div>
            )
        })

        return (
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    {radioUI}
                </div>
                <div className="col-lg-6 col-md-12">
                    <button className="btn btn-md btn-block btn-outline-primary" style={{position:"absolute", bottom: "0px", right: "0px"}}
                        onClick={this.handleClick.bind(this, this.props.question.question.id, undefined, this.props.uuid, this.props.question.question.isDp)}>Submit</button>
                </div>
            </div>
        )
    }
}


class RadioQuestion2 extends RadioQuestion0 {

    render() {

        let radioUI;
        radioUI = this.props.question.answers.map((answer, index) => {
            return (
                <div key = {"Q" + this.props.question.question.id + "A" + answer.id} className="form-check">
                    <label className="form-check-label">
                        <input type="radio" defaultChecked={answer.dp}
                            className="form-check-input" value={answer.id} name={"radio_" + this.props.question.question.id }/>
                        &nbsp;&nbsp;{answer.title}
                    </label>
                </div>
            )
        })

        return (
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    {radioUI}
                </div>
                <div className="col-lg-6 col-md-12">
                    <button className="btn btn-md btn-success btn-block" style={{position:"absolute", bottom: "0px"}}
                        onClick={this.handleClick.bind(this, this.props.question.question.id, undefined, this.props.uuid, this.props.question.question.isDp)}>Submit</button>
                </div>
            </div>
        )
    }
}


export default App;
