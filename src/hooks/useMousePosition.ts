import { reactive, onMounted, onUnmounted, Ref, toRefs } from "vue";
interface IPosition {
  x: number;
  y: number;
}

function useMousePosition(): { x: Ref<number>; y: Ref<number> } {
  const position: IPosition = reactive({
    x: 0,
    y: 0,
  });
  const updateMouse = (e: MouseEvent) => {
    position.x = e.pageX;
    position.y = e.pageY;
  };
  onMounted(() => {
    document.addEventListener("click", updateMouse);
  });
  onUnmounted(() => {
    document.removeEventListener("click", updateMouse);
  });
  return { ...toRefs(position) };
}

export default useMousePosition;
