import React, { PureComponent, createRef } from "react";
import cls from "classnames";
import PropTypes from "prop-types";
import "./style.less"

const sizes = {
  default: "default",
  small: "small",
  large: "large"
};

class Input extends PureComponent  {
  // 默认值
  static defaultProps = {
    prefixCls: "yuki-input",
    disabled: false,
    readonly: false,
    placeholder: "默认显示文字",
    type: "text",
    size: sizes.default,
    onChange: () => {},
    onClear: () => {},
    allowClear: false,
    suffix: null,
    prefix: null,
    showLabel: true
  };
  // 限定输入值
  static propTypes = {
    prefixCls: PropTypes.string,
    placeholder: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.object
    ]),
    addonClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    type: PropTypes.oneOf([
      "text",
      "password",
      "range",
      "date",
      "number",
      "color",
      "email"
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    size: PropTypes.oneOf(Object.values(sizes)),
    allowClear: PropTypes.bool,
    suffix: PropTypes.any,
    prefix: PropTypes.any,
    showLabel: PropTypes.bool
  };
  // 每次改变nextProps 的时候更新 state的value
  static getDerivedStateFromProps(nextProps) {
    // Reflect.has这个方法有点像操作符：in ， 比如这样： xx in obj;
    // 判断 nextProps 中是否 有 value
    if (Reflect.has(nextProps, "value")) {
      return {
        value: nextProps.value
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      value: this.props.defaultValue || this.props.value || ""
    };
  }
  _onChange = e => {
    let val = e.target.value;
    this.setState({ value: val });
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  };
  _onKeyPress = (e) => {
    if (e.key === "Enter") {
      if (this.props.onKeyPress) {
        this.props.onKeyPress(this.state.value);
      }
    }
  };
  onClearValue = () => {
    this.setState({ value: "" });
    if (this.props.onClear) {
      this.props.onClear();
    }
  };
  componentWillUnmount() {
    this.inputRef = undefined;
  }
  render() {
    const {
      type,
      placeholder,
      prefixCls,
      className,
      disabled,
      readonly,
      addonBefore,
      addonAfter,
      addonClassName,
      wrapperClassName,
      size,
      defaultValue,
      onClear,
      allowClear,
      suffix,
      prefix,
      showLabel,
      ...attr
    } = this.props;
    const { value } = this.state;

    const inputEle = (
      <div className={prefixCls}>
        <input
          type={type}
          disabled={disabled}
          readOnly={readonly}
          className={cls(className, {
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-${size}`]: size !== sizes.default,
            [`${prefixCls}-notnull`]: !!value
          })}
          {...attr}
          value={value}
          onChange={this._onChange}
          ref={this.inputRef}
          onKeyPress={this._onKeyPress}
        />
        {
          showLabel ? <label>{placeholder}</label> : null
        }
        <div className="bar"/>
      </div>
    );
    return inputEle;
  }
}

export default Input;
