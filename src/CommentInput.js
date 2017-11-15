import React, { Component } from 'react'

class CommentInput extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            content:''
        }
    }
    componentDidMount(){
        this.textarea.focus()
    }
    componentWillMount(){
        this._loadUsername()
    }
    _saveUsername(){
        localStorage.setItem('username', this.state.username)
    }
    _loadUsername(){
        const username=localStorage.getItem('username');
        if (username){
            this.setState({username})
        }
    }
    handleUsernameInput(e){
        this.setState({
            username:e.target.value
        })
    }
    handleUsernameBlur(e){
        this._saveUsername(e.target.value)
    }
    handleCommentsInput(e){
        this.setState({
            content:e.target.value
        })
    }
    handleSubmit(){
        if (this.props.onSubmit){
            this.props.onSubmit({
                username:this.state.username,
                content: this.state.content,
                createdTime: +new Date()
            })
        }
        this.setState({content:' '})
    }
    render() {
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">Username:</span>
                    <div className="comment-field-input">
                        <input value={this.state.username}
                               onBlur={this.handleUsernameBlur.bind(this)}
                               onChange={this.handleUsernameInput.bind(this)}
                        />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">Comments:</span>
                    <div className="comment-field-input">
                        <textarea value={this.state.content}
                                  ref={(textarea) => this.textarea=textarea}
                                  onChange={this.handleCommentsInput.bind(this)}
                        />
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit.bind(this)}>Submit</button>
                </div>
            </div>
        )
    }
}

export default CommentInput