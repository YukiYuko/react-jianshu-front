import React, { PureComponent } from "react";
import { Pagination, Icon } from "antd";
import "./style.less";
import CommentForm from "./form";
import { CSSTransition } from "react-transition-group";
import CommentItem from "./item";
import {toggleBody} from "../../untils";

class PublicComments extends PureComponent {
  state = {
    show: false,
    pid: 0
  };

  onChange = page => {
    this.props.change(page);
  };

  submit = formData => {
    this.props.submit({...formData, pid: 0});
  };
  reply = (formData) => {
    this.props.submit({...formData, pid: this.state.pid});
    this.setState({
      show: false
    });
  };
  openReply = (id) => {
    this.setState({
      show: true,
      pid: id
    });
    toggleBody(1)
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.show) {
      toggleBody(0)
    }
  }

  render() {
    const { list = [], count } = this.props;
    const { show } = this.state;
    return (
      <div className="v-comments">
        {/*弹出层回复*/}
        <CSSTransition
          in={show}
          timeout={300}
          classNames="slide"
          unmountOnExit
          onEnter={() => this.setState({ show: true })}
          onExited={() => this.setState({ show: false })}
        >
          <div className="comment__dialog">
            <div className="close">
              <Icon onClick={() => this.setState({ show: false })} type="close-circle" />
            </div>
            <CommentForm submit={this.reply} />
          </div>
        </CSSTransition>

        <div className="v-comments__head">
          <h2>说点儿什么吧</h2>
          <CommentForm submit={this.submit} />
        </div>
        <div className="v-comments__list">
          {list.map((item, index) => (
            <CommentItem item={item} key={index} openReply={this.openReply}/>
          ))}
        </div>
        {/*分页*/}
        {count > 1 ? (
          <div className="v-comments__page flex justify-center">
            <Pagination
              defaultCurrent={1}
              total={count}
              onChange={this.onChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default PublicComments;
