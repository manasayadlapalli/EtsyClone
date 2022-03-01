import React , {Component} from 'react'
import { NavLink } from 'react-router-dom'
import './auth.css'

class login extends Component {
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
                <div className='inner-container'><h5 className='grey-text text-darken-3'>Login</h5>
                <NavLink to='/SignUp'><button onClick="">SignUp</button></NavLink></div>
                <div className='input-field'>
                    <label htmlFor='email'>Email</label>
                    <input type ="email" id ="email" onChange={this.handleSubmit}/>
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Password</label>
                    <input type ="password" id ="password" onChange={this.handleChange}/>
                </div>
                <div className='input-field'>
                    <button className='btn blue lighten-1 z-depth-0'>Login</button>
                </div>
            </form>
        </div>
    )
}
}
export default login