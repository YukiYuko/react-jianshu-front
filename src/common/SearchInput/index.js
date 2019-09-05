import React from "react";
import storage from "../../untils/storage";
import {withRouter} from "react-router-dom";

class SearchInput extends React.PureComponent {

  state = {
    keyword: ""
  };
  // 搜索
  handelKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (!this.state.keyword && !this.state.keyword.trim()) {
        return false;
      }
      let historySearch = await storage.get("historySearch") || [];
      if (!historySearch.includes(this.state.keyword)) {
        if (historySearch.length < 10) {
          historySearch.unshift(this.state.keyword);
        } else {
          historySearch.pop();
          historySearch.unshift(this.state.keyword)
        }
      }
      await storage.set("historySearch", historySearch);
      this.props.history.push({
        pathname: "/search",
        query: {
          keyword: this.state.keyword
        },
        search:'?keyword=' + this.state.keyword
      })
    }
  };

  render() {
    return (
      <input
        type="text"
        onKeyPress={this.handelKeyPress}
        onChange={e => this.setState({ keyword: e.target.value })}
        placeholder="按Enter键搜索"
        ref={this.props.inputRef}
      />
    );
  }
}

export default withRouter(SearchInput);
