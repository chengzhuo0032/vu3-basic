<template>
  <div id="app">
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <ul>
      <li v-for="number in numbers" :key="number">
        <h1>{{ number }}</h1>
      </li>
    </ul>
    <h1>{{ persoon.name }}</h1>
    <button @click="increase">+1</button>
    <button @click="updateGreeting">update greeting</button>
    <h1>x:{{ x }}</h1>
    <h1>x:{{ y }}</h1>
    <div v-if="loading">Loading!....</div>
    <div v-else>
      <img :src="result[0].url" />
    </div>
    <!-- 应该渲染在app中的组件成功的渲染到了model中 -->
    <Modal :isOpen="modalIsOpen" @close-modal="closeModal">这是一个弹框</Modal>
    <button @click="openModal">打开</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, ref, watch } from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
import Modal from "./components/Modal.vue";
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  persoon: { name?: string };
}

// interface DogResult {
//   message: string;
//   status: string;
// }

interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default defineComponent({
  name: "App",
  components: { Modal },

  setup() {
    // const count = ref(0);
    // const double = computed(() => {
    //   return count.value * 2;
    // });
    // const increase = () => {
    //   count.value++;
    // };
    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++;
      },
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      persoon: {},
    });
    const { x, y } = useMousePosition();
    //完美支持数组和对象的操作  无需像2.0一样的vm.$set   proxy
    data.numbers[0] = 5;
    data.persoon.name = "程卓";
    const refData = toRefs(data);

    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "hello! ";
    };

    watch([greetings, () => data.count], (newVal, oldVal) => {
      console.log(oldVal);
      console.log(newVal);
      document.title = `title${greetings.value}`;
    });
    document.title = `title${greetings.value}`;

    const { result, loading } = useURLLoader<CatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    watch(result, () => {
      if (result.value) console.log("value", result.value[0].url);
    });

    const modalIsOpen = ref(false);

    const openModal = () => {
      modalIsOpen.value = true;
    };

    const closeModal = () => {
      modalIsOpen.value = false;
    };

    return {
      ...refData,
      updateGreeting,
      x,
      y,
      result,
      loading,
      modalIsOpen,
      openModal,
      closeModal,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
