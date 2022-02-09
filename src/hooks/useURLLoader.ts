import { reactive, toRefs } from "vue";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useURLLoader<T>(url: string) {
  const data = reactive<{
    loading: boolean;
    result: T | null;
    error: null;
  }>({
    loading: true,
    result: null,
    error: null,
  });

  axios
    .get(url)
    .then((rawData) => {
      data.result = rawData.data;
      data.loading = false;
    })
    .catch((e) => {
      data.error = e;
    });

  return toRefs(data);
}

export default useURLLoader;
