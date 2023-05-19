import Vue from "vue";
export default Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            // Check that the clicked element is not inside the bound element
            if (!(el == event.target || el.contains(event.target))) {
                // Call the provided method in the binding
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
});