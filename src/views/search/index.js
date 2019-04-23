import React from "react";
import article from "../../api/article";
import Header from "../../common/Header/Header";
import {Search} from "./style"

class SearchView extends React.Component {
  componentDidMount() {
    article.oneDay().then((res) => {
      console.log(res)
    })
  }

  //
  render() {
    return (
      <Search>
        <Header/>
        <div className="search-head flex">
          <div className="search__container">
            <input className="search__input" type="text" placeholder="Search"/>
            <div className="search__tag">
              <div className="search__tag__title">
                热门搜索
              </div>
              <div className="search__tag__link flex wrap-wrap">
                <div className="search__tag__link__item">
                  aaa
                </div>
                <div className="search__tag__link__item">
                  bbb
                </div>
                <div className="search__tag__link__item">
                  vvv
                </div>
              </div>
            </div>
            <div className="search__tag">
              <div className="search__tag__title">
                历史搜索
              </div>
              <div className="search__tag__link flex wrap-wrap">
                <div className="search__tag__link__item">
                  aaa
                </div>
                <div className="search__tag__link__item">
                  bbb
                </div>
                <div className="search__tag__link__item">
                  vvv
                </div>
              </div>
            </div>
          </div>
        </div>
      </Search>
    );
  }
}
export default SearchView;
