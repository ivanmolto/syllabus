<script>
  import Header from "./Header.svelte";
  import SearchFilters from "./SearchFilters.svelte";
  import Footer from "./Footer.svelte";
  import Home from "./Home.svelte";
  import Editor from "./Editor.svelte";
  import Syllabus from "./Syllabus.svelte";
  import Mentored from "./Mentored.svelte";
  import { TX_PATTERN } from "./constants.js";
  import { onMount } from "svelte";
  let wallet = null;
  let address = null;
  let page = null;
  let txid = null;
  $: isLoggedIn = !!address;
  $: prevPage = null;
  const onAuth = (event) => {
    wallet = event.detail.wallet;
    address = event.detail.address;
  };
  async function hashchange() {
    const path = window.location.hash.slice(1);
    txid = null;
    prevPage = page;
    if (path.startsWith("/syllabus")) {
      page = "syllabus";
      txid = path.match(TX_PATTERN)[0];
    } else if (path.startsWith("/mentored")) {
      page = "mentored";
      txid = path.match(TX_PATTERN)[0];
    } else if (path.startsWith("/editor")) {
      if (isLoggedIn) {
        page = "editor";
      } else {
        page = "home";
        window.location.href = "#";
      }
    } else {
      page = "home";
      window.location.href = "#";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  onMount(hashchange);
</script>

<svelte:window on:hashchange={hashchange} />
<div class="min-h-screen bg-gray-200 antialiased">
  <Header {isLoggedIn} on:auth={onAuth} />
  {#if page === 'home'}
    <SearchFilters />
    <Home on:auth={onAuth} />
  {:else if page === 'editor'}
    <Editor {wallet} {address} />
  {:else if page === 'syllabus'}
    <Syllabus {wallet} {address} {prevPage} {txid} />
  {:else if page === 'mentored'}
    <Mentored {prevPage} {txid} />
  {/if}
  <Footer />
</div>
