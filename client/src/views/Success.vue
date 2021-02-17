<template>
    <div class="container">
	<div class="row">
		<div class="col-md-12 text-center success">
            <h3 class="mt-5 mb-3">Успіх!</h3>
            <img class="image success-img" src="@/assets/success.svg" />
			<h5 class="mt-3"><router-link class="text-muted" to="/">На головну</router-link></h5>
		</div>
	</div>
        </div>
</template>

<style scoped>

.row {
    margin-left: 10px;
    margin-right: 10px;
}
.container {
    min-height: 100vh;
    max-width: 660px;
}
.success {
    padding: 0 0 40px;
    margin-top: 10vh;
    border-radius: 50px;
    border: 1px solid rgba(206, 206, 206, 0.678);
    box-shadow: 5px 5px 10px 0px #e0e0e0;
}

.success-img {
    width: 140px;
}
</style>