<script>
  import SyllabusItem from "./SyllabusItem.svelte";
  import {
    searchStore,
    subjectsStore,
    languagesStore,
    badgesStore,
    mentorsStore,
  } from "./stores.js";
  export let syllabiStore;
  import { onMount } from "svelte";
  import { syllabiByApp } from "./syllabi.js";
  let syllabiSearch = [];
  let resultsSearch = [];
  let resultsFilter = [1];
  let filtersEnded = false;
  $: noFiltersApply = resultsFilter.length;
  $: resultsFilter = syllabiSearch.filter((syllabusSearch) => {
    const subject = syllabusSearch.tags["Subject"];
    const language = syllabusSearch.tags["Language"];
    const badge = syllabusSearch.tags["Badge"];
    const mentorAvailable = syllabusSearch.tags["Mentor"];
    if ($subjectsStore == "All") {
      if ($languagesStore == "All") {
        if ($badgesStore == "All") {
          if ($mentorsStore == "All") {
            filtersEnded = true;
            return "All";
          } else {
            filtersEnded = true;
            return mentorAvailable.includes($mentorsStore);
          }
        } else {
          if ($mentorsStore == "All") {
            filtersEnded = true;
            return badge.includes($badgesStore);
          } else {
            filtersEnded = true;
            return (
              badge.includes($badgesStore) &&
              mentorAvailable.includes($mentorsStore)
            );
          }
        }
      } else {
        if ($badgesStore == "All") {
          if ($mentorsStore == "All") {
            filtersEnded = true;
            return language.includes($languagesStore);
          } else {
            filtersEnded = true;
            return (
              language.includes($languagesStore) &&
              mentorAvailable.includes($mentorsStore)
            );
          }
        } else {
          if ($mentorsStore == "All") {
            filtersEnded = true;
            return (
              language.includes($languagesStore) && badge.includes($badgesStore)
            );
          } else {
            filtersEnded = true;
            return (
              language.includes($languagesStore) &&
              badge.includes($badgesStore) &&
              mentorAvailable.includes($mentorsStore)
            );
          }
        }
      }
    } else {
      if ($languagesStore == "All") {
        if ($badgesStore == "All") {
          if ($mentorsStore == "All") {
            filtersEnded = true;
            return subject.includes($subjectsStore);
          } else {
            filtersEnded = true;
            return (
              subject.includes($subjectsStore) &&
              mentorAvailable.includes($mentorsStore)
            );
          }
        } else {
          if ($mentorsStore == "All") {
            filtersEnded = true;
            return (
              subject.includes($subjectsStore) && badge.includes($badgesStore)
            );
          } else {
            filtersEnded = true;
            return (
              subject.includes($subjectsStore) &&
              badge.includes($badgesStore) &&
              mentorAvailable.includes($mentorsStore)
            );
          }
        }
      } else {
        if ($badgesStore == "All") {
          if ($mentorsStore == "All") {
            filtersEnded = true;
            return (
              subject.includes($subjectsStore) &&
              language.includes($languagesStore)
            );
          } else {
            filtersEnded = true;
            return (
              subject.includes($subjectsStore) &&
              language.includes($languagesStore) &&
              mentorAvailable.includes($mentorsStore)
            );
          }
        } else {
          if ($mentorsStore == "All") {
            filtersEnded = true;
            return (
              subject.includes($subjectsStore) &&
              language.includes($languagesStore) &&
              badge.includes($badgesStore)
            );
          } else {
            filtersEnded = true;
            return (
              subject.includes($subjectsStore) &&
              language.includes($languagesStore) &&
              badge.includes($badgesStore) &&
              mentorAvailable.includes($mentorsStore)
            );
          }
        }
      }
    }
  });
  $: resultsSearch = syllabiSearch.filter((syllabusSearch) => {
    const title = syllabusSearch.tags["Title"].toLowerCase();
    const subtitle = syllabusSearch.tags["Subtitle"].toLowerCase();
    const content = syllabusSearch.data.toLowerCase();
    return (
      title.includes($searchStore) ||
      subtitle.includes($searchStore) ||
      content.includes($searchStore)
    );
  });
  onMount(async () => {
    syllabiSearch = await syllabiByApp();
  });
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
      grid-template-columns: repeat(1, 1fr);
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

{#if $searchStore == ''}
  <h3 class="px-6 py-6 text-gray-900 text-bold text-2xl truncate">
    {#if $badgesStore == 'All' && $languagesStore == 'All' && $mentorsStore != 'All' && $subjectsStore == 'All'}
      {$mentorsStore} Mentors for Syllabi
    {:else if $badgesStore == 'All' && $languagesStore == 'All' && $mentorsStore != 'All'}
      {$mentorsStore} Mentors for {$subjectsStore} Syllabi
    {:else if $badgesStore == 'All' && $languagesStore == 'All'}
      {$subjectsStore} Syllabi
    {:else if $subjectsStore == 'All' && $badgesStore == 'All' && $languagesStore != 'All'}
      {$mentorsStore} Mentors for {$languagesStore} Syllabi
    {:else if $subjectsStore != 'All' && $badgesStore == 'All' && $languagesStore != 'All'}
      {$mentorsStore} Mentors for {$languagesStore}
      {$subjectsStore} Syllabi
    {:else if $subjectsStore == 'All' && $languagesStore == 'All' && $badgesStore != 'All'}
      {$mentorsStore} Mentors for {$badgesStore} Syllabi
    {:else if $subjectsStore == 'All' && $languagesStore != 'All' && $badgesStore != 'All'}
      {$mentorsStore} Mentors for {$languagesStore}
      {$badgesStore} Syllabi
    {:else}
      {$mentorsStore} Mentors for {$badgesStore}
      {$languagesStore}
      {$subjectsStore} Syllabi
    {/if}
  </h3>
  <section class="mt-2 px-6">
    {#each syllabiStore as syllabus}
      {#if $subjectsStore == 'All'}
        {#if $languagesStore == 'All'}
          {#if $badgesStore == 'All'}
            {#if $mentorsStore == 'All'}
              <SyllabusItem id={syllabus.id} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem id={syllabus.id} />
            {/if}
          {:else if syllabus.badge == $badgesStore}
            {#if $mentorsStore == 'All'}
              <SyllabusItem id={syllabus.id} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem id={syllabus.id} />
            {/if}
          {/if}
        {:else if syllabus.language == $languagesStore}
          {#if $badgesStore == 'All'}
            {#if $mentorsStore == 'All'}
              <SyllabusItem id={syllabus.id} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem id={syllabus.id} />
            {/if}
          {:else if syllabus.badge == $badgesStore}
            {#if $mentorsStore == 'All'}
              <SyllabusItem id={syllabus.id} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem id={syllabus.id} />
            {/if}
          {/if}
        {/if}
      {:else if syllabus.subject == $subjectsStore}
        {#if $languagesStore == 'All'}
          {#if $badgesStore == 'All'}
            {#if $mentorsStore == 'All'}
              <SyllabusItem id={syllabus.id} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem id={syllabus.id} />
            {/if}
          {:else if syllabus.badge == $badgesStore}
            {#if $mentorsStore == 'All'}
              <SyllabusItem id={syllabus.id} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem id={syllabus.id} />
            {/if}
          {/if}
        {:else if syllabus.language == $languagesStore}
          {#if $badgesStore == 'All'}
            {#if $mentorsStore == 'All'}
              <SyllabusItem id={syllabus.id} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem id={syllabus.id} />
            {/if}
          {:else if syllabus.badge == $badgesStore}
            {#if $mentorsStore == 'All'}
              <SyllabusItem id={syllabus.id} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem id={syllabus.id} />
            {/if}
          {/if}
        {/if}
      {/if}
    {/each}
  </section>
  {#if filtersEnded && noFiltersApply == 0}
    <h3
      class="px-6 py-6 text-gray-900 text-bold text-xl md:text-xl lg:text-2xl
        xl:text-2xl">
      Sorry, there are no syllabi for these filters <br /> Try filter for something
      else
    </h3>
  {/if}
{:else}
  {#if resultsSearch.length > 0}
    <h3 class="px-6 py-6 text-gray-900 text-bold text-2xl">
      Search results for "{$searchStore}"
    </h3>
    <section class="mt-2 px-6">
      {#each syllabiStore as syllabus}
        {#if syllabus.title
          .toLowerCase()
          .includes(
            $searchStore
          ) || syllabus.subtitle
            .toLowerCase()
            .includes(
              $searchStore
            ) || syllabus.content.toLowerCase().includes($searchStore)}
          <SyllabusItem id={syllabus.id} />
        {/if}
      {/each}
    </section>
  {:else}
    <h3
      class="px-6 py-6 text-gray-900 text-bold text-2xl md:text-2xl lg:text-3xl
        xl:text-3xl">
      Sorry, there are no syllabi for "{$searchStore}" <br /> Try searching for something
      else
    </h3>
  {/if}
{/if}
