<script>
    import Header from '$lib/components/Header.svelte';
    import SideBar from '$lib/components/src/lib/components/SideBar.svelte';
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';
    import * as bootstrap from 'bootstrap';
    import { page } from '$app/state';
  
    let { children } = $props();
</script>
  
  <svelte:head>
    <title>{page.data.title || page.url.pathname}</title>
  </svelte:head>
  
<div>
  <Header title={page.data.title || "Disp. Móv."}/>
  
  <div class="container-fluid py-5 mt-1 mb-4">
    <main>
      {@render children()}
    </main>
  </div>
    
  <footer class="navbar bg-body-tertiary fixed-bottom">
    <div class="container-fluid">Made with SvelteKit, CapacitorJS, Drizzle, Sql.js and Bootstrap</div>
  </footer>
  
  <SideBar />
</div>