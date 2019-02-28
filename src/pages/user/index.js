import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../actions/userAction";

const mapStateToProps = state => ({
  userReducer: state.userReducer
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, UserActions), dispatch)
});

export class UserPage extends Component {
  state = {
    isChecked: false
  };
  onChangeName(e) {
    this.props.actions.changeUsername(e.target.value);
  }
  onChangeSex(e) {
    this.props.actions.changeUserSex(e.target.checked);
    this.setState({
      isChecked: e.target.checked
    });
  }
  handleShowUsers() {
    this.props.actions.getAllUsers();
  }
  buildUserList() {
    const list = this.props.userReducer.list;
    let users = [];
    list.map((user, index) => {
      users.push(
        <li>
          <span>{user.username},</span>
          <span>{user.sex},</span>
          <span>{user.age}</span>
        </li>
      );
    });
    return users;
  }
  render() {
    const { userReducer } = this.props;
    const { isChecked } = this.state;
    return (
      <div>
        <div>
          姓名：
          <input
            type="text"
            id="T_Username"
            value={userReducer.user.username}
            onChange={this.onChangeName.bind(this)}
          />
        </div>
        <div>
          性别：
          <input
            type="checkbox"
            id="T_Sex"
            checked={isChecked}
            onChange={this.onChangeSex.bind(this)}
          />
          {userReducer.user.sex}
        </div>
        <div>年龄：{userReducer.user.age}</div>
        {userReducer.list.length ? (
          <div>
            <p>用户列表</p>
            <ul>{this.buildUserList()}</ul>
          </div>
        ) : (
          ""
        )}
        <button onClick={this.handleShowUsers.bind(this)}>show users</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
