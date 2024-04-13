if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_LOAD = "onLoad";
  const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
  function formatAppLog(type2, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type2, filename, ...args);
    } else {
      console[type2].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onPullDownRefresh = /* @__PURE__ */ createHook(ON_PULL_DOWN_REFRESH);
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$Q = {
    name: "u-icon",
    emits: ["click", "touchstart"],
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: ""
      },
      // 字体大小，单位rpx
      size: {
        type: [Number, String],
        default: "inherit"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [Number, String],
        default: ""
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "28"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离(横向排列)
      marginLeft: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginTop: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginRight: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginBottom: {
        type: [String, Number],
        default: "6"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: "widthFix"
      },
      // 自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否为DecimalIcon
      showDecimalIcon: {
        type: Boolean,
        default: false
      },
      // 背景颜色，可接受主题色，仅Decimal时有效
      inactiveColor: {
        type: String,
        default: "#ececec"
      },
      // 显示的百分比，仅Decimal时有效
      percent: {
        type: [Number, String],
        default: "50"
      }
    },
    computed: {
      customClass() {
        let classes = [];
        let { customPrefix, name } = this;
        let index = name.indexOf("-icon-");
        if (index > -1) {
          customPrefix = name.substring(0, index + 5);
          classes.push(name);
        } else {
          classes.push(`${customPrefix}-${name}`);
        }
        if (customPrefix === "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(customPrefix);
        }
        if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
          classes.push("u-icon__icon--" + this.inactiveColor);
        } else if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top)
        };
        if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
          style.color = this.inactiveColor;
        } else if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size);
        style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size);
        return style;
      },
      decimalIconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top),
          width: this.percent + "%"
        };
        if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      decimalIconClass() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.customPrefix == "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(this.customPrefix);
        }
        if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        else
          classes.push("u-icon__icon--primary");
        return classes;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      },
      touchstart() {
        this.$emit("touchstart", this.index);
      }
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$props.customStyle]),
        class: vue.normalizeClass(["u-icon", ["u-icon--" + $props.labelPos]]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: $props.name,
          mode: $props.imgMode,
          style: vue.normalizeStyle([$options.imgStyle])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.customClass]),
          style: vue.normalizeStyle([$options.iconStyle]),
          "hover-class": $props.hoverClass,
          onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchstart && $options.touchstart(...args))
        }, [
          $props.showDecimalIcon ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            style: vue.normalizeStyle([$options.decimalIconStyle]),
            class: vue.normalizeClass([$options.decimalIconClass, "u-icon__decimal"]),
            "hover-class": $props.hoverClass
          }, null, 14, ["hover-class"])) : vue.createCommentVNode("v-if", true)
        ], 46, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示，微信小程序不传值默认为null，故需要增加null的判断 '),
        $props.label !== "" && $props.label !== null ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: $props.labelColor,
              fontSize: _ctx.$u.addUnit($props.labelSize),
              marginLeft: $props.labelPos == "right" ? _ctx.$u.addUnit($props.marginLeft) : 0,
              marginTop: $props.labelPos == "bottom" ? _ctx.$u.addUnit($props.marginTop) : 0,
              marginRight: $props.labelPos == "left" ? _ctx.$u.addUnit($props.marginRight) : 0,
              marginBottom: $props.labelPos == "top" ? _ctx.$u.addUnit($props.marginBottom) : 0
            })
          },
          vue.toDisplayString($props.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$y], ["__scopeId", "data-v-5de67484"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-icon/u-icon.vue"]]);
  const _sfc_main$P = {
    name: "u-search",
    emits: ["update:modelValue", "input", "change", "search", "custom", "clear", "focus", "blur"],
    props: {
      // 输入框的初始化内容
      value: {
        type: String,
        default: ""
      },
      modelValue: {
        type: String,
        default: ""
      },
      // 搜索框形状，round-圆形，square-方形
      shape: {
        type: String,
        default: "round"
      },
      // 搜索框背景色，默认值#f2f2f2
      bgColor: {
        type: String,
        default: "#f2f2f2"
      },
      // 占位提示文字
      placeholder: {
        type: String,
        default: "请输入关键字"
      },
      // 是否启用清除控件
      clearabled: {
        type: Boolean,
        default: true
      },
      // 是否自动聚焦
      focus: {
        type: Boolean,
        default: false
      },
      // 是否在搜索框右侧显示取消按钮
      showAction: {
        type: Boolean,
        default: true
      },
      // 右边控件的样式
      actionStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 取消按钮文字
      actionText: {
        type: String,
        default: "搜索"
      },
      // 输入框内容对齐方式，可选值为 left|center|right
      inputAlign: {
        type: String,
        default: "left"
      },
      // 是否启用输入框
      disabled: {
        type: Boolean,
        default: false
      },
      // 开启showAction时，是否在input获取焦点时才显示
      animation: {
        type: Boolean,
        default: false
      },
      // 边框颜色，只要配置了颜色，才会有边框
      borderColor: {
        type: String,
        default: "none"
      },
      // 搜索框高度，单位rpx
      height: {
        type: [Number, String],
        default: 64
      },
      // input输入框的样式，可以定义文字颜色，大小等，对象形式
      inputStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
      maxlength: {
        type: [Number, String],
        default: "-1"
      },
      // 搜索图标的颜色，默认同输入框字体颜色
      searchIconColor: {
        type: String,
        default: ""
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: "#606266"
      },
      // placeholder的颜色
      placeholderColor: {
        type: String,
        default: "#909399"
      },
      // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30rpx"、"30rpx 20rpx"等写法
      margin: {
        type: String,
        default: "0"
      },
      // 左边输入框的图标，可以为uView图标名称或图片路径
      searchIcon: {
        type: String,
        default: "search"
      }
    },
    data() {
      return {
        keyword: "",
        showClear: false,
        // 是否显示右边的清除图标
        show: false,
        // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
        focused: this.focus
        // 绑定输入框的值
        // inputValue: this.value
      };
    },
    watch: {
      keyword(nVal) {
        this.$emit("input", nVal);
        this.$emit("update:modelValue", nVal);
        this.$emit("change", nVal);
      },
      valueCom: {
        immediate: true,
        handler(nVal) {
          this.keyword = nVal;
        }
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      showActionBtn() {
        if (!this.animation && this.showAction)
          return true;
        else
          return false;
      },
      // 样式，根据用户传入的颜色值生成，如果不传入，默认为none
      borderStyle() {
        if (this.borderColor)
          return `1px solid ${this.borderColor}`;
        else
          return "none";
      }
    },
    methods: {
      // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
      inputChange(e) {
        this.keyword = e.detail.value;
      },
      // 清空输入
      // 也可以作为用户通过this.$refs形式调用清空输入框内容
      clear() {
        this.keyword = "";
        this.$nextTick(() => {
          this.$emit("clear");
        });
      },
      // 确定搜索
      search(e) {
        this.$emit("search", e.detail.value);
        try {
          uni.hideKeyboard();
        } catch (e2) {
        }
      },
      // 点击右边自定义按钮的事件
      custom() {
        this.$emit("custom", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e) {
        }
      },
      // 获取焦点
      getFocus() {
        this.focused = true;
        if (this.animation && this.showAction)
          this.show = true;
        this.$emit("focus", this.keyword);
      },
      // 失去焦点
      blur() {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        this.show = false;
        this.$emit("blur", this.keyword);
      },
      // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
      clickHandler() {
        if (this.disabled)
          this.$emit("click");
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-search",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
        style: vue.normalizeStyle({
          margin: $props.margin
        })
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "u-content",
            style: vue.normalizeStyle({
              backgroundColor: $props.bgColor,
              borderRadius: $props.shape == "round" ? "100rpx" : "10rpx",
              border: $options.borderStyle,
              height: $props.height + "rpx"
            })
          },
          [
            vue.createElementVNode("view", { class: "u-icon-wrap" }, [
              vue.createVNode(_component_u_icon, {
                class: "u-clear-icon",
                size: 30,
                name: $props.searchIcon,
                color: $props.searchIconColor ? $props.searchIconColor : $props.color
              }, null, 8, ["name", "color"])
            ]),
            vue.createElementVNode("input", {
              "confirm-type": "search",
              onBlur: _cache[0] || (_cache[0] = (...args) => $options.blur && $options.blur(...args)),
              value: $options.valueCom,
              onConfirm: _cache[1] || (_cache[1] = (...args) => $options.search && $options.search(...args)),
              onInput: _cache[2] || (_cache[2] = (...args) => $options.inputChange && $options.inputChange(...args)),
              disabled: $props.disabled,
              onFocus: _cache[3] || (_cache[3] = (...args) => $options.getFocus && $options.getFocus(...args)),
              focus: $props.focus,
              maxlength: $props.maxlength,
              "placeholder-class": "u-placeholder-class",
              placeholder: $props.placeholder,
              "placeholder-style": `color: ${$props.placeholderColor}`,
              class: "u-input",
              type: "text",
              style: vue.normalizeStyle([{
                textAlign: $props.inputAlign,
                color: $props.color,
                backgroundColor: $props.bgColor
              }, $props.inputStyle])
            }, null, 44, ["value", "disabled", "focus", "maxlength", "placeholder", "placeholder-style"]),
            $data.keyword && $props.clearabled && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "u-close-wrap",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clear && $options.clear(...args))
            }, [
              vue.createVNode(_component_u_icon, {
                class: "u-clear-icon",
                name: "close-circle-fill",
                size: "34",
                color: "#c0c4cc"
              })
            ])) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "view",
          {
            style: vue.normalizeStyle([$props.actionStyle]),
            class: vue.normalizeClass(["u-action", [$options.showActionBtn || $data.show ? "u-action-active" : ""]]),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.custom && $options.custom(...args), ["stop", "prevent"]))
          },
          vue.toDisplayString($props.actionText),
          7
          /* TEXT, CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$x], ["__scopeId", "data-v-3cb29fc1"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-search/u-search.vue"]]);
  const _sfc_main$O = {
    name: "u-cell-item",
    emits: ["click"],
    props: {
      // 左侧图标名称(只能uView内置图标)，或者图标src
      icon: {
        type: String,
        default: ""
      },
      // 左侧标题
      title: {
        type: [String, Number],
        default: ""
      },
      // 右侧内容
      value: {
        type: [String, Number],
        default: ""
      },
      // 标题下方的描述信息
      label: {
        type: [String, Number],
        default: ""
      },
      // 是否显示下边框
      borderBottom: {
        type: Boolean,
        default: true
      },
      // 是否显示上边框
      borderTop: {
        type: Boolean,
        default: false
      },
      // 多个cell中，中间的cell显示下划线时，下划线是否给一个到左边的距离
      // 1.4.0版本废除此参数，默认边框由border-top和border-bottom提供，此参数会造成干扰
      // borderGap: {
      // 	type: Boolean,
      // 	default: true
      // },
      // 是否开启点击反馈，即点击时cell背景为灰色，none为无效果
      hoverClass: {
        type: String,
        default: "u-cell-hover"
      },
      // 是否显示右侧箭头
      arrow: {
        type: Boolean,
        default: true
      },
      // 内容是否垂直居中
      center: {
        type: Boolean,
        default: false
      },
      // 是否显示左边表示必填的星号
      required: {
        type: Boolean,
        default: false
      },
      // 标题的宽度，单位rpx
      titleWidth: {
        type: [Number, String],
        default: ""
      },
      // 右侧箭头方向，可选值：right|up|down，默认为right
      arrowDirection: {
        type: String,
        default: "right"
      },
      // 控制标题的样式
      titleStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 右侧显示内容的样式
      valueStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 描述信息的样式
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "transparent"
      },
      // 用于识别被点击的是第几个cell
      index: {
        type: [String, Number],
        default: ""
      },
      // 是否使用lable插槽
      useLabelSlot: {
        type: Boolean,
        default: false
      },
      // 左边图标的大小，单位rpx，只对传入icon字段时有效
      iconSize: {
        type: [Number, String],
        default: 34
      },
      // 左边图标的样式，对象形式
      iconStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      arrowStyle() {
        let style = {};
        if (this.arrowDirection == "up")
          style.transform = "rotate(-90deg)";
        else if (this.arrowDirection == "down")
          style.transform = "rotate(90deg)";
        else
          style.transform = "rotate(0deg)";
        return style;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      }
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", {
      onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args)),
      class: vue.normalizeClass(["u-cell", { "u-border-bottom": $props.borderBottom, "u-border-top": $props.borderTop, "u-col-center": $props.center, "u-cell--required": $props.required }]),
      "hover-stay-time": "150",
      "hover-class": $props.hoverClass,
      style: vue.normalizeStyle({
        backgroundColor: $props.bgColor
      })
    }, [
      $props.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
        key: 0,
        size: $props.iconSize,
        name: $props.icon,
        "custom-style": $props.iconStyle,
        class: "u-cell__left-icon-wrap"
      }, null, 8, ["size", "name", "custom-style"])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "u-flex"
      }, [
        vue.renderSlot(_ctx.$slots, "icon", {}, void 0, true)
      ])),
      vue.createElementVNode(
        "view",
        {
          class: "u-cell_title",
          style: vue.normalizeStyle([
            {
              width: $props.titleWidth ? $props.titleWidth + "rpx" : "auto"
            },
            $props.titleStyle
          ])
        },
        [
          $props.title !== "" ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              vue.createTextVNode(
                vue.toDisplayString($props.title),
                1
                /* TEXT */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.renderSlot(_ctx.$slots, "title", { key: 1 }, void 0, true),
          $props.label || _ctx.$slots.label ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 2,
              class: "u-cell__label",
              style: vue.normalizeStyle([$props.labelStyle])
            },
            [
              $props.label !== "" ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createTextVNode(
                    vue.toDisplayString($props.label),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.renderSlot(_ctx.$slots, "label", { key: 1 }, void 0, true)
            ],
            4
            /* STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ],
        4
        /* STYLE */
      ),
      vue.createElementVNode(
        "view",
        {
          class: "u-cell__value",
          style: vue.normalizeStyle([$props.valueStyle])
        },
        [
          $props.value !== "" ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              vue.createTextVNode(
                vue.toDisplayString($props.value),
                1
                /* TEXT */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
        ],
        4
        /* STYLE */
      ),
      _ctx.$slots["right-icon"] ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "u-flex u-cell_right"
      }, [
        vue.renderSlot(_ctx.$slots, "right-icon", {}, void 0, true)
      ])) : vue.createCommentVNode("v-if", true),
      $props.arrow ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
        key: 3,
        name: "arrow-right",
        style: vue.normalizeStyle([$options.arrowStyle]),
        class: "u-icon-wrap u-cell__right-icon-wrap"
      }, null, 8, ["style"])) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$w], ["__scopeId", "data-v-e5554f60"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.vue"]]);
  const _sfc_main$N = {
    name: "u-cell-group",
    props: {
      // 分组标题
      title: {
        type: String,
        default: ""
      },
      // 是否显示分组list上下边框
      border: {
        type: Boolean,
        default: true
      },
      // 分组标题的样式，对象形式，注意驼峰属性写法
      // 类似 {'font-size': '24rpx'} 和 {'fontSize': '24rpx'}
      titleStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        index: 0
      };
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-cell-box" }, [
      $props.title ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "u-cell-title",
          style: vue.normalizeStyle([$props.titleStyle])
        },
        vue.toDisplayString($props.title),
        5
        /* TEXT, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-cell-item-box", { "u-border-bottom u-border-top": $props.border }])
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const __easycom_2$4 = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$v], ["__scopeId", "data-v-dd1e88cb"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-cell-group/u-cell-group.vue"]]);
  const _sfc_main$M = {
    name: "u-dropdown-item",
    emits: ["update:modelValue", "input", "change"],
    props: {
      // 当前选中项的value值
      value: {
        type: [Number, String, Array],
        default: ""
      },
      modelValue: {
        type: [Number, String, Array],
        default: ""
      },
      // 菜单项标题
      title: {
        type: [String, Number],
        default: ""
      },
      // 选项数据，如果传入了默认slot，此参数无效
      options: {
        type: Array,
        default() {
          return [];
        }
      },
      // 是否禁用此菜单项
      disabled: {
        type: Boolean,
        default: false
      },
      // 下拉弹窗的高度
      height: {
        type: [Number, String],
        default: "auto"
      }
    },
    data() {
      return {
        active: false,
        // 当前项是否处于展开状态
        activeColor: "#2979ff",
        // 激活时左边文字和右边对勾图标的颜色
        inactiveColor: "#606266"
        // 未激活时左边文字和右边对勾图标的颜色
      };
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      // 监听props是否发生了变化，有些值需要传递给父组件u-dropdown，无法双向绑定
      propsChange() {
        return `${this.title}-${this.disabled}`;
      }
    },
    watch: {
      propsChange(n) {
        if (this.parent)
          this.parent.init();
      }
    },
    created() {
      this.parent = false;
    },
    methods: {
      init() {
        let parent = this.$u.$parent.call(this, "u-dropdown");
        if (parent) {
          this.parent = parent;
          this.activeColor = parent.activeColor;
          this.inactiveColor = parent.inactiveColor;
          let exist = parent.children.find((val) => {
            return this === val;
          });
          if (!exist)
            parent.children.push(this);
          if (parent.children.length == 1)
            this.active = true;
          parent.menuList.push({
            title: this.title,
            disabled: this.disabled
          });
        }
      },
      // cell被点击
      cellClick(value) {
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
        this.parent.close();
        this.$emit("change", value);
      }
    },
    mounted() {
      this.init();
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    const _component_u_cell_item = resolveEasycom(vue.resolveDynamicComponent("u-cell-item"), __easycom_1$4);
    const _component_u_cell_group = resolveEasycom(vue.resolveDynamicComponent("u-cell-group"), __easycom_2$4);
    return $data.active ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "u-dropdown-item",
        onTouchmove: vue.withModifiers(() => {
        }, ["stop", "prevent"]),
        onClick: vue.withModifiers(() => {
        }, ["stop", "prevent"])
      },
      [
        !_ctx.$slots.default && !_ctx.$slots.$default ? (vue.openBlock(), vue.createElementBlock(
          "scroll-view",
          {
            key: 0,
            "scroll-y": "true",
            style: vue.normalizeStyle({
              height: _ctx.$u.addUnit($props.height)
            })
          },
          [
            vue.createElementVNode("view", { class: "u-dropdown-item__options" }, [
              vue.createVNode(_component_u_cell_group, null, {
                default: vue.withCtx(() => [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($props.options, (item, index) => {
                      return vue.openBlock(), vue.createBlock(_component_u_cell_item, {
                        onClick: ($event) => $options.cellClick(item.value),
                        arrow: false,
                        title: item.label,
                        key: index,
                        "title-style": {
                          color: $props.value === item.value ? $data.activeColor : $data.inactiveColor
                        }
                      }, {
                        default: vue.withCtx(() => [
                          $options.valueCom === item.value ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                            key: 0,
                            name: "checkbox-mark",
                            color: $data.activeColor,
                            size: "32"
                          }, null, 8, ["color"])) : vue.createCommentVNode("v-if", true)
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["onClick", "title", "title-style"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ],
          4
          /* STYLE */
        )) : vue.renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
      ],
      32
      /* NEED_HYDRATION */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$u], ["__scopeId", "data-v-c9b1ed30"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-dropdown-item/u-dropdown-item.vue"]]);
  const _sfc_main$L = {
    name: "u-dropdown",
    emits: ["open", "close"],
    props: {
      // 菜单标题和选项的激活态颜色
      activeColor: {
        type: String,
        default: "#2979ff"
      },
      // 菜单标题和选项的未激活态颜色
      inactiveColor: {
        type: String,
        default: "#606266"
      },
      // 点击遮罩是否关闭菜单
      closeOnClickMask: {
        type: Boolean,
        default: true
      },
      // 点击当前激活项标题是否关闭菜单
      closeOnClickSelf: {
        type: Boolean,
        default: true
      },
      // 过渡时间
      duration: {
        type: [Number, String],
        default: 300
      },
      // 标题菜单的高度，单位任意，数值默认为rpx单位
      height: {
        type: [Number, String],
        default: 80
      },
      // 是否显示下边框
      borderBottom: {
        type: Boolean,
        default: false
      },
      // 标题的字体大小
      titleSize: {
        type: [Number, String],
        default: 28
      },
      // 下拉出来的内容部分的圆角值
      borderRadius: {
        type: [Number, String],
        default: 0
      },
      // 菜单右侧的icon图标
      menuIcon: {
        type: String,
        default: "arrow-down"
      },
      // 菜单右侧图标的大小
      menuIconSize: {
        type: [Number, String],
        default: 26
      }
    },
    data() {
      return {
        showDropdown: true,
        // 是否打开下来菜单,
        menuList: [],
        // 显示的菜单
        active: false,
        // 下拉菜单的状态
        // 当前是第几个菜单处于激活状态，小程序中此处不能写成false或者""，否则后续将current赋值为0，
        // 无能的TX没有使用===而是使用==判断，导致程序认为前后二者没有变化，从而不会触发视图更新
        current: 99999,
        // 外层内容的样式，初始时处于底层，且透明
        contentStyle: {
          zIndex: -1,
          opacity: 0
        },
        // 让某个菜单保持高亮的状态
        highlightIndex: 99999,
        contentHeight: 0
      };
    },
    computed: {
      // 下拉出来部分的样式
      popupStyle() {
        let style = {};
        style.transform = `translateY(${this.active ? 0 : "-100%"})`;
        style["transition-duration"] = this.duration / 1e3 + "s";
        style.borderRadius = `0 0 ${this.$u.addUnit(this.borderRadius)} ${this.$u.addUnit(this.borderRadius)}`;
        return style;
      }
    },
    created() {
      this.children = [];
    },
    mounted() {
      this.getContentHeight();
    },
    methods: {
      init() {
        this.menuList = [];
        this.children.map((child) => {
          child.init();
        });
      },
      // 点击菜单
      menuClick(index) {
        if (this.menuList[index].disabled)
          return;
        if (index === this.current && this.closeOnClickSelf) {
          this.close();
          setTimeout(() => {
            this.children[index].active = false;
          }, this.duration);
          return;
        }
        this.open(index);
      },
      // 打开下拉菜单
      open(index) {
        this.contentStyle = {
          zIndex: 11
        };
        this.active = true;
        this.current = index;
        this.children.map((val, idx) => {
          val.active = index == idx ? true : false;
        });
        this.$emit("open", this.current);
      },
      // 设置下拉菜单处于收起状态
      close() {
        this.$emit("close", this.current);
        this.active = false;
        this.current = 99999;
        this.contentStyle = {
          zIndex: -1,
          opacity: 0
        };
      },
      // 点击遮罩
      maskClick() {
        if (!this.closeOnClickMask)
          return;
        this.close();
      },
      // 外部手动设置某个菜单高亮
      highlight(index = void 0) {
        this.highlightIndex = index !== void 0 ? index : 99999;
      },
      // 获取下拉菜单内容的高度
      getContentHeight() {
        let windowHeight = this.$u.sys().windowHeight;
        this.$uGetRect(".u-dropdown__menu").then((res) => {
          this.contentHeight = windowHeight - res.bottom;
        });
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-dropdown" }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-dropdown__menu", {
            "u-border-bottom": $props.borderBottom
          }]),
          style: vue.normalizeStyle({
            height: _ctx.$u.addUnit($props.height)
          })
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.menuList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "u-dropdown__menu__item",
                key: index,
                onClick: vue.withModifiers(($event) => $options.menuClick(index), ["stop"])
              }, [
                vue.createElementVNode("view", { class: "u-flex" }, [
                  vue.createElementVNode(
                    "text",
                    {
                      class: "u-dropdown__menu__item__text",
                      style: vue.normalizeStyle({
                        color: item.disabled ? "#c0c4cc" : index === $data.current || $data.highlightIndex == index ? $props.activeColor : $props.inactiveColor,
                        fontSize: _ctx.$u.addUnit($props.titleSize)
                      })
                    },
                    vue.toDisplayString(item.title),
                    5
                    /* TEXT, STYLE */
                  ),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["u-dropdown__menu__item__arrow", {
                        "u-dropdown__menu__item__arrow--rotate": index === $data.current
                      }])
                    },
                    [
                      vue.createVNode(_component_u_icon, {
                        "custom-style": { display: "flex" },
                        name: $props.menuIcon,
                        size: _ctx.$u.addUnit($props.menuIconSize),
                        color: index === $data.current || $data.highlightIndex == index ? $props.activeColor : "#c0c4cc"
                      }, null, 8, ["name", "size", "color"])
                    ],
                    2
                    /* CLASS */
                  )
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        6
        /* CLASS, STYLE */
      ),
      vue.createElementVNode(
        "view",
        {
          class: "u-dropdown__content",
          style: vue.normalizeStyle([$data.contentStyle, {
            transition: `opacity ${$props.duration / 1e3}s linear`,
            top: _ctx.$u.addUnit($props.height),
            height: $data.contentHeight + "px"
          }]),
          onClick: _cache[1] || (_cache[1] = (...args) => $options.maskClick && $options.maskClick(...args)),
          onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers(() => {
          }, ["stop", "prevent"]))
        },
        [
          vue.createElementVNode(
            "view",
            {
              onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
              }, ["stop", "prevent"])),
              class: "u-dropdown__content__popup",
              style: vue.normalizeStyle([$options.popupStyle])
            },
            [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", { class: "u-dropdown__content__mask" })
        ],
        36
        /* STYLE, NEED_HYDRATION */
      )
    ]);
  }
  const __easycom_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$t], ["__scopeId", "data-v-efa9add2"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-dropdown/u-dropdown.vue"]]);
  const _imports_0 = "/static/tabbar-icons/feeds.png";
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * vuex v4.1.0
   * (c) 2022 Evan You
   * @license MIT
   */
  var storeKey = "store";
  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function(key) {
      return fn(obj[key], key);
    });
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise(val) {
    return val && typeof val.then === "function";
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error("[vuex] " + msg);
    }
  }
  function partial(fn, arg) {
    return function() {
      return fn(arg);
    };
  }
  function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend ? subs.unshift(fn) : subs.push(fn);
    }
    return function() {
      var i = subs.indexOf(fn);
      if (i > -1) {
        subs.splice(i, 1);
      }
    };
  }
  function resetStore(store2, hot) {
    store2._actions = /* @__PURE__ */ Object.create(null);
    store2._mutations = /* @__PURE__ */ Object.create(null);
    store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
    store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    var state2 = store2.state;
    installModule(store2, state2, [], store2._modules.root, true);
    resetStoreState(store2, state2, hot);
  }
  function resetStoreState(store2, state2, hot) {
    var oldState = store2._state;
    var oldScope = store2._scope;
    store2.getters = {};
    store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    var wrappedGetters = store2._wrappedGetters;
    var computedObj = {};
    var computedCache = {};
    var scope = vue.effectScope(true);
    scope.run(function() {
      forEachValue(wrappedGetters, function(fn, key) {
        computedObj[key] = partial(fn, store2);
        computedCache[key] = vue.computed(function() {
          return computedObj[key]();
        });
        Object.defineProperty(store2.getters, key, {
          get: function() {
            return computedCache[key].value;
          },
          enumerable: true
          // for local getters
        });
      });
    });
    store2._state = vue.reactive({
      data: state2
    });
    store2._scope = scope;
    if (store2.strict) {
      enableStrictMode(store2);
    }
    if (oldState) {
      if (hot) {
        store2._withCommit(function() {
          oldState.data = null;
        });
      }
    }
    if (oldScope) {
      oldScope.stop();
    }
  }
  function installModule(store2, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store2._modules.getNamespace(path);
    if (module.namespaced) {
      if (store2._modulesNamespaceMap[namespace] && true) {
        console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
      }
      store2._modulesNamespaceMap[namespace] = module;
    }
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName = path[path.length - 1];
      store2._withCommit(function() {
        {
          if (moduleName in parentState) {
            console.warn(
              '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
            );
          }
        }
        parentState[moduleName] = module.state;
      });
    }
    var local = module.context = makeLocalContext(store2, namespace, path);
    module.forEachMutation(function(mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store2, namespacedType, mutation, local);
    });
    module.forEachAction(function(action, key) {
      var type2 = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store2, type2, handler, local);
    });
    module.forEachGetter(function(getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store2, namespacedType, getter, local);
    });
    module.forEachChild(function(child, key) {
      installModule(store2, rootState, path.concat(key), child, hot);
    });
  }
  function makeLocalContext(store2, namespace, path) {
    var noNamespace = namespace === "";
    var local = {
      dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type2 = args.type;
        if (!options || !options.root) {
          type2 = namespace + type2;
          if (!store2._actions[type2]) {
            console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type2);
            return;
          }
        }
        return store2.dispatch(type2, payload);
      },
      commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type2 = args.type;
        if (!options || !options.root) {
          type2 = namespace + type2;
          if (!store2._mutations[type2]) {
            console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type2);
            return;
          }
        }
        store2.commit(type2, payload, options);
      }
    };
    Object.defineProperties(local, {
      getters: {
        get: noNamespace ? function() {
          return store2.getters;
        } : function() {
          return makeLocalGetters(store2, namespace);
        }
      },
      state: {
        get: function() {
          return getNestedState(store2.state, path);
        }
      }
    });
    return local;
  }
  function makeLocalGetters(store2, namespace) {
    if (!store2._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store2.getters).forEach(function(type2) {
        if (type2.slice(0, splitPos) !== namespace) {
          return;
        }
        var localType = type2.slice(splitPos);
        Object.defineProperty(gettersProxy, localType, {
          get: function() {
            return store2.getters[type2];
          },
          enumerable: true
        });
      });
      store2._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store2._makeLocalGettersCache[namespace];
  }
  function registerMutation(store2, type2, handler, local) {
    var entry = store2._mutations[type2] || (store2._mutations[type2] = []);
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store2, local.state, payload);
    });
  }
  function registerAction(store2, type2, handler, local) {
    var entry = store2._actions[type2] || (store2._actions[type2] = []);
    entry.push(function wrappedActionHandler(payload) {
      var res = handler.call(store2, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store2.getters,
        rootState: store2.state
      }, payload);
      if (!isPromise(res)) {
        res = Promise.resolve(res);
      }
      if (store2._devtoolHook) {
        return res.catch(function(err) {
          store2._devtoolHook.emit("vuex:error", err);
          throw err;
        });
      } else {
        return res;
      }
    });
  }
  function registerGetter(store2, type2, rawGetter, local) {
    if (store2._wrappedGetters[type2]) {
      {
        console.error("[vuex] duplicate getter key: " + type2);
      }
      return;
    }
    store2._wrappedGetters[type2] = function wrappedGetter(store3) {
      return rawGetter(
        local.state,
        // local state
        local.getters,
        // local getters
        store3.state,
        // root state
        store3.getters
        // root getters
      );
    };
  }
  function enableStrictMode(store2) {
    vue.watch(function() {
      return store2._state.data;
    }, function() {
      {
        assert(store2._committing, "do not mutate vuex store state outside mutation handlers.");
      }
    }, { deep: true, flush: "sync" });
  }
  function getNestedState(state2, path) {
    return path.reduce(function(state3, key) {
      return state3[key];
    }, state2);
  }
  function unifyObjectStyle(type2, payload, options) {
    if (isObject(type2) && type2.type) {
      options = payload;
      payload = type2;
      type2 = type2.type;
    }
    {
      assert(typeof type2 === "string", "expects string as the type, but found " + typeof type2 + ".");
    }
    return { type: type2, payload, options };
  }
  var LABEL_VUEX_BINDINGS = "vuex bindings";
  var MUTATIONS_LAYER_ID = "vuex:mutations";
  var ACTIONS_LAYER_ID = "vuex:actions";
  var INSPECTOR_ID = "vuex";
  var actionId = 0;
  function addDevtools(app, store2) {
    setupDevtoolsPlugin(
      {
        id: "org.vuejs.vuex",
        app,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [LABEL_VUEX_BINDINGS]
      },
      function(api) {
        api.addTimelineLayer({
          id: MUTATIONS_LAYER_ID,
          label: "Vuex Mutations",
          color: COLOR_LIME_500
        });
        api.addTimelineLayer({
          id: ACTIONS_LAYER_ID,
          label: "Vuex Actions",
          color: COLOR_LIME_500
        });
        api.addInspector({
          id: INSPECTOR_ID,
          label: "Vuex",
          icon: "storage",
          treeFilterPlaceholder: "Filter stores..."
        });
        api.on.getInspectorTree(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            if (payload.filter) {
              var nodes = [];
              flattenStoreForInspectorTree(nodes, store2._modules.root, payload.filter, "");
              payload.rootNodes = nodes;
            } else {
              payload.rootNodes = [
                formatStoreForInspectorTree(store2._modules.root, "")
              ];
            }
          }
        });
        api.on.getInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            makeLocalGetters(store2, modulePath);
            payload.state = formatStoreForInspectorState(
              getStoreModule(store2._modules, modulePath),
              modulePath === "root" ? store2.getters : store2._makeLocalGettersCache,
              modulePath
            );
          }
        });
        api.on.editInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            var path = payload.path;
            if (modulePath !== "root") {
              path = modulePath.split("/").filter(Boolean).concat(path);
            }
            store2._withCommit(function() {
              payload.set(store2._state.data, path, payload.state.value);
            });
          }
        });
        store2.subscribe(function(mutation, state2) {
          var data = {};
          if (mutation.payload) {
            data.payload = mutation.payload;
          }
          data.state = state2;
          api.notifyComponentUpdate();
          api.sendInspectorTree(INSPECTOR_ID);
          api.sendInspectorState(INSPECTOR_ID);
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: mutation.type,
              data
            }
          });
        });
        store2.subscribeAction({
          before: function(action, state2) {
            var data = {};
            if (action.payload) {
              data.payload = action.payload;
            }
            action._id = actionId++;
            action._time = Date.now();
            data.state = state2;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: action._time,
                title: action.type,
                groupId: action._id,
                subtitle: "start",
                data
              }
            });
          },
          after: function(action, state2) {
            var data = {};
            var duration = Date.now() - action._time;
            data.duration = {
              _custom: {
                type: "duration",
                display: duration + "ms",
                tooltip: "Action duration",
                value: duration
              }
            };
            if (action.payload) {
              data.payload = action.payload;
            }
            data.state = state2;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: Date.now(),
                title: action.type,
                groupId: action._id,
                subtitle: "end",
                data
              }
            });
          }
        });
      }
    );
  }
  var COLOR_LIME_500 = 8702998;
  var COLOR_DARK = 6710886;
  var COLOR_WHITE = 16777215;
  var TAG_NAMESPACED = {
    label: "namespaced",
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
  };
  function extractNameFromPath(path) {
    return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
  }
  function formatStoreForInspectorTree(module, path) {
    return {
      id: path || "root",
      // all modules end with a `/`, we want the last segment only
      // cart/ -> cart
      // nested/cart/ -> cart
      label: extractNameFromPath(path),
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
      children: Object.keys(module._children).map(
        function(moduleName) {
          return formatStoreForInspectorTree(
            module._children[moduleName],
            path + moduleName + "/"
          );
        }
      )
    };
  }
  function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
      result.push({
        id: path || "root",
        label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
        tags: module.namespaced ? [TAG_NAMESPACED] : []
      });
    }
    Object.keys(module._children).forEach(function(moduleName) {
      flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
    });
  }
  function formatStoreForInspectorState(module, getters2, path) {
    getters2 = path === "root" ? getters2 : getters2[path];
    var gettersKeys = Object.keys(getters2);
    var storeState = {
      state: Object.keys(module.state).map(function(key) {
        return {
          key,
          editable: true,
          value: module.state[key]
        };
      })
    };
    if (gettersKeys.length) {
      var tree = transformPathsToObjectTree(getters2);
      storeState.getters = Object.keys(tree).map(function(key) {
        return {
          key: key.endsWith("/") ? extractNameFromPath(key) : key,
          editable: false,
          value: canThrow(function() {
            return tree[key];
          })
        };
      });
    }
    return storeState;
  }
  function transformPathsToObjectTree(getters2) {
    var result = {};
    Object.keys(getters2).forEach(function(key) {
      var path = key.split("/");
      if (path.length > 1) {
        var target = result;
        var leafKey = path.pop();
        path.forEach(function(p) {
          if (!target[p]) {
            target[p] = {
              _custom: {
                value: {},
                display: p,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p]._custom.value;
        });
        target[leafKey] = canThrow(function() {
          return getters2[key];
        });
      } else {
        result[key] = canThrow(function() {
          return getters2[key];
        });
      }
    });
    return result;
  }
  function getStoreModule(moduleMap, path) {
    var names = path.split("/").filter(function(n) {
      return n;
    });
    return names.reduce(
      function(module, moduleName, i) {
        var child = module[moduleName];
        if (!child) {
          throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i === names.length - 1 ? child : child._children;
      },
      path === "root" ? moduleMap : moduleMap.root._children
    );
  }
  function canThrow(cb) {
    try {
      return cb();
    } catch (e) {
      return e;
    }
  }
  var Module = function Module2(rawModule, runtime) {
    this.runtime = runtime;
    this._children = /* @__PURE__ */ Object.create(null);
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
  };
  var prototypeAccessors$1 = { namespaced: { configurable: true } };
  prototypeAccessors$1.namespaced.get = function() {
    return !!this._rawModule.namespaced;
  };
  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
  };
  Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
  };
  Module.prototype.getChild = function getChild(key) {
    return this._children[key];
  };
  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
  };
  Module.prototype.update = function update2(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };
  Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn);
  };
  Module.prototype.forEachGetter = function forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  };
  Module.prototype.forEachAction = function forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  };
  Object.defineProperties(Module.prototype, prototypeAccessors$1);
  var ModuleCollection = function ModuleCollection2(rawRootModule) {
    this.register([], rawRootModule, false);
  };
  ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function(module, key) {
      return module.getChild(key);
    }, this.root);
  };
  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function(namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  };
  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update([], this.root, rawRootModule);
  };
  ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1$1 = this;
    if (runtime === void 0)
      runtime = true;
    {
      assertRawModule(path, rawModule);
    }
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1$1.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };
  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child) {
      {
        console.warn(
          "[vuex] trying to unregister module '" + key + "', which is not registered"
        );
      }
      return;
    }
    if (!child.runtime) {
      return;
    }
    parent.removeChild(key);
  };
  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) {
      return parent.hasChild(key);
    }
    return false;
  };
  function update(path, targetModule, newModule) {
    {
      assertRawModule(path, newModule);
    }
    targetModule.update(newModule);
    if (newModule.modules) {
      for (var key in newModule.modules) {
        if (!targetModule.getChild(key)) {
          {
            console.warn(
              "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
            );
          }
          return;
        }
        update(
          path.concat(key),
          targetModule.getChild(key),
          newModule.modules[key]
        );
      }
    }
  }
  var functionAssert = {
    assert: function(value) {
      return typeof value === "function";
    },
    expected: "function"
  };
  var objectAssert = {
    assert: function(value) {
      return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
    },
    expected: 'function or object with "handler" function'
  };
  var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert
  };
  function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function(key) {
      if (!rawModule[key]) {
        return;
      }
      var assertOptions = assertTypes[key];
      forEachValue(rawModule[key], function(value, type2) {
        assert(
          assertOptions.assert(value),
          makeAssertionMessage(path, key, type2, value, assertOptions.expected)
        );
      });
    });
  }
  function makeAssertionMessage(path, key, type2, value, expected) {
    var buf = key + " should be " + expected + ' but "' + key + "." + type2 + '"';
    if (path.length > 0) {
      buf += ' in module "' + path.join(".") + '"';
    }
    buf += " is " + JSON.stringify(value) + ".";
    return buf;
  }
  function createStore(options) {
    return new Store(options);
  }
  var Store = function Store2(options) {
    var this$1$1 = this;
    if (options === void 0)
      options = {};
    {
      assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
      assert(this instanceof Store2, "store must be called with the new operator.");
    }
    var plugins = options.plugins;
    if (plugins === void 0)
      plugins = [];
    var strict = options.strict;
    if (strict === void 0)
      strict = false;
    var devtools = options.devtools;
    this._committing = false;
    this._actions = /* @__PURE__ */ Object.create(null);
    this._actionSubscribers = [];
    this._mutations = /* @__PURE__ */ Object.create(null);
    this._wrappedGetters = /* @__PURE__ */ Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    this._scope = null;
    this._devtools = devtools;
    var store2 = this;
    var ref = this;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    this.dispatch = function boundDispatch(type2, payload) {
      return dispatch.call(store2, type2, payload);
    };
    this.commit = function boundCommit(type2, payload, options2) {
      return commit.call(store2, type2, payload, options2);
    };
    this.strict = strict;
    var state2 = this._modules.root.state;
    installModule(this, state2, [], this._modules.root);
    resetStoreState(this, state2);
    plugins.forEach(function(plugin) {
      return plugin(this$1$1);
    });
  };
  var prototypeAccessors = { state: { configurable: true } };
  Store.prototype.install = function install2(app, injectKey) {
    app.provide(injectKey || storeKey, this);
    app.config.globalProperties.$store = this;
    var useDevtools = this._devtools !== void 0 ? this._devtools : true;
    if (useDevtools) {
      addDevtools(app, this);
    }
  };
  prototypeAccessors.state.get = function() {
    return this._state.data;
  };
  prototypeAccessors.state.set = function(v) {
    {
      assert(false, "use store.replaceState() to explicit replace store state.");
    }
  };
  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type2 = ref.type;
    var payload = ref.payload;
    var options = ref.options;
    var mutation = { type: type2, payload };
    var entry = this._mutations[type2];
    if (!entry) {
      {
        console.error("[vuex] unknown mutation type: " + type2);
      }
      return;
    }
    this._withCommit(function() {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });
    this._subscribers.slice().forEach(function(sub) {
      return sub(mutation, this$1$1.state);
    });
    if (options && options.silent) {
      console.warn(
        "[vuex] mutation type: " + type2 + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
      );
    }
  };
  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload);
    var type2 = ref.type;
    var payload = ref.payload;
    var action = { type: type2, payload };
    var entry = this._actions[type2];
    if (!entry) {
      {
        console.error("[vuex] unknown action type: " + type2);
      }
      return;
    }
    try {
      this._actionSubscribers.slice().filter(function(sub) {
        return sub.before;
      }).forEach(function(sub) {
        return sub.before(action, this$1$1.state);
      });
    } catch (e) {
      {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e);
      }
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
      return handler(payload);
    })) : entry[0](payload);
    return new Promise(function(resolve, reject) {
      result.then(function(res) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.after;
          }).forEach(function(sub) {
            return sub.after(action, this$1$1.state);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in after action subscribers: ");
            console.error(e);
          }
        }
        resolve(res);
      }, function(error) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.error;
          }).forEach(function(sub) {
            return sub.error(action, this$1$1.state, error);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in error action subscribers: ");
            console.error(e);
          }
        }
        reject(error);
      });
    });
  };
  Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
  };
  Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === "function" ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
  };
  Store.prototype.watch = function watch$1(getter, cb, options) {
    var this$1$1 = this;
    {
      assert(typeof getter === "function", "store.watch only accepts a function.");
    }
    return vue.watch(function() {
      return getter(this$1$1.state, this$1$1.getters);
    }, cb, Object.assign({}, options));
  };
  Store.prototype.replaceState = function replaceState(state2) {
    var this$1$1 = this;
    this._withCommit(function() {
      this$1$1._state.data = state2;
    });
  };
  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0)
      options = {};
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
      assert(path.length > 0, "cannot register the root module by using registerModule.");
    }
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    resetStoreState(this, this.state);
  };
  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1$1 = this;
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    this._modules.unregister(path);
    this._withCommit(function() {
      var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
      delete parentState[path[path.length - 1]];
    });
    resetStore(this);
  };
  Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    return this._modules.isRegistered(path);
  };
  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };
  Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  };
  Object.defineProperties(Store.prototype, prototypeAccessors);
  const getters = {
    token: (state2) => state2.user.token,
    userInfo: (state2) => state2.user.userInfo,
    dictionaryList: (state2) => state2.base.dictionaryList,
    relationData: (state2) => state2.base.relationData,
    badgeNum: (state2) => state2.chat.badgeNum,
    msgInfo: (state2) => state2.chat.msgInfo
  };
  function getDictionaryDataAll() {
    return request({
      url: "/api/system/DictionaryData/All",
      options: {
        load: false
      }
    });
  }
  function getOrganizeSelector() {
    return request({
      url: "/api/permission/Organize/Selector/0",
      options: {
        load: false
      }
    });
  }
  function getDepartmentSelector() {
    return request({
      url: "/api/permission/Organize/Department/Selector/0",
      options: {
        load: false
      }
    });
  }
  function getPositionSelector() {
    return request({
      url: "/api/permission/Position/Selector",
      options: {
        load: false
      }
    });
  }
  function getUserSelector() {
    return request({
      url: "/api/permission/Users/Selector",
      options: {
        load: false
      }
    });
  }
  function getUserAll() {
    return request({
      url: "/api/permission/Users/All",
      options: {
        load: false
      }
    });
  }
  function login(data) {
    return request({
      url: "/api/oauth/Login",
      method: "post",
      data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }
  function logout() {
    return request({
      url: "/api/oauth/Logout"
    });
  }
  function getCurrentUser() {
    return request({
      url: "/api/oauth/CurrentUser",
      options: {
        load: false
      }
    });
  }
  function getConfig(account) {
    return request({
      url: `/api/oauth/getConfig/${account}`,
      method: "get"
    });
  }
  const state$1 = {
    dictionaryList: [],
    organizeTree: [],
    departmentTree: [],
    positionTree: [],
    userTree: [],
    userList: [],
    relationData: {}
  };
  const mutations$1 = {
    SET_DICTIONARY_LIST: (state2, dictionaryList) => {
      state2.dictionaryList = dictionaryList;
    },
    SET_ORGANIZE_TREE: (state2, organizeTree) => {
      state2.organizeTree = organizeTree;
    },
    SET_DEPARTMENT_LIST: (state2, departmentTree) => {
      state2.departmentTree = departmentTree;
    },
    SET_POSITION_TREE: (state2, positionTree) => {
      state2.positionTree = positionTree;
    },
    SET_USER_TREE: (state2, userTree) => {
      state2.userTree = userTree;
    },
    SET_USER_LIST: (state2, userList) => {
      state2.userList = userList;
    },
    UPDATE_RELATION_DATA(state2, val) {
      state2.relationData = val;
    }
  };
  const actions$1 = {
    getDictionaryDataAll({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getDictionaryDataAll().then((res) => {
          commit("SET_DICTIONARY_LIST", res.data.list);
          resolve(res.data.list);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    getDictionaryData({
      state: state2,
      dispatch
    }, info) {
      return new Promise(async (resolve) => {
        let list = [], data = [], json = [];
        if (!state2.dictionaryList.length) {
          list = await dispatch("getDictionaryDataAll");
        } else {
          list = state2.dictionaryList;
        }
        if (info.sort) {
          data = list.filter((o) => o.enCode === info.sort)[0];
          if (!info.id) {
            json = data.dictionaryList;
          } else {
            let rowData = [];
            if (!data.isTree) {
              rowData = data.dictionaryList.fliter((o) => o.id == info.id);
            } else {
              const findData = (list2) => {
                for (let i = 0; i < list2.length; i++) {
                  const e = list2[i];
                  if (e.id == info.id) {
                    rowData[0] = e;
                    break;
                  }
                  if (e.children && e.children.length) {
                    findData(e.children);
                  }
                }
              };
              findData(data.dictionaryList);
            }
            if (rowData.length) {
              json = rowData[0];
            } else {
              json = {
                id: "",
                fullName: ""
              };
            }
          }
        }
        resolve(json);
      });
    },
    getOrganizeTree({
      state: state2,
      commit
    }) {
      return new Promise((resolve, reject) => {
        if (!state2.organizeTree.length) {
          getOrganizeSelector().then((res) => {
            commit("SET_ORGANIZE_TREE", res.data.list);
            resolve(res.data.list);
          }).catch((error) => {
            reject(error);
          });
        } else {
          resolve(state2.organizeTree);
        }
      });
    },
    getDepartmentTree({
      state: state2,
      commit
    }) {
      return new Promise((resolve, reject) => {
        if (!state2.departmentTree.length) {
          getDepartmentSelector().then((res) => {
            commit("SET_DEPARTMENT_LIST", res.data.list);
            resolve(res.data.list);
          }).catch((error) => {
            reject(error);
          });
        } else {
          resolve(state2.departmentTree);
        }
      });
    },
    getPositionTree({
      state: state2,
      commit
    }) {
      return new Promise((resolve, reject) => {
        if (!state2.positionTree.length) {
          getPositionSelector().then((res) => {
            commit("SET_POSITION_TREE", res.data.list);
            resolve(res.data.list);
          }).catch((error) => {
            reject(error);
          });
        } else {
          resolve(state2.positionTree);
        }
      });
    },
    getUserTree({
      state: state2,
      commit
    }) {
      return new Promise((resolve, reject) => {
        if (!state2.userTree.length) {
          getUserSelector().then((res) => {
            commit("SET_USER_TREE", res.data.list);
            resolve(res.data.list);
          }).catch((error) => {
            reject(error);
          });
        } else {
          resolve(state2.userTree);
        }
      });
    },
    getUserList({
      state: state2,
      commit
    }) {
      return new Promise((resolve, reject) => {
        if (!state2.userList.length) {
          getUserAll().then((res) => {
            commit("SET_USER_LIST", res.data.list);
            resolve(res.data.list);
          }).catch((error) => {
            reject(error);
          });
        } else {
          resolve(state2.userList);
        }
      });
    },
    getUserInfo({
      state: state2,
      dispatch
    }, id) {
      return new Promise(async (resolve) => {
        let list = [];
        if (!state2.userList.length) {
          list = await dispatch("getUserList");
        } else {
          list = state2.userList;
        }
        let item = list.filter((o) => o.id === id)[0];
        resolve(item || {});
      });
    }
  };
  const base = {
    namespaced: true,
    state: state$1,
    mutations: mutations$1,
    actions: actions$1
  };
  const state = {
    token: "",
    userInfo: {}
  };
  const mutations = {
    SET_TOKEN: (state2, token) => {
      state2.token = token;
    },
    SET_USERINFO: (state2, userInfo) => {
      state2.userInfo = userInfo;
    }
  };
  const actions = {
    getCurrentUser({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getCurrentUser().then((res) => {
          const userInfo = res.data.userInfo || {};
          const permissionList = res.data.permissionList || [];
          const sysConfigInfo = res.data.sysConfigInfo || {};
          const sysVersion = sysConfigInfo.sysVersion || "";
          const copyright = sysConfigInfo.copyright || "";
          commit("SET_USERINFO", userInfo);
          uni.setStorageSync("sysVersion", sysVersion);
          uni.setStorageSync("permissionList", permissionList);
          uni.setStorageSync("sysConfigInfo", sysConfigInfo);
          uni.setStorageSync("copyright", copyright);
          uni.setStorageSync("userInfo", userInfo);
          resolve(userInfo);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    logout({
      commit,
      dispatch
    }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit("SET_TOKEN", "");
          commit("SET_USERINFO", {});
          dispatch("resetToken");
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },
    // remove token
    resetToken({
      commit
    }) {
      return new Promise((resolve) => {
        uni.removeStorageSync("token");
        uni.removeStorageSync("userInfo");
        uni.removeStorageSync("permissionList");
        resolve();
      });
    }
  };
  const user = {
    namespaced: true,
    state,
    mutations,
    actions
  };
  const store = createStore({
    modules: {
      base,
      user
    },
    getters
  });
  const baseURL = "http://106.14.80.181:30019";
  const define = {
    baseURL,
    webSocketUrl: "ws://106.14.80.181:30019/websocket",
    comUploadUrl: baseURL + "/api/file/Uploader/",
    timeout: 1e6,
    report: baseURL + "/Report"
  };
  const host = define.baseURL;
  const defaultOpt = {
    load: true
  };
  function request(config2) {
    config2.options = Object.assign(defaultOpt, config2.options);
    const token = uni.getStorageSync("token") || "";
    let header = {
      "Content-Type": "application/json;charset=UTF-8",
      "cityk-origin": "app",
      ...config2.header
    };
    if (token)
      header["Authorization"] = token;
    let url2 = config2.url.indexOf("http") > -1 ? config2.url : host + config2.url;
    if (config2.url === "/api/oauth/Login") {
      url2 += "?client_id=admin&client_secret=123456&scope=all&grant_type=password";
    }
    if (config2.options.load) {
      uni.showLoading({
        title: config2.options.loadText || "正在加载"
      });
    }
    return new Promise((resolve, reject) => {
      uni.request({
        url: url2,
        data: config2.data || null,
        method: config2.method || "GET",
        header,
        timeout: define.timeout,
        success: (res) => {
          if (config2.options.load) {
            uni.hideLoading();
          }
          if (res.statusCode === 200) {
            if (res.data.code == 200) {
              resolve(res.data);
            } else {
              ajaxError(res.data);
              reject(res.data.msg);
            }
          } else {
            ajaxError(res.data);
            reject(res.errMsg);
          }
        },
        fail: (err) => {
          if (config2.options.load) {
            uni.hideLoading();
          }
          reject(err);
        }
      });
    });
  }
  function ajaxError(data) {
    uni.showToast({
      title: data.msg || "请求出错，请重试",
      icon: "none",
      complete() {
        if (data.code === 600 || data.code === 601 || data.code === 602) {
          setTimeout(() => {
            store.dispatch("user/resetToken").then(() => {
              uni.reLaunch({
                url: "/pages/login/index"
              });
            });
          }, 1500);
        }
      }
    });
  }
  function getProjectBase(data) {
    return request({
      url: "/api/project/ProjBase/getList",
      method: "post",
      data
    });
  }
  function getProjectDetail(projectId2) {
    return request({
      url: `/api/project/ProjBase/detail/${projectId2}`,
      method: "get"
    });
  }
  function getHoleBaseList(data) {
    return request({
      url: `/api/project/HoleBase/getList`,
      method: "post",
      data
    });
  }
  function addHoleBaseDetail(data) {
    return request({
      url: `/api/project/HoleBase`,
      method: "post",
      data
    });
  }
  function updateHoleBase(id, data) {
    return request({
      url: `/api/project/HoleBase/${id}`,
      method: "put",
      data
    });
  }
  function getHoleBaseDetail(id) {
    return request({
      url: `/api/project/HoleBase/detail/${id}`,
      method: "get"
    });
  }
  function getQCSampleList(data) {
    return request({
      url: `/api/project/QCSample/getList`,
      method: "post",
      data
    });
  }
  function getHoleRecordList(data) {
    return request({
      url: `/api/project/HoleRecord/getList`,
      method: "post",
      data
    });
  }
  function getHoleRecordDetail(id) {
    return request({
      url: `/api/project/HoleRecord/${id}`,
      method: "get"
    });
  }
  function addHoleRecord(data) {
    return request({
      url: `/api/project/HoleRecord`,
      method: "post",
      data
    });
  }
  function updateHoleRecord(id, data) {
    return request({
      url: `/api/project/HoleRecord/${id}`,
      method: "put",
      data
    });
  }
  function getSoilRecordList(data) {
    return request({
      url: `/api/project/SoilSample/getList`,
      method: "post",
      data
    });
  }
  function getWellBaseList(data) {
    return request({
      url: `/api/project/WellBase/getList`,
      method: "post",
      data
    });
  }
  function getWellWashRecordList(data) {
    return request({
      url: `/api/project/WellWashRecord/getList`,
      method: "post",
      data
    });
  }
  function getWellWashRecordDetail(id) {
    return request({
      url: `/api/project/WellWashRecord/${id}`,
      method: "get"
    });
  }
  function updateWellWashRecord(id, data) {
    return request({
      url: `/api/project/WellWashRecord/${id}`,
      method: "put",
      data
    });
  }
  function getWaterSampleList(data) {
    return request({
      url: `/api/project/WaterSample/getList`,
      method: "post",
      data
    });
  }
  function getMenuId$1(moduleName) {
    let menuList = [];
    if (menuList.length === 0) {
      menuList = uni.getStorageSync("permissionList");
    }
    for (let val of menuList) {
      if (val.moduleName === moduleName) {
        return val.modelId;
      }
    }
    return;
  }
  const _sfc_main$K = {
    __name: "index",
    setup(__props) {
      const dropdownZone = vue.reactive([
        {
          label: "默认排序",
          value: 1
        },
        {
          label: "距离优先",
          value: 2
        },
        {
          label: "价格优先",
          value: 3
        }
      ]);
      const dropdownStatus = vue.reactive([
        {
          label: "默认排序",
          value: 1
        },
        {
          label: "距离优先",
          value: 2
        },
        {
          label: "价格优先",
          value: 3
        }
      ]);
      const dropdownType = vue.reactive([
        {
          label: "默认排序",
          value: 1
        },
        {
          label: "距离优先",
          value: 2
        },
        {
          label: "价格优先",
          value: 3
        }
      ]);
      const tableData = vue.ref([]);
      async function getMenuList() {
        const menuId = getMenuId$1("项目列表");
        let queryData = {
          currentPage: 1,
          // pageSize: 0,
          sort: "asc",
          sidx: "encode",
          menuId
        };
        getProjectBase(queryData).then((res) => {
          tableData.value = res.data;
          formatAppLog("log", "at pages/sampleDetection/index.vue:130", tableData.value);
        });
      }
      function goToDeatil(id) {
        uni.setStorageSync("projectId", id);
        uni.navigateTo({
          url: `/pages/sampleDetection/detail/index?id=${id}`
        });
      }
      onLoad(() => {
        getMenuList();
      });
      onPullDownRefresh(async () => {
        await getMenuList();
        uni.stopPullDownRefresh();
      });
      return (_ctx, _cache) => {
        const _component_u_search = resolveEasycom(vue.resolveDynamicComponent("u-search"), __easycom_0$8);
        const _component_u_dropdown_item = resolveEasycom(vue.resolveDynamicComponent("u-dropdown-item"), __easycom_1$3);
        const _component_u_dropdown = resolveEasycom(vue.resolveDynamicComponent("u-dropdown"), __easycom_2$3);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "status_bar" }, [
              vue.createElementVNode("view", { class: "top_view" })
            ]),
            vue.createElementVNode("view", { class: "sp-container" }, [
              vue.createElementVNode("view", { class: "search-box" }, [
                vue.createVNode(_component_u_search, {
                  placeholder: "搜索.",
                  modelValue: _ctx.keyword,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.keyword = $event)
                }, null, 8, ["modelValue"])
              ]),
              vue.createElementVNode("view", { class: "sort-box" }, [
                vue.createVNode(_component_u_dropdown, {
                  ref: "dropdown1",
                  onOpen: _ctx.open,
                  onClose: _ctx.close
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_u_dropdown_item, {
                      modelValue: _ctx.selectedItem,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.selectedItem = $event),
                      title: "行政区域",
                      options: dropdownZone
                    }, null, 8, ["modelValue", "options"]),
                    vue.createVNode(_component_u_dropdown_item, {
                      modelValue: _ctx.selectedItem,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.selectedItem = $event),
                      title: "项目状态",
                      options: dropdownStatus
                    }, null, 8, ["modelValue", "options"]),
                    vue.createVNode(_component_u_dropdown_item, {
                      modelValue: _ctx.selectedItem,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.selectedItem = $event),
                      title: "项目类型",
                      options: dropdownType
                    }, null, 8, ["modelValue", "options"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onOpen", "onClose"])
              ]),
              vue.createElementVNode("view", { class: "content-box" }, [
                vue.createCommentVNode(' <uni-navigator url="{{url}}"></uni-navigator> '),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(tableData.value, (item) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "item-box",
                      key: item.id
                    }, [
                      vue.createElementVNode("view", { class: "left-item" }, [
                        vue.createCommentVNode(" 使用动态的 URL "),
                        vue.createElementVNode("view", {
                          class: "title",
                          onClick: ($event) => goToDeatil(item.id)
                        }, vue.toDisplayString(item.name), 9, ["onClick"]),
                        vue.createElementVNode("view", { class: "center-zone" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "area" },
                            vue.toDisplayString(item.organizetext),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "project" },
                            vue.toDisplayString(item.typetext),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode(
                          "text",
                          { class: "time" },
                          vue.toDisplayString(item.registertime),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "right-box" }, [
                        vue.createElementVNode("img", {
                          style: { "width": "30px" },
                          src: _imports_0,
                          alt: ""
                        }),
                        vue.createElementVNode("img", {
                          style: { "width": "30px" },
                          src: _imports_0,
                          alt: ""
                        }),
                        vue.createElementVNode("img", {
                          style: { "width": "30px" },
                          src: _imports_0,
                          alt: ""
                        }),
                        vue.createElementVNode("img", {
                          style: { "width": "30px" },
                          src: _imports_0,
                          alt: ""
                        })
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                vue.createCommentVNode(' 	<view class="item-box">\n				<view class="left-item">\n					<text class="title">测试模块(tr1231244)</text>\n					<view class="center-zone">\n						<text class="area">上海</text>\n						<text class="project">土壤修复项目</text>\n					</view>\n					<text class="time">2023-01-21</text>\n				</view>\n				<view class="right-box">\n					<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />\n					<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />\n					<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />\n					<img style="width: 30px;" src="@/static/tabbar-icons/feeds.png" alt="" />\n				</view>\n			</view> ')
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesSampleDetectionIndex = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-db08574c"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/index.vue"]]);
  function broadcast(componentName, eventName, params) {
  }
  const Emitter = {
    methods: {
      /**
       * 派发 (向上查找) (一个)
       * @param componentName // 需要找的组件的名称
       * @param eventName // 事件名称
       * @param params // 需要传递的参数
       */
      dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
          if (parent) {
            name = parent.$options.name;
          }
        }
        if (parent) {
          parent[eventName](params);
        }
      },
      /**
       * 广播 (向下查找) (广播多个)
       * @param componentName // 需要找的组件的名称
       * @param eventName // 事件名称
       * @param params // 需要传递的参数
       */
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };
  const _sfc_main$J = {
    name: "u-input",
    emits: ["update:modelValue", "input", "change", "confirm", "clear", "blur", "focus", "click", "touchstart"],
    mixins: [Emitter],
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框的类型，textarea，text，number
      type: {
        type: String,
        default: "text"
      },
      inputAlign: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "请输入内容"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      placeholderStyle: {
        type: String,
        default: "color: #c0c4cc;"
      },
      confirmType: {
        type: String,
        default: "done"
      },
      // 输入框的自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
      fixed: {
        type: Boolean,
        default: false
      },
      // 是否自动获得焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 密码类型时，是否显示右侧的密码图标
      passwordIcon: {
        type: Boolean,
        default: true
      },
      // input|textarea是否显示边框
      border: {
        type: Boolean,
        default: false
      },
      // 输入框的边框颜色
      borderColor: {
        type: String,
        default: "#dcdfe6"
      },
      autoHeight: {
        type: Boolean,
        default: true
      },
      // type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态
      // open-打开，close-关闭
      selectOpen: {
        type: Boolean,
        default: false
      },
      // 高度，单位rpx
      height: {
        type: [Number, String],
        default: ""
      },
      // 是否可清空
      clearable: {
        type: [Boolean, String]
      },
      // 指定光标与键盘的距离，单位 px
      cursorSpacing: {
        type: [Number, String],
        default: 0
      },
      // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
      selectionStart: {
        type: [Number, String],
        default: -1
      },
      // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [Number, String],
        default: -1
      },
      // 是否自动去除两端的空格
      trim: {
        type: Boolean,
        default: true
      },
      // 是否显示键盘上方带有”完成“按钮那一栏
      showConfirmbar: {
        type: Boolean,
        default: true
      },
      // 弹出键盘时是否自动调节高度，uni-app默认值是true
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // input的背景色
      backgroundColor: {
        type: String
      },
      // input的padding
      padding: {
        type: String
      }
    },
    data() {
      return {
        defaultValue: "",
        inputHeight: 70,
        // input的高度
        textareaHeight: 100,
        // textarea的高度
        validateState: false,
        // 当前input的验证状态，用于错误时，边框是否改为红色
        focused: false,
        // 当前是否处于获得焦点的状态
        showPassword: false,
        // 是否预览密码
        lastValue: "",
        // 用于头条小程序，判断@input中，前后的值是否发生了变化，因为头条中文下，按下键没有输入内容，也会触发@input时间
        uForm: {
          inputAlign: "",
          clearable: ""
        }
      };
    },
    watch: {
      valueCom(nVal, oVal) {
        this.defaultValue = nVal;
        if (nVal != oVal && this.type == "select")
          this.handleInput({
            detail: {
              value: nVal
            }
          });
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      inputAlignCom() {
        return this.inputAlign || this.uForm.inputAlign || "left";
      },
      clearableCom() {
        if (typeof this.clearable == "boolean")
          return this.clearable;
        if (typeof this.uForm.clearable == "boolean")
          return this.uForm.clearable;
        return true;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      getStyle() {
        let style = {};
        style.minHeight = this.height ? this.height + "rpx" : this.type == "textarea" ? this.textareaHeight + "rpx" : this.inputHeight + "rpx";
        style = Object.assign(style, this.customStyle);
        return style;
      },
      //
      getCursorSpacing() {
        return Number(this.cursorSpacing);
      },
      // 光标起始位置
      uSelectionStart() {
        return String(this.selectionStart);
      },
      // 光标结束位置
      uSelectionEnd() {
        return String(this.selectionEnd);
      }
    },
    created() {
      this.defaultValue = this.valueCom;
    },
    mounted() {
      let parent = this.$u.$parent.call(this, "u-form");
      if (parent) {
        Object.keys(this.uForm).map((key) => {
          this.uForm[key] = parent[key];
        });
      }
    },
    methods: {
      /**
       * change 事件
       * @param event
       */
      handleInput(event) {
        let value = event.detail.value;
        if (this.trim)
          value = this.$u.trim(value);
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
        this.defaultValue = value;
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldChange", value);
        }, 40);
      },
      /**
       * blur 事件
       * @param event
       */
      handleBlur(event) {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        this.$emit("blur", event.detail.value);
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldBlur", event.detail.value);
        }, 40);
      },
      onFormItemError(status) {
        this.validateState = status;
      },
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      onConfirm(e) {
        this.$emit("confirm", e.detail.value);
      },
      onClear(event) {
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      inputClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-input", {
          "u-input--border": $props.border,
          "u-input--error": $data.validateState
        }]),
        style: vue.normalizeStyle({
          padding: $props.padding ? $props.padding : `0 ${$props.border ? 20 : 0}rpx`,
          borderColor: $props.borderColor,
          textAlign: $options.inputAlignCom,
          backgroundColor: $props.backgroundColor
        }),
        onClick: _cache[10] || (_cache[10] = vue.withModifiers((...args) => $options.inputClick && $options.inputClick(...args), ["stop"]))
      },
      [
        $props.type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
          key: 0,
          class: "u-input__input u-input__textarea",
          style: vue.normalizeStyle([$options.getStyle]),
          value: $data.defaultValue,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled,
          maxlength: $options.inputMaxlength,
          fixed: $props.fixed,
          focus: $props.focus,
          autoHeight: $props.autoHeight,
          "selection-end": $options.uSelectionEnd,
          "selection-start": $options.uSelectionStart,
          "cursor-spacing": $options.getCursorSpacing,
          "show-confirm-bar": $props.showConfirmbar,
          "adjust-position": $props.adjustPosition,
          onInput: _cache[0] || (_cache[0] = (...args) => $options.handleInput && $options.handleInput(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
          onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 44, ["value", "placeholder", "placeholderStyle", "disabled", "maxlength", "fixed", "focus", "autoHeight", "selection-end", "selection-start", "cursor-spacing", "show-confirm-bar", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
          key: 1,
          class: "u-input__input",
          type: $props.type == "password" ? "text" : $props.type,
          style: vue.normalizeStyle([$options.getStyle]),
          value: $data.defaultValue,
          password: $props.type == "password" && !$data.showPassword,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled || $props.type === "select",
          maxlength: $options.inputMaxlength,
          focus: $props.focus,
          confirmType: $props.confirmType,
          "cursor-spacing": $options.getCursorSpacing,
          "selection-end": $options.uSelectionEnd,
          "selection-start": $options.uSelectionStart,
          "show-confirm-bar": $props.showConfirmbar,
          "adjust-position": $props.adjustPosition,
          onFocus: _cache[4] || (_cache[4] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[5] || (_cache[5] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
          onInput: _cache[6] || (_cache[6] = (...args) => $options.handleInput && $options.handleInput(...args)),
          onConfirm: _cache[7] || (_cache[7] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 44, ["type", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "selection-end", "selection-start", "show-confirm-bar", "adjust-position"])),
        vue.createElementVNode("view", { class: "u-input__right-icon u-flex" }, [
          $options.clearableCom && $options.valueCom != "" && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "u-input__right-icon__clear u-input__right-icon__item",
            onClick: _cache[8] || (_cache[8] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_u_icon, {
              size: "32",
              name: "close-circle-fill",
              color: "#c0c4cc"
            })
          ])) : vue.createCommentVNode("v-if", true),
          $props.passwordIcon && $props.type == "password" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "u-input__right-icon__clear u-input__right-icon__item"
          }, [
            vue.createVNode(_component_u_icon, {
              size: "32",
              name: !$data.showPassword ? "eye" : "eye-fill",
              color: "#c0c4cc",
              onClick: _cache[9] || (_cache[9] = ($event) => $data.showPassword = !$data.showPassword)
            }, null, 8, ["name"])
          ])) : vue.createCommentVNode("v-if", true),
          $props.type == "select" ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 2,
              class: vue.normalizeClass(["u-input__right-icon--select u-input__right-icon__item", {
                "u-input__right-icon--select--reverse": $props.selectOpen
              }])
            },
            [
              vue.createVNode(_component_u_icon, {
                name: "arrow-down-fill",
                size: "26",
                color: "#c0c4cc"
              })
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$s], ["__scopeId", "data-v-dc846cb1"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-input/u-input.vue"]]);
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  var formatRegExp = /%[sdj%]/g;
  var warning = function warning2() {
  };
  if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
    warning = function warning2(type2, errors) {
      if (typeof console !== "undefined" && console.warn) {
        if (errors.every(function(e) {
          return typeof e === "string";
        })) {
          formatAppLog("warn", "at uni_modules/vk-uview-ui/libs/util/async-validator.js:30", type2, errors);
        }
      }
    };
  }
  function convertFieldsError(errors) {
    if (!errors || !errors.length)
      return null;
    var fields = {};
    errors.forEach(function(error) {
      var field = error.field;
      fields[field] = fields[field] || [];
      fields[field].push(error);
    });
    return fields;
  }
  function format() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var i = 1;
    var f = args[0];
    var len = args.length;
    if (typeof f === "function") {
      return f.apply(null, args.slice(1));
    }
    if (typeof f === "string") {
      var str = String(f).replace(formatRegExp, function(x) {
        if (x === "%%") {
          return "%";
        }
        if (i >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      for (var arg = args[i]; i < len; arg = args[++i]) {
        str += " " + arg;
      }
      return str;
    }
    return f;
  }
  function isNativeStringType(type2) {
    return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "pattern";
  }
  function isEmptyValue(value, type2) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (type2 === "array" && Array.isArray(value) && !value.length) {
      return true;
    }
    if (isNativeStringType(type2) && typeof value === "string" && !value) {
      return true;
    }
    return false;
  }
  function asyncParallelArray(arr, func2, callback) {
    var results = [];
    var total = 0;
    var arrLength = arr.length;
    function count(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === arrLength) {
        callback(results);
      }
    }
    arr.forEach(function(a) {
      func2(a, count);
    });
  }
  function asyncSerialArray(arr, func2, callback) {
    var index = 0;
    var arrLength = arr.length;
    function next(errors) {
      if (errors && errors.length) {
        callback(errors);
        return;
      }
      var original = index;
      index = index + 1;
      if (original < arrLength) {
        func2(arr[original], next);
      } else {
        callback([]);
      }
    }
    next([]);
  }
  function flattenObjArr(objArr) {
    var ret = [];
    Object.keys(objArr).forEach(function(k) {
      ret.push.apply(ret, objArr[k]);
    });
    return ret;
  }
  function asyncMap(objArr, option, func2, callback) {
    if (option.first) {
      var _pending = new Promise(function(resolve, reject) {
        var next = function next2(errors) {
          callback(errors);
          return errors.length ? reject({
            errors,
            fields: convertFieldsError(errors)
          }) : resolve();
        };
        var flattenArr = flattenObjArr(objArr);
        asyncSerialArray(flattenArr, func2, next);
      });
      _pending["catch"](function(e) {
        return e;
      });
      return _pending;
    }
    var firstFields = option.firstFields || [];
    if (firstFields === true) {
      firstFields = Object.keys(objArr);
    }
    var objArrKeys = Object.keys(objArr);
    var objArrLength = objArrKeys.length;
    var total = 0;
    var results = [];
    var pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
          return results.length ? reject({
            errors: results,
            fields: convertFieldsError(results)
          }) : resolve();
        }
      };
      if (!objArrKeys.length) {
        callback(results);
        resolve();
      }
      objArrKeys.forEach(function(key) {
        var arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func2, next);
        } else {
          asyncParallelArray(arr, func2, next);
        }
      });
    });
    pending["catch"](function(e) {
      return e;
    });
    return pending;
  }
  function complementError(rule) {
    return function(oe) {
      if (oe && oe.message) {
        oe.field = oe.field || rule.fullField;
        return oe;
      }
      return {
        message: typeof oe === "function" ? oe() : oe,
        field: oe.field || rule.fullField
      };
    };
  }
  function deepMerge$1(target, source) {
    if (source) {
      for (var s in source) {
        if (source.hasOwnProperty(s)) {
          var value = source[s];
          if (typeof value === "object" && typeof target[s] === "object") {
            target[s] = _extends({}, target[s], {}, value);
          } else {
            target[s] = value;
          }
        }
      }
    }
    return target;
  }
  function required(rule, value, source, errors, options, type2) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type2 || rule.type))) {
      errors.push(format(options.messages.required, rule.fullField));
    }
  }
  function whitespace(rule, value, source, errors, options) {
    if (/^\s+$/.test(value) || value === "") {
      errors.push(format(options.messages.whitespace, rule.fullField));
    }
  }
  var pattern = {
    // http://emailregex.com/
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
  };
  var types = {
    integer: function integer2(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    "float": function float(value) {
      return types.number(value) && !types.integer(value);
    },
    array: function array2(value) {
      return Array.isArray(value);
    },
    regexp: function regexp2(value) {
      if (value instanceof RegExp) {
        return true;
      }
      try {
        return !!new RegExp(value);
      } catch (e) {
        return false;
      }
    },
    date: function date2(value) {
      return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function";
    },
    number: function number2(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof +value === "number";
    },
    object: function object2(value) {
      return typeof value === "object" && !types.array(value);
    },
    method: function method2(value) {
      return typeof value === "function";
    },
    email: function email2(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url: function url2(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    hex: function hex(value) {
      return typeof value === "string" && !!value.match(pattern.hex);
    }
  };
  function type$1(rule, value, source, errors, options) {
    if (rule.required && value === void 0) {
      required(rule, value, source, errors, options);
      return;
    }
    var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
    var ruleType = rule.type;
    if (custom.indexOf(ruleType) > -1) {
      if (!types[ruleType](value)) {
        errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
      }
    } else if (ruleType && typeof value !== rule.type) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  }
  function range$1(rule, value, source, errors, options) {
    var len = typeof rule.len === "number";
    var min = typeof rule.min === "number";
    var max = typeof rule.max === "number";
    var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var val = value;
    var key = null;
    var num = typeof value === "number";
    var str = typeof value === "string";
    var arr = Array.isArray(value);
    if (num) {
      key = "number";
    } else if (str) {
      key = "string";
    } else if (arr) {
      key = "array";
    }
    if (!key) {
      return false;
    }
    if (arr) {
      val = value.length;
    }
    if (str) {
      val = value.replace(spRegexp, "_").length;
    }
    if (len) {
      if (val !== rule.len) {
        errors.push(format(options.messages[key].len, rule.fullField, rule.len));
      }
    } else if (min && !max && val < rule.min) {
      errors.push(format(options.messages[key].min, rule.fullField, rule.min));
    } else if (max && !min && val > rule.max) {
      errors.push(format(options.messages[key].max, rule.fullField, rule.max));
    } else if (min && max && (val < rule.min || val > rule.max)) {
      errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
    }
  }
  var ENUM = "enum";
  function enumerable(rule, value, source, errors, options) {
    rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
    if (rule[ENUM].indexOf(value) === -1) {
      errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
    }
  }
  function pattern$1(rule, value, source, errors, options) {
    if (rule.pattern) {
      if (rule.pattern instanceof RegExp) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      } else if (typeof rule.pattern === "string") {
        var _pattern = new RegExp(rule.pattern);
        if (!_pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      }
    }
  }
  var rules = {
    required,
    whitespace,
    type: type$1,
    range: range$1,
    "enum": enumerable,
    pattern: pattern$1
  };
  function string$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "string");
      if (!isEmptyValue(value, "string")) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
        rules.pattern(rule, value, source, errors, options);
        if (rule.whitespace === true) {
          rules.whitespace(rule, value, source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function method(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function number$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (value === "") {
        value = void 0;
      }
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function _boolean(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function regexp(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function integer(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function floatFn(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function array$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "array") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "array");
      if (!isEmptyValue(value, "array")) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function object$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  var ENUM$1 = "enum";
  function enumerable$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules[ENUM$1](rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function pattern$2(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value, "string")) {
        rules.pattern(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function date$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value)) {
        var dateObject;
        if (typeof value === "number") {
          dateObject = new Date(value);
        } else {
          dateObject = value;
        }
        rules.type(rule, dateObject, source, errors, options);
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function required$1(rule, value, callback, source, options) {
    var errors = [];
    var type2 = Array.isArray(value) ? "array" : typeof value;
    rules.required(rule, value, source, errors, options, type2);
    callback(errors);
  }
  function type$1$1(rule, value, callback, source, options) {
    var ruleType = rule.type;
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, ruleType) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, ruleType);
      if (!isEmptyValue(value, ruleType)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function any(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
    }
    callback(errors);
  }
  var validators = {
    string: string$1,
    method,
    number: number$1,
    "boolean": _boolean,
    regexp,
    integer,
    "float": floatFn,
    array: array$1,
    object: object$1,
    "enum": enumerable$1,
    pattern: pattern$2,
    date: date$1,
    url: type$1$1,
    hex: type$1$1,
    email: type$1$1,
    required: required$1,
    any
  };
  function newMessages() {
    return {
      "default": "Validation error on field %s",
      required: "%s is required",
      "enum": "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid"
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        "boolean": "%s is not a %s",
        integer: "%s is not an %s",
        "float": "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s"
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters"
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s"
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length"
      },
      pattern: {
        mismatch: "%s value %s does not match pattern %s"
      },
      clone: function clone() {
        var cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }
  var messages = newMessages();
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  Schema.prototype = {
    messages: function messages2(_messages) {
      if (_messages) {
        this._messages = deepMerge$1(newMessages(), _messages);
      }
      return this._messages;
    },
    define: function define2(rules2) {
      if (!rules2) {
        throw new Error("Cannot configure a schema with no rules");
      }
      if (typeof rules2 !== "object" || Array.isArray(rules2)) {
        throw new Error("Rules must be an object");
      }
      this.rules = {};
      var z;
      var item;
      for (z in rules2) {
        if (rules2.hasOwnProperty(z)) {
          item = rules2[z];
          this.rules[z] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_, o, oc) {
      var _this = this;
      if (o === void 0) {
        o = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      var source = source_;
      var options = o;
      var callback = oc;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (!this.rules || Object.keys(this.rules).length === 0) {
        if (callback) {
          callback();
        }
        return Promise.resolve();
      }
      function complete(results) {
        var i;
        var errors = [];
        var fields = {};
        function add(e) {
          if (Array.isArray(e)) {
            var _errors;
            errors = (_errors = errors).concat.apply(_errors, e);
          } else {
            errors.push(e);
          }
        }
        for (i = 0; i < results.length; i++) {
          add(results[i]);
        }
        if (!errors.length) {
          errors = null;
          fields = null;
        } else {
          fields = convertFieldsError(errors);
        }
        callback(errors, fields);
      }
      if (options.messages) {
        var messages$1 = this.messages();
        if (messages$1 === messages) {
          messages$1 = newMessages();
        }
        deepMerge$1(messages$1, options.messages);
        options.messages = messages$1;
      } else {
        options.messages = this.messages();
      }
      var arr;
      var value;
      var series = {};
      var keys = options.keys || Object.keys(this.rules);
      keys.forEach(function(z) {
        arr = _this.rules[z];
        value = source[z];
        arr.forEach(function(r) {
          var rule = r;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = _extends({}, source);
            }
            value = source[z] = rule.transform(value);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = _extends({}, rule);
          }
          rule.validator = _this.getValidationMethod(rule);
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this.getType(rule);
          if (!rule.validator) {
            return;
          }
          series[z] = series[z] || [];
          series[z].push({
            rule,
            value,
            source,
            field: z
          });
        });
      });
      var errorFields = {};
      return asyncMap(series, options, function(data, doIt) {
        var rule = data.rule;
        var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function addFullfield(key, schema) {
          return _extends({}, schema, {
            fullField: rule.fullField + "." + key
          });
        }
        function cb(e) {
          if (e === void 0) {
            e = [];
          }
          var errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (!options.suppressWarning && errors.length) {
            Schema.warning("async-validator:", errors);
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }
          errors = errors.map(complementError(rule));
          if (options.first && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else if (options.error) {
                errors = [options.error(rule, format(options.messages.required, rule.field))];
              } else {
                errors = [];
              }
              return doIt(errors);
            }
            var fieldsSchema = {};
            if (rule.defaultField) {
              for (var k in data.value) {
                if (data.value.hasOwnProperty(k)) {
                  fieldsSchema[k] = rule.defaultField;
                }
              }
            }
            fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);
            for (var f in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f)) {
                var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
                fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
              }
            }
            var schema = new Schema(fieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, function(errs) {
              var finalErrors = [];
              if (errors && errors.length) {
                finalErrors.push.apply(finalErrors, errors);
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs);
              }
              doIt(finalErrors.length ? finalErrors : null);
            });
          }
        }
        var res;
        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb, data.source, options);
        } else if (rule.validator) {
          res = rule.validator(rule, data.value, cb, data.source, options);
          if (res === true) {
            cb();
          } else if (res === false) {
            cb(rule.message || rule.field + " fails");
          } else if (res instanceof Array) {
            cb(res);
          } else if (res instanceof Error) {
            cb(res.message);
          }
        }
        if (res && res.then) {
          res.then(function() {
            return cb();
          }, function(e) {
            return cb(e);
          });
        }
      }, function(results) {
        complete(results);
      });
    },
    getType: function getType(rule) {
      if (rule.type === void 0 && rule.pattern instanceof RegExp) {
        rule.type = "pattern";
      }
      if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format("Unknown rule type %s", rule.type));
      }
      return rule.type || "string";
    },
    getValidationMethod: function getValidationMethod(rule) {
      if (typeof rule.validator === "function") {
        return rule.validator;
      }
      var keys = Object.keys(rule);
      var messageIndex = keys.indexOf("message");
      if (messageIndex !== -1) {
        keys.splice(messageIndex, 1);
      }
      if (keys.length === 1 && keys[0] === "required") {
        return validators.required;
      }
      return validators[this.getType(rule)] || false;
    }
  };
  Schema.register = function register(type2, validator) {
    if (typeof validator !== "function") {
      throw new Error("Cannot register a validator by type, validator is not a function");
    }
    validators[type2] = validator;
  };
  Schema.warning = warning;
  Schema.messages = messages;
  Schema.warning = function() {
  };
  const _sfc_main$I = {
    name: "u-form-item",
    mixins: [Emitter],
    inject: {
      uForm: {
        default() {
          return null;
        }
      }
    },
    props: {
      // input的label提示语
      label: {
        type: String,
        default: ""
      },
      // 绑定的值
      prop: {
        type: String,
        default: ""
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: [String, Boolean],
        default: ""
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: ""
      },
      // label的宽度，单位rpx
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // lable的样式，对象形式
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // lable字体的对齐方式
      labelAlign: {
        type: String,
        default: ""
      },
      // 右侧图标
      rightIcon: {
        type: String,
        default: ""
      },
      // 左侧图标
      leftIcon: {
        type: String,
        default: ""
      },
      // 左侧图标的样式
      leftIconStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 左侧图标的样式
      rightIconStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
      required: {
        type: Boolean,
        default: false
      },
      inputAlign: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        initialValue: "",
        // 存储的默认值
        // isRequired: false, // 是否必填，由于人性化考虑，必填"*"号通过props的required配置，不再通过rules的规则自动生成
        validateState: "",
        // 是否校验成功
        validateMessage: "",
        // 校验失败的提示语
        // 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，
        errorType: ["message"],
        fieldValue: "",
        // 获取当前子组件input的输入的值
        // 父组件的参数，在computed计算中，无法得知this.parent发生变化，故将父组件的参数值，放到data中
        parentData: {
          borderBottom: true,
          labelWidth: 90,
          labelPosition: "left",
          labelStyle: {},
          labelAlign: "left",
          inputAlign: "left"
        }
      };
    },
    watch: {
      validateState(val) {
        this.broadcastInputError();
      },
      // 监听u-form组件的errorType的变化
      "uForm.errorType"(val) {
        this.errorType = val;
        this.broadcastInputError();
      }
    },
    computed: {
      // 计算后的label宽度，由于需要多个判断，故放到computed中
      uLabelWidth() {
        return this.elLabelPosition == "left" ? this.label === "true" || this.label === "" ? "auto" : this.$u.addUnit(this.elLabelWidth) : "100%";
      },
      showError() {
        return (type2) => {
          if (this.errorType.indexOf("none") >= 0)
            return false;
          else if (this.errorType.indexOf(type2) >= 0)
            return true;
          else
            return false;
        };
      },
      // label的宽度
      elLabelWidth() {
        return this.labelWidth != 0 || this.labelWidth != "" ? this.labelWidth : this.parentData.labelWidth ? this.parentData.labelWidth : 90;
      },
      // label的样式
      elLabelStyle() {
        return Object.keys(this.labelStyle).length ? this.labelStyle : this.parentData.labelStyle ? this.parentData.labelStyle : {};
      },
      // label的位置，左侧或者上方
      elLabelPosition() {
        return this.labelPosition ? this.labelPosition : this.parentData.labelPosition ? this.parentData.labelPosition : "left";
      },
      // label的对齐方式
      elLabelAlign() {
        return this.labelAlign ? this.labelAlign : this.parentData.labelAlign ? this.parentData.labelAlign : "left";
      },
      // label的下划线
      elBorderBottom() {
        return this.borderBottom !== "" ? this.borderBottom : this.parentData.borderBottom ? this.parentData.borderBottom : true;
      },
      elInputAlign() {
        return this.inputAlign ? this.inputAlign : this.parentData.inputAlign ? this.parentData.inputAlign : "left";
      }
    },
    methods: {
      broadcastInputError() {
        this.broadcast("u-input", "onFormItemError", this.validateState === "error" && this.showError("border"));
      },
      // 判断是否需要required校验
      setRules() {
      },
      // 从u-form的rules属性中，取出当前u-form-item的校验规则
      getRules() {
        let rules2 = this.parent.rules;
        rules2 = rules2 ? rules2[this.prop] : [];
        return [].concat(rules2 || []);
      },
      // blur事件时进行表单校验
      onFieldBlur() {
        this.validation("blur");
      },
      // change事件进行表单校验
      onFieldChange() {
        this.validation("change");
      },
      // 过滤出符合要求的rule规则
      getFilteredRule(triggerType = "") {
        let rules2 = this.getRules();
        if (!triggerType)
          return rules2;
        return rules2.filter((res) => res.trigger && res.trigger.indexOf(triggerType) !== -1);
      },
      getData(dataObj, name, defaultValue) {
        let newDataObj;
        if (dataObj) {
          newDataObj = JSON.parse(JSON.stringify(dataObj));
          let k = "", d = ".", l = "[", r = "]";
          name = name.replace(/\s+/g, k) + d;
          let tstr = k;
          for (let i = 0; i < name.length; i++) {
            let theChar = name.charAt(i);
            if (theChar != d && theChar != l && theChar != r) {
              tstr += theChar;
            } else if (newDataObj) {
              if (tstr != k)
                newDataObj = newDataObj[tstr];
              tstr = k;
            }
          }
        }
        if (typeof newDataObj === "undefined" && typeof defaultValue !== "undefined")
          newDataObj = defaultValue;
        return newDataObj;
      },
      setData(dataObj, name, value) {
        let dataValue;
        if (typeof value === "object") {
          dataValue = JSON.parse(JSON.stringify(value));
        } else {
          dataValue = value;
        }
        let regExp2 = new RegExp("([\\w$]+)|\\[(:\\d)\\]", "g");
        const patten = name.match(regExp2);
        for (let i = 0; i < patten.length - 1; i++) {
          let keyName = patten[i];
          if (typeof dataObj[keyName] !== "object")
            dataObj[keyName] = {};
          dataObj = dataObj[keyName];
        }
        dataObj[patten[patten.length - 1]] = dataValue;
      },
      // 校验数据
      validation(trigger, callback = () => {
      }) {
        this.fieldValue = this.getData(this.parent.model, this.prop);
        let rules2 = this.getFilteredRule(trigger);
        if (!rules2 || rules2.length === 0) {
          return callback("");
        }
        this.validateState = "validating";
        let validator = new Schema({
          [this.prop]: rules2
        });
        validator.validate({
          [this.prop]: this.fieldValue
        }, {
          firstFields: true
        }, (errors, fields) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";
          let field = errors ? errors[0].field : "";
          callback(this.validateMessage, {
            state: this.validateState,
            key: field,
            msg: this.validateMessage
          });
        });
      },
      // 清空当前的u-form-item
      resetField() {
        this.setData(this.parent.model, this.prop, this.initialValue);
        this.validateState = "success";
      }
    },
    // 组件创建完成时，将当前实例保存到u-form中
    mounted() {
      this.parent = this.$u.$parent.call(this, "u-form");
      if (this.parent) {
        Object.keys(this.parentData).map((key) => {
          this.parentData[key] = this.parent[key];
        });
        if (this.prop) {
          this.parent.fields.push(this);
          this.errorType = this.parent.errorType;
          this.initialValue = this.fieldValue;
          this.$nextTick(() => {
            this.setRules();
          });
        }
      }
    },
    beforeUnmount() {
      if (this.parent && this.prop) {
        this.parent.fields.map((item, index) => {
          if (item === this)
            this.parent.fields.splice(index, 1);
        });
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-form-item", { "u-border-bottom": $options.elBorderBottom, "u-form-item__border-bottom--error": $data.validateState === "error" && $options.showError("border-bottom") }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "u-form-item__body",
            style: vue.normalizeStyle({
              flexDirection: $options.elLabelPosition == "left" ? "row" : "column"
            })
          },
          [
            vue.createCommentVNode(' 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" '),
            vue.createElementVNode(
              "view",
              {
                class: "u-form-item--left",
                style: vue.normalizeStyle({
                  width: $options.uLabelWidth,
                  flex: `0 0 ${$options.uLabelWidth}`,
                  marginBottom: $options.elLabelPosition == "left" ? 0 : "10rpx"
                })
              },
              [
                vue.createCommentVNode(" 为了块对齐 "),
                $props.required || $props.leftIcon || $props.label ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "u-form-item--left__content"
                }, [
                  vue.createCommentVNode(" nvue不支持伪元素before "),
                  $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "u-form-item--left__content--required"
                  }, "*")) : vue.createCommentVNode("v-if", true),
                  $props.leftIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "u-form-item--left__content__icon"
                  }, [
                    vue.createVNode(_component_u_icon, {
                      name: $props.leftIcon,
                      "custom-style": $props.leftIconStyle
                    }, null, 8, ["name", "custom-style"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "u-form-item--left__content__label",
                      style: vue.normalizeStyle([$options.elLabelStyle, {
                        "justify-content": $options.elLabelAlign == "left" ? "flex-start" : $options.elLabelAlign == "center" ? "center" : "flex-end"
                      }])
                    },
                    vue.toDisplayString($props.label),
                    5
                    /* TEXT, STYLE */
                  )
                ])) : vue.createCommentVNode("v-if", true)
              ],
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "u-form-item--right u-flex" }, [
              vue.createElementVNode("view", { class: "u-form-item--right__content" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-form-item--right__content__slot",
                    style: vue.normalizeStyle($options.elLabelPosition == "left" && $options.elInputAlign == "right" ? "text-align:right;display: inline-block;line-height:initial;" : "")
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  4
                  /* STYLE */
                ),
                _ctx.$slots.right || $props.rightIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "u-form-item--right__content__icon u-flex"
                }, [
                  $props.rightIcon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                    key: 0,
                    "custom-style": $props.rightIconStyle,
                    name: $props.rightIcon
                  }, null, 8, ["custom-style", "name"])) : vue.createCommentVNode("v-if", true),
                  vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
                ])) : vue.createCommentVNode("v-if", true)
              ])
            ])
          ],
          4
          /* STYLE */
        ),
        $data.validateState === "error" && $options.showError("message") ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "u-form-item__message",
            style: vue.normalizeStyle({
              paddingLeft: $options.elLabelPosition == "left" ? _ctx.$u.addUnit($options.elLabelWidth) : "0",
              textAlign: $options.elInputAlign == "right" ? "right" : "left"
            })
          },
          vue.toDisplayString($data.validateMessage),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$r], ["__scopeId", "data-v-361fbc0d"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-form-item/u-form-item.vue"]]);
  const _sfc_main$H = {
    name: "u-image",
    emits: ["click", "error", "load"],
    props: {
      // 图片地址
      src: {
        type: String,
        default: ""
      },
      // 裁剪模式
      mode: {
        type: String,
        default: "aspectFill"
      },
      // 宽度，单位任意
      width: {
        type: [String, Number],
        default: "100%"
      },
      // 高度，单位任意
      height: {
        type: [String, Number],
        default: "auto"
      },
      // 图片形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "square"
      },
      // 圆角，单位任意
      borderRadius: {
        type: [String, Number],
        default: 0
      },
      // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
      lazyLoad: {
        type: Boolean,
        default: true
      },
      // 开启长按图片显示识别微信小程序码菜单
      showMenuByLongpress: {
        type: Boolean,
        default: true
      },
      // 加载中的图标，或者小图片
      loadingIcon: {
        type: String,
        default: "photo"
      },
      // 加载失败的图标，或者小图片
      errorIcon: {
        type: String,
        default: "error-circle"
      },
      // 是否显示加载中的图标或者自定义的slot
      showLoading: {
        type: Boolean,
        default: true
      },
      // 是否显示加载错误的图标或者自定义的slot
      showError: {
        type: Boolean,
        default: true
      },
      // 是否需要淡入效果
      fade: {
        type: Boolean,
        default: true
      },
      // 只支持网络资源，只对微信小程序有效
      webp: {
        type: Boolean,
        default: false
      },
      // 过渡时间，单位ms
      duration: {
        type: [String, Number],
        default: 500
      },
      // 背景颜色，用于深色页面加载图片时，为了和背景色融合
      bgColor: {
        type: String,
        default: "#f3f4f6"
      }
    },
    data() {
      return {
        // 图片是否加载错误，如果是，则显示错误占位图
        isError: false,
        // 初始化组件时，默认为加载中状态
        loading: true,
        // 不透明度，为了实现淡入淡出的效果
        opacity: 1,
        // 过渡时间，因为props的值无法修改，故需要一个中间值
        durationTime: this.duration,
        // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
        backgroundStyle: {}
      };
    },
    watch: {
      src: {
        immediate: true,
        handler(n) {
          if (!n) {
            this.isError = true;
            this.loading = false;
          } else {
            this.isError = false;
            this.loading = true;
          }
        }
      }
    },
    computed: {
      wrapStyle() {
        let style = {};
        style.width = this.$u.addUnit(this.width);
        style.height = this.$u.addUnit(this.height);
        style.borderRadius = this.shape == "circle" ? "50%" : this.$u.addUnit(this.borderRadius);
        style.overflow = this.borderRadius > 0 ? "hidden" : "visible";
        if (this.fade) {
          style.opacity = this.opacity;
          style.transition = `opacity ${Number(this.durationTime) / 1e3}s ease-in-out`;
        }
        return style;
      }
    },
    methods: {
      // 点击图片
      onClick() {
        this.$emit("click");
      },
      // 图片加载失败
      onErrorHandler(err) {
        this.loading = false;
        this.isError = true;
        this.$emit("error", err);
      },
      // 图片加载完成，标记loading结束
      onLoadHandler() {
        this.loading = false;
        this.isError = false;
        this.$emit("load");
        if (!this.fade)
          return this.removeBgColor();
        this.opacity = 0;
        this.durationTime = 0;
        setTimeout(() => {
          this.durationTime = this.duration;
          this.opacity = 1;
          setTimeout(() => {
            this.removeBgColor();
          }, this.durationTime);
        }, 50);
      },
      // 移除图片的背景色
      removeBgColor() {
        this.backgroundStyle = {
          backgroundColor: "transparent"
        };
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-image",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.onClick && $options.onClick(...args)),
        style: vue.normalizeStyle([$options.wrapStyle, $data.backgroundStyle])
      },
      [
        !$data.isError ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          src: $props.src,
          mode: $props.mode,
          onError: _cache[0] || (_cache[0] = (...args) => $options.onErrorHandler && $options.onErrorHandler(...args)),
          onLoad: _cache[1] || (_cache[1] = (...args) => $options.onLoadHandler && $options.onLoadHandler(...args)),
          "lazy-load": $props.lazyLoad,
          class: "u-image__image",
          "show-menu-by-longpress": $props.showMenuByLongpress,
          style: vue.normalizeStyle({
            borderRadius: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius)
          })
        }, null, 44, ["src", "mode", "lazy-load", "show-menu-by-longpress"])) : vue.createCommentVNode("v-if", true),
        $props.showLoading && $data.loading ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: "u-image__loading",
            style: vue.normalizeStyle({
              borderRadius: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius),
              backgroundColor: $props.bgColor
            })
          },
          [
            _ctx.$slots.loading ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_u_icon, {
              key: 1,
              name: $props.loadingIcon,
              width: $props.width,
              height: $props.height
            }, null, 8, ["name", "width", "height"]))
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true),
        $props.showError && $data.isError && !$data.loading ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 2,
            class: "u-image__error",
            style: vue.normalizeStyle({
              borderRadius: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius)
            })
          },
          [
            _ctx.$slots.error ? vue.renderSlot(_ctx.$slots, "error", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_u_icon, {
              key: 1,
              name: $props.errorIcon,
              width: $props.width,
              height: $props.height
            }, null, 8, ["name", "width", "height"]))
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$q], ["__scopeId", "data-v-6ff2fb1e"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-image/u-image.vue"]]);
  const _sfc_main$G = {
    name: "u-form",
    props: {
      // 当前form的需要验证字段的集合
      model: {
        type: Object,
        default() {
          return {};
        }
      },
      // 验证规则
      // rules: {
      // 	type: [Object, Function, Array],
      // 	default() {
      // 		return {};
      // 	}
      // },
      // 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，
      // border-bottom-下边框呈现红色，none-无提示
      errorType: {
        type: Array,
        default() {
          return ["message", "toast"];
        }
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: Boolean,
        default: true
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: "left"
      },
      // label的宽度，单位rpx
      labelWidth: {
        type: [String, Number],
        default: 90
      },
      // lable字体的对齐方式
      labelAlign: {
        type: String,
        default: "left"
      },
      // lable的样式，对象形式
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 表单内所有input的inputAlign属性的值
      inputAlign: {
        type: String,
        default: "left"
      },
      // 表单内所有input的clearable属性的值
      clearable: {
        type: Boolean,
        default: true
      }
    },
    provide() {
      return {
        uForm: this
      };
    },
    data() {
      return {
        rules: {}
      };
    },
    created() {
      this.fields = [];
    },
    methods: {
      setRules(rules2) {
        this.rules = rules2;
      },
      // 清空所有u-form-item组件的内容，本质上是调用了u-form-item组件中的resetField()方法
      resetFields() {
        this.fields.map((field) => {
          field.resetField();
        });
      },
      // 校验全部数据
      validate(callback) {
        return new Promise((resolve) => {
          let valid = true;
          let count = 0;
          let errorArr = [];
          let errorObjArr = [];
          this.fields.map((field) => {
            field.validation("", (errorMsg, errObj) => {
              if (errorMsg) {
                valid = false;
                errorArr.push(errorMsg);
                errorObjArr.push(errObj);
              }
              if (++count === this.fields.length) {
                resolve(valid, errorObjArr[0]);
                if (this.errorType.indexOf("none") === -1 && this.errorType.indexOf("toast") >= 0 && errorArr.length) {
                  this.$u.toast(errorArr[0]);
                }
                if (typeof callback == "function")
                  callback(valid, errorObjArr[0]);
              }
            });
          });
        });
      }
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-form" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$p], ["__scopeId", "data-v-000ccc72"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-form/u-form.vue"]]);
  const _sfc_main$F = {
    name: "u-button",
    emits: ["click", "getphonenumber", "getuserinfo", "error", "opensetting", "launchapp", "chooseavatar"],
    props: {
      // 是否细边框
      hairLine: {
        type: Boolean,
        default: true
      },
      // 按钮的预置样式，default，primary，error，warning，success
      type: {
        type: String,
        default: "default"
      },
      // 按钮尺寸，default，medium，mini
      size: {
        type: String,
        default: "default"
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: "square"
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: false
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: ""
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: ""
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: ""
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: false
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: "en"
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: ""
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: ""
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: ""
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: ""
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: false
      },
      // 手指按（触摸）按钮时按钮时的背景颜色
      hoverBgColor: {
        type: String,
        default: ""
      },
      // 水波纹的背景颜色
      rippleBgColor: {
        type: String,
        default: ""
      },
      // 是否开启水波纹效果
      ripple: {
        type: Boolean,
        default: false
      },
      // 按下的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义样式，对象形式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: ""
      },
      // 节流，一定时间内只能触发一次
      throttleTime: {
        type: [String, Number],
        default: 500
      },
      // 按住后多久出现点击态，单位毫秒
      hoverStartTime: {
        type: [String, Number],
        default: 20
      },
      // 手指松开后点击态保留时间，单位毫秒
      hoverStayTime: {
        type: [String, Number],
        default: 150
      },
      timerId: {
        type: [String, Number]
      }
    },
    computed: {
      // 当没有传bgColor变量时，按钮按下去的颜色类名
      getHoverClass() {
        if (this.loading || this.disabled || this.ripple || this.hoverClass)
          return "";
        let hoverClass = "";
        hoverClass = this.plain ? "u-" + this.type + "-plain-hover" : "u-" + this.type + "-hover";
        return hoverClass;
      },
      // 在'primary', 'success', 'error', 'warning'类型下，不显示边框，否则会造成四角有毛刺现象
      showHairLineBorder() {
        if (["primary", "success", "error", "warning"].indexOf(this.type) >= 0 && !this.plain) {
          return "";
        } else {
          return "u-hairline-border";
        }
      }
    },
    data() {
      let btnTimerId = this.timerId || "button_" + Math.floor(Math.random() * 1e8 + 0);
      return {
        btnTimerId,
        rippleTop: 0,
        // 水波纹的起点Y坐标到按钮上边界的距离
        rippleLeft: 0,
        // 水波纹起点X坐标到按钮左边界的距离
        fields: {},
        // 波纹按钮节点信息
        waveActive: false
        // 激活水波纹
      };
    },
    methods: {
      // 按钮点击
      click(e) {
        this.$u.throttle(() => {
          if (this.loading === true || this.disabled === true)
            return;
          if (this.ripple) {
            this.waveActive = false;
            this.$nextTick(function() {
              this.getWaveQuery(e);
            });
          }
          this.$emit("click", e);
        }, this.throttleTime, true, this.btnTimerId);
      },
      // 查询按钮的节点信息
      getWaveQuery(e) {
        this.getElQuery().then((res) => {
          let data = res[0];
          if (!data.width || !data.width)
            return;
          data.targetWidth = data.height > data.width ? data.height : data.width;
          if (!data.targetWidth)
            return;
          this.fields = data;
          let touchesX = "", touchesY = "";
          touchesX = e.touches[0].clientX;
          touchesY = e.touches[0].clientY;
          this.rippleTop = touchesY - data.top - data.targetWidth / 2;
          this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
          this.$nextTick(() => {
            this.waveActive = true;
          });
        });
      },
      // 获取节点信息
      getElQuery() {
        return new Promise((resolve) => {
          let queryInfo = "";
          queryInfo = uni.createSelectorQuery().in(this);
          queryInfo.select(".u-btn").boundingClientRect();
          queryInfo.exec((data) => {
            resolve(data);
          });
        });
      },
      // 下面为对接uniapp官方按钮开放能力事件回调的对接
      getphonenumber(res) {
        this.$emit("getphonenumber", res);
      },
      getuserinfo(res) {
        this.$emit("getuserinfo", res);
      },
      error(res) {
        this.$emit("error", res);
      },
      opensetting(res) {
        this.$emit("opensetting", res);
      },
      launchapp(res) {
        this.$emit("launchapp", res);
      },
      chooseavatar(res) {
        this.$emit("chooseavatar", res);
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("button", {
      id: "u-wave-btn",
      class: vue.normalizeClass(["u-btn u-line-1 u-fix-ios-appearance", [
        "u-size-" + $props.size,
        $props.plain ? "u-btn--" + $props.type + "--plain" : "",
        $props.loading ? "u-loading" : "",
        $props.shape == "circle" ? "u-round-circle" : "",
        $props.hairLine ? $options.showHairLineBorder : "u-btn--bold-border",
        "u-btn--" + $props.type,
        $props.disabled ? `u-btn--${$props.type}--disabled` : ""
      ]]),
      "hover-start-time": Number($props.hoverStartTime),
      "hover-stay-time": Number($props.hoverStayTime),
      disabled: $props.disabled,
      "form-type": $props.formType,
      "open-type": $props.openType,
      "app-parameter": $props.appParameter,
      "hover-stop-propagation": $props.hoverStopPropagation,
      "send-message-title": $props.sendMessageTitle,
      "send-message-path": "sendMessagePath",
      lang: $props.lang,
      "data-name": $props.dataName,
      "session-from": $props.sessionFrom,
      "send-message-img": $props.sendMessageImg,
      "show-message-card": $props.showMessageCard,
      onGetphonenumber: _cache[0] || (_cache[0] = (...args) => $options.getphonenumber && $options.getphonenumber(...args)),
      onGetuserinfo: _cache[1] || (_cache[1] = (...args) => $options.getuserinfo && $options.getuserinfo(...args)),
      onError: _cache[2] || (_cache[2] = (...args) => $options.error && $options.error(...args)),
      onOpensetting: _cache[3] || (_cache[3] = (...args) => $options.opensetting && $options.opensetting(...args)),
      onLaunchapp: _cache[4] || (_cache[4] = (...args) => $options.launchapp && $options.launchapp(...args)),
      onChooseavatar: _cache[5] || (_cache[5] = (...args) => $options.chooseavatar && $options.chooseavatar(...args)),
      style: vue.normalizeStyle([$props.customStyle, {
        overflow: $props.ripple ? "hidden" : "visible"
      }]),
      onClick: _cache[6] || (_cache[6] = vue.withModifiers(($event) => $options.click($event), ["stop"])),
      "hover-class": $options.getHoverClass,
      loading: $props.loading
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.ripple ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["u-wave-ripple", [$data.waveActive ? "u-wave-active" : ""]]),
          style: vue.normalizeStyle({
            top: $data.rippleTop + "px",
            left: $data.rippleLeft + "px",
            width: $data.fields.targetWidth + "px",
            height: $data.fields.targetWidth + "px",
            "background-color": $props.rippleBgColor || "rgba(0, 0, 0, 0.15)"
          })
        },
        null,
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ], 46, ["hover-start-time", "hover-stay-time", "disabled", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class", "loading"]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$o], ["__scopeId", "data-v-097def2b"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-button/u-button.vue"]]);
  var hexcase = 0;
  function hex_md5(s) {
    return rstr2hex(rstr_md5(str2rstr_utf8(s)));
  }
  function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
  }
  function rstr2hex(input) {
    try {
      hexcase;
    } catch (e) {
      hexcase = 0;
    }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
      x = input.charCodeAt(i);
      output += hex_tab.charAt(x >>> 4 & 15) + hex_tab.charAt(x & 15);
    }
    return output;
  }
  function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;
    while (++i < input.length) {
      x = input.charCodeAt(i);
      y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
      if (55296 <= x && x <= 56319 && 56320 <= y && y <= 57343) {
        x = 65536 + ((x & 1023) << 10) + (y & 1023);
        i++;
      }
      if (x <= 127)
        output += String.fromCharCode(x);
      else if (x <= 2047)
        output += String.fromCharCode(
          192 | x >>> 6 & 31,
          128 | x & 63
        );
      else if (x <= 65535)
        output += String.fromCharCode(
          224 | x >>> 12 & 15,
          128 | x >>> 6 & 63,
          128 | x & 63
        );
      else if (x <= 2097151)
        output += String.fromCharCode(
          240 | x >>> 18 & 7,
          128 | x >>> 12 & 63,
          128 | x >>> 6 & 63,
          128 | x & 63
        );
    }
    return output;
  }
  function rstr2binl(input) {
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
      output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
      output[i >> 5] |= (input.charCodeAt(i / 8) & 255) << i % 32;
    return output;
  }
  function binl2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
      output += String.fromCharCode(input[i >> 5] >>> i % 32 & 255);
    return output;
  }
  function binl_md5(x, len) {
    x[len >> 5] |= 128 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
  }
  function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
  }
  function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn(b & c | ~b & d, a, b, x, s, t);
  }
  function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn(b & d | c & ~d, a, b, x, s, t);
  }
  function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function safe_add(x, y) {
    var lsw = (x & 65535) + (y & 65535);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 65535;
  }
  function bit_rol(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  }
  const md5Libs = {
    md5: function(str) {
      return hex_md5(str);
    }
  };
  const _sfc_main$E = {
    data() {
      return {
        imgUrl: "",
        loading: false,
        formData: {
          account: "",
          password: "",
          code: "",
          origin: "password"
        },
        needCode: false,
        codeLength: 4,
        isCode: false,
        rules: {
          account: [{
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }]
        },
        sysConfigInfo: {},
        appIcon: "",
        sysName: "",
        copyright: ""
      };
    },
    computed: {
      baseURL() {
        return this.define.baseURL;
      }
    },
    onReady() {
      this.$refs.dataForm.setRules(this.rules);
      setTimeout(() => {
        this.$store.dispatch("user/getCurrentUser");
      }, 1e3);
    },
    onLoad(e) {
      this.sysConfigInfo = uni.getStorageSync("sysConfigInfo");
      this.appIcon = !!this.sysConfigInfo.appIcon ? this.baseURL + this.sysConfigInfo.appIcon : "/static/logo.png";
      this.sysName = !!this.sysConfigInfo.companyName ? this.sysConfigInfo.sysName : "快速开发平台";
      this.copyright = !!this.sysConfigInfo.copyright ? this.sysConfigInfo.copyright : "Copyright © 2022 上海城勘信息科技有限公司出品";
      let needCode = uni.getStorageSync("app_loginNeedCode");
      this.isCode = needCode;
      this.changeCode();
      this.formData.password = "";
    },
    methods: {
      onFocus(e) {
        this.getConfig(e);
      },
      onBlur(e) {
        this.getConfig(e);
      },
      getConfig(val) {
        if (!val)
          return;
        getConfig(this.formData.account).then((res) => {
          this.needCode = !!res.data.enableVerificationCode;
          if (this.needCode) {
            this.codeLength = res.data.verificationCodeNumber || 4;
            this.changeCode();
          }
        });
      },
      changeCode() {
        let timestamp = Math.random();
        this.timestamp = timestamp;
        this.imgUrl = `/api/oauth/ImageCode/${this.codeLength || 4}/${timestamp}`;
      },
      login() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            let query = {
              account: this.formData.account,
              password: md5Libs.md5(this.formData.password),
              timestamp: this.timestamp,
              code: this.formData.code,
              origin: this.formData.origin
            };
            const clientId = plus.push.getClientInfo().clientid;
            query.clientId = clientId;
            login(query).then((res) => {
              this.loading = false;
              let token = res.data.token;
              this.$store.commit("user/SET_TOKEN", token);
              uni.setStorageSync("token", token);
              uni.switchTab({
                url: "/pages/sampleDetection/index"
              });
            }).catch((err) => {
              this.loading = false;
            });
          }
        });
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_2$2);
    const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_3$1);
    const _component_u_image = resolveEasycom(vue.resolveDynamicComponent("u-image"), __easycom_2$1);
    const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_4$1);
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "logo-v" }, [
      vue.createElementVNode("view", { class: "login-bg" }, [
        vue.createElementVNode("image", {
          src: "/static/login-bg.png",
          mode: "widthFix"
        })
      ]),
      vue.createElementVNode("view", { class: "logo-hd u-flex-col" }, [
        vue.createElementVNode("view", { class: "logoImg" }, [
          vue.createElementVNode("image", {
            src: $data.appIcon,
            mode: "widthFix"
          }, null, 8, ["src"])
        ]),
        vue.createCommentVNode(' <view class="u-flex-col introduce u-m-t-30">\n				<text class="u-font-36 text-one">{{sysName}}</text>\n				<text class="u-font-24 text-two">低代码，企业数字化好帮手</text>\n			</view> '),
        vue.createElementVNode("view", { class: "loginSwitch u-flex-col" }, [
          vue.createElementVNode("view", { class: "loginInputBox u-flex-col" }, [
            vue.createVNode(_component_u_form, {
              model: $data.formData,
              rules: $data.rules,
              ref: "dataForm",
              errorType: ["toast"],
              "label-position": "left",
              "label-width": "150",
              "label-align": "left"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_form_item, { prop: "account" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_u_input, {
                      modelValue: $data.formData.account,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.account = $event),
                      placeholder: "请输入帐号",
                      onFocus: $options.onFocus,
                      onBlur: $options.onBlur
                    }, null, 8, ["modelValue", "onFocus", "onBlur"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_u_form_item, { prop: "password" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_u_input, {
                      modelValue: $data.formData.password,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.password = $event),
                      type: "password",
                      placeholder: "请输入密码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                $data.needCode ? (vue.openBlock(), vue.createBlock(_component_u_form_item, {
                  key: 0,
                  prop: "code",
                  required: ""
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "u-flex code-box" }, [
                      vue.createVNode(_component_u_input, {
                        modelValue: $data.formData.code,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData.code = $event),
                        placeholder: "验证码"
                      }, null, 8, ["modelValue"]),
                      vue.createElementVNode("view", { style: { "flex": "0.1" } }, [
                        vue.createVNode(_component_u_image, {
                          showLoading: true,
                          src: $options.baseURL + $data.imgUrl,
                          width: "130px",
                          height: "38px",
                          onClick: $options.changeCode
                        }, null, 8, ["src", "onClick"])
                      ])
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                })) : vue.createCommentVNode("v-if", true)
              ]),
              _: 1
              /* STABLE */
            }, 8, ["model", "rules"]),
            vue.createElementVNode("view", { class: "loginBtnBox u-m-t-64" }, [
              vue.createVNode(_component_u_button, {
                onClick: $options.login,
                type: "primary",
                loading: $data.loading
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(
                    vue.toDisplayString($data.loading ? "登录中..." : "登录"),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick", "loading"])
            ])
          ])
        ])
      ]),
      vue.createElementVNode(
        "view",
        { class: "copyright" },
        vue.toDisplayString($data.copyright),
        1
        /* TEXT */
      )
    ]);
  }
  const PagesLoginIndex = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$n], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/login/index.vue"]]);
  const _sfc_main$D = {
    name: "u-mask",
    emits: ["click"],
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: false
      },
      // 层级z-index
      zIndex: {
        type: [Number, String],
        default: ""
      },
      // 用户自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 遮罩的动画样式， 是否使用使用zoom进行scale进行缩放
      zoom: {
        type: Boolean,
        default: true
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [Number, String],
        default: 300
      },
      // 是否可以通过点击遮罩进行关闭
      maskClickAble: {
        type: Boolean,
        default: true
      },
      // 遮罩的模糊度
      blur: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        zoomStyle: {
          transform: ""
        },
        scale: "scale(1.2, 1.2)"
      };
    },
    watch: {
      show(n) {
        if (n && this.zoom) {
          this.zoomStyle.transform = "scale(1, 1)";
        } else if (!n && this.zoom) {
          this.zoomStyle.transform = this.scale;
        }
      }
    },
    computed: {
      maskStyle() {
        let style = {};
        style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        if (this.show)
          style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.mask;
        else
          style.zIndex = -1;
        style.transition = `all ${this.duration / 1e3}s ease-in-out`;
        if (Object.keys(this.customStyle).length)
          style = {
            ...style,
            ...this.customStyle
          };
        return style;
      },
      filterStyle() {
        let { blur } = this;
        let style = {};
        if (blur) {
          style.backdropFilter = `blur(${blur}rpx)`;
        }
        return style;
      }
    },
    methods: {
      click() {
        if (!this.maskClickAble)
          return;
        this.$emit("click");
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-mask", {
          "u-mask-zoom": $props.zoom,
          "u-mask-show": $props.show
        }]),
        "hover-stop-propagation": "",
        style: vue.normalizeStyle([$options.maskStyle, $data.zoomStyle, $options.filterStyle]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args)),
        onTouchmove: vue.withModifiers(() => {
        }, ["stop", "prevent"])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    );
  }
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$m], ["__scopeId", "data-v-b3b508a8"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-mask/u-mask.vue"]]);
  const _sfc_main$C = {
    name: "u-popup",
    emits: ["update:modelValue", "input", "open", "close"],
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      /**
       * 显示状态
       */
      show: {
        type: Boolean,
        default: false
      },
      /**
       * 弹出方向，left|right|top|bottom|center
       */
      mode: {
        type: String,
        default: "left"
      },
      /**
       * 是否显示遮罩
       */
      mask: {
        type: Boolean,
        default: true
      },
      // 抽屉的宽度(mode=left|right)，或者高度(mode=top|bottom)，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度
      length: {
        type: [Number, String],
        default: "auto"
      },
      // 是否开启缩放动画，只在mode=center时有效
      zoom: {
        type: Boolean,
        default: true
      },
      // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // 是否可以通过点击遮罩进行关闭
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      // 用户自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 此为内部参数，不在文档对外使用，为了解决Picker和keyboard等融合了弹窗的组件
      // 对v-model双向绑定多层调用造成报错不能修改props值的问题
      popup: {
        type: Boolean,
        default: true
      },
      // 显示显示弹窗的圆角，单位rpx
      borderRadius: {
        type: [Number, String],
        default: 0
      },
      zIndex: {
        type: [Number, String],
        default: ""
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: false
      },
      // 关闭图标的名称，只能uView的内置图标
      closeIcon: {
        type: String,
        default: "close"
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: "top-right"
      },
      // 关闭图标的颜色
      closeIconColor: {
        type: String,
        default: "#909399"
      },
      // 关闭图标的大小，单位rpx
      closeIconSize: {
        type: [String, Number],
        default: "30"
      },
      // 宽度，只对左，右，中部弹出时起作用，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
      width: {
        type: String,
        default: ""
      },
      // 高度，只对上，下，中部弹出时起作用，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
      height: {
        type: String,
        default: ""
      },
      // 给一个负的margin-top，往上偏移，避免和键盘重合的情况，仅在mode=center时有效
      negativeTop: {
        type: [String, Number],
        default: 0
      },
      // 遮罩的样式，一般用于修改遮罩的透明度
      maskCustomStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 遮罩打开或收起的动画过渡时间，单位ms
      duration: {
        type: [String, Number],
        default: 250
      },
      // 遮罩的模糊度
      blur: {
        type: [String, Number],
        default: 0
      }
    },
    data() {
      return {
        visibleSync: false,
        showDrawer: false,
        timer: null,
        closeFromInner: false
        // value的值改变，是发生在内部还是外部
      };
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      // 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
      style() {
        let style = {};
        if (this.mode == "left" || this.mode == "right") {
          style = {
            width: this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length),
            height: "100%",
            transform: `translate3D(${this.mode == "left" ? "-100%" : "100%"},0px,0px)`
          };
        } else if (this.mode == "top" || this.mode == "bottom") {
          style = {
            width: "100%",
            height: this.height ? this.getUnitValue(this.height) : this.getUnitValue(this.length),
            transform: `translate3D(0px,${this.mode == "top" ? "-100%" : "100%"},0px)`
          };
        }
        style.zIndex = this.uZindex;
        if (this.borderRadius) {
          switch (this.mode) {
            case "left":
              style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`;
              break;
            case "top":
              style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`;
              break;
            case "right":
              style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`;
              break;
            case "bottom":
              style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`;
              break;
          }
          style.overflow = "hidden";
        }
        if (this.duration)
          style.transition = `all ${this.duration / 1e3}s linear`;
        return style;
      },
      // 中部弹窗的特有样式
      centerStyle() {
        let style = {};
        style.width = this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length);
        style.height = this.height ? this.getUnitValue(this.height) : "auto";
        style.zIndex = this.uZindex;
        style.marginTop = `-${this.$u.addUnit(this.negativeTop)}`;
        if (this.borderRadius) {
          style.borderRadius = `${this.borderRadius}rpx`;
          style.overflow = "hidden";
        }
        return style;
      },
      // 计算整理后的z-index值
      uZindex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      }
    },
    watch: {
      valueCom: {
        immediate: true,
        handler(val) {
          if (val) {
            this.open();
          } else if (!this.closeFromInner) {
            this.close();
          }
          this.closeFromInner = false;
        }
      }
    },
    mounted() {
      this.valueCom && this.open();
    },
    methods: {
      // 判断传入的值，是否带有单位，如果没有，就默认用rpx单位
      getUnitValue(val) {
        if (/(%|px|rpx|auto)$/.test(val))
          return val;
        else
          return val + "rpx";
      },
      // 遮罩被点击
      maskClick() {
        this.close();
      },
      close() {
        this.closeFromInner = true;
        this.change("showDrawer", "visibleSync", false);
      },
      // 中部弹出时，需要.u-drawer-content将居中内容，此元素会铺满屏幕，点击需要关闭弹窗
      // 让其只在mode=center时起作用
      modeCenterClose(mode) {
        if (mode != "center" || !this.maskCloseAble)
          return;
        this.close();
      },
      open() {
        this.change("visibleSync", "showDrawer", true);
      },
      // 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
      // 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
      change(param1, param2, status) {
        if (this.popup == true) {
          this.$emit("input", status);
          this.$emit("update:modelValue", status);
        }
        this[param1] = status;
        if (status) {
          this.$nextTick(() => {
            this[param2] = status;
            this.$emit(status ? "open" : "close");
          });
        } else {
          this.timer = setTimeout(() => {
            this[param2] = status;
            this.$emit(status ? "open" : "close");
          }, this.duration);
        }
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_mask = resolveEasycom(vue.resolveDynamicComponent("u-mask"), __easycom_0$7);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    return $data.visibleSync ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        style: vue.normalizeStyle([$props.customStyle, {
          zIndex: $options.uZindex - 1
        }]),
        class: "u-drawer",
        "hover-stop-propagation": ""
      },
      [
        vue.createVNode(_component_u_mask, {
          blur: $props.blur,
          duration: $props.duration,
          "custom-style": $props.maskCustomStyle,
          maskClickAble: $props.maskCloseAble,
          "z-index": $options.uZindex - 2,
          show: $data.showDrawer && $props.mask,
          onClick: $options.maskClick
        }, null, 8, ["blur", "duration", "custom-style", "maskClickAble", "z-index", "show", "onClick"]),
        vue.createCommentVNode(" 移除	@tap.stop.prevent "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-drawer-content", [
              $props.safeAreaInsetBottom ? "safe-area-inset-bottom" : "",
              "u-drawer-" + $props.mode,
              $data.showDrawer ? "u-drawer-content-visible" : "",
              $props.zoom && $props.mode == "center" ? "u-animation-zoom" : ""
            ]]),
            onClick: _cache[3] || (_cache[3] = ($event) => $options.modeCenterClose($props.mode)),
            onTouchmove: _cache[4] || (_cache[4] = vue.withModifiers(() => {
            }, ["stop", "prevent"])),
            style: vue.normalizeStyle([$options.style])
          },
          [
            $props.mode == "center" ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "u-mode-center-box",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                style: vue.normalizeStyle([$options.centerStyle])
              },
              [
                $props.closeable ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  onClick: $options.close,
                  class: vue.normalizeClass(["u-close", ["u-close--" + $props.closeIconPos]]),
                  name: $props.closeIcon,
                  color: $props.closeIconColor,
                  size: $props.closeIconSize
                }, null, 8, ["onClick", "class", "name", "color", "size"])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("scroll-view", {
                  class: "u-drawer__scroll-view",
                  "scroll-y": "true"
                }, [
                  vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ])
              ],
              36
              /* STYLE, NEED_HYDRATION */
            )) : (vue.openBlock(), vue.createElementBlock("scroll-view", {
              key: 1,
              class: "u-drawer__scroll-view",
              "scroll-y": "true"
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ])),
            vue.createElementVNode(
              "view",
              {
                onClick: _cache[2] || (_cache[2] = (...args) => $options.close && $options.close(...args)),
                class: vue.normalizeClass(["u-close", ["u-close--" + $props.closeIconPos]])
              },
              [
                $props.mode != "center" && $props.closeable ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  name: $props.closeIcon,
                  color: $props.closeIconColor,
                  size: $props.closeIconSize
                }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ],
          38
          /* CLASS, STYLE, NEED_HYDRATION */
        )
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$l], ["__scopeId", "data-v-c93a8fd2"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-popup/u-popup.vue"]]);
  const _sfc_main$B = {
    name: "u-action-sheet",
    emits: ["update:modelValue", "input", "click", "close"],
    props: {
      // 通过双向绑定控制组件的弹出与收起
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      // 点击遮罩是否可以关闭actionsheet
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      // 按钮的文字数组，可以自定义颜色和字体大小，字体单位为rpx
      list: {
        type: Array,
        default() {
          return [];
        }
      },
      // 顶部的提示文字
      tips: {
        type: Object,
        default() {
          return {
            text: "",
            color: "",
            fontSize: "26"
          };
        }
      },
      // 底部的取消按钮
      cancelBtn: {
        type: Boolean,
        default: true
      },
      // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // 弹出的顶部圆角值
      borderRadius: {
        type: [String, Number],
        default: 0
      },
      // 弹出的z-index值
      zIndex: {
        type: [String, Number],
        default: 0
      },
      // 取消按钮的文字提示
      cancelText: {
        type: String,
        default: "取消"
      },
      // 自定义label属性名
      labelName: {
        type: String,
        default: "text"
      },
      // 遮罩的模糊度
      blur: {
        type: [Number, String],
        default: 0
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      // 顶部提示的样式
      tipsStyle() {
        let style = {};
        if (this.tips.color)
          style.color = this.tips.color;
        if (this.tips.fontSize)
          style.fontSize = this.tips.fontSize + "rpx";
        return style;
      },
      // 操作项目的样式
      itemStyle() {
        return (index) => {
          let style = {};
          if (this.list[index].color)
            style.color = this.list[index].color;
          if (this.list[index].fontSize)
            style.fontSize = this.list[index].fontSize + "rpx";
          if (this.list[index].disabled)
            style.color = "#c0c4cc";
          return style;
        };
      },
      uZIndex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      }
    },
    data() {
      return {
        popupValue: false
      };
    },
    watch: {
      valueCom(v1, v2) {
        this.popupValue = v1;
      }
    },
    methods: {
      // 点击取消按钮
      close() {
        this.popupClose();
        this.$emit("close");
      },
      // 弹窗关闭
      popupClose() {
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
      },
      // 点击某一个item
      itemClick(index) {
        if (this.list[index].disabled)
          return;
        this.$emit("click", index);
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$6);
    return vue.openBlock(), vue.createBlock(_component_u_popup, {
      blur: $props.blur,
      mode: "bottom",
      "border-radius": $props.borderRadius,
      popup: false,
      modelValue: $data.popupValue,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.popupValue = $event),
      maskCloseAble: $props.maskCloseAble,
      length: "auto",
      safeAreaInsetBottom: $props.safeAreaInsetBottom,
      onClose: $options.popupClose,
      "z-index": $options.uZIndex
    }, {
      default: vue.withCtx(() => [
        $props.tips.text ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "u-tips u-border-bottom",
            style: vue.normalizeStyle([$options.tipsStyle])
          },
          [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($props.tips.text),
              1
              /* TEXT */
            )
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.list, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers(() => {
              }, ["stop", "prevent"])),
              onClick: ($event) => $options.itemClick(index),
              style: vue.normalizeStyle([$options.itemStyle(index)]),
              class: vue.normalizeClass(["u-action-sheet-item u-line-1", [index < $props.list.length - 1 ? "u-border-bottom" : ""]]),
              "hover-stay-time": 150
            }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(item[$props.labelName]),
                1
                /* TEXT */
              ),
              item.subText ? (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 0,
                  class: "u-action-sheet-item__subtext u-line-1"
                },
                vue.toDisplayString(item.subText),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ], 46, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        $props.cancelBtn ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "u-gab"
        })) : vue.createCommentVNode("v-if", true),
        $props.cancelBtn ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 2,
            onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
            }, ["stop", "prevent"])),
            class: "u-actionsheet-cancel u-action-sheet-item",
            "hover-class": "u-hover-class",
            "hover-stay-time": 150,
            onClick: _cache[2] || (_cache[2] = (...args) => $options.close && $options.close(...args))
          },
          vue.toDisplayString($props.cancelText),
          33
          /* TEXT, NEED_HYDRATION */
        )) : vue.createCommentVNode("v-if", true)
      ]),
      _: 1
      /* STABLE */
    }, 8, ["blur", "border-radius", "modelValue", "maskCloseAble", "safeAreaInsetBottom", "onClose", "z-index"]);
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$k], ["__scopeId", "data-v-cd40cb92"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-action-sheet/u-action-sheet.vue"]]);
  const _sfc_main$A = {
    data() {
      return {
        list: [{
          text: "点赞",
          color: "blue",
          fontSize: 28
        }, {
          text: "分享"
        }, {
          text: "评论"
        }],
        show: true
      };
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_action_sheet = resolveEasycom(vue.resolveDynamicComponent("u-action-sheet"), __easycom_0$5);
    return vue.openBlock(), vue.createBlock(_component_u_action_sheet, {
      list: $data.list,
      modelValue: $data.show,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.show = $event)
    }, null, 8, ["list", "modelValue"]);
  }
  const PagesLabOperationIndex = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$j], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/labOperation/index.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$z = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code2 = this.icons.find((v) => v.font_class === this.type);
        if (code2) {
          return code2.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$i], ["__scopeId", "data-v-d31e1c47"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$y = {};
  function _sfc_render$h(_ctx, _cache) {
    const _component_viwe = vue.resolveComponent("viwe");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "me-container" }, [
      vue.createElementVNode("view", { class: "me-header" }, [
        vue.createElementVNode("view", { class: "avatar" }, [
          vue.createCommentVNode(' <img src="@/static" alt="" /> '),
          vue.createElementVNode("view", { class: "img" })
        ]),
        vue.createVNode(_component_viwe, { class: "info" }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "info-top" }, [
              vue.createElementVNode("text", { class: "name" }, "小明"),
              vue.createElementVNode("text", { class: "phone" }, "12345678912")
            ]),
            vue.createElementVNode("text", { class: "comp" }, "某某某有限公司")
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createElementVNode("view", { class: "me-menu" }, [
        vue.createElementVNode("view", { class: "message-center link-box" }, [
          vue.createElementVNode("text", { class: "left-text" }, "消息中心"),
          vue.createElementVNode("view", { class: "right-content" }, [
            vue.createElementVNode("text", { class: "right-text" }, "new"),
            vue.createVNode(_component_uni_icons, {
              type: "right",
              size: "30"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "update link-box" }, [
          vue.createElementVNode("text", { class: "left-text" }, "检查更新"),
          vue.createElementVNode("view", { class: "right-content" }, [
            vue.createElementVNode("text", { class: "right-text" }, "1.0.0"),
            vue.createVNode(_component_uni_icons, {
              type: "right",
              size: "30"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "clear-cache link-box" }, [
          vue.createElementVNode("text", { class: "left-text" }, "清除缓存"),
          vue.createElementVNode("view", { class: "right-content" }, [
            vue.createElementVNode("text", { class: "right-text" }, "50.32KB"),
            vue.createVNode(_component_uni_icons, {
              type: "right",
              size: "30"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "setting link-box" }, [
          vue.createElementVNode("text", { class: "left-text" }, "设置"),
          vue.createVNode(_component_uni_icons, {
            type: "right",
            size: "30"
          })
        ])
      ])
    ]);
  }
  const PagesMeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$h], ["__scopeId", "data-v-c8e26b33"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/me/index.vue"]]);
  const _sfc_main$x = {
    name: "u-badge",
    props: {
      // primary,warning,success,error,info
      type: {
        type: String,
        default: "error"
      },
      // default, mini
      size: {
        type: String,
        default: "default"
      },
      //是否是圆点
      isDot: {
        type: Boolean,
        default: false
      },
      // 显示的数值内容
      count: {
        type: [Number, String]
      },
      // 展示封顶的数字值
      overflowCount: {
        type: Number,
        default: 99
      },
      // 当数值为 0 时，是否展示 Badge
      showZero: {
        type: Boolean,
        default: false
      },
      // 位置偏移
      offset: {
        type: Array,
        default: () => {
          return [20, 20];
        }
      },
      // 是否开启绝对定位，开启了offset才会起作用
      absolute: {
        type: Boolean,
        default: true
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: "24"
      },
      // 字体演示
      color: {
        type: String,
        default: "#ffffff"
      },
      // badge的背景颜色
      bgColor: {
        type: String,
        default: ""
      },
      // 是否让badge组件的中心点和父组件右上角重合，配置的话，offset将会失效
      isCenter: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      // 是否将badge中心与父组件右上角重合
      boxStyle() {
        let style = {};
        if (this.isCenter) {
          style.top = 0;
          style.right = 0;
          style.transform = "translateY(-50%) translateX(50%)";
        } else {
          style.top = this.offset[0] + "rpx";
          style.right = this.offset[1] + "rpx";
          style.transform = "translateY(0) translateX(0)";
        }
        if (this.size == "mini") {
          style.transform = style.transform + " scale(0.8)";
        }
        return style;
      },
      // isDot类型时，不显示文字
      showText() {
        if (this.isDot)
          return "";
        else {
          if (this.count > this.overflowCount)
            return `${this.overflowCount}+`;
          else
            return this.count;
        }
      },
      // 是否显示组件
      show() {
        if (this.count == 0 && this.showZero == false)
          return false;
        else
          return true;
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return $options.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-badge", [
          $props.isDot ? "u-badge-dot" : "",
          $props.size == "mini" ? "u-badge-mini" : "",
          $props.type ? "u-badge--bg--" + $props.type : ""
        ]]),
        style: vue.normalizeStyle([{
          top: $props.offset[0] + "rpx",
          right: $props.offset[1] + "rpx",
          fontSize: $props.fontSize + "rpx",
          position: $props.absolute ? "absolute" : "static",
          color: $props.color,
          backgroundColor: $props.bgColor
        }, $options.boxStyle])
      },
      vue.toDisplayString($options.showText),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$g], ["__scopeId", "data-v-f84de764"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-badge/u-badge.vue"]]);
  const _sfc_main$w = {
    name: "u-tabs",
    emits: ["update:modelValue", "input", "change"],
    props: {
      // 通过双向绑定控制组件的弹出与收起
      value: {
        type: [Number, String],
        default: 0
      },
      modelValue: {
        type: [Number, String],
        default: 0
      },
      // 当前活动tab的索引（请使用 v-model="current" 代替 :current="current" @change="change" 其他不变）
      current: {
        type: [Number, String],
        default: 0
      },
      // 导航菜单是否需要滚动，如只有2或者3个的时候，就不需要滚动了，此时使用flex平分tab的宽度
      isScroll: {
        type: Boolean,
        default: true
      },
      //需循环的标签列表
      list: {
        type: Array,
        default() {
          return [];
        }
      },
      // 导航栏的高度和行高
      height: {
        type: [String, Number],
        default: 80
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: 30
      },
      // 过渡动画时长, 单位ms
      duration: {
        type: [String, Number],
        default: 0.5
      },
      // 选中项的主题颜色
      activeColor: {
        type: String,
        default: "#2979ff"
      },
      // 未选中项的颜色
      inactiveColor: {
        type: String,
        default: "#303133"
      },
      // 菜单底部移动的bar的宽度，单位rpx
      barWidth: {
        type: [String, Number],
        default: 40
      },
      // 移动bar的高度
      barHeight: {
        type: [String, Number],
        default: 6
      },
      // 单个tab的左或有内边距（左右相同）
      gutter: {
        type: [String, Number],
        default: 30
      },
      // 导航栏的背景颜色
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      // 读取传入的数组对象的属性(tab名称)
      name: {
        type: String,
        default: "name"
      },
      // 读取传入的数组对象的属性(徽标数)
      count: {
        type: String,
        default: "count"
      },
      // 徽标数位置偏移
      offset: {
        type: Array,
        default: () => {
          return [5, 20];
        }
      },
      // 活动tab字体是否加粗
      bold: {
        type: Boolean,
        default: true
      },
      // 当前活动tab item的样式
      activeItemStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 是否显示底部的滑块
      showBar: {
        type: Boolean,
        default: true
      },
      // 底部滑块的自定义样式
      barStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 标签的宽度
      itemWidth: {
        type: [Number, String],
        default: "auto"
      }
    },
    data() {
      return {
        scrollLeft: 0,
        // 滚动scroll-view的左边滚动距离
        tabQueryInfo: [],
        // 存放对tab菜单查询后的节点信息
        componentWidth: 0,
        // 屏幕宽度，单位为px
        scrollBarLeft: 0,
        // 移动bar需要通过translateX()移动的距离
        parentLeft: 0,
        // 父元素(tabs组件)到屏幕左边的距离
        id: this.$u.guid(),
        // id值
        currentIndex: this.current,
        barFirstTimeMove: true
        // 滑块第一次移动时(页面刚生成时)，无需动画，否则给人怪异的感觉
      };
    },
    watch: {
      // 监听tab的变化，重新计算tab菜单的布局信息，因为实际使用中菜单可能是通过
      // 后台获取的（如新闻app顶部的菜单），获取返回需要一定时间，所以list变化时，重新获取布局信息
      list(n, o) {
        if (n.length !== o.length)
          this.currentIndex = 0;
        this.$nextTick(() => {
          this.init();
        });
      },
      current: {
        immediate: true,
        handler(nVal, oVal) {
          this.$nextTick(() => {
            this.currentIndex = nVal;
            this.scrollByIndex();
          });
        }
      },
      valueCom: {
        immediate: true,
        handler(nVal, oVal) {
          this.$nextTick(() => {
            this.currentIndex = nVal;
            this.scrollByIndex();
          });
        }
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      // 移动bar的样式
      tabBarStyle() {
        let style = {
          width: this.barWidth + "rpx",
          transform: `translate(${this.scrollBarLeft}px, -100%)`,
          // 滑块在页面渲染后第一次滑动时，无需动画效果
          "transition-duration": `${this.barFirstTimeMove ? 0 : this.duration}s`,
          "background-color": this.activeColor,
          height: this.barHeight + "rpx",
          // 设置一个很大的值，它会自动取能用的最大值，不用高度的一半，是因为高度可能是单数，会有小数出现
          "border-radius": `${this.barHeight / 2}px`
        };
        Object.assign(style, this.barStyle);
        return style;
      },
      // tab的样式
      tabItemStyle() {
        return (index) => {
          let style = {
            height: this.height + "rpx",
            "line-height": this.height + "rpx",
            "font-size": this.fontSize + "rpx",
            "transition-duration": `${this.duration}s`,
            padding: this.isScroll ? `0 ${this.gutter}rpx` : "",
            flex: this.isScroll ? "auto" : "1",
            width: this.$u.addUnit(this.itemWidth)
          };
          if (index == this.currentIndex && this.bold)
            style.fontWeight = "bold";
          if (index == this.currentIndex) {
            style.color = this.activeColor;
            style = Object.assign(style, this.activeItemStyle);
          } else {
            style.color = this.inactiveColor;
          }
          return style;
        };
      }
    },
    methods: {
      // 设置一个init方法，方便多处调用
      async init() {
        let tabRect = await this.$uGetRect("#" + this.id);
        this.parentLeft = tabRect.left;
        this.componentWidth = tabRect.width;
        this.getTabRect();
      },
      // 点击某一个tab菜单
      clickTab(index) {
        if (index == this.currentIndex)
          return;
        this.$emit("change", index);
        this.$emit("input", index);
        this.$emit("update:modelValue", index);
      },
      // 查询tab的布局信息
      getTabRect() {
        let query = uni.createSelectorQuery().in(this);
        for (let i = 0; i < this.list.length; i++) {
          query.select(`#u-tab-item-${i}`).fields({
            size: true,
            rect: true
          });
        }
        query.exec(
          function(res) {
            this.tabQueryInfo = res;
            this.scrollByIndex();
          }.bind(this)
        );
      },
      // 滚动scroll-view，让活动的tab处于屏幕的中间位置
      scrollByIndex() {
        let tabInfo = this.tabQueryInfo[this.currentIndex];
        if (!tabInfo)
          return;
        let tabWidth = tabInfo.width;
        let offsetLeft = tabInfo.left - this.parentLeft;
        let scrollLeft = offsetLeft - (this.componentWidth - tabWidth) / 2;
        this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft;
        let left = tabInfo.left + tabInfo.width / 2 - this.parentLeft;
        this.scrollBarLeft = left - uni.upx2px(this.barWidth) / 2;
        if (this.barFirstTimeMove == true) {
          setTimeout(() => {
            this.barFirstTimeMove = false;
          }, 100);
        }
      }
    },
    mounted() {
      this.init();
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_badge = resolveEasycom(vue.resolveDynamicComponent("u-badge"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-tabs",
        style: vue.normalizeStyle({
          background: $props.bgColor
        })
      },
      [
        vue.createCommentVNode(" $u.getRect()对组件根节点无效，因为写了.in(this)，故这里获取内层接点尺寸 "),
        vue.createElementVNode("view", { id: $data.id }, [
          vue.createElementVNode("scroll-view", {
            "scroll-x": "",
            class: "u-scroll-view",
            "scroll-left": $data.scrollLeft,
            "scroll-with-animation": ""
          }, [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["u-scroll-box", { "u-tabs-scroll-flex": !$props.isScroll }]),
              id: $data.id
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($props.list, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "u-tab-item u-line-1",
                    id: "u-tab-item-" + index,
                    key: index,
                    onClick: ($event) => $options.clickTab(index),
                    style: vue.normalizeStyle([$options.tabItemStyle(index)])
                  }, [
                    vue.createVNode(_component_u_badge, {
                      count: item[$props.count] || item["count"] || 0,
                      offset: $props.offset,
                      size: "mini"
                    }, null, 8, ["count", "offset"]),
                    vue.createTextVNode(
                      " " + vue.toDisplayString(item[$props.name] || item["name"]),
                      1
                      /* TEXT */
                    )
                  ], 12, ["id", "onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              $props.showBar ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "u-tab-bar",
                  style: vue.normalizeStyle([$options.tabBarStyle])
                },
                null,
                4
                /* STYLE */
              )) : vue.createCommentVNode("v-if", true)
            ], 10, ["id"])
          ], 8, ["scroll-left"])
        ], 8, ["id"])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$f], ["__scopeId", "data-v-750d9d75"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-tabs/u-tabs.vue"]]);
  function getRouteId(fn) {
    const routes = getCurrentPages();
    let curParam = routes[routes.length - 1].options.id;
    return curParam;
  }
  function getMenuId(moduleName) {
    let menuList = [];
    if (menuList.length === 0) {
      menuList = uni.getStorageSync("permissionList");
    }
    for (let val of menuList) {
      if (val.moduleName === moduleName) {
        return val.modelId;
      }
    }
    return;
  }
  function getDictionaryDataSelector(dictionaryTypeId) {
    return request({
      url: `/api/system/DictionaryData/${dictionaryTypeId}/Data/Selector`,
      method: "GET"
    });
  }
  const _sfc_main$v = {
    __name: "project",
    setup(__props) {
      let dataForm = vue.reactive({});
      function initData() {
        let projectId2 = uni.getStorageSync("projectId");
        return getProjectDetail(projectId2).then((res) => {
          Object.assign(dataForm, res.data);
          formatAppLog("log", "at pages/sampleDetection/detail/project.vue:48", dataForm);
        });
      }
      function getData(beforeTime) {
        const currentTimeStamp = (/* @__PURE__ */ new Date()).getTime();
        const targetDate = new Date(beforeTime);
        const targetTimeStamp = targetDate.getTime();
        const timeStampDiff = targetTimeStamp - currentTimeStamp;
        const nonNegativeDiff = Math.max(0, timeStampDiff);
        const daysDiff = { workData: Math.ceil(nonNegativeDiff / (1e3 * 60 * 60 * 24)) };
        Object.assign(dataForm, daysDiff);
      }
      function gettypeidOptions() {
        return getDictionaryDataSelector("327816685773922437").then((res) => {
          Object.assign(res.data.list);
          let name = { typeName: res.data.list.filter((item) => item.enCode === dataForm.typeid).map((item) => item.fullName) };
          Object.assign(dataForm, name);
        });
      }
      onLoad(async () => {
        await initData();
        await gettypeidOptions();
        getData(dataForm.registertime);
      });
      return (_ctx, _cache) => {
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_2$2);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_3$1);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_4$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "pr-container" }, [
          vue.createVNode(_component_u_form, {
            model: vue.unref(dataForm),
            ref: "Form",
            style: { "margin": "10px" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_u_form_item, {
                "label-width": "100px",
                label: "项目编号",
                prop: "encode"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: vue.unref(dataForm).encode,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(dataForm).encode = $event),
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_u_form_item, {
                "label-width": "100px",
                label: "项目类型",
                prop: "typeid"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: vue.unref(dataForm).typeName,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(dataForm).typeName = $event),
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_u_form_item, {
                "label-width": "100px",
                label: "启动时间",
                prop: "registertime"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: vue.unref(dataForm).registertime,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(dataForm).registertime = $event),
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_u_form_item, {
                "label-width": "100px",
                label: "计划工期",
                prop: "planworkload"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: vue.unref(dataForm).planworkload,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(dataForm).planworkload = $event),
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_u_form_item, {
                "label-width": "100px",
                label: "运行时长",
                prop: "workData"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: vue.unref(dataForm).workData,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(dataForm).workData = $event),
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_u_form_item, {
                "label-width": "100px",
                label: "项目地址",
                prop: "address"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: vue.unref(dataForm).address,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(dataForm).address = $event),
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_u_form_item, {
                "label-width": "100px",
                label: "项目业主",
                prop: "customid"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: vue.unref(dataForm).customid,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.unref(dataForm).customid = $event),
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_u_form_item, {
                "label-width": "100px",
                label: "备注",
                prop: "remark"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: vue.unref(dataForm).remark,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => vue.unref(dataForm).remark = $event),
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model"])
        ]);
      };
    }
  };
  const project = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/detail/project.vue"]]);
  const _sfc_main$u = {};
  function _sfc_render$e(_ctx, _cache) {
    return " hell ";
  }
  const member = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$e], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/detail/member.vue"]]);
  const _sfc_main$t = {};
  function _sfc_render$d(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "driver" });
  }
  const driver = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$d], ["__scopeId", "data-v-4c4c9b0b"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/components/driver.vue"]]);
  const _sfc_main$s = {
    __name: "index",
    setup(__props) {
      const linkOptions = vue.ref([
        {
          id: 0,
          iconName: "采样",
          iconUrl: "/static/project-icons/caiyang.svg",
          routerUrl: "/pages/sampleDetection/sampling/index"
        },
        {
          id: 1,
          iconName: "送样",
          iconUrl: "/static/project-icons/songyang.svg",
          routerUrl: ""
        },
        {
          id: 2,
          iconName: "收样",
          iconUrl: "/static/project-icons/shouyang.svg",
          routerUrl: ""
        },
        {
          id: 3,
          iconName: "质控",
          iconUrl: "/static/project-icons/zhikong.svg",
          routerUrl: ""
        }
      ]);
      const tabOptions = vue.reactive([
        {
          name: "项目"
        },
        {
          name: "成员"
        }
      ]);
      const tabCurent = vue.ref(0);
      function change(index) {
        formatAppLog("log", "at pages/sampleDetection/detail/index.vue:70", "index", index);
      }
      vue.reactive(null);
      function goToSampling(router) {
        const projectId2 = uni.getStorageSync("projectId");
        uni.navigateTo({
          url: `${router}?id=${projectId2}`
        });
      }
      return (_ctx, _cache) => {
        const _component_u_tabs = resolveEasycom(vue.resolveDynamicComponent("u-tabs"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "detail-container" }, [
          vue.createElementVNode("view", { class: "link-container" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(linkOptions.value, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  onClick: ($event) => goToSampling(item.routerUrl),
                  class: "link-box",
                  key: item.id
                }, [
                  vue.createElementVNode("img", {
                    src: item.iconUrl,
                    style: { "width": "45rpx" }
                  }, null, 8, ["src"]),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.iconName),
                    1
                    /* TEXT */
                  )
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "tab-box" }, [
            vue.createVNode(_component_u_tabs, {
              list: tabOptions,
              "is-scroll": true,
              modelValue: tabCurent.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tabCurent.value = $event),
              onChange: change
            }, null, 8, ["list", "modelValue"])
          ]),
          vue.createVNode(driver),
          !tabCurent.value ? (vue.openBlock(), vue.createBlock(project, { key: 0 })) : (vue.openBlock(), vue.createBlock(member, { key: 1 }))
        ]);
      };
    }
  };
  const PagesSampleDetectionDetailIndex = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-05d2ade6"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/detail/index.vue"]]);
  const _sfc_main$r = {
    name: "uniTh",
    options: {
      virtualHost: true
    },
    components: {},
    emits: ["sort-change", "filter-change"],
    props: {
      width: {
        type: [String, Number],
        default: ""
      },
      align: {
        type: String,
        default: "left"
      },
      rowspan: {
        type: [Number, String],
        default: 1
      },
      colspan: {
        type: [Number, String],
        default: 1
      },
      sortable: {
        type: Boolean,
        default: false
      },
      filterType: {
        type: String,
        default: ""
      },
      filterData: {
        type: Array,
        default() {
          return [];
        }
      },
      filterDefaultValue: {
        type: [Array, String],
        default() {
          return "";
        }
      }
    },
    data() {
      return {
        border: false,
        ascending: false,
        descending: false
      };
    },
    computed: {
      // 根据props中的width属性 自动匹配当前th的宽度(px)
      customWidth() {
        if (typeof this.width === "number") {
          return this.width;
        } else if (typeof this.width === "string") {
          let regexHaveUnitPx = new RegExp(/^[1-9][0-9]*px$/g);
          let regexHaveUnitRpx = new RegExp(/^[1-9][0-9]*rpx$/g);
          let regexHaveNotUnit = new RegExp(/^[1-9][0-9]*$/g);
          if (this.width.match(regexHaveUnitPx) !== null) {
            return this.width.replace("px", "");
          } else if (this.width.match(regexHaveUnitRpx) !== null) {
            let numberRpx = Number(this.width.replace("rpx", ""));
            let widthCoe = uni.getSystemInfoSync().screenWidth / 750;
            return Math.round(numberRpx * widthCoe);
          } else if (this.width.match(regexHaveNotUnit) !== null) {
            return this.width;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      contentAlign() {
        let align = "left";
        switch (this.align) {
          case "left":
            align = "flex-start";
            break;
          case "center":
            align = "center";
            break;
          case "right":
            align = "flex-end";
            break;
        }
        return align;
      }
    },
    created() {
      this.root = this.getTable("uniTable");
      this.rootTr = this.getTable("uniTr");
      this.rootTr.minWidthUpdate(this.customWidth ? this.customWidth : 140);
      this.border = this.root.border;
      this.root.thChildren.push(this);
    },
    methods: {
      sort() {
        if (!this.sortable)
          return;
        this.clearOther();
        if (!this.ascending && !this.descending) {
          this.ascending = true;
          this.$emit("sort-change", { order: "ascending" });
          return;
        }
        if (this.ascending && !this.descending) {
          this.ascending = false;
          this.descending = true;
          this.$emit("sort-change", { order: "descending" });
          return;
        }
        if (!this.ascending && this.descending) {
          this.ascending = false;
          this.descending = false;
          this.$emit("sort-change", { order: null });
        }
      },
      ascendingFn() {
        this.clearOther();
        this.ascending = !this.ascending;
        this.descending = false;
        this.$emit("sort-change", { order: this.ascending ? "ascending" : null });
      },
      descendingFn() {
        this.clearOther();
        this.descending = !this.descending;
        this.ascending = false;
        this.$emit("sort-change", { order: this.descending ? "descending" : null });
      },
      clearOther() {
        this.root.thChildren.map((item) => {
          if (item !== this) {
            item.ascending = false;
            item.descending = false;
          }
          return item;
        });
      },
      ondropdown(e) {
        this.$emit("filter-change", e);
      },
      /**
       * 获取父元素实例
       */
      getTable(name) {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-table-th", { "table--border": $data.border }]),
        style: vue.normalizeStyle({ width: $options.customWidth + "px", "text-align": $props.align })
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$c], ["__scopeId", "data-v-bf970acd"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/uni-table/components/uni-th/uni-th.vue"]]);
  const _sfc_main$q = {
    name: "TableCheckbox",
    emits: ["checkboxSelected"],
    props: {
      indeterminate: {
        type: Boolean,
        default: false
      },
      checked: {
        type: [Boolean, String],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: -1
      },
      cellData: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    watch: {
      checked(newVal) {
        if (typeof this.checked === "boolean") {
          this.isChecked = newVal;
        } else {
          this.isChecked = true;
        }
      },
      indeterminate(newVal) {
        this.isIndeterminate = newVal;
      }
    },
    data() {
      return {
        isChecked: false,
        isDisabled: false,
        isIndeterminate: false
      };
    },
    created() {
      if (typeof this.checked === "boolean") {
        this.isChecked = this.checked;
      }
      this.isDisabled = this.disabled;
    },
    methods: {
      selected() {
        if (this.isDisabled)
          return;
        this.isIndeterminate = false;
        this.isChecked = !this.isChecked;
        this.$emit("checkboxSelected", {
          checked: this.isChecked,
          data: this.cellData
        });
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-table-checkbox",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.selected && $options.selected(...args))
    }, [
      !$props.indeterminate ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["checkbox__inner", { "is-checked": $data.isChecked, "is-disable": $data.isDisabled }])
        },
        [
          vue.createElementVNode("view", { class: "checkbox__inner-icon" })
        ],
        2
        /* CLASS */
      )) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "checkbox__inner checkbox--indeterminate"
      }, [
        vue.createElementVNode("view", { class: "checkbox__inner-icon" })
      ]))
    ]);
  }
  const tableCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$b], ["__scopeId", "data-v-25e435b1"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/uni-table/components/uni-tr/table-checkbox.vue"]]);
  const _sfc_main$p = {
    name: "uniTr",
    components: { tableCheckbox },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      keyValue: {
        type: [String, Number],
        default: ""
      }
    },
    options: {
      virtualHost: true
    },
    data() {
      return {
        value: false,
        border: false,
        selection: false,
        widthThArr: [],
        ishead: true,
        checked: false,
        indeterminate: false
      };
    },
    created() {
      this.root = this.getTable();
      this.head = this.getTable("uniThead");
      if (this.head) {
        this.ishead = false;
        this.head.init(this);
      }
      this.border = this.root.border;
      this.selection = this.root.type;
      this.root.trChildren.push(this);
      const rowData = this.root.data.find((v) => v[this.root.rowKey] === this.keyValue);
      if (rowData) {
        this.rowData = rowData;
      }
      this.root.isNodata();
    },
    mounted() {
      if (this.widthThArr.length > 0) {
        const selectionWidth = this.selection === "selection" ? 50 : 0;
        this.root.minWidth = Number(this.widthThArr.reduce((a, b) => Number(a) + Number(b))) + selectionWidth;
      }
    },
    unmounted() {
      const index = this.root.trChildren.findIndex((i) => i === this);
      this.root.trChildren.splice(index, 1);
      this.root.isNodata();
    },
    methods: {
      minWidthUpdate(width) {
        this.widthThArr.push(width);
        if (this.widthThArr.length > 0) {
          const selectionWidth = this.selection === "selection" ? 50 : 0;
          this.root.minWidth = Number(this.widthThArr.reduce((a, b) => Number(a) + Number(b))) + selectionWidth;
        }
      },
      // 选中
      checkboxSelected(e) {
        let rootData = this.root.data.find((v) => v[this.root.rowKey] === this.keyValue);
        this.checked = e.checked;
        this.root.check(rootData || this, e.checked, rootData ? this.keyValue : null);
      },
      change(e) {
        this.root.trChildren.forEach((item) => {
          if (item === this) {
            this.root.check(this, e.detail.value.length > 0 ? true : false);
          }
        });
      },
      /**
       * 获取父元素实例
       */
      getTable(name = "uniTable") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_table_checkbox = vue.resolveComponent("table-checkbox");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-table-tr" }, [
      $data.selection === "selection" ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["checkbox", { "tr-table--border": $data.border }])
        },
        [
          vue.createVNode(_component_table_checkbox, {
            checked: $data.checked,
            indeterminate: $data.indeterminate,
            disabled: $props.disabled,
            onCheckboxSelected: $options.checkboxSelected
          }, null, 8, ["checked", "indeterminate", "disabled", "onCheckboxSelected"])
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$a], ["__scopeId", "data-v-b48b3e32"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/uni-table/components/uni-tr/uni-tr.vue"]]);
  const _sfc_main$o = {
    name: "uniTd",
    options: {
      virtualHost: true
    },
    props: {
      width: {
        type: [String, Number],
        default: ""
      },
      align: {
        type: String,
        default: "left"
      },
      rowspan: {
        type: [Number, String],
        default: 1
      },
      colspan: {
        type: [Number, String],
        default: 1
      }
    },
    data() {
      return {
        border: false
      };
    },
    created() {
      this.root = this.getTable();
      this.border = this.root.border;
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getTable() {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== "uniTable") {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(` :class="{'table--border':border}"  `),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-table-td", { "table--border": $data.border }]),
            style: vue.normalizeStyle({ width: $props.width + "px", "text-align": $props.align })
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$9], ["__scopeId", "data-v-edae4802"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/uni-table/components/uni-td/uni-td.vue"]]);
  const _sfc_main$n = {
    name: "uniTable",
    options: {
      virtualHost: true
    },
    emits: ["selection-change"],
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      // 是否有竖线
      border: {
        type: Boolean,
        default: false
      },
      // 是否显示斑马线
      stripe: {
        type: Boolean,
        default: false
      },
      // 多选
      type: {
        type: String,
        default: ""
      },
      // 没有更多数据
      emptyText: {
        type: String,
        default: "没有更多数据"
      },
      loading: {
        type: Boolean,
        default: false
      },
      rowKey: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        noData: true,
        minWidth: 0,
        multiTableHeads: []
      };
    },
    watch: {
      loading(val) {
      },
      data(newVal) {
        this.theadChildren;
        if (this.theadChildren) {
          this.theadChildren.rowspan;
        }
        this.noData = false;
      }
    },
    created() {
      this.trChildren = [];
      this.thChildren = [];
      this.theadChildren = null;
      this.backData = [];
      this.backIndexData = [];
    },
    methods: {
      isNodata() {
        this.theadChildren;
        let rowspan = 1;
        if (this.theadChildren) {
          rowspan = this.theadChildren.rowspan;
        }
        this.noData = this.trChildren.length - rowspan <= 0;
      },
      /**
       * 选中所有
       */
      selectionAll() {
        let startIndex = 1;
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        } else {
          startIndex = theadChildren.rowspan - 1;
        }
        let isHaveData = this.data && this.data.length > 0;
        theadChildren.checked = true;
        theadChildren.indeterminate = false;
        this.trChildren.forEach((item, index) => {
          if (!item.disabled) {
            item.checked = true;
            if (isHaveData && item.keyValue) {
              const row = this.data.find((v) => v[this.rowKey] === item.keyValue);
              if (!this.backData.find((v) => v[this.rowKey] === row[this.rowKey])) {
                this.backData.push(row);
              }
            }
            if (index > startIndex - 1 && this.backIndexData.indexOf(index - startIndex) === -1) {
              this.backIndexData.push(index - startIndex);
            }
          }
        });
        this.$emit("selection-change", {
          detail: {
            value: this.backData,
            index: this.backIndexData
          }
        });
      },
      /**
       * 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
       */
      toggleRowSelection(row, selected) {
        row = [].concat(row);
        this.trChildren.forEach((item, index) => {
          const select = row.findIndex((v) => {
            if (typeof v === "number") {
              return v === index - 1;
            } else {
              return v[this.rowKey] === item.keyValue;
            }
          });
          let ischeck = item.checked;
          if (select !== -1) {
            if (typeof selected === "boolean") {
              item.checked = selected;
            } else {
              item.checked = !item.checked;
            }
            if (ischeck !== item.checked) {
              this.check(item.rowData || item, item.checked, item.rowData ? item.keyValue : null, true);
            }
          }
        });
        this.$emit("selection-change", {
          detail: {
            value: this.backData,
            index: this.backIndexData
          }
        });
      },
      /**
       * 用于多选表格，清空用户的选择
       */
      clearSelection() {
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        }
        theadChildren.checked = false;
        theadChildren.indeterminate = false;
        this.trChildren.forEach((item) => {
          item.checked = false;
        });
        this.backData = [];
        this.backIndexData = [];
        this.$emit("selection-change", {
          detail: {
            value: [],
            index: []
          }
        });
      },
      /**
       * 用于多选表格，切换所有行的选中状态
       */
      toggleAllSelection() {
        let list = [];
        let startIndex = 1;
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        } else {
          startIndex = theadChildren.rowspan - 1;
        }
        this.trChildren.forEach((item, index) => {
          if (!item.disabled) {
            if (index > startIndex - 1) {
              list.push(index - startIndex);
            }
          }
        });
        this.toggleRowSelection(list);
      },
      /**
       * 选中\取消选中
       * @param {Object} child
       * @param {Object} check
       * @param {Object} rowValue
       */
      check(child, check, keyValue, emit) {
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        }
        let childDomIndex = this.trChildren.findIndex((item, index) => child === item);
        if (childDomIndex < 0) {
          childDomIndex = this.data.findIndex((v) => v[this.rowKey] === keyValue) + 1;
        }
        this.trChildren.filter((v) => !v.disabled && v.keyValue).length;
        if (childDomIndex === 0) {
          check ? this.selectionAll() : this.clearSelection();
          return;
        }
        if (check) {
          if (keyValue) {
            this.backData.push(child);
          }
          this.backIndexData.push(childDomIndex - 1);
        } else {
          const index = this.backData.findIndex((v) => v[this.rowKey] === keyValue);
          const idx = this.backIndexData.findIndex((item) => item === childDomIndex - 1);
          if (keyValue) {
            this.backData.splice(index, 1);
          }
          this.backIndexData.splice(idx, 1);
        }
        const domCheckAll = this.trChildren.find((item, index) => index > 0 && !item.checked && !item.disabled);
        if (!domCheckAll) {
          theadChildren.indeterminate = false;
          theadChildren.checked = true;
        } else {
          theadChildren.indeterminate = true;
          theadChildren.checked = false;
        }
        if (this.backIndexData.length === 0) {
          theadChildren.indeterminate = false;
        }
        if (!emit) {
          this.$emit("selection-change", {
            detail: {
              value: this.backData,
              index: this.backIndexData
            }
          });
        }
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-table-scroll", { "table--border": $props.border, "border-none": !$data.noData }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-table", { "table--stripe": $props.stripe }]),
            style: vue.normalizeStyle({ "min-width": $data.minWidth + "px" })
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
            $data.noData ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-table-loading"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["uni-table-text", { "empty-border": $props.border }])
                },
                vue.toDisplayString($props.emptyText),
                3
                /* TEXT, CLASS */
              )
            ])) : vue.createCommentVNode("v-if", true),
            $props.loading ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: vue.normalizeClass(["uni-table-mask", { "empty-border": $props.border }])
              },
              [
                vue.createElementVNode("div", { class: "uni-table--loader" })
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$8], ["__scopeId", "data-v-c1ea9b5d"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/uni-table/components/uni-table/uni-table.vue"]]);
  const _sfc_main$m = {
    __name: "index",
    setup(__props) {
      const dataList = vue.reactive({});
      function getList() {
        let menuId = getMenuId("项目列表");
        let projectId2 = getRouteId();
        let query = {
          currentPage: 1,
          pageSize: 0,
          sort: "desc",
          sidx: "",
          menuId,
          projectId: projectId2
        };
        getHoleBaseList(query).then((res) => {
          Object.assign(dataList, res.data.list);
          formatAppLog("log", "at pages/sampleDetection/sampling/monitorPoint/index.vue:35", dataList);
        });
        formatAppLog("log", "at pages/sampleDetection/sampling/monitorPoint/index.vue:37", getRouteId());
      }
      function goHoleBase(holeId) {
        uni.setStorageSync("holeId", holeId);
        uni.navigateTo({
          url: "/pages/sampleDetection/sampling/pageMonitoringPoint/index"
        });
      }
      onLoad(() => {
        getList();
      });
      return (_ctx, _cache) => {
        const _component_uni_th = resolveEasycom(vue.resolveDynamicComponent("uni-th"), __easycom_0$1);
        const _component_uni_tr = resolveEasycom(vue.resolveDynamicComponent("uni-tr"), __easycom_1$2);
        const _component_uni_td = resolveEasycom(vue.resolveDynamicComponent("uni-td"), __easycom_2);
        const _component_uni_table = resolveEasycom(vue.resolveDynamicComponent("uni-table"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "mo-container" }, [
          vue.createVNode(_component_uni_table, {
            border: "",
            emptyText: "暂无更多数据"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_tr, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("监测点位编号")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("采样类型")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(dataList, (item) => {
                  return vue.openBlock(), vue.createBlock(
                    _component_uni_tr,
                    null,
                    {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_td, {
                          onClick: ($event) => goHoleBase(item.id),
                          align: "center"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(item.holeNo),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["onClick"]),
                        vue.createVNode(
                          _component_uni_td,
                          { align: "center" },
                          {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(
                                vue.toDisplayString(item.holeType),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  );
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  };
  const monitorPoint = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/monitorPoint/index.vue"]]);
  const _sfc_main$l = {
    __name: "index",
    setup(__props) {
      const dataList = vue.ref(null);
      function getList() {
        let menuId = getMenuId("项目列表");
        let projectId2 = getRouteId();
        let query = {
          currentPage: 1,
          pageSize: 0,
          sort: "desc",
          sidx: "",
          menuId,
          projectId: projectId2
        };
        getQCSampleList(query).then((res) => {
          dataList.value = res.data.list;
        });
        formatAppLog("log", "at pages/sampleDetection/sampling/qualitySample/index.vue:28", getRouteId());
      }
      onLoad(() => {
        getList();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "qc-container" });
      };
    }
  };
  const qualitySample = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/qualitySample/index.vue"]]);
  const _sfc_main$k = {
    __name: "index",
    setup(__props) {
      vue.ref(false);
      function goToBack() {
        uni.navigateBack({ delta: 1 });
      }
      function goAddOrEditorData(id) {
        uni.setStorageSync("addFlag", id);
        uni.navigateTo({
          url: `/pages/sampleDetection/sampling/monitorPoint/addOrEditor`
        });
      }
      const tabOptions = vue.ref([
        { name: "检测点位" },
        { name: "质控样品" }
      ]);
      const tabCurent = vue.ref(0);
      function change(index) {
        formatAppLog("log", "at pages/sampleDetection/sampling/index.vue:51", "index", index);
      }
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$4);
        const _component_u_tabs = resolveEasycom(vue.resolveDynamicComponent("u-tabs"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "main-container" }, [
          vue.createElementVNode("view", { class: "status_bar" }, [
            vue.createElementVNode("view", { class: "top_view" })
          ]),
          vue.createElementVNode("view", { class: "sa-container" }, [
            vue.createElementVNode("view", {
              class: "nav-bar",
              style: { "position": "relative", "box-sizing": "border-box", "width": "100vw", "height": "44px" }
            }, [
              vue.createVNode(_component_uni_icons, {
                onClick: _cache[0] || (_cache[0] = ($event) => goToBack()),
                type: "left",
                size: "30",
                style: { "line-height": "44px" }
              }),
              vue.createElementVNode("text", {
                class: "title",
                style: { "font-size": "16px", "position": "absolute", "left": "50%", "top": "50%", "transform": "translate(-50%,-50%)" }
              }, "采样信息"),
              vue.createVNode(_component_uni_icons, {
                onClick: _cache[1] || (_cache[1] = ($event) => goAddOrEditorData(true)),
                class: "add",
                type: "plus-filled",
                size: "30",
                style: { "color": "blue", "line-height": "44px", "margin-right": "10px", "float": "right" }
              })
            ]),
            vue.createElementVNode("view", { class: "tab-box" }, [
              vue.createVNode(_component_u_tabs, {
                list: tabOptions.value,
                "is-scroll": true,
                modelValue: tabCurent.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => tabCurent.value = $event),
                onChange: change
              }, null, 8, ["list", "modelValue"])
            ]),
            vue.createElementVNode("view", { class: "content" }, [
              !tabCurent.value ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "monitor-container"
              }, [
                vue.createVNode(monitorPoint)
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "quality-container"
              }, [
                vue.createVNode(qualitySample)
              ]))
            ])
          ])
        ]);
      };
    }
  };
  const PagesSampleDetectionSamplingIndex = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/index.vue"]]);
  const _sfc_main$j = {
    emits: ["update:modelValue", "input", "confirm"],
    props: {
      // 通过双向绑定控制组件的弹出与收起
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      // 列数据
      list: {
        type: Array,
        default() {
          return [];
        }
      },
      // 是否显示边框
      border: {
        type: Boolean,
        default: true
      },
      // "取消"按钮的颜色
      cancelColor: {
        type: String,
        default: "#606266"
      },
      // "确定"按钮的颜色
      confirmColor: {
        type: String,
        default: "#2979ff"
      },
      // 弹出的z-index值
      zIndex: {
        type: [String, Number],
        default: 0
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // 是否允许通过点击遮罩关闭Picker
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      // 提供的默认选中的下标
      defaultValue: {
        type: Array,
        default() {
          return [0];
        }
      },
      // 模式选择，single-column-单列，mutil-column-多列，mutil-column-auto-多列联动
      mode: {
        type: String,
        default: "single-column"
      },
      // 自定义value属性名
      valueName: {
        type: String,
        default: "value"
      },
      // 自定义label属性名
      labelName: {
        type: String,
        default: "label"
      },
      // 自定义多列联动模式的children属性名
      childName: {
        type: String,
        default: "children"
      },
      // 顶部标题
      title: {
        type: String,
        default: ""
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确认"
      },
      // 遮罩的模糊度
      blur: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        popupValue: false,
        // 用于列改变时，保存当前的索引，下一次变化时比较得出是哪一列发生了变化
        defaultSelector: [0],
        // picker-view的数据
        columnData: [],
        // 每次队列发生变化时，保存选择的结果
        selectValue: [],
        // 上一次列变化时的index
        lastSelectIndex: [],
        // 列数
        columnNum: 0,
        // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
        moving: false,
        reset: false
      };
    },
    watch: {
      // 在select弹起的时候，重新初始化所有数据
      valueCom: {
        immediate: true,
        handler(val) {
          if (val) {
            this.reset = true;
            setTimeout(() => this.init(), 10);
          }
          this.popupValue = val;
        }
      }
    },
    computed: {
      uZIndex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      },
      valueCom() {
        return this.modelValue;
      },
      // 用来兼容小程序、App、h5
      showColumnCom() {
        return true;
      }
    },
    methods: {
      // 标识滑动开始，只有微信小程序才有这样的事件
      pickstart() {
      },
      // 标识滑动结束
      pickend() {
      },
      init() {
        this.reset = false;
        this.setColumnNum();
        this.setDefaultSelector();
        this.setColumnData();
        this.setSelectValue();
      },
      // 获取默认选中列下标
      setDefaultSelector() {
        this.defaultSelector = this.defaultValue.length == this.columnNum ? this.defaultValue : Array(this.columnNum).fill(0);
        this.lastSelectIndex = this.$u.deepClone(this.defaultSelector);
      },
      // 计算列数
      setColumnNum() {
        if (this.mode == "single-column")
          this.columnNum = 1;
        else if (this.mode == "mutil-column")
          this.columnNum = this.list.length;
        else if (this.mode == "mutil-column-auto") {
          let num = 1;
          let column = this.list;
          while (column[0][this.childName]) {
            column = column[0] ? column[0][this.childName] : {};
            num++;
          }
          this.columnNum = num;
        }
      },
      // 获取需要展示在picker中的列数据
      setColumnData() {
        let data = [];
        this.selectValue = [];
        if (this.mode == "mutil-column-auto") {
          let column = this.list[this.defaultSelector.length ? this.defaultSelector[0] : 0];
          for (let i = 0; i < this.columnNum; i++) {
            if (i == 0) {
              data[i] = this.list;
              column = column[this.childName];
            } else {
              data[i] = column;
              column = column[this.defaultSelector[i]][this.childName];
            }
          }
        } else if (this.mode == "single-column") {
          data[0] = this.list;
        } else {
          data = this.list;
        }
        this.columnData = data;
      },
      // 获取默认选中的值，如果没有设置defaultValue，就默认选中每列的第一个
      setSelectValue() {
        let tmp = null;
        for (let i = 0; i < this.columnNum; i++) {
          tmp = this.columnData[i][this.defaultSelector[i]];
          let data = {
            index: this.defaultSelector[i],
            value: tmp ? tmp[this.valueName] : null,
            label: tmp ? tmp[this.labelName] : null
          };
          if (tmp && tmp.extra !== void 0)
            data.extra = tmp.extra;
          this.selectValue.push(data);
        }
      },
      // 列选项
      columnChange(e) {
        let index = null;
        let columnIndex = e.detail.value;
        this.selectValue = [];
        if (this.mode == "mutil-column-auto") {
          this.lastSelectIndex.map((val, idx) => {
            if (val != columnIndex[idx])
              index = idx;
          });
          this.defaultSelector = columnIndex;
          for (let i = index + 1; i < this.columnNum; i++) {
            this.columnData[i] = this.columnData[i - 1][i - 1 == index ? columnIndex[index] : 0][this.childName];
            this.defaultSelector[i] = 0;
          }
          columnIndex.map((item, index2) => {
            let data = this.columnData[index2][columnIndex[index2]];
            let tmp = {
              index: columnIndex[index2],
              value: data ? data[this.valueName] : null,
              label: data ? data[this.labelName] : null
            };
            if (data && data.extra !== void 0)
              tmp.extra = data.extra;
            this.selectValue.push(tmp);
          });
          this.lastSelectIndex = columnIndex;
        } else if (this.mode == "single-column") {
          let data = this.columnData[0][columnIndex[0]];
          let tmp = {
            index: columnIndex[0],
            value: data ? data[this.valueName] : null,
            label: data ? data[this.labelName] : null
          };
          if (data && data.extra !== void 0)
            tmp.extra = data.extra;
          this.selectValue.push(tmp);
          this.lastSelectIndex = columnIndex;
        } else if (this.mode == "mutil-column") {
          columnIndex.map((item, index2) => {
            let data = this.columnData[index2][columnIndex[index2]];
            let tmp = {
              index: columnIndex[index2],
              value: data ? data[this.valueName] : null,
              label: data ? data[this.labelName] : null
            };
            if (data && data.extra !== void 0)
              tmp.extra = data.extra;
            this.selectValue.push(tmp);
          });
          this.lastSelectIndex = columnIndex;
        }
      },
      close() {
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
      },
      // 点击确定或者取消
      getResult(event = null) {
        if (event)
          this.$emit(event, this.selectValue);
        this.close();
      },
      selectHandler() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-select" }, [
      vue.createCommentVNode(` <view class="u-select__action" :class="{\r
			'u-select--border': border\r
		}" @tap.stop="selectHandler">\r
			<view class="u-select__action__icon" :class="{\r
				'u-select__action__icon--reverse': value == true\r
			}">\r
				<u-icon name="arrow-down-fill" size="26" color="#c0c4cc"></u-icon>\r
			</view>\r
		</view> `),
      vue.createVNode(_component_u_popup, {
        blur: $props.blur,
        maskCloseAble: $props.maskCloseAble,
        mode: "bottom",
        popup: false,
        modelValue: $data.popupValue,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.popupValue = $event),
        length: "auto",
        safeAreaInsetBottom: $props.safeAreaInsetBottom,
        onClose: $options.close,
        "z-index": $options.uZIndex
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "u-select" }, [
            vue.createElementVNode(
              "view",
              {
                class: "u-select__header",
                onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers(() => {
                }, ["stop", "prevent"]))
              },
              [
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-select__header__cancel u-select__header__btn",
                    style: vue.normalizeStyle({ color: $props.cancelColor }),
                    "hover-class": "u-hover-class",
                    "hover-stay-time": 150,
                    onClick: _cache[0] || (_cache[0] = ($event) => $options.getResult("cancel"))
                  },
                  vue.toDisplayString($props.cancelText),
                  5
                  /* TEXT, STYLE */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "u-select__header__title" },
                  vue.toDisplayString($props.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-select__header__confirm u-select__header__btn",
                    style: vue.normalizeStyle({ color: $data.moving ? $props.cancelColor : $props.confirmColor }),
                    "hover-class": "u-hover-class",
                    "hover-stay-time": 150,
                    onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                    }, ["stop"])),
                    onClick: _cache[2] || (_cache[2] = vue.withModifiers(($event) => $options.getResult("confirm"), ["stop"]))
                  },
                  vue.toDisplayString($props.confirmText),
                  37
                  /* TEXT, STYLE, NEED_HYDRATION */
                )
              ],
              32
              /* NEED_HYDRATION */
            ),
            vue.createElementVNode("view", { class: "u-select__body" }, [
              vue.createElementVNode("picker-view", {
                onChange: _cache[4] || (_cache[4] = (...args) => $options.columnChange && $options.columnChange(...args)),
                class: "u-select__body__picker-view",
                value: $data.defaultSelector,
                onPickstart: _cache[5] || (_cache[5] = (...args) => $options.pickstart && $options.pickstart(...args)),
                onPickend: _cache[6] || (_cache[6] = (...args) => $options.pickend && $options.pickend(...args))
              }, [
                $options.showColumnCom ? (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  vue.renderList($data.columnData, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("picker-view-column", { key: index }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(item, (item1, index1) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "u-select__body__picker-view__item",
                            key: index1
                          }, [
                            vue.createElementVNode(
                              "view",
                              { class: "u-line-1" },
                              vue.toDisplayString(item1[$props.labelName]),
                              1
                              /* TEXT */
                            )
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true)
              ], 40, ["value"])
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["blur", "maskCloseAble", "modelValue", "safeAreaInsetBottom", "onClose", "z-index"])
    ]);
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$7], ["__scopeId", "data-v-2ab5fcb0"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-select/u-select.vue"]]);
  const _sfc_main$i = {
    name: "u-line-progress",
    props: {
      // 两端是否显示半圆形
      round: {
        type: Boolean,
        default: true
      },
      // 主题颜色
      type: {
        type: String,
        default: ""
      },
      // 激活部分的颜色
      activeColor: {
        type: String,
        default: "#19be6b"
      },
      inactiveColor: {
        type: String,
        default: "#ececec"
      },
      // 进度百分比，数值
      percent: {
        type: Number,
        default: 0
      },
      // 是否在进度条内部显示百分比的值
      showPercent: {
        type: Boolean,
        default: true
      },
      // 进度条的高度，单位rpx
      height: {
        type: [Number, String],
        default: 28
      },
      // 是否显示条纹
      striped: {
        type: Boolean,
        default: false
      },
      // 条纹是否显示活动状态
      stripedActive: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    computed: {
      progressStyle() {
        let style = {};
        style.width = this.percent + "%";
        if (this.activeColor)
          style.backgroundColor = this.activeColor;
        return style;
      }
    },
    methods: {}
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-progress",
        style: vue.normalizeStyle({
          borderRadius: $props.round ? "100rpx" : 0,
          height: $props.height + "rpx",
          backgroundColor: $props.inactiveColor
        })
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass([[
              $props.type ? `u-type-${$props.type}-bg` : "",
              $props.striped ? "u-striped" : "",
              $props.striped && $props.stripedActive ? "u-striped-active" : ""
            ], "u-active"]),
            style: vue.normalizeStyle([$options.progressStyle])
          },
          [
            _ctx.$slots.default || _ctx.$slots.$default ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : $props.showPercent ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createTextVNode(
                  vue.toDisplayString($props.percent + "%"),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$6], ["__scopeId", "data-v-af2fba7d"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-line-progress/u-line-progress.vue"]]);
  const _sfc_main$h = {
    name: "u-upload",
    emits: ["update:file-list", "on-oversize", "on-list-change", "on-preview", "on-remove", "on-success", "on-change", "on-error", "on-progress", "on-uploaded", "on-choose-complete", "on-choose-fail"],
    props: {
      //是否显示组件自带的图片预览功能
      showUploadList: {
        type: Boolean,
        default: true
      },
      // 后端地址
      action: {
        type: String,
        default: ""
      },
      // 最大上传数量
      maxCount: {
        type: [String, Number],
        default: 52
      },
      //  是否显示进度条
      showProgress: {
        type: Boolean,
        default: true
      },
      // 是否启用
      disabled: {
        type: Boolean,
        default: false
      },
      // 预览上传的图片时的裁剪模式，和image组件mode属性一致
      imageMode: {
        type: String,
        default: "aspectFill"
      },
      // 头部信息
      header: {
        type: Object,
        default() {
          return {};
        }
      },
      // 额外携带的参数
      formData: {
        type: Object,
        default() {
          return {};
        }
      },
      // 上传的文件字段名
      name: {
        type: String,
        default: "file"
      },
      // 所选的图片的尺寸, 可选值为original compressed
      sizeType: {
        type: Array,
        default() {
          return ["original", "compressed"];
        }
      },
      sourceType: {
        type: Array,
        default() {
          return ["album", "camera"];
        }
      },
      // 是否在点击预览图后展示全屏图片预览
      previewFullImage: {
        type: Boolean,
        default: true
      },
      // 是否开启图片多选，部分安卓机型不支持
      multiple: {
        type: Boolean,
        default: true
      },
      // 是否展示删除按钮
      deletable: {
        type: Boolean,
        default: true
      },
      // 文件大小限制，单位为byte
      maxSize: {
        type: [String, Number],
        default: Number.MAX_VALUE
      },
      // 显示已上传的文件列表
      fileList: {
        type: Array,
        default() {
          return [];
        }
      },
      // 上传区域的提示文字
      uploadText: {
        type: String,
        default: "选择图片"
      },
      // 是否自动上传
      autoUpload: {
        type: Boolean,
        default: true
      },
      // 是否显示toast消息提示
      showTips: {
        type: Boolean,
        default: true
      },
      // 是否通过slot自定义传入选择图标的按钮
      customBtn: {
        type: Boolean,
        default: false
      },
      // 内部预览图片区域和选择图片按钮的区域宽度
      width: {
        type: [String, Number],
        default: 200
      },
      // 内部预览图片区域和选择图片按钮的区域高度
      height: {
        type: [String, Number],
        default: 200
      },
      // 右上角关闭按钮的背景颜色
      delBgColor: {
        type: String,
        default: "#fa3534"
      },
      // 右上角关闭按钮的叉号图标的颜色
      delColor: {
        type: String,
        default: "#ffffff"
      },
      // 右上角删除图标名称，只能为uView内置图标
      delIcon: {
        type: String,
        default: "close"
      },
      // 右下角成功图标名称，只能为uView内置图标
      successIcon: {
        type: String,
        default: "checkbox-mark"
      },
      // 右下角成功的叉号图标的颜色
      successColor: {
        type: String,
        default: "#ffffff"
      },
      // 如果上传后的返回值为json字符串，是否自动转json
      toJson: {
        type: Boolean,
        default: true
      },
      // 上传前的钩子，每个文件上传前都会执行
      beforeUpload: {
        type: Function,
        default: null
      },
      // 移除文件前的钩子
      beforeRemove: {
        type: Function,
        default: null
      },
      // 允许上传的图片后缀
      limitType: {
        type: Array,
        default() {
          return ["png", "jpg", "jpeg", "webp", "gif", "image"];
        }
      },
      // 在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件
      index: {
        type: [Number, String],
        default: ""
      }
    },
    mounted() {
    },
    data() {
      return {
        lists: [],
        isInCount: true,
        uploading: false
      };
    },
    watch: {
      fileList: {
        immediate: true,
        handler(val) {
          let that = this;
          let lists = JSON.parse(JSON.stringify(that.lists));
          val.map((value) => {
            let tmp = lists.some((val2) => {
              return val2.url == value.url;
            });
            if (!tmp) {
              lists.push({ url: value.url, error: false, progress: 100 });
            }
          });
          that.lists = JSON.parse(JSON.stringify(lists));
        }
      },
      // 监听lists的变化，发出事件
      lists: {
        deep: true,
        handler(n) {
          this.$emit("update:file-list", n);
          this.$emit("on-list-change", n, this.index);
        }
      }
    },
    methods: {
      // 清除列表
      clear() {
        this.lists = [];
      },
      // 重新上传队列中上传失败的所有文件
      reUpload() {
        this.uploadFile();
      },
      // 选择图片
      selectFile() {
        let that = this;
        if (that.disabled)
          return;
        const { name = "", maxCount, multiple, maxSize, sizeType, camera, compressed, maxDuration, sourceType } = that;
        let chooseFile = null;
        let lists = JSON.parse(JSON.stringify(that.lists));
        const newMaxCount = maxCount - lists.length;
        chooseFile = new Promise((resolve, reject) => {
          uni.chooseImage({
            count: multiple ? newMaxCount > 9 ? 9 : newMaxCount : 1,
            sourceType,
            sizeType,
            success: resolve,
            fail: reject
          });
        });
        chooseFile.then((res) => {
          let listOldLength = that.lists.length;
          res.tempFiles.map((val, index) => {
            if (!that.checkFileExt(val))
              return;
            if (!multiple && index >= 1)
              return;
            if (val.size > maxSize) {
              that.$emit("on-oversize", val, that.lists, that.index);
              that.showToast("超出允许的文件大小");
            } else {
              if (maxCount <= lists.length) {
                that.$emit("on-exceed", val, that.lists, that.index);
                that.showToast("超出最大允许的文件个数");
                return;
              }
              lists.push({
                url: val.path,
                progress: 0,
                error: false,
                file: val
              });
            }
          });
          this.deepClone(lists, that.lists);
          that.$emit("on-choose-complete", that.lists, that.index);
          if (that.autoUpload)
            that.uploadFile(listOldLength);
        }).catch((error) => {
          that.$emit("on-choose-fail", error);
        });
      },
      // 提示用户消息
      showToast(message, force = false) {
        if (this.showTips || force) {
          uni.showToast({
            title: message,
            icon: "none"
          });
        }
      },
      // 该方法供用户通过ref调用，手动上传
      upload() {
        this.uploadFile();
      },
      // 对失败的图片重新上传
      retry(index) {
        this.lists[index].progress = 0;
        this.lists[index].error = false;
        this.lists[index].response = null;
        uni.showLoading({
          title: "重新上传"
        });
        this.uploadFile(index);
      },
      // 上传图片
      async uploadFile(index = 0) {
        if (this.disabled)
          return;
        if (this.uploading)
          return;
        if (index >= this.lists.length) {
          this.$emit("on-uploaded", this.lists, this.index);
          return;
        }
        if (this.lists[index].progress == 100) {
          if (this.autoUpload == false)
            this.uploadFile(index + 1);
          return;
        }
        if (this.beforeUpload && typeof this.beforeUpload === "function") {
          let beforeResponse = this.beforeUpload.bind(this.$u.$parent.call(this))(index, this.lists);
          if (!!beforeResponse && typeof beforeResponse.then === "function") {
            await beforeResponse.then((res) => {
            }).catch((err) => {
              return this.uploadFile(index + 1);
            });
          } else if (beforeResponse === false) {
            return this.uploadFile(index + 1);
          } else
            ;
        }
        if (!this.action) {
          this.showToast("请配置上传地址", true);
          return;
        }
        this.lists[index].error = false;
        this.uploading = true;
        const task = uni.uploadFile({
          url: this.action,
          filePath: this.lists[index].url,
          name: this.name,
          formData: this.formData,
          header: this.header,
          success: (res) => {
            let data = this.toJson && this.$u.test.jsonString(res.data) ? JSON.parse(res.data) : res.data;
            if (![200, 201, 204].includes(res.statusCode)) {
              this.uploadError(index, data);
            } else {
              this.lists[index].response = data;
              this.lists[index].progress = 100;
              this.lists[index].error = false;
              this.$emit("on-success", data, index, this.lists, this.index);
            }
          },
          fail: (e) => {
            this.uploadError(index, e);
          },
          complete: (res) => {
            uni.hideLoading();
            this.uploading = false;
            this.uploadFile(index + 1);
            this.$emit("on-change", res, index, this.lists, this.index);
          }
        });
        task.onProgressUpdate((res) => {
          if (res.progress > 0) {
            this.lists[index].progress = res.progress;
            this.$emit("on-progress", res, index, this.lists, this.index);
          }
        });
      },
      // 上传失败
      uploadError(index, err) {
        this.lists[index].progress = 0;
        this.lists[index].error = true;
        this.lists[index].response = null;
        this.$emit("on-error", err, index, this.lists, this.index);
        this.showToast("上传失败，请重试");
      },
      // 删除一个图片
      deleteItem(index) {
        uni.showModal({
          title: "提示",
          content: "您确定要删除此项吗？",
          success: async (res) => {
            if (res.confirm) {
              if (this.beforeRemove && typeof this.beforeRemove === "function") {
                let beforeResponse = this.beforeRemove.bind(this.$u.$parent.call(this))(index, this.lists);
                if (!!beforeResponse && typeof beforeResponse.then === "function") {
                  await beforeResponse.then((res2) => {
                    this.handlerDeleteItem(index);
                  }).catch((err) => {
                    this.showToast("已终止移除");
                  });
                } else if (beforeResponse === false) {
                  this.showToast("已终止移除");
                } else {
                  this.handlerDeleteItem(index);
                }
              } else {
                this.handlerDeleteItem(index);
              }
            }
          }
        });
      },
      // 执行移除图片的动作，上方代码只是判断是否可以移除
      handlerDeleteItem(index) {
        if (this.lists[index].progress < 100 && this.lists[index].progress > 0) {
          typeof this.lists[index].uploadTask != "undefined" && this.lists[index].uploadTask.abort();
        }
        this.lists.splice(index, 1);
        this.$forceUpdate();
        this.$emit("on-remove", index, this.lists, this.index);
      },
      // 用户通过ref手动的形式，移除一张图片
      remove(index) {
        if (index >= 0 && index < this.lists.length) {
          this.lists.splice(index, 1);
          this.$emit("on-list-change", this.lists, this.index);
        }
      },
      // 预览图片
      doPreviewImage(url2, index) {
        if (!this.previewFullImage) {
          this.$emit("on-preview", url2, this.lists, this.index);
          return;
        }
        const images = this.lists.map((item) => item.url || item.path);
        uni.previewImage({
          urls: images,
          current: url2,
          success: () => {
            this.$emit("on-preview", url2, this.lists, this.index);
          },
          fail: () => {
            uni.showToast({
              title: "预览图片失败",
              icon: "none"
            });
          }
        });
      },
      // 判断文件后缀是否允许
      checkFileExt(file) {
        let noArrowExt = false;
        let fileExt = "";
        const reg = /.+\./;
        fileExt = file.path.replace(reg, "").toLowerCase();
        noArrowExt = this.limitType.some((ext) => {
          return ext.toLowerCase() === fileExt;
        });
        if (!noArrowExt)
          this.showToast(`不允许选择${fileExt}格式的文件`);
        return noArrowExt;
      },
      // 深拷贝
      deepClone(obj, newObj) {
        for (let k in obj) {
          const value = obj[k];
          if (Array.isArray(value)) {
            newObj[k] = [];
            this.deepClone(value, newObj[k]);
          } else if (value !== null && typeof value === "object") {
            newObj[k] = {};
            this.deepClone(value, newObj[k]);
          } else {
            newObj[k] = value;
          }
        }
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    const _component_u_line_progress = resolveEasycom(vue.resolveDynamicComponent("u-line-progress"), __easycom_1$1);
    return !$props.disabled ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "u-upload"
    }, [
      $props.showUploadList ? (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        { key: 0 },
        vue.renderList($data.lists, (item, index) => {
          return vue.openBlock(), vue.createElementBlock(
            "view",
            {
              class: "u-list-item u-preview-wrap",
              key: index,
              style: vue.normalizeStyle({
                width: _ctx.$u.addUnit($props.width),
                height: _ctx.$u.addUnit($props.height)
              })
            },
            [
              $props.deletable ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "u-delete-icon",
                onClick: vue.withModifiers(($event) => $options.deleteItem(index), ["stop"]),
                style: vue.normalizeStyle({
                  background: $props.delBgColor
                })
              }, [
                vue.createVNode(_component_u_icon, {
                  class: "u-icon",
                  name: $props.delIcon,
                  size: "20",
                  color: $props.delColor
                }, null, 8, ["name", "color"])
              ], 12, ["onClick"])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(' <view\r\n				v-if="item.progress >= 100"\r\n				class="u-success-icon"\r\n			>\r\n				<u-icon class="u-icon" :name="successIcon" size="20" :color="successColor"></u-icon>\r\n			</view> '),
              $props.showProgress && item.progress > 0 && item.progress != 100 && !item.error ? (vue.openBlock(), vue.createBlock(_component_u_line_progress, {
                key: 1,
                "show-percent": false,
                height: "16",
                class: "u-progress",
                percent: item.progress
              }, null, 8, ["percent"])) : vue.createCommentVNode("v-if", true),
              item.error ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                onClick: vue.withModifiers(($event) => $options.retry(index), ["stop"]),
                class: "u-error-btn"
              }, "点击重试", 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
              !item.isImage ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 3,
                onClick: vue.withModifiers(($event) => $options.doPreviewImage(item.url || item.path, index), ["stop"]),
                class: "u-preview-image",
                src: item.url || item.path,
                mode: $props.imageMode
              }, null, 8, ["onClick", "src", "mode"])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "file", { file: $data.lists }, void 0, true),
      $props.maxCount > $data.lists.length ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        style: { "display": "inline-block" },
        onClick: _cache[0] || (_cache[0] = (...args) => $options.selectFile && $options.selectFile(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "addBtn", {}, void 0, true),
        !$props.customBtn ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "u-list-item u-add-wrap",
            "hover-class": "u-add-wrap__hover",
            "hover-stay-time": "150",
            style: vue.normalizeStyle({
              width: _ctx.$u.addUnit($props.width),
              height: _ctx.$u.addUnit($props.height)
            })
          },
          [
            vue.createVNode(_component_u_icon, {
              name: "plus",
              class: "u-add-btn",
              size: "40"
            }),
            vue.createElementVNode(
              "view",
              { class: "u-add-tips" },
              vue.toDisplayString($props.uploadText),
              1
              /* TEXT */
            )
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true)
    ])) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$5], ["__scopeId", "data-v-e7606f58"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-upload/u-upload.vue"]]);
  const _sfc_main$g = {
    name: "jnpf-upload",
    model: {
      prop: "value",
      event: "input"
    },
    props: {
      value: {
        type: Array,
        default: () => []
      },
      type: {
        type: String,
        default: "annexpic"
      },
      limit: {
        type: Number,
        default: 99
      },
      sizeUnit: {
        type: String,
        default: "MB"
      },
      fileSize: {
        type: Number,
        default: 2
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        fileList: [],
        realLimit: 0,
        deletable: true,
        uploadHeaders: {
          Authorization: this.$store.getters.token
        },
        lists: []
      };
    },
    watch: {
      limit(val) {
        this.realLimit = val;
      },
      value: {
        immediate: true,
        handler(val) {
          this.fileList = val;
        }
      }
    },
    created() {
      this.uploadHeaders.Authorization = uni.getStorageSync("token");
      this.$nextTick(function() {
        this.lists = this.fileList;
      });
      if (this.disabled) {
        this.realLimit = this.fileList.length;
        this.deletable = false;
      } else {
        this.realLimit = this.limit;
      }
    },
    computed: {
      baseURL() {
        return vue.inject("define").baseURL;
      },
      comUploadUrl() {
        return vue.inject("define").comUploadUrl;
      }
    },
    methods: {
      onSuccess(data, index, lists, name) {
        if (data.code == 200) {
          this.fileList.push({
            name: lists[index].file.name,
            fileId: data.data.name,
            url: data.data.url
          });
          this.$emit("input", this.fileList);
        } else {
          lists.splice(index, 1);
          this.$u.toast(data.msg);
        }
      },
      handleError(res, index, lists, name) {
        lists.splice(index, 1);
      },
      deleteItem(index) {
        uni.showModal({
          title: "提示",
          content: "您确定要删除此项吗？",
          success: (res) => {
            if (res.confirm) {
              this.$refs.uUpload.remove(index);
              this.fileList.splice(index, 1);
              this.$emit("input", this.fileList);
              uni.showToast({
                title: "移除成功",
                icon: "none"
              });
            }
          }
        });
      },
      onListChange(lists) {
        this.lists = lists;
      },
      doPreviewImage(url2) {
        const images = this.fileList.map((item) => this.baseURL + item.url);
        uni.previewImage({
          urls: images,
          current: url2,
          success: () => {
          },
          fail: () => {
            uni.showToast({
              title: "预览图片失败",
              icon: "none"
            });
          }
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    const _component_u_upload = resolveEasycom(vue.resolveDynamicComponent("u-upload"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "jnpf-upload" }, [
      $data.fileList.length ? (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        { key: 0 },
        vue.renderList($data.fileList, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "u-list-item u-preview-wrap",
            key: index
          }, [
            !$props.disabled ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "u-delete-icon",
              onClick: vue.withModifiers(($event) => $options.deleteItem(index), ["stop"])
            }, [
              vue.createVNode(_component_u_icon, {
                class: "u-icon",
                name: "close",
                size: "20",
                color: "#ffffff"
              })
            ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("image", {
              class: "u-preview-image",
              src: $options.baseURL + item.url,
              mode: "aspectFill",
              onClick: vue.withModifiers(($event) => $options.doPreviewImage($options.baseURL + item.url), ["stop"])
            }, null, 8, ["src", "onClick"])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      )) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_u_upload, {
        width: "150",
        height: "150",
        action: $options.comUploadUrl + $props.type,
        header: $data.uploadHeaders,
        onOnListChange: $options.onListChange,
        "max-size": $props.fileSize * 1024 * 1024,
        "max-count": $data.realLimit,
        "show-upload-list": false,
        "show-progress": false,
        deletable: $data.deletable,
        onOnSuccess: $options.onSuccess,
        onOnError: $options.handleError,
        ref: "uUpload",
        "file-list": $data.lists,
        disabled: $props.disabled
      }, null, 8, ["action", "header", "onOnListChange", "max-size", "max-count", "deletable", "onOnSuccess", "onOnError", "file-list", "disabled"])
    ]);
  }
  const upload$1 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$4], ["__scopeId", "data-v-82ddd482"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/components/ck-upload.vue"]]);
  const _sfc_main$f = {
    __name: "addOrEditor",
    setup(__props) {
      let dataForm = vue.reactive({
        projectId: "",
        holeNo: "",
        holeType: "",
        startTime: "",
        endTime: "",
        longitude: "",
        latitude: "",
        diameter: "",
        sWaterLevel: "",
        elevation: "",
        reevlResouce: "",
        remark: "",
        files: []
      });
      let holeTypeOptions = vue.reactive({
        show: false,
        current: {},
        list: []
      });
      function onHoleTypeOptions(arr) {
        let current = arr[0];
        holeTypeOptions.current = current;
        dataForm.holeType = current.label;
      }
      function getholeTypeOptions() {
        getDictionaryDataSelector("485002738363531269").then((res) => {
          holeTypeOptions.list = res.data.list;
        });
      }
      function parseFiles(files) {
        if (files) {
          files = JSON.stringify(files);
        } else {
          files = "[]";
        }
        return files;
      }
      function addOrUpdateData() {
        dataForm.files = parseFiles(dataForm.files);
        dataForm.projectId = uni.getStorageSync("projectId");
        const holeId = uni.getStorageSync("holeId");
        if (holeId) {
          addHoleBaseDetail(dataForm).then((res) => formatAppLog("log", "at pages/sampleDetection/sampling/monitorPoint/addOrEditor.vue:88", "success!"));
        } else {
          updateHoleBase(projectId, dataForm);
        }
      }
      function initData() {
        const holeId = uni.getStorageSync("holeId");
        if (holeId) {
          getHoleBaseDetail(holeId).then((res) => {
            Object.assign(dataForm, res.data);
          });
        }
      }
      onLoad(async () => {
        await initData();
        getholeTypeOptions();
      });
      function goToBack() {
        uni.setStorageSync("holeId", null);
        uni.navigateBack({ delta: 1 });
      }
      function getLocations() {
        uni.chooseLocation({
          isHighAccuracy: true,
          success: function(res) {
            formatAppLog("log", "at pages/sampleDetection/sampling/monitorPoint/addOrEditor.vue:116", "位置名称：" + res.name);
            formatAppLog("log", "at pages/sampleDetection/sampling/monitorPoint/addOrEditor.vue:117", "详细地址：" + res.address);
            formatAppLog("log", "at pages/sampleDetection/sampling/monitorPoint/addOrEditor.vue:118", "纬度：" + res.latitude);
            formatAppLog("log", "at pages/sampleDetection/sampling/monitorPoint/addOrEditor.vue:119", "经度：" + res.longitude);
          }
        });
      }
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$4);
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_2$2);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_3$1);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_4$1);
        const _component_u_select = resolveEasycom(vue.resolveDynamicComponent("u-select"), __easycom_5);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "status_bar" }, [
              vue.createElementVNode("view", { class: "top_view" })
            ]),
            vue.createElementVNode("view", { class: "mo-container" }, [
              vue.createElementVNode("view", {
                class: "nav-bar",
                style: { "position": "relative", "box-sizing": "border-box", "width": "100vw", "height": "44px" }
              }, [
                vue.createVNode(_component_uni_icons, {
                  onClick: _cache[0] || (_cache[0] = ($event) => goToBack()),
                  type: "left",
                  size: "30",
                  style: { "line-height": "44px" }
                }),
                vue.createElementVNode("text", {
                  class: "title",
                  style: { "font-size": "16px", "position": "absolute", "left": "50%", "top": "50%", "transform": "translate(-50%,-50%)" }
                }, "采样信息"),
                vue.createElementVNode("text", {
                  onClick: _cache[1] || (_cache[1] = ($event) => addOrUpdateData()),
                  type: "primary",
                  class: "submit",
                  style: { "color": "blue", "line-height": "44px", "margin-right": "10px", "float": "right" }
                }, "保存")
              ]),
              vue.createVNode(_component_u_form, {
                model: vue.unref(dataForm),
                ref: "Form",
                style: { "margin": "10px" }
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "钻孔编号",
                    prop: "holeNo"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).holeNo,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(dataForm).holeNo = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "采样类型",
                    prop: "holeType"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).holeType,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(dataForm).holeType = $event),
                        type: "select",
                        onClick: _cache[4] || (_cache[4] = ($event) => vue.unref(holeTypeOptions).show = true)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createCommentVNode(' <u-form-item label="性别" prop="sex"><u-input v-model="select1.current.label" type="select" @click="select1.show=true" /></u-form-item> '),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "钻孔开始时间",
                    prop: "startTime"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).startTime,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(dataForm).startTime = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "钻孔结束时间",
                    prop: "endTime"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).endTime,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.unref(dataForm).endTime = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "位置",
                    prop: "longitude"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).longitude,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => vue.unref(dataForm).longitude = $event)
                      }, null, 8, ["modelValue"]),
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).latitude,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vue.unref(dataForm).latitude = $event)
                      }, null, 8, ["modelValue"]),
                      vue.createElementVNode("view", {
                        onClick: _cache[9] || (_cache[9] = ($event) => getLocations())
                      }, "获取位置")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "钻孔直径",
                    prop: "diameter"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).diameter,
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => vue.unref(dataForm).diameter = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "初见水位埋深",
                    prop: "sWaterLevel"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).sWaterLevel,
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => vue.unref(dataForm).sWaterLevel = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "地面高程",
                    prop: "elevation"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).elevation,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => vue.unref(dataForm).elevation = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "参考高程来源",
                    prop: "reevlResouce"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).reevlResouce,
                        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => vue.unref(dataForm).reevlResouce = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "备注",
                    prop: "remark"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).remark,
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => vue.unref(dataForm).remark = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createCommentVNode(` 	<u-form-item label-width='100px' label="上传图片" prop="file">
				<upload  :file-list="dataForm.files" ></upload>
			</u-form-item> `)
                ]),
                _: 1
                /* STABLE */
              }, 8, ["model"]),
              vue.createCommentVNode(' <u-select v-model="select1.show" :list="select1.list" @confirm="onSelect1"></u-select> '),
              vue.createVNode(_component_u_select, {
                modelValue: vue.unref(holeTypeOptions).show,
                "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => vue.unref(holeTypeOptions).show = $event),
                "value-name": "id",
                "label-name": "fullName",
                list: vue.unref(holeTypeOptions).list,
                onConfirm: onHoleTypeOptions
              }, null, 8, ["modelValue", "list"])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesSampleDetectionSamplingMonitorPointAddOrEditor = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/monitorPoint/addOrEditor.vue"]]);
  const _sfc_main$e = {};
  function _sfc_render$3(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "ad-container" });
  }
  const PagesSampleDetectionSamplingQualitySampleAddOrEditor = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$3], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/qualitySample/addOrEditor.vue"]]);
  const _sfc_main$d = {
    __name: "index",
    setup(__props) {
      const dataList = vue.reactive({});
      function getList() {
        let menuId = getMenuId("项目列表");
        const projectId2 = uni.getStorageSync("projectId");
        const holeId = uni.getStorageSync("holeId");
        let query = {
          currentPage: 1,
          pageSize: 0,
          sort: "desc",
          sidx: "",
          menuId,
          projectId: projectId2,
          holeId
        };
        getHoleRecordList(query).then((res) => {
          Object.assign(dataList, res.data.list);
        });
      }
      function goHoleBaseAdd(id) {
        uni.setStorageSync("holeRecordId", id);
        uni.navigateTo({
          url: "/pages/sampleDetection/sampling/pageMonitoringPoint/holeRecord/addOrEditor"
        });
      }
      onLoad(() => {
        getList();
      });
      return (_ctx, _cache) => {
        const _component_uni_th = resolveEasycom(vue.resolveDynamicComponent("uni-th"), __easycom_0$1);
        const _component_uni_tr = resolveEasycom(vue.resolveDynamicComponent("uni-tr"), __easycom_1$2);
        const _component_uni_td = resolveEasycom(vue.resolveDynamicComponent("uni-td"), __easycom_2);
        const _component_uni_table = resolveEasycom(vue.resolveDynamicComponent("uni-table"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "mo-container" }, [
          vue.createVNode(_component_uni_table, {
            border: "",
            emptyText: "暂无更多数据"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_tr, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("样品编号")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("样品名称")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(dataList, (item) => {
                  return vue.openBlock(), vue.createBlock(
                    _component_uni_tr,
                    null,
                    {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_td, {
                          onClick: ($event) => goHoleBaseAdd(item.id),
                          align: "center"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(item.solumType),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["onClick"]),
                        vue.createVNode(
                          _component_uni_td,
                          { align: "center" },
                          {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(
                                vue.toDisplayString(item.solumType),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  );
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  };
  const holeRecord = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/pageMonitoringPoint/holeRecord/index.vue"]]);
  const _sfc_main$c = {
    __name: "index",
    setup(__props) {
      const dataList = vue.reactive({});
      function getList() {
        let menuId = getMenuId("项目列表");
        const projectId2 = uni.getStorageSync("projectId");
        const holeId = uni.getStorageSync("holeId");
        let query = {
          currentPage: 1,
          pageSize: 0,
          sort: "desc",
          sidx: "",
          menuId,
          projectId: projectId2,
          holeId
        };
        getSoilRecordList(query).then((res) => {
          Object.assign(dataList, res.data.list);
        });
      }
      function goHoleBase(holeId) {
        uni.setStorageSync("holeId", holeId);
        uni.navigateTo({
          url: "/pages/sampleDetection/sampling/pageMonitoringPoint/index"
        });
      }
      onLoad(() => {
        getList();
      });
      return (_ctx, _cache) => {
        const _component_uni_th = resolveEasycom(vue.resolveDynamicComponent("uni-th"), __easycom_0$1);
        const _component_uni_tr = resolveEasycom(vue.resolveDynamicComponent("uni-tr"), __easycom_1$2);
        const _component_uni_td = resolveEasycom(vue.resolveDynamicComponent("uni-td"), __easycom_2);
        const _component_uni_table = resolveEasycom(vue.resolveDynamicComponent("uni-table"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "mo-container" }, [
          vue.createVNode(_component_uni_table, {
            border: "",
            emptyText: "暂无更多数据"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_tr, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("样品编号")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("样品名称")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(dataList, (item) => {
                  return vue.openBlock(), vue.createBlock(
                    _component_uni_tr,
                    null,
                    {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_td, {
                          onClick: ($event) => goHoleBase(item.id),
                          align: "center"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(item.sampleNo),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["onClick"]),
                        vue.createVNode(
                          _component_uni_td,
                          { align: "center" },
                          {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(
                                vue.toDisplayString(item.sampleName),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  );
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  };
  const soilSample = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/pageMonitoringPoint/soilSample/index.vue"]]);
  const _sfc_main$b = {
    __name: "index",
    setup(__props) {
      const dataList = vue.reactive({});
      function getList() {
        let menuId = getMenuId("项目列表");
        const projectId2 = uni.getStorageSync("projectId");
        const holeId = uni.getStorageSync("holeId");
        let query = {
          currentPage: 1,
          pageSize: 0,
          sort: "desc",
          sidx: "",
          menuId,
          projectId: projectId2,
          holeId
        };
        getWaterSampleList(query).then((res) => {
          Object.assign(dataList, res.data.list);
        });
      }
      function goHoleBase(holeId) {
        uni.setStorageSync("holeId", holeId);
        uni.navigateTo({
          url: "/pages/sampleDetection/sampling/pageMonitoringPoint/index"
        });
      }
      onLoad(() => {
        getList();
      });
      return (_ctx, _cache) => {
        const _component_uni_th = resolveEasycom(vue.resolveDynamicComponent("uni-th"), __easycom_0$1);
        const _component_uni_tr = resolveEasycom(vue.resolveDynamicComponent("uni-tr"), __easycom_1$2);
        const _component_uni_td = resolveEasycom(vue.resolveDynamicComponent("uni-td"), __easycom_2);
        const _component_uni_table = resolveEasycom(vue.resolveDynamicComponent("uni-table"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "mo-container" }, [
          vue.createVNode(_component_uni_table, {
            border: "",
            emptyText: "暂无更多数据"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_tr, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("样品编号")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("样品名称")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(dataList, (item) => {
                  return vue.openBlock(), vue.createBlock(
                    _component_uni_tr,
                    null,
                    {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_td, {
                          onClick: ($event) => goHoleBase(item.id),
                          align: "center"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(item.sampleNo),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["onClick"]),
                        vue.createVNode(
                          _component_uni_td,
                          { align: "center" },
                          {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(
                                vue.toDisplayString(item.sampleName),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  );
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  };
  const waterSample = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/pageMonitoringPoint/waterSample/index.vue"]]);
  const _sfc_main$a = {
    __name: "index",
    setup(__props) {
      const dataList = vue.reactive({});
      function getList() {
        let menuId = getMenuId("项目列表");
        const projectId2 = uni.getStorageSync("projectId");
        const holeId = uni.getStorageSync("holeId");
        let query = {
          currentPage: 1,
          pageSize: 0,
          sort: "desc",
          sidx: "",
          menuId,
          projectId: projectId2,
          holeId
        };
        getWellBaseList(query).then((res) => {
          Object.assign(dataList, res.data.list);
        });
      }
      function goHoleBase(holeId) {
        uni.setStorageSync("holeId", holeId);
        uni.navigateTo({
          url: "/pages/sampleDetection/sampling/pageMonitoringPoint/index"
        });
      }
      onLoad(() => {
        getList();
      });
      return (_ctx, _cache) => {
        const _component_uni_th = resolveEasycom(vue.resolveDynamicComponent("uni-th"), __easycom_0$1);
        const _component_uni_tr = resolveEasycom(vue.resolveDynamicComponent("uni-tr"), __easycom_1$2);
        const _component_uni_td = resolveEasycom(vue.resolveDynamicComponent("uni-td"), __easycom_2);
        const _component_uni_table = resolveEasycom(vue.resolveDynamicComponent("uni-table"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "mo-container" }, [
          vue.createVNode(_component_uni_table, {
            border: "",
            emptyText: "暂无更多数据"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_tr, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("样品编号")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("样品名称")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(dataList, (item) => {
                  return vue.openBlock(), vue.createBlock(
                    _component_uni_tr,
                    null,
                    {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_td, {
                          onClick: ($event) => goHoleBase(item.id),
                          align: "center"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(item.wellNo),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["onClick"]),
                        vue.createVNode(
                          _component_uni_td,
                          { align: "center" },
                          {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(
                                vue.toDisplayString(item.wellType),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  );
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  };
  const wellBase = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/pageMonitoringPoint/wellBase/index.vue"]]);
  const _sfc_main$9 = {
    __name: "index",
    setup(__props) {
      const dataList = vue.reactive({});
      function getList() {
        let menuId = getMenuId("项目列表");
        const projectId2 = uni.getStorageSync("projectId");
        const holeId = uni.getStorageSync("holeId");
        let query = {
          currentPage: 1,
          pageSize: 0,
          sort: "desc",
          sidx: "",
          menuId,
          projectId: projectId2,
          holeId
        };
        getWellWashRecordList(query).then((res) => {
          Object.assign(dataList, res.data.list);
        });
      }
      function goHoleBaseAdd(id) {
        uni.setStorageSync("wellWaqshRecordId", id);
        debugger;
        uni.navigateTo({
          url: "/pages/sampleDetection/sampling/pageMonitoringPoint/wellWashRecord/addOrEditor"
        });
      }
      onLoad(() => {
        getList();
      });
      return (_ctx, _cache) => {
        const _component_uni_th = resolveEasycom(vue.resolveDynamicComponent("uni-th"), __easycom_0$1);
        const _component_uni_tr = resolveEasycom(vue.resolveDynamicComponent("uni-tr"), __easycom_1$2);
        const _component_uni_td = resolveEasycom(vue.resolveDynamicComponent("uni-td"), __easycom_2);
        const _component_uni_table = resolveEasycom(vue.resolveDynamicComponent("uni-table"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "mo-container" }, [
          vue.createVNode(_component_uni_table, {
            border: "",
            emptyText: "暂无更多数据"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_tr, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("监测井编号")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("洗井类型")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(dataList, (item) => {
                  return vue.openBlock(), vue.createBlock(
                    _component_uni_tr,
                    null,
                    {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_td, {
                          onClick: ($event) => goHoleBaseAdd(item.id),
                          align: "center"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(item.wellId),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["onClick"]),
                        vue.createVNode(
                          _component_uni_td,
                          { align: "center" },
                          {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(
                                vue.toDisplayString(item.washMode),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  );
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  };
  const wellWashRecord = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/pageMonitoringPoint/wellWashRecord/index.vue"]]);
  const _sfc_main$8 = {
    __name: "index",
    setup(__props) {
      const linkOptions = vue.ref([
        {
          id: 0,
          iconName: "监测点位",
          iconUrl: "/static/project-icons/jcdianwei.svg",
          routerUrl: "/pages/sampleDetection/sampling/index"
        },
        {
          id: 1,
          iconName: "钻孔记录",
          iconUrl: "/static/project-icons/zkjl.svg",
          routerUrl: "/pages/sampleDetection/sampling/pageMonitoringPoint/holeRecord/addOrEditor"
        },
        {
          id: 2,
          iconName: "土样记录",
          iconUrl: "/static/project-icons/syjilu.svg",
          routerUrl: "/pages/sampleDetection/sampling/pageMonitoringPoint/soilSample/addOrEditor"
        },
        {
          id: 3,
          iconName: "监测井",
          iconUrl: "/static/project-icons/jiancejing.svg",
          routerUrl: "/pages/sampleDetection/sampling/pageMonitoringPoint/wellBase/addOrEditor"
        },
        {
          id: 4,
          iconName: "洗井记录",
          iconUrl: "/static/project-icons/xjjilu.svg",
          routerUrl: "/pages/sampleDetection/sampling/pageMonitoringPoint/wellWashRecord/addOrEditor"
        },
        {
          id: 5,
          iconName: "水样记录",
          iconUrl: "/static/project-icons/zhikong.svg",
          routerUrl: "/pages/sampleDetection/sampling/pageMonitoringPoint/waterSample/addOrEditor"
        }
      ]);
      const tabOptions = vue.reactive([
        {
          name: "钻孔记录"
        },
        {
          name: "土样记录"
        },
        {
          name: "建井信息"
        },
        {
          name: "洗井信息"
        },
        {
          name: "水样记录"
        }
      ]);
      const tabCurent = vue.ref(0);
      function change(index) {
        tabCurent.value = index;
        formatAppLog("log", "at pages/sampleDetection/sampling/pageMonitoringPoint/index.vue:111", "index", index);
        formatAppLog("log", "at pages/sampleDetection/sampling/pageMonitoringPoint/index.vue:112", typeof index);
      }
      vue.reactive(null);
      function goToSampling(router) {
        uni.navigateTo({
          url: router
        });
      }
      return (_ctx, _cache) => {
        const _component_u_tabs = resolveEasycom(vue.resolveDynamicComponent("u-tabs"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "detail-container" }, [
          vue.createElementVNode("view", { class: "link-container" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(linkOptions.value, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  onClick: ($event) => goToSampling(item.routerUrl),
                  class: "link-box",
                  key: item.id
                }, [
                  vue.createElementVNode("img", {
                    src: item.iconUrl,
                    style: { "width": "45rpx", "margin-bottom": "5px" }
                  }, null, 8, ["src"]),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.iconName),
                    1
                    /* TEXT */
                  )
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "tab-box" }, [
            vue.createVNode(_component_u_tabs, {
              "font-size": 20,
              "inactive-color": "#adb5bd",
              list: tabOptions,
              "is-scroll": true,
              modelValue: tabCurent.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tabCurent.value = $event),
              onChange: change
            }, null, 8, ["list", "modelValue"])
          ]),
          vue.createVNode(driver),
          vue.createElementVNode("view", { class: "content" }, [
            tabCurent.value === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "holeRecord-container"
            }, [
              vue.createVNode(holeRecord)
            ])) : tabCurent.value === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "waterSample-container"
            }, [
              vue.createVNode(waterSample)
            ])) : tabCurent.value === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "wellBase-container"
            }, [
              vue.createVNode(wellBase)
            ])) : tabCurent.value === 3 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 3,
              class: "wellWashRecord-container"
            }, [
              vue.createVNode(wellWashRecord)
            ])) : tabCurent.value === 4 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 4,
              class: "soilSample-container"
            }, [
              vue.createVNode(soilSample)
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  };
  const PagesSampleDetectionSamplingPageMonitoringPointIndex = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-232f9d69"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/pageMonitoringPoint/index.vue"]]);
  const _sfc_main$7 = {
    name: "u-toast",
    props: {
      // z-index值
      zIndex: {
        type: [Number, String],
        default: ""
      }
    },
    data() {
      return {
        isShow: false,
        timer: null,
        // 定时器
        config: {
          params: {},
          // URL跳转的参数，对象
          title: "",
          // 显示文本
          type: "",
          // 主题类型，primary，success，error，warning，black
          duration: 2e3,
          // 显示的时间，毫秒
          isTab: false,
          // 是否跳转tab页面
          url: "",
          // toast消失后是否跳转页面，有则跳转，优先级高于back参数
          icon: true,
          // 显示的图标
          position: "center",
          // toast出现的位置
          callback: null,
          // 执行完后的回调函数
          back: false
          // 结束toast是否自动返回上一页
        },
        tmpConfig: {}
        // 将用户配置和内置配置合并后的临时配置变量
      };
    },
    computed: {
      iconName() {
        if (["error", "warning", "success", "info"].indexOf(this.tmpConfig.type) >= 0 && this.tmpConfig.icon) {
          let icon = this.$u.type2icon(this.tmpConfig.type);
          return icon;
        }
      },
      uZIndex() {
        return this.isShow ? this.zIndex ? this.zIndex : this.$u.zIndex.toast : "999999";
      }
    },
    methods: {
      // 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
      show(options) {
        this.tmpConfig = this.$u.deepMerge(this.config, options);
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.isShow = true;
        this.timer = setTimeout(() => {
          this.isShow = false;
          clearTimeout(this.timer);
          this.timer = null;
          typeof this.tmpConfig.callback === "function" && this.tmpConfig.callback();
          this.timeEnd();
        }, this.tmpConfig.duration);
      },
      // 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
      hide() {
        this.isShow = false;
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      },
      // 倒计时结束之后，进行的一些操作
      timeEnd() {
        if (this.tmpConfig.url) {
          if (this.tmpConfig.url[0] != "/")
            this.tmpConfig.url = "/" + this.tmpConfig.url;
          if (Object.keys(this.tmpConfig.params).length) {
            let query = "";
            if (/.*\/.*\?.*=.*/.test(this.tmpConfig.url)) {
              query = this.$u.queryParams(this.tmpConfig.params, false);
              this.tmpConfig.url = this.tmpConfig.url + "&" + query;
            } else {
              query = this.$u.queryParams(this.tmpConfig.params);
              this.tmpConfig.url += query;
            }
          }
          if (this.tmpConfig.isTab) {
            uni.switchTab({
              url: this.tmpConfig.url
            });
          } else {
            uni.navigateTo({
              url: this.tmpConfig.url
            });
          }
        } else if (this.tmpConfig.back) {
          this.$u.route({
            type: "back"
          });
        }
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-toast", [$data.isShow ? "u-show" : "", "u-type-" + $data.tmpConfig.type, "u-position-" + $data.tmpConfig.position]]),
        style: vue.normalizeStyle({
          zIndex: $options.uZIndex
        })
      },
      [
        vue.createElementVNode("view", { class: "u-icon-wrap" }, [
          $data.tmpConfig.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
            key: 0,
            class: "u-icon",
            name: $options.iconName,
            size: 30,
            color: $data.tmpConfig.type
          }, null, 8, ["name", "color"])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode(
          "text",
          { class: "u-text" },
          vue.toDisplayString($data.tmpConfig.title),
          1
          /* TEXT */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$2], ["__scopeId", "data-v-dcb3ce67"], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/uni_modules/vk-uview-ui/components/u-toast/u-toast.vue"]]);
  const _sfc_main$6 = {
    __name: "addOrEditor",
    setup(__props) {
      let dataForm = vue.reactive({
        projectId: "",
        holeId: "",
        startDepth: "",
        endDepth: "",
        solumType: "",
        solumColor: "",
        solumSmell: "",
        solumHumidity: "",
        solumCompactness: "",
        solumPlasticity: "",
        pollutionDesc: "",
        files: []
      });
      function onSolumHumidityOptions(arr) {
        let current = arr[0];
        solumHumidityOptions.current = current;
        dataForm.solumHumidity = current.label;
      }
      function onSolumCompactnessOptions(arr) {
        let current = arr[0];
        solumCompactnessOptions.current = current;
        dataForm.solumCompactness = current.label;
      }
      function onSolumPlasticityOptions(arr) {
        let current = arr[0];
        solumPlasticityOptions.current = current;
        dataForm.solumPlasticity = current.label;
      }
      const solumHumidityOptions = vue.reactive({ show: false, current: {}, list: [] });
      function getsolumHumidityOptions() {
        getDictionaryDataSelector("497319923836527173").then((res) => {
          solumHumidityOptions.list = res.data.list;
        });
      }
      const solumCompactnessOptions = vue.reactive({ show: false, current: {}, list: [] });
      function getsolumCompactnessOptions() {
        getDictionaryDataSelector("497320163494863429").then((res) => {
          solumCompactnessOptions.list = res.data.list;
        });
      }
      const solumPlasticityOptions = vue.reactive({ show: false, current: {}, list: [] });
      function getsolumPlasticityOptions() {
        getDictionaryDataSelector("497320786047017541").then((res) => {
          solumPlasticityOptions.list = res.data.list;
          formatAppLog("log", "at pages/sampleDetection/sampling/pageMonitoringPoint/holeRecord/addOrEditor.vue:92", solumPlasticityOptions.list[0]);
        });
      }
      function addOrUpdateData() {
        dataForm = dataForm;
        if (!dataForm.id) {
          addHoleRecord(dataForm).then((res) => formatAppLog("log", "at pages/sampleDetection/sampling/pageMonitoringPoint/holeRecord/addOrEditor.vue:111", "success!"));
        } else {
          updateHoleRecord(dataForm.id, dataForm);
        }
      }
      function initData() {
        const id = uni.getStorageSync("holeRecordId");
        if (id) {
          getHoleRecordDetail(id).then((res) => {
            dataInfo(res.data);
          });
        }
      }
      onLoad(async () => {
        await initData();
        getsolumHumidityOptions();
        getsolumCompactnessOptions();
        getsolumPlasticityOptions();
      });
      function goToBack() {
        uni.setStorageSync("holeRecordId", null);
        uni.navigateBack({ delta: 1 });
      }
      function dataInfo(dataAll) {
        let _dataAll = dataAll;
        if (_dataAll.files) {
          _dataAll.files = JSON.parse(_dataAll.files);
        } else {
          _dataAll.files = [];
        }
        dataForm = _dataAll;
      }
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$4);
        const _component_u_toast = resolveEasycom(vue.resolveDynamicComponent("u-toast"), __easycom_1);
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_2$2);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_3$1);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_4$1);
        const _component_u_select = resolveEasycom(vue.resolveDynamicComponent("u-select"), __easycom_5);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "status_bar" }, [
              vue.createElementVNode("view", { class: "top_view" })
            ]),
            vue.createElementVNode("view", { class: "mo-container" }, [
              vue.createElementVNode("view", {
                class: "nav-bar",
                style: { "position": "relative", "box-sizing": "border-box", "width": "100vw", "height": "44px" }
              }, [
                vue.createVNode(_component_uni_icons, {
                  onClick: _cache[0] || (_cache[0] = ($event) => goToBack()),
                  type: "left",
                  size: "30",
                  style: { "line-height": "44px" }
                }),
                vue.createElementVNode("text", {
                  class: "title",
                  style: { "font-size": "16px", "position": "absolute", "left": "50%", "top": "50%", "transform": "translate(-50%,-50%)" }
                }, "采样信息"),
                vue.createElementVNode("text", {
                  onClick: _cache[1] || (_cache[1] = ($event) => addOrUpdateData()),
                  type: "primary",
                  class: "submit",
                  style: { "color": "blue", "line-height": "44px", "margin-right": "10px", "float": "right" }
                }, "保存")
              ]),
              vue.createVNode(
                _component_u_toast,
                { ref: "uToast" },
                null,
                512
                /* NEED_PATCH */
              ),
              vue.createVNode(_component_u_form, {
                model: vue.unref(dataForm),
                ref: "Form",
                style: { "margin": "10px" }
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "起始深度",
                    prop: "startDepth"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        type: "number",
                        modelValue: vue.unref(dataForm).startDepth,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(dataForm).startDepth = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "结束深度",
                    prop: "endDepth"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        type: "number",
                        modelValue: vue.unref(dataForm).endDepth,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(dataForm).endDepth = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createCommentVNode(` <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> `),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "颜色",
                    prop: "solumColor"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).solumColor,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(dataForm).solumColor = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "气味",
                    prop: "solumSmell"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).solumSmell,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(dataForm).solumSmell = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "湿度",
                    prop: "solumHumidity"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).solumHumidity,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.unref(dataForm).solumHumidity = $event),
                        type: "select",
                        onClick: _cache[7] || (_cache[7] = ($event) => solumHumidityOptions.show = true)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "可塑性",
                    prop: "solumPlasticity"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).solumPlasticity,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vue.unref(dataForm).solumPlasticity = $event),
                        type: "select",
                        onClick: _cache[9] || (_cache[9] = ($event) => solumPlasticityOptions.show = true)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "密实度",
                    prop: "solumCompactness"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).solumCompactness,
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => vue.unref(dataForm).solumCompactness = $event),
                        type: "select",
                        onClick: _cache[11] || (_cache[11] = ($event) => solumCompactnessOptions.show = true)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "备注",
                    prop: "remark"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).remark,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => vue.unref(dataForm).remark = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "上传图片",
                    prop: "file"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(upload$1, {
                        "file-list": vue.unref(dataForm).files
                      }, null, 8, ["file-list"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["model"]),
              vue.createCommentVNode(' <u-select v-model="select1.show" :list="select1.list" @confirm="onSelect1"></u-select> '),
              vue.createVNode(_component_u_select, {
                modelValue: solumHumidityOptions.show,
                "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => solumHumidityOptions.show = $event),
                "value-name": "id",
                "label-name": "fullName",
                list: solumHumidityOptions.list,
                onConfirm: onSolumHumidityOptions
              }, null, 8, ["modelValue", "list"]),
              vue.createVNode(_component_u_select, {
                modelValue: solumCompactnessOptions.show,
                "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => solumCompactnessOptions.show = $event),
                "value-name": "id",
                "label-name": "fullName",
                list: solumCompactnessOptions.list,
                onConfirm: onSolumCompactnessOptions
              }, null, 8, ["modelValue", "list"]),
              vue.createVNode(_component_u_select, {
                modelValue: solumPlasticityOptions.show,
                "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => solumPlasticityOptions.show = $event),
                "value-name": "id",
                "label-name": "fullName",
                list: solumPlasticityOptions.list,
                onConfirm: onSolumPlasticityOptions
              }, null, 8, ["modelValue", "list"])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesSampleDetectionSamplingPageMonitoringPointHoleRecordAddOrEditor = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/pageMonitoringPoint/holeRecord/addOrEditor.vue"]]);
  const _sfc_main$5 = {};
  function _sfc_render$1(_ctx, _cache) {
    return null;
  }
  const PagesSampleDetectionSamplingPageMonitoringPointSoilSampleAddOrEditor = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$1], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/pageMonitoringPoint/soilSample/addOrEditor.vue"]]);
  const _sfc_main$4 = {
    __name: "addOrEditor",
    setup(__props) {
      let dataForm = vue.reactive({
        projectId: "",
        holeId: "",
        startDepth: "",
        endDepth: "",
        solumType: "",
        solumColor: "",
        solumSmell: "",
        solumHumidity: "",
        solumCompactness: "",
        solumPlasticity: "",
        pollutionDesc: "",
        files: []
      });
      function onSolumHumidityOptions(arr) {
        let current = arr[0];
        solumHumidityOptions.current = current;
        dataForm.solumHumidity = current.label;
      }
      function onSolumCompactnessOptions(arr) {
        let current = arr[0];
        solumCompactnessOptions.current = current;
        dataForm.solumCompactness = current.label;
      }
      function onSolumPlasticityOptions(arr) {
        let current = arr[0];
        solumPlasticityOptions.current = current;
        dataForm.solumPlasticity = current.label;
      }
      const solumHumidityOptions = vue.reactive({ show: false, current: {}, list: [] });
      function getsolumHumidityOptions() {
        getDictionaryDataSelector("497319923836527173").then((res) => {
          solumHumidityOptions.list = res.data.list;
        });
      }
      const solumCompactnessOptions = vue.reactive({ show: false, current: {}, list: [] });
      function getsolumCompactnessOptions() {
        getDictionaryDataSelector("497320163494863429").then((res) => {
          solumCompactnessOptions.list = res.data.list;
        });
      }
      const solumPlasticityOptions = vue.reactive({ show: false, current: {}, list: [] });
      function getsolumPlasticityOptions() {
        getDictionaryDataSelector("497320786047017541").then((res) => {
          solumPlasticityOptions.list = res.data.list;
          formatAppLog("log", "at pages/sampleDetection/sampling/pageMonitoringPoint/wellBase/addOrEditor.vue:92", solumPlasticityOptions.list[0]);
        });
      }
      function addOrUpdateData() {
        dataForm = dataForm;
        if (!dataForm.id) {
          addHoleRecord(dataForm).then((res) => formatAppLog("log", "at pages/sampleDetection/sampling/pageMonitoringPoint/wellBase/addOrEditor.vue:111", "success!"));
        } else {
          updateHoleRecord(dataForm.id, dataForm);
        }
      }
      function initData() {
        const id = uni.getStorageSync("holeRecordId");
        if (id) {
          getHoleRecordDetail(id).then((res) => {
            dataInfo(res.data);
          });
        }
      }
      onLoad(async () => {
        await initData();
        getsolumHumidityOptions();
        getsolumCompactnessOptions();
        getsolumPlasticityOptions();
      });
      function goToBack() {
        uni.setStorageSync("holeRecordId", null);
        uni.navigateBack({ delta: 1 });
      }
      function dataInfo(dataAll) {
        let _dataAll = dataAll;
        if (_dataAll.files) {
          _dataAll.files = JSON.parse(_dataAll.files);
        } else {
          _dataAll.files = [];
        }
        dataForm = _dataAll;
      }
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$4);
        const _component_u_toast = resolveEasycom(vue.resolveDynamicComponent("u-toast"), __easycom_1);
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_2$2);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_3$1);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_4$1);
        const _component_u_select = resolveEasycom(vue.resolveDynamicComponent("u-select"), __easycom_5);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "status_bar" }, [
              vue.createElementVNode("view", { class: "top_view" })
            ]),
            vue.createElementVNode("view", { class: "mo-container" }, [
              vue.createElementVNode("view", {
                class: "nav-bar",
                style: { "position": "relative", "box-sizing": "border-box", "width": "100vw", "height": "44px" }
              }, [
                vue.createVNode(_component_uni_icons, {
                  onClick: _cache[0] || (_cache[0] = ($event) => goToBack()),
                  type: "left",
                  size: "30",
                  style: { "line-height": "44px" }
                }),
                vue.createElementVNode("text", {
                  class: "title",
                  style: { "font-size": "16px", "position": "absolute", "left": "50%", "top": "50%", "transform": "translate(-50%,-50%)" }
                }, "采样信息"),
                vue.createElementVNode("text", {
                  onClick: _cache[1] || (_cache[1] = ($event) => addOrUpdateData()),
                  type: "primary",
                  class: "submit",
                  style: { "color": "blue", "line-height": "44px", "margin-right": "10px", "float": "right" }
                }, "保存")
              ]),
              vue.createVNode(
                _component_u_toast,
                { ref: "uToast" },
                null,
                512
                /* NEED_PATCH */
              ),
              vue.createVNode(_component_u_form, {
                model: vue.unref(dataForm),
                ref: "Form",
                style: { "margin": "10px" }
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "起始深度",
                    prop: "startDepth"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        type: "number",
                        modelValue: vue.unref(dataForm).startDepth,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(dataForm).startDepth = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "结束深度",
                    prop: "endDepth"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        type: "number",
                        modelValue: vue.unref(dataForm).endDepth,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(dataForm).endDepth = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createCommentVNode(` <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> `),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "颜色",
                    prop: "solumColor"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).solumColor,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(dataForm).solumColor = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "气味",
                    prop: "solumSmell"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).solumSmell,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(dataForm).solumSmell = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "湿度",
                    prop: "solumHumidity"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).solumHumidity,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.unref(dataForm).solumHumidity = $event),
                        type: "select",
                        onClick: _cache[7] || (_cache[7] = ($event) => solumHumidityOptions.show = true)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "可塑性",
                    prop: "solumPlasticity"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).solumPlasticity,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vue.unref(dataForm).solumPlasticity = $event),
                        type: "select",
                        onClick: _cache[9] || (_cache[9] = ($event) => solumPlasticityOptions.show = true)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "密实度",
                    prop: "solumCompactness"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).solumCompactness,
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => vue.unref(dataForm).solumCompactness = $event),
                        type: "select",
                        onClick: _cache[11] || (_cache[11] = ($event) => solumCompactnessOptions.show = true)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "备注",
                    prop: "remark"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).remark,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => vue.unref(dataForm).remark = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "上传图片",
                    prop: "file"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(upload$1, {
                        "file-list": vue.unref(dataForm).files
                      }, null, 8, ["file-list"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["model"]),
              vue.createCommentVNode(' <u-select v-model="select1.show" :list="select1.list" @confirm="onSelect1"></u-select> '),
              vue.createVNode(_component_u_select, {
                modelValue: solumHumidityOptions.show,
                "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => solumHumidityOptions.show = $event),
                "value-name": "id",
                "label-name": "fullName",
                list: solumHumidityOptions.list,
                onConfirm: onSolumHumidityOptions
              }, null, 8, ["modelValue", "list"]),
              vue.createVNode(_component_u_select, {
                modelValue: solumCompactnessOptions.show,
                "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => solumCompactnessOptions.show = $event),
                "value-name": "id",
                "label-name": "fullName",
                list: solumCompactnessOptions.list,
                onConfirm: onSolumCompactnessOptions
              }, null, 8, ["modelValue", "list"]),
              vue.createVNode(_component_u_select, {
                modelValue: solumPlasticityOptions.show,
                "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => solumPlasticityOptions.show = $event),
                "value-name": "id",
                "label-name": "fullName",
                list: solumPlasticityOptions.list,
                onConfirm: onSolumPlasticityOptions
              }, null, 8, ["modelValue", "list"])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesSampleDetectionSamplingPageMonitoringPointWellBaseAddOrEditor = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/pageMonitoringPoint/wellBase/addOrEditor.vue"]]);
  const type = "annexpic";
  const _sfc_main$3 = {
    __name: "cityk-upload",
    emits: ["update:input"],
    setup(__props, { emit: __emit }) {
      const emits = __emit;
      const fileList = vue.ref([]);
      vue.inject("define").baseURL;
      const comUploadUrl = vue.inject("define").comUploadUrl;
      const uploadHeaders = {
        Authorization: uni.getStorageSync("token")
      };
      function onSuccess(data, index, lists, name) {
        if (data.code == 200) {
          fileList.value.push({
            name: lists[index].file.name,
            fileId: data.data.name,
            url: data.data.url
          });
          emits("update:input", fileList.value);
          formatAppLog("log", "at components/cityk-upload.vue:25", fileList.value, "=====");
        }
      }
      return (_ctx, _cache) => {
        const _component_u_upload = resolveEasycom(vue.resolveDynamicComponent("u-upload"), __easycom_0);
        return vue.openBlock(), vue.createBlock(_component_u_upload, {
          "file-list": fileList.value,
          action: vue.unref(comUploadUrl) + type,
          header: uploadHeaders,
          onOnSuccess: onSuccess
        }, null, 8, ["file-list", "action"]);
      };
    }
  };
  const upload = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/components/cityk-upload.vue"]]);
  const _sfc_main$2 = {
    __name: "addOrEditor",
    setup(__props) {
      let dataForm = vue.reactive({
        projectId: "",
        holeId: "",
        startDepth: "",
        endDepth: "",
        solumType: "",
        solumColor: "",
        solumSmell: "",
        solumHumidity: "",
        solumCompactness: "",
        solumPlasticity: "",
        pollutionDesc: "",
        files: []
      });
      function onWellNoOptions(arr) {
        let current = arr[0];
        wellNoOptions.current = current;
        dataForm.wellId = current.label;
      }
      const wellNoOptions = vue.reactive({ show: false, current: {}, list: [] });
      function getwellNoOptions() {
        const query = {
          projectId: uni.getStorageSync("projectId"),
          holeId: uni.getStorageSync("holeId")
        };
        getWellBaseList(query).then((res) => {
          var _list = [];
          for (let i = 0; i < res.data.list.length; i++) {
            let _data = res.data.list[i];
            _list.push(_data);
          }
          wellNoOptions.list = _list;
          formatAppLog("log", "at pages/sampleDetection/sampling/pageMonitoringPoint/wellWashRecord/addOrEditor.vue:87", "list", wellNoOptions.list);
        });
      }
      function parseFiles(data) {
        var _data = JSON.parse(JSON.stringify(data));
        formatAppLog("log", "at pages/sampleDetection/sampling/pageMonitoringPoint/wellWashRecord/addOrEditor.vue:97", _data.files);
        _data.projectId = uni.getStorageSync("projectId");
        _data.holeId = uni.getStorageSync("holeId");
        _data.id = uni.getStorageSync("holeRecordId");
        return _data;
      }
      function addOrUpdateData() {
        dataForm = parseFiles(dataForm);
        if (!dataForm.id)
          ;
        else {
          updateWellWashRecord(dataForm.id, dataForm);
        }
      }
      function initData() {
        const id = uni.getStorageSync("holeRecordId");
        if (id) {
          getWellWashRecordDetail(id).then((res) => {
            dataInfo(res.data);
          });
        }
      }
      onLoad(async () => {
        await initData();
        getwellNoOptions();
      });
      function goToBack() {
        uni.setStorageSync("holeRecordId", null);
        uni.navigateBack({ delta: 1 });
      }
      function dataInfo(dataAll) {
        let _dataAll = dataAll;
        if (_dataAll.files) {
          _dataAll.files = JSON.parse(_dataAll.files);
        } else {
          _dataAll.files = [];
        }
        dataForm = _dataAll;
      }
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$4);
        const _component_u_toast = resolveEasycom(vue.resolveDynamicComponent("u-toast"), __easycom_1);
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_2$2);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_3$1);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_4$1);
        const _component_u_select = resolveEasycom(vue.resolveDynamicComponent("u-select"), __easycom_5);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "status_bar" }, [
              vue.createElementVNode("view", { class: "top_view" })
            ]),
            vue.createElementVNode("view", { class: "mo-container" }, [
              vue.createElementVNode("view", {
                class: "nav-bar",
                style: { "position": "relative", "box-sizing": "border-box", "width": "100vw", "height": "44px" }
              }, [
                vue.createVNode(_component_uni_icons, {
                  onClick: _cache[0] || (_cache[0] = ($event) => goToBack()),
                  type: "left",
                  size: "30",
                  style: { "line-height": "44px" }
                }),
                vue.createElementVNode("text", {
                  class: "title",
                  style: { "font-size": "16px", "position": "absolute", "left": "50%", "top": "50%", "transform": "translate(-50%,-50%)" }
                }, "采样信息"),
                vue.createElementVNode("text", {
                  onClick: _cache[1] || (_cache[1] = ($event) => addOrUpdateData()),
                  type: "primary",
                  class: "submit",
                  style: { "color": "blue", "line-height": "44px", "margin-right": "10px", "float": "right" }
                }, "保存")
              ]),
              vue.createVNode(
                _component_u_toast,
                { ref: "uToast" },
                null,
                512
                /* NEED_PATCH */
              ),
              vue.createVNode(_component_u_form, {
                model: vue.unref(dataForm),
                ref: "Form",
                style: { "margin": "10px" }
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "监测井编号",
                    prop: "wellId"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).wellId,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(dataForm).wellId = $event),
                        type: "select",
                        onClick: _cache[3] || (_cache[3] = ($event) => wellNoOptions.show = true)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createCommentVNode(` <u-form-item label-width='100px' label="洗井类型" prop="washMode"><u-input  v-model="dataForm.washMode" type="select" @click="washModeOptions.show=true" /></u-form-item> `),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "洗井开始时间",
                    prop: "startTime"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).startTime,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(dataForm).startTime = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "洗井结束时间",
                    prop: "endTime"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).endTime,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(dataForm).endTime = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createCommentVNode(` <u-form-item label-width='100px' label="土层类型" prop="startTime"><u-input v-model="dataForm.startTime" /></u-form-item> `),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "洗井设备",
                    prop: "deviceId"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).deviceId,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.unref(dataForm).deviceId = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "井水体积",
                    prop: "waterVolume"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).waterVolume,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => vue.unref(dataForm).waterVolume = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "水温",
                    prop: "waterTemperature"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).waterTemperature,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vue.unref(dataForm).waterTemperature = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "pH值",
                    prop: "waterPh"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).waterPh,
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => vue.unref(dataForm).waterPh = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "电导率",
                    prop: "waterConductivity"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).waterConductivity,
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => vue.unref(dataForm).waterConductivity = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "氧化还原电位",
                    prop: "oxReductionPotential"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).oxReductionPotential,
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => vue.unref(dataForm).oxReductionPotential = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "溶解氧",
                    prop: "dissolvedOxygen"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).dissolvedOxygen,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => vue.unref(dataForm).dissolvedOxygen = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "浊度",
                    prop: "waterTurbidity"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).waterTurbidity,
                        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => vue.unref(dataForm).waterTurbidity = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "备注",
                    prop: "waterQualityDesc"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: vue.unref(dataForm).waterQualityDesc,
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => vue.unref(dataForm).waterQualityDesc = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    "label-width": "100px",
                    label: "上传图片",
                    prop: "file"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(upload, {
                        input: vue.unref(dataForm).files,
                        "onUpdate:input": _cache[15] || (_cache[15] = ($event) => vue.unref(dataForm).files = $event)
                      }, null, 8, ["input"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["model"]),
              vue.createCommentVNode(' <u-select v-model="select1.show" :list="select1.list" @confirm="onSelect1"></u-select> '),
              vue.createVNode(_component_u_select, {
                modelValue: wellNoOptions.show,
                "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => wellNoOptions.show = $event),
                "value-name": "wellNo",
                "label-name": "wellNo",
                list: wellNoOptions.list,
                onConfirm: onWellNoOptions
              }, null, 8, ["modelValue", "list"]),
              vue.createCommentVNode(' <u-select v-model="solumCompactnessOptions.show" value-name="id" label-name="fullName" :list="solumCompactnessOptions.list" @confirm="onSolumCompactnessOptions"></u-select> ')
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesSampleDetectionSamplingPageMonitoringPointWellWashRecordAddOrEditor = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/pageMonitoringPoint/wellWashRecord/addOrEditor.vue"]]);
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache) {
    return null;
  }
  const PagesSampleDetectionSamplingPageMonitoringPointWaterSampleAddOrEditor = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/pages/sampleDetection/sampling/pageMonitoringPoint/waterSample/addOrEditor.vue"]]);
  __definePage("pages/sampleDetection/index", PagesSampleDetectionIndex);
  __definePage("pages/login/index", PagesLoginIndex);
  __definePage("pages/labOperation/index", PagesLabOperationIndex);
  __definePage("pages/me/index", PagesMeIndex);
  __definePage("pages/sampleDetection/detail/index", PagesSampleDetectionDetailIndex);
  __definePage("pages/sampleDetection/sampling/index", PagesSampleDetectionSamplingIndex);
  __definePage("pages/sampleDetection/sampling/monitorPoint/addOrEditor", PagesSampleDetectionSamplingMonitorPointAddOrEditor);
  __definePage("pages/sampleDetection/sampling/qualitySample/addOrEditor", PagesSampleDetectionSamplingQualitySampleAddOrEditor);
  __definePage("pages/sampleDetection/sampling/pageMonitoringPoint/index", PagesSampleDetectionSamplingPageMonitoringPointIndex);
  __definePage("pages/sampleDetection/sampling/pageMonitoringPoint/holeRecord/addOrEditor", PagesSampleDetectionSamplingPageMonitoringPointHoleRecordAddOrEditor);
  __definePage("pages/sampleDetection/sampling/pageMonitoringPoint/soilSample/addOrEditor", PagesSampleDetectionSamplingPageMonitoringPointSoilSampleAddOrEditor);
  __definePage("pages/sampleDetection/sampling/pageMonitoringPoint/wellBase/addOrEditor", PagesSampleDetectionSamplingPageMonitoringPointWellBaseAddOrEditor);
  __definePage("pages/sampleDetection/sampling/pageMonitoringPoint/wellWashRecord/addOrEditor", PagesSampleDetectionSamplingPageMonitoringPointWellWashRecordAddOrEditor);
  __definePage("pages/sampleDetection/sampling/pageMonitoringPoint/waterSample/addOrEditor", PagesSampleDetectionSamplingPageMonitoringPointWaterSampleAddOrEditor);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/lemon/Documents/HBuilderProjects/cityk-app/App.vue"]]);
  const mixin = {
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    methods: {
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = false;
        this.parent = this.$u.$parent.call(this, parentName);
        if (this.parent) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
          this.parentData.value = this.parent.modelValue;
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && e.stopPropagation && e.stopPropagation();
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeUnmount() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index) => {
          if (child === this) {
            childrenList.splice(index, 1);
          }
        });
      }
    }
  };
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    var o = isArray(obj) ? [] : {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (var prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else {
          if (typeof source[prop] !== "object") {
            target[prop] = source[prop];
          } else {
            if (target[prop].concat && source[prop].concat) {
              target[prop] = target[prop].concat(source[prop]);
            } else {
              target[prop] = deepMerge(target[prop], source[prop]);
            }
          }
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
  }
  function date(value) {
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    } else if (value.length === 8) {
      return xreg.test(value);
    } else {
      return false;
    }
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    let reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    let reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (0 === value || isNaN(value))
          return true;
        break;
      case "object":
        if (null === value || value.length === 0)
          return true;
        for (var i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value == "string") {
      try {
        var obj = JSON.parse(value);
        if (typeof obj == "object" && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object(value) && func(value.then) && func(value.catch);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    return new RegExp(/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)$/).test(newValue);
  }
  function video(value) {
    const newValue = value.split("?")[0];
    return new RegExp(/\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8|3gp)$/).test(newValue);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  function string(value) {
    return typeof value === "string";
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code,
    func,
    promise,
    video,
    image,
    regExp,
    string
  };
  class Request {
    // 设置全局默认配置
    setConfig(customConfig) {
      this.config = deepMerge(this.config, customConfig);
    }
    // 主要请求部分
    request(options = {}) {
      if (this.interceptor.request && typeof this.interceptor.request === "function") {
        let interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          return new Promise(() => {
          });
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || "";
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;
      return new Promise((resolve, reject) => {
        options.complete = (response) => {
          uni.hideLoading();
          clearTimeout(this.config.timer);
          this.config.timer = null;
          if (this.config.originalData) {
            if (this.interceptor.response && typeof this.interceptor.response === "function") {
              let resInterceptors = this.interceptor.response(response);
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                reject(response);
              }
            } else {
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (this.interceptor.response && typeof this.interceptor.response === "function") {
                let resInterceptors = this.interceptor.response(response.data);
                if (resInterceptors !== false) {
                  resolve(resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                resolve(response.data);
              }
            } else {
              reject(response);
            }
          }
        };
        options.url = test.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf("/") == 0 ? options.url : "/" + options.url);
        if (this.config.showLoading && !this.config.timer) {
          this.config.timer = setTimeout(() => {
            uni.showLoading({
              title: this.config.loadingText,
              mask: this.config.loadingMask
            });
            this.config.timer = null;
          }, this.config.loadingTime);
        }
        uni.request(options);
      });
    }
    constructor() {
      this.config = {
        baseUrl: "",
        // 请求的根域名
        // 默认的请求头
        header: {},
        method: "POST",
        // 设置为json，返回后uni.request会对数据进行一次JSON.parse
        dataType: "json",
        // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
        responseType: "text",
        showLoading: true,
        // 是否显示请求中的loading
        loadingText: "请求中...",
        loadingTime: 800,
        // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        timer: null,
        // 定时器
        originalData: false,
        // 是否在拦截器中返回服务端的原始数据，见文档说明
        loadingMask: true
        // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
      };
      this.interceptor = {
        // 请求前的拦截
        request: null,
        // 请求后的拦截
        response: null
      };
      this.get = (url2, data = {}, header = {}) => {
        return this.request({
          method: "GET",
          url: url2,
          header,
          data
        });
      };
      this.post = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "POST",
          header,
          data
        });
      };
      this.put = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "PUT",
          header,
          data
        });
      };
      this.delete = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "DELETE",
          header,
          data
        });
      };
    }
  }
  const http = new Request();
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    let prefix = isPrefix ? "?" : "";
    let _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (let key in data) {
      let value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(key + "[" + i + "]=" + value[i]);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(key + "=" + _value);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(key + "=" + commaStr);
            break;
          default:
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
        }
      } else {
        _result.push(key + "=" + value);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params, false);
        return url2 += "&" + query;
      } else {
        query = uni.$u.queryParams(params);
        return url2 += query;
      }
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = uni.$u.deepClone(options, this.config);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type: type2,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]")
        throw new TypeError(
          "fillString must be String"
        );
      let str = this;
      if (str.length >= maxLength)
        return String(str);
      let fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
      while (times >>= 1) {
        fillString += fillString;
        if (times === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, fmt = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let date2 = new Date(dateTime);
    let ret;
    let opt = {
      "y+": date2.getFullYear().toString(),
      // 年
      "m+": (date2.getMonth() + 1).toString(),
      // 月
      "d+": date2.getDate().toString(),
      // 日
      "h+": date2.getHours().toString(),
      // 时
      "M+": date2.getMinutes().toString(),
      // 分
      "s+": date2.getSeconds().toString()
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
      }
    }
    return fmt;
  }
  function timeFrom(dateTime = null, format2 = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let timestamp = +new Date(Number(dateTime));
    let timer = (Number(/* @__PURE__ */ new Date()) - timestamp) / 1e3;
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = parseInt(timer / 60) + "分钟前";
        break;
      case (timer >= 3600 && timer < 86400):
        tips = parseInt(timer / 3600) + "小时前";
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = parseInt(timer / 86400) + "天前";
        break;
      default:
        if (format2 === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = parseInt(timer / (86400 * 30)) + "个月前";
          } else {
            tips = parseInt(timer / (86400 * 365)) + "年前";
          }
        } else {
          tips = timeFormat(timestamp, format2);
        }
    }
    return tips;
  }
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    let startRGB = hexToRgb(startColor, false);
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];
    let endRGB = hexToRgb(endColor, false);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];
    let sR = (endR - startR) / step;
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;
    let colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex("rgb(" + Math.round(sR * i + startR) + "," + Math.round(sG * i + startG) + "," + Math.round(sB * i + startB) + ")");
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      if (!str) {
        return sColorChange;
      } else {
        return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
      }
    } else if (/^(rgb|RGB)/.test(sColor)) {
      let arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    } else {
      return sColor;
    }
  }
  function rgbToHex(rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? "0" + hex : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      let aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha = 0.3) {
    color2 = rgbToHex(color2);
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color2.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
    } else {
      return sColor;
    }
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  function guid(len = 32, firstU = true, radix = null) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return "u" + uuid.join("");
    } else {
      return uuid.join("");
    }
  }
  let color = {
    primary: "#2979ff",
    primaryDark: "#2b85e4",
    primaryDisabled: "#a0cfff",
    primaryLight: "#ecf5ff",
    bgColor: "#f3f4f6",
    info: "#909399",
    infoDark: "#82848a",
    infoDisabled: "#c8c9cc",
    infoLight: "#f4f4f5",
    warning: "#ff9900",
    warningDark: "#f29100",
    warningDisabled: "#fcbd71",
    warningLight: "#fdf6ec",
    error: "#fa3534",
    errorDark: "#dd6161",
    errorDisabled: "#fab6b6",
    errorLight: "#fef0f0",
    success: "#19be6b",
    successDark: "#18b566",
    successDisabled: "#71d5a1",
    successLight: "#dbf1e1",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  function type2icon(type2 = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type2) == -1)
      type2 = "success";
    let iconName = "";
    switch (type2) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  function addUnit(value = "auto", unit = "rpx") {
    value = String(value);
    return test.number(value) ? `${value}${unit}` : value;
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      let gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    } else {
      return 0;
    }
  }
  function trim$1(str, pos = "both") {
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    } else if (pos == "left") {
      return str.replace(/^\s*/, "");
    } else if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    } else if (pos == "all") {
      return str.replace(/\s+/g, "");
    } else {
      return str;
    }
  }
  function toast(title, duration = 1500) {
    uni.showToast({
      title,
      icon: "none",
      duration
    });
  }
  function getParent(name, keys) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        let data = {};
        if (Array.isArray(keys)) {
          keys.map((val) => {
            data[val] = parent[val] ? parent[val] : "";
          });
        } else {
          for (let i in keys) {
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return data;
      }
    }
    return {};
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function os() {
    return uni.getSystemInfoSync().platform;
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(function() {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let timeoutArr = [];
  let flagArr = [];
  function throttle(fn, time = 500, isImmediate = true, timeoutName = "default") {
    if (!timeoutArr[timeoutName])
      timeoutArr[timeoutName] = null;
    if (isImmediate) {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        if (typeof fn === "function")
          fn();
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
        }, time);
      }
    } else {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
          if (typeof fn === "function")
            fn();
        }, time);
      }
    }
  }
  function addStyle(customStyle, target = "object") {
    if (test.empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  let version = "1.10.1";
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ]
  };
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  function wranning(str) {
    {
      formatAppLog("warn", "at uni_modules/vk-uview-ui/index.js:13", str);
    }
  }
  const $u = {
    queryParams,
    route,
    timeFormat,
    date: timeFormat,
    // 另名date
    timeFrom,
    colorGradient: colorGradient$1.colorGradient,
    colorToRgba: colorGradient$1.colorToRgba,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    wranning,
    get: http.get,
    post: http.post,
    put: http.put,
    "delete": http.delete,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    addUnit,
    trim: trim$1,
    type: ["primary", "success", "error", "warning", "info"],
    http,
    toast,
    config,
    // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle,
    addStyle
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.mixin(mixin);
    Vue2.config.globalProperties.$u = $u;
  };
  const uView = {
    install
  };
  let setPermission = {
    permissionList: uni.getStorageSync("permissionList") || [],
    hasP(enCode, menuIds) {
      if (!menuIds)
        return false;
      const list = setPermission.permissionList.filter((o) => o.modelId === menuIds);
      if (!list.length)
        return false;
      const columnList = list[0] && list[0].column ? list[0].column : [];
      if (!columnList.length)
        return false;
      const hasPermission = columnList.some((column) => column.enCode === enCode);
      if (hasPermission)
        return true;
      return false;
    },
    hasFormP(enCode, menuIds) {
      if (!menuIds)
        return false;
      const list = setPermission.permissionList.filter((o) => o.modelId === menuIds);
      if (!list.length)
        return false;
      const formList = list[0] && list[0].form ? list[0].form : [];
      if (!formList.length)
        return false;
      const hasPermission = formList.some((form) => form.enCode === enCode);
      if (hasPermission)
        return true;
      return false;
    },
    hasBtnP(enCode, menuIds) {
      if (!menuIds)
        return false;
      const list = setPermission.permissionList.filter((o) => o.modelId === menuIds);
      if (!list.length)
        return false;
      const btnList = list[0] && list[0].button ? list[0].button : [];
      if (!btnList.length)
        return false;
      const hasPermission = btnList.some((btn) => btn.enCode === enCode);
      if (hasPermission)
        return true;
      return false;
    }
  };
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(store);
    app.use(uView);
    app.provide("define", define);
    app.config.globalProperties.$define = define;
    app.config.globalProperties.$request = request;
    app.config.globalProperties.$setPermission = setPermission;
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
