<script>
	import { onMount } from "svelte";
    import { Chart, PieController, ArcElement, Legend, Tooltip } from "chart.js";
    Chart.register(PieController, ArcElement, Legend, Tooltip)

    let chart = $state()
    let resultado = $state('')
    let options = $state([])
    let indiceEditando = $state(-1)
    let item = $state('')
    let itemEditando = $state('')
    let erro = $state('')
    let colors = $state(["#f00", "#f20063", "#ef00dd", "#8a00f3", "#00f", "#0085f2", "#00fcfd", "#00fa59", "#0f0", "#92ff03","#ff0", "#f55300"])
    let data = $derived(() => {return new Array(options.length).fill(1)})

    function adicionar(){
        erro = ""
        if(item == ''){
            erro = "Digite algo!"
            return
        }
        options.push(item)
        item = ""
        chart.update()
    }

    function editar(){
        if(itemEditando == ''){
            erro = "Digite algo!"
            return
        }
        options[indiceEditando] = itemEditando
        indiceEditando = -1
        chart.update()
    }

    function remover(i){
        options.splice(i, 1)
        chart.update()
    }

    function roletar(){
        let random = Math.floor(Math.random() * options.length);
        let angle = random / options.length * 850 * Math.PI - Math.PI;
        chart.options.rotation = chart.options.animation.rotation;
        chart.options.animation.rotation = angle + 5 * 80 * Math.PI;
        chart.update();
        setTimeout(() => {
            resultado = options[random];
        }, 2600);
    }

    onMount(() => {
        let ctx = document.getElementById("chart").getContext("2d");
        chart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: options,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0.8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        align: 'start',
                        position: 'left'
                    }
                },
                animation: {
                    duration: 2500, 
                    easing: "easeInOutCirc", 
                    onProgress: function (animation) {
                        chart.options.rotation = animation.currentStep / animation.numSteps * 2 * Math.PI - Math.PI / 2;
                    }
                }
            }
        });

        return () => {
            chart.destroy()
        }
    })
</script>

<div class="container text-center">
    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">item</span>
        <input type="text" class="form-control" bind:value={item} onkeypress={(e) => {if(e.key == 'Enter'){adicionar()}}}>
        <button class="btn btn-success" onclick={adicionar}>+</button>
    </div>
    {#if erro != ''}<p style="color:red;">{erro}</p>{/if}
    <hr>
    <div style={`visibility: ${options.length == 0 ? 'hidden' : 'visible'};`}>
        <canvas id="chart"></canvas>
        <button class="btn btn-primary" onclick={roletar}>ROLETAR</button>
    </div>
</div>