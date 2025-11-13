<template>
  <van-empty
    :image="resolvedImage"
    :description="text"
    :style="{ marginTop: computedMarginTop, fontSize: `${fontSize}px`, ...imageSizeStyle }"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { Empty } from 'vant';

export default defineComponent({
  name: 'WfEmpty',
  components: {
    [Empty.name]: Empty,
  },
  props: {
    text: { type: String, default: '暂无数据' },
    mode: { type: String, default: 'list' },
    src: { type: String, default: '' },
    iconSize: { type: [String, Number], default: 263 },
    marginTop: { type: [String, Number], default: '' },
    fontSize: { type: [String, Number], default: 30 },
  },
  data() {
    return {
      fallbackMargin: '160px',
    };
  },
  computed: {
    resolvedImage() {
      const base = this.src || `${this.wfImage || ''}/public/empty.png`;
      return base;
    },
    computedMarginTop() {
      if (this.marginTop !== '' && this.marginTop !== undefined && this.marginTop !== null) {
        return typeof this.marginTop === 'number' ? `${this.marginTop}px` : this.marginTop;
      }
      return this.fallbackMargin;
    },
    imageSizeStyle() {
      const size = typeof this.iconSize === 'number' ? `${this.iconSize}px` : this.iconSize;
      return { '--van-empty-image-size': size };
    },
  },
  mounted() {
    if (!this.marginTop) {
      const height = typeof window !== 'undefined' ? window.innerHeight : 0;
      this.fallbackMargin = height ? `${Math.floor(height / 2.5)}px` : '160px';
    }
  },
});
</script>

<style scoped>
.van-empty {
  width: 100%;
}
</style>
