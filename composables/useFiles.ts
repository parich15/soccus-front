export default function useFiles() {
  const { $config } = useNuxtApp()

  function fileUrl(fileId: String | Number) {
    return `${$config.public.directusApi}/assets/${fileId}`
  }

  return {
    fileUrl,
  }
}
