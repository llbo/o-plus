(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.OPlus = {}, global.vue));
})(this, (function (exports, vue) { 'use strict';

  const withInstall = (comp) => {
      comp.install = function (app) {
          app.component(comp.name, comp);
      };
      return comp;
  };

  const iconProps = {
      size: {
          type: Number,
      },
      color: {
          type: String,
      },
  };

  var script = vue.defineComponent({
      name: 'OIcon',
      props: iconProps,
      setup(props) {
          const style = vue.computed(() => {
              if (!props.size && !props.color) {
                  return {};
              }
              return Object.assign(Object.assign({}, (props.size ? { 'font-size': props.size + 'px' } : {})), (props.color ? { 'color': props.color } : {}));
          });
          return {
              style
          };
      }
  });

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("i", {
      class: "o-icon",
      style: vue.normalizeStyle(_ctx.style)
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 4 /* STYLE */))
  }

  script.render = render;
  script.__file = "packages/components/icon/src/icon.vue";

  const OIcon = withInstall(script);

  const components = [
      OIcon
  ];
  const install = (app) => {
      components.forEach(component => app.use(component));
  };
  var index = {
      install
  };

  exports.OIcon = OIcon;
  exports["default"] = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
