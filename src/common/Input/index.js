import React, { PureComponent, isValidElement, createRef } from "react";
import cls from "classnames";
import PropTypes from "prop-types";
import "./style.less"

const sizes = {
  default: "default",
  small: "small",
  large: "large"
};

class Input extends PureComponent  {
  state = {
    value: this.props.defaultValue || this.props.value || ""
  };
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
    prefix: null
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
    prefix: PropTypes.any
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
  }
  _onChange = e => {
    let val = e.target.value;
    this.setState({ value: val });
    if (this.props.onChange) {
      this.props.onChange(val);
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
        />
        <label>{placeholder}</label>
        <div className="bar"/>
      </div>
    );
    return inputEle;
  }
}

export default Input;
