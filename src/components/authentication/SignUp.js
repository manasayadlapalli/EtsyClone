import React , {Component} from 'react'

class signup extends Component {
    state = {

    }
    handleChange = (e) => {
        console.log(e)
    }
    handleSubmit = (e) => {
        console.log(e)
    }
render(){
    return(
        <div className='container'>
        <form onSubmit = {this.handleSubmit} className="white">
            <h5 className='grey-text text-darken-3'>Login</h5>
            <div className='input-field'>
                <label htmlFor='email'>Email</label>
                <input type ="email" id ="email" onChange={this.handleChange}/>
            </div>
            <div className='input-field'>
                <label htmlFor='password'>Password</label>
                <input type ="password" id ="password" onChange={this.handleChange}/>
            </div>
            <div className='input-field'>
                <label htmlFor='firstName'>First Name</label>
                <input type ="text" id ="firstName" onChange={this.handleChange}/>
            </div>
            <div className='input-field'>
                <label htmlFor='lastName'>Last name</label>
                <input type ="text" id ="lastname" onChange={this.handleChange}/>
            </div>
            <div className='input-field'>
                <button className='btn blue lighten-1 z-depth-0'>Login</button>
            </div>
        </form>
    </div>
    )
}
}
export default signup