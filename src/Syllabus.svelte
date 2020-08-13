<script>
  import { onDestroy } from "svelte";
  import { syllabiStore } from "./stores.js";

  export let txid;
  // export let wallet;
  // export let address;
  export let prevPage;
  // export let isLoggedIn;

  let selectedSyllabus;

  const unsubscribe = syllabiStore.subscribe((items) => {
    selectedSyllabus = items.find((i) => i.id == txid);
    console.log(selectedSyllabus);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

{#if prevPage == 'editor'}
  <h3 class="px-6 py-6 content-center text-gray-900 text-bold text-3xl">
    Your syllabus will be public once the network confirmation is done
    <br />
    Thank you!
  </h3>
{:else}
  <div class="mx-8 mt-8 bg-white rounded-lg overflow-hidden shadow-lg">
    <div class="relative pb-2/3">
      <img
        class="h-48 w-full object-cover"
        src={selectedSyllabus.imageUrl}
        alt={selectedSyllabus.title} />
    </div>
    <div class="p-4">
      <div class="items-baseline">
        {#if selectedSyllabus.badge == 'Bestseller'}
          <span
            class="inline-block bg-yellow-400 text-gray-800 text-xs px-2
            rounded-md uppercase font-semibold tracking-wide">
            {selectedSyllabus.badge}
          </span>
        {:else if selectedSyllabus.badge == 'Featured'}
          <span
            class="inline-block bg-indigo-400 text-gray-800 text-xs px-2
            rounded-md uppercase font-semibold tracking-wide">
            {selectedSyllabus.badge}
          </span>
        {:else if selectedSyllabus.badge == 'Updated'}
          <span
            class="inline-block bg-purple-400 text-gray-800 text-xs px-2
            rounded-md uppercase font-semibold tracking-wide">
            {selectedSyllabus.badge}
          </span>
        {:else if selectedSyllabus.badge == 'New'}
          <span
            class="inline-block bg-blue-400 text-gray-800 text-xs px-2
            rounded-md uppercase font-semibold tracking-wide">
            {selectedSyllabus.badge}
          </span>
        {:else}
          <span
            class="inline-block bg-red-400 text-gray-800 text-xs px-2 rounded-md
            uppercase font-semibold tracking-wide">
            {selectedSyllabus.badge}
          </span>
        {/if}
        <div class="mt-2 text-gray-800 text-xs font-semibold tracking-wide">
          {selectedSyllabus.language} &bull; {selectedSyllabus.duration}
        </div>
      </div>
      <div
        class="mt-1 font-semibold text-3xl leading-tight row-span-2 truncate">
        {selectedSyllabus.title}
      </div>
      <div
        class="mt-1 text-gray-700 font-2xl text-medium leading-tight row-span-2
        truncate">
        {selectedSyllabus.subtitle}
      </div>
      <div class="mt-2 flex items-center">
        <span class="text-teal-800 font-semibold text-sm">
          {selectedSyllabus.rating}
        </span>
        <span class="ml-2 text-gray-800 text-sm">
          ({selectedSyllabus.reviewCount} ratings)
        </span>
      </div>
      <div
        class="mt-1 text-gray-900 font-light text-sm leading-tight row-span-2
        truncate">
        {selectedSyllabus.author}
      </div>
      <div class="items-baseline">
        {#if selectedSyllabus.mentorAvailable == 'Available'}
          <span
            class="mt-2 inline-block bg-teal-200 text-teal-800 text-xs px-2
            rounded-md uppercase font-semibold tracking-wide">
            Mentor
          </span>
        {/if}
      </div>
    </div>
    <div>
      {@html selectedSyllabus.content}
    </div>
  </div>
{/if}
