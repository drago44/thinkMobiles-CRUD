<template>
  <main class="main">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition name="fade" mode="out-in">
          <Suspense>
            <component :is="Component"></component>
            <template #fallback> Loading... </template>
          </Suspense>
        </Transition>
      </template>
    </RouterView>
  </main>
</template>

<style lang="scss">
.main {
  padding: rem(50) rem(0);
}
.center {
  display: flex;
  justify-content: center;
}
</style>
