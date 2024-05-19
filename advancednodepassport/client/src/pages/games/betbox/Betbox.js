import React from "react";
import "./Betbox.css";
    
export default class Betbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUser: null,
            input: "",
            display: true,
            turn: 1,
            highest: 0,
            money: 500,
            color: "",
            result: "Select BLACK or RED",
            bet: 100,
            number: "",
            chance: "Start Game",
            currentLog: "",
            betsList: []
        }
        this.onRed = this.onRed.bind(this);
        this.betUp = this.betUp.bind(this);
        this.betDown = this.betDown.bind(this);
        this.onBlack = this.onBlack.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fold = this.fold.bind(this);
        this.updateLog = this.updateLog.bind(this);
        this.betEvent = this.betEvent.bind(this);
        this.foldEvent = this.foldEvent.bind(this);
        this.checkBet = this.checkBet.bind(this);
    }
    onRed = () => {
        this.setState(state => ({color: "Red"}));
    }
    betUp = () => {
        this.setState(state => ({bet: state.bet === -50
            ? state.bet + 100 : state.bet + 50}));
    }
    betDown = () => {
        this.setState(state => ({bet: state.bet === 50
            ? state.bet - 0 : state.bet - 50}));
    }
    onBlack = () => {
        this.setState(state => ({color: "Black"}));
    }
    handleClick = () => {
        this.setState(state => ({
            number: Math.floor(Math.random() * 10)
        }));
        this.setState(state => ({result: state.number === ""
            ? ""
            : state.number >= 5
                ? "Red"
                : "Black"
        }));
        this.setState(state => ({chance: state.result === state.color
            ? "You Win"
            : "You Lose"
        }));
        this.setState(state => ({money: state.result === state.color
            ? state.money + state.bet
            : state.money - state.bet
        }));
        this.setState(state => ({color: ""}));
        this.setState(prevState => {
            return {
                turn: prevState.turn + 1
            };
        });
    }
    fold = () => {
        this.setState(state => ({
            number: Math.floor(Math.random() * 10),
            chance: "Fold"
        }));
        this.setState(prevState => {
            return {
                turn: prevState.turn + 1
            };
        });
    }
    updateLog = () => {
        this.setState(state => ({
            currentLog: state.chance === "Fold"
                ? `${state.chance}`
                : `${state.chance} ${state.bet}`
        }));
        this.setState(state => ({
            betsList: state.betsList.concat(state.currentLog)
        }));
        this.setState(state => ({
            highest: state.money >= state.highest
                ? state.money
                : state.highest
        }));
    }
    betEvent = () => {
        this.handleClick();
        this.updateLog();
    }
    foldEvent = () => {
        this.fold();
        this.updateLog();
    }
    checkBet = () => {
        this.state.color === "" ? this.setState(state => ({result: "Select BLACK or RED"})) : this.betEvent();
    }
    render() {
        let windowAlert;
        if (this.state.money <= 0) {
            windowAlert = {backgroundColor: "#e94d4d"};
        }
        return (
            <div className="game-console">
                <div className="game-window" style={windowAlert}>
                    <div className="score">
                        <p className="left">Money: {this.state.money}</p>
                        <p className="right">Highest: {this.state.highest}</p>
                    </div>
                    <h1 className="game-main">{this.state.chance}</h1>
                    <h4 className="game-sec">{this.state.result}</h4>
                    <h3 className="game-third">Current Bet: {this.state.color} {this.state.bet}</h3>
                </div>
                <div className="game-controls">
                    <div className="title">
                        <p>BetBox 1.0</p>
                    </div>
                    <div className="game-buttons">
                        <button className="btn btn-default gameButton betUp" onClick={this.betUp}>Bet +</button>
                        <button className="btn btn-default btn-primary gameButton" onClick={this.checkBet}>Play</button>
                        <button className="btn btn-default gameButton betDown" onClick={this.betDown}>Bet -</button>
                        <button className="btn btn-default gameButton red" onClick={this.onRed}>Red</button>
                        <button className="btn btn-default gameButton" onClick={this.foldEvent}>Fold</button>
                        <button className="btn btn-default gameButton black" onClick={this.onBlack}>Black</button>
                    </div>
                </div>
            </div>
        )
    }
}
