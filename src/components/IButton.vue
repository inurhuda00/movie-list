<template>
  <button v-bind="$attrs" :type="type" :disabled="loading"
    :class="button({ variant, size, outline, class: $attrs.class })">
    <slot />
  </button>
</template>

<script setup>
import { tv } from 'tailwind-variants';
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  outline: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'xl',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'ghost', 'danger'].includes(value)
  },
});

const button = tv({
  base: 'rounded-lg font-semibold text-white shadow-sm focus:outline focus:ring',
  variants: {
    size: {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-3.5 py-2.5 text-sm',
      xl: 'px-4 py-3 text-base'
    },
    variant: {
      primary: 'bg-primary hover:bg-primary focus:outline-primary/50 focus:ring-primary/60 active:bg-primary/30 disabled:bg-primary/50',
      danger: 'bg-red-600 hover:bg-red-500 focus:outline-red-600 focus:ring-red-600 active:bg-red-700 disabled:bg-red-500',
      ghost: 'focus:outline-white/10 focus:ring-white/10 active:bg-white/10 disabled:bg-white/10'
    },
    outline: {
      true: 'border'
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none'
    }
  },
  compoundVariants: [{
    outline: true,
    class: 'bg-transparent hover:bg-white focus:outline-white/50 focus:ring-white/60 active:bg-white/30 disabled:bg-white/50'
  }]
})

</script>
