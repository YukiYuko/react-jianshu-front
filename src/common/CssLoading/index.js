import React from "react";
import "./style.less"

const SvgComponent = props => (
  <svg {...props}>
    <path
      fill="#18ffff"
      d="M29.8.3l-7 21.5H0l18.5 13.4-7 21.5 18.3-13.3 18.4 13.3-7-21.6 18.4-13.3H36.8z"
    />
  </svg>
);

class CssLoading extends React.PureComponent {
  render() {
    const {type} = this.props;
    const Loading2 = () => (
      <div className="loader-wrap">
        <div className="loader loader-2">
          <SvgComponent className="loader-star"/>
          <div className="loader-circles"/>
        </div>
      </div>

    );
    if (type === "loading2") {
      return <Loading2/>
    }

    return <Loading2/>
  }
}
export default CssLoading;
