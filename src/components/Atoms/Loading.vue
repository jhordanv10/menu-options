<template>
  <div class="loading">
    <figure class="loading-figure">
      <img
        class="loading-figure-img"
        src="../../assets/graphicMarket.png"
        alt="loading"
      />
    </figure>
    <div class="loading-spinner"></div>
  </div>
</template>

<style scoped>
.loading {
    position: absolute;
    left: 0;
    right: 0;
    top: 30%;
    background-color: transparent;
}
.loading-figure {
  text-align: center;
  margin-bottom: 0px;
}
.loading-figure-img {
  width: 80px;
  height: 80px;
}
.loading-spinner {
  margin: 0 auto;
  padding-bottom: 20px;
  padding-top: 10px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-left-color: #7f9cdc;
  animation: spin 1s ease infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>%