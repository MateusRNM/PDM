<script>
    let { symbol, func, color } = $props()
</script>

<div class="text-center m-1 border rounded-2 w-100 h-100">
    <button type="button" class={`btn w-100 h-100 ${color}`}>{symbol}</button>
</div>