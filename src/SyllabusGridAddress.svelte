<script>
  import SyllabusItem from "./SyllabusItem.svelte";
  export let txid;
  export let syllabiByMentorStore;
</script>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  @media (min-width: 640px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1024px) {
    section {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (min-width: 1280px) {
    section {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>

<h3 class="px-6 py-6 text-gray-900 text-bold text-3xl truncate">
  Mentored by {txid}
</h3>
<section class="mt-2 px-6">
  {#each syllabiByMentorStore as syllabus}
    {#if syllabus.author == txid}
      <SyllabusItem id={syllabus.id} />
    {/if}
  {/each}
</section>
