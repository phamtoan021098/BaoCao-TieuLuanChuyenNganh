import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {giveid} from '../../actions/actions';
class FormLogin extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            authentication:''
        }
    }
    onChange=(event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
        //console.log(this.state)
    }
    onSave=(event)=>{
        const {history}=this.props;
        //console.log(history);
        event.preventDefault();
        const avaiableduser={
            username:this.state.username,
            password:this.state.password
        }
        axios.post('http://localhost:4000/user/login',avaiableduser).then(res=>{
           // console.log(res.data.data.admin)
           
            if(res.data.message==='ktt'){
                window.alert('Tài khoản không tìm thấy!!!')
            }
            else if(res.data.message==='wp'){
                window.alert('Tài khoản hoặc mật khẩu không đúng!!')
            }
            else if(res.data.data.admin===1 && res.data.message==='sl'){
                this.setState({
                    authentication:res.data.data.admin
                })
             }
            else if(res.data.message==='sl'&&res.data.data.admin===0){
                //console.log(res.data.id)
                this.props.onAdd({id:res.data.id})
                history.goBack();
            }          
        })
        if(this.state.authentication===1){
            return <Redirect to="/admin"/>
        }
    }
    render() {
        //console.log(this.state.authentication);
        if(this.state.authentication===1){
            return <Redirect to='/admin'/>
        }
        return (
            <div className="login-form">
                <h5>Thành Viên</h5>
                <hr />
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label htmlFor>Tài Khoản :</label>
                        <input 
                        type="text" 
                        name="username"
                        className="form-control" 
                        placeholder="Tài Khoản:"
                        onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor>Mật Khẩu :</label>
                        <input 
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Mật Khẩu:"
                        onChange={this.onChange}
                         />
                    </div>
                    <button id="button">Đăng Nhập <i class="fas fa-arrow-right"></i></button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
       
    };
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAdd: (id) => {
            dispatch(giveid(id));
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(FormLogin);