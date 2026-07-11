export default defineConfig(() => {
  return {
    base: '/Safal_ai_and_Innoivation/', // 👈 add this — must match your repo name exactly
    plugins: [react(), tailwindcss()],
    ...
  };
});
