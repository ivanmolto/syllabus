<script>
  import { publish } from "./syllabus.js";
  import { onMount } from "svelte";
  import { documentTitle } from "./helpers.js";
  // import { arweave } from "./arweave.js";
  // import { createEventDispatcher } from "svelte";
  import { quill } from "svelte-quill";

  import {
    editSubjects,
    editLanguages,
    editBadges,
    editDurations,
    editMentors,
    editPrices,
  } from "./populate.js";
  export let wallet;
  export let address;

  let enablePreview = false;
  let options = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block", "link", "image", "video"],

        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],

        [{ size: ["small", "normal", "large"] }],

        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],

        ["clean"],
      ],
    },
    placeholder: "Start to write your syllabus...",
    theme: "snow",
  };

  let syllabusContent = { html: "", text: "" };
  // const dispatch = createEventDispatcher();

  let subjectEdited;
  let languageEdited;
  let badgeEdited;
  let durationEdited;
  let mentorEdited;
  // let mentorsCheck = "Available";
  let priceEdited;

  function handleEditedSubject() {
    subject = subjectEdited.text;
  }

  function handleEditedLanguage() {
    language = languageEdited.text;
  }

  function handleEditedBadge() {
    badge = badgeEdited.text;
  }

  function handleEditedDuration() {
    duration = durationEdited.text;
  }

  function handleEditedMentor() {
    mentorAvailable = mentorEdited.text;
  }

  function handleEditedPrice() {
    price = priceEdited.text;
  }

  let id = "";
  let apiVersion = "1";
  let rating = "0.0";
  let reviewCount = "0";
  let isFavorite = "false";
  let author = "Ivan Molto";
  let status = "Published";

  let title = "";
  let subtitle = "";
  let imageUrl = "";
  let subject = "Arts";
  let language = "English";
  let badge = "New";
  let duration = "5 minutes";
  let price = "2.99";
  let mentorAvailable = "Available";
  let content = "Data";

  console.log(wallet);
  console.log(address);

  $: console.log(id);
  $: console.log(title);
  $: console.log(subtitle);
  $: console.log(imageUrl);
  $: console.log(duration);
  $: console.log(language);
  $: console.log(rating);
  $: console.log(reviewCount);
  $: console.log(isFavorite);
  $: console.log(badge);
  $: console.log(author);
  $: console.log(mentorAvailable);
  $: console.log(price);
  $: console.log(subject);
  $: console.log(status);
  $: console.log(apiVersion);
  $: console.log(price);
  $: console.log(syllabusContent.html);

  const submitSyllabus = async (event) => {
    if (!wallet || !address) {
      return;
    }

    handleEditedSubject();
    handleEditedLanguage();
    handleEditedBadge();
    handleEditedDuration();
    handleEditedMentor();
    handleEditedPrice();

    const tx = await publish(
      {
        id: id,
        title: title,
        subtitle: subtitle,
        imageUrl: imageUrl,
        duration: duration,
        language: language,
        rating: rating,
        reviewCount: reviewCount,
        isFavorite: isFavorite,
        badge: badge,
        author: address,
        mentorAvailable: mentorAvailable,
        subject: subject,
        status: status,
        apiVersion: apiVersion,
        content: syllabusContent.html,
        price: price,
      },
      wallet,
      address
    );

    window.location.href = `#/syllabus/${tx.id}`;
  };

  onMount(() => {
    documentTitle("Editor");
  });
</script>

<style>
  .editor {
    font-size: 1rem;
  }
</style>

<svelte:head>
  <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>
<div class="py-6 antialiased text-gray-900 px-6">
  <form on:submit|preventDefault={submitSyllabus}>
    <div class="max-w-2xl mx-auto">
      <h1 class="content-center text-bold text-4xl w-full">
        List Your Syllabus
      </h1>
      <div class="mt-4 flex flex-wrap -mx-6">
        <div class="w-1/2 px-6">
          <label class="block">
            <span class="text-gray-900">Title</span>
            <input
              type="text"
              name="title"
              class="form-input mt-1 block w-full text-gray-900 shadow
              bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
              placeholder="Please write at least 15 characters"
              required
              on:input={(event) => (title = event.target.value)} />
          </label>
          <label class="block mt-4">
            <span class="text-gray-900">Subtitle</span>
            <input
              type="text"
              name="content"
              class="form-input mt-1 block w-full text-gray-900 shadow
              bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
              placeholder="Please write at least 20 characters"
              required
              on:input={(event) => (subtitle = event.target.value)} />
          </label>
          <label class="block mt-4">
            <span class="text-gray-900">Image URL</span>
            <input
              type="text"
              name="imageUrl"
              class="form-input mt-1 block w-full text-gray-900 shadow
              bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
              placeholder="Your Cover Image URL goes here"
              required
              on:input={(event) => (imageUrl = event.target.value)} />
          </label>
          <label class="block mt-4">
            <span class="text-gray-900">Mentorship</span>
            <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
                bind:value={mentorEdited}
                on:blur={handleEditedMentor}>
                {#each editMentors as editMentor}
                  <option value={editMentor}>{editMentor.text}</option>
                {/each}
              </select>
            </div>
          </label>
          {#if mentorAvailable === 'Available'}
            <label class="block mt-4">
              <span class="text-gray-900">Price in AR tokens per 30 mins</span>
              <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
                <select
                  class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none"
                  bind:value={priceEdited}
                  on:blur={handleEditedPrice}>
                  {#each editPrices as editPrice}
                    <option value={editPrice}>{editPrice.text}</option>
                  {/each}
                </select>
              </div>
            </label>
          {/if}
        </div>
        <div class="w-1/2 px-6">
          <label class="block">
            <span class="text-gray-900">Subject</span>
            <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none
                mr-2"
                bind:value={subjectEdited}
                on:blur={handleEditedSubject}>
                {#each editSubjects as editSubject}
                  <option value={editSubject}>{editSubject.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4">
            <span class="text-gray-900">Language</span>
            <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none
                mr-2"
                bind:value={languageEdited}
                on:blur={handleEditedLanguage}>
                {#each editLanguages as editLanguage}
                  <option value={editLanguage}>{editLanguage.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4">
            <span class="text-gray-900">Badge</span>
            <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none
                mr-2"
                bind:value={badgeEdited}
                on:blur={handleEditedBadge}>
                {#each editBadges as editBadge}
                  <option value={editBadge}>{editBadge.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4">
            <span class="text-gray-900">Duration</span>
            <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none
                mr-2"
                bind:value={durationEdited}
                on:blur={handleEditedDuration}>
                {#each editDurations as editDuration}
                  <option value={editDuration}>{editDuration.text}</option>
                {/each}
              </select>
            </div>
          </label>

        </div>
      </div>
      <div class="block mt-4">
        <span class="text-gray-900">Rich Text Editor</span>
      </div>
      <div
        class="mt-2 block w-full text-2xl text-gray-900 shadow bg-gray-400
        hover:border-gray-200 focus:bg-gray-300 border-none">
        <div
          class="editor"
          use:quill={options}
          on:text-change={(e) => (syllabusContent = e.detail)} />
        <br />
      </div>
      <div>
        <label class="flex">
          <input
            class="mt-3 form-checkbox h-5 w-5 block text-gray-900 bg-gray-400
            hover:border-gray-200 focus:bg-gray-300 border-none"
            type="checkbox"
            name="preview"
            bind:checked={enablePreview} />
          <span class="ml-2 mt-3">Enable Preview HTML</span>
        </label>
        {#if enablePreview}
          <div>
            {@html syllabusContent.html}
          </div>
        {/if}
      </div>
      <div class="mt-4 py-4 sm:text-right">
        <button
          type="button"
          aria-label="Publish"
          class="block w-full sm:w-auto sm:inline-block bg-blue-500
          hover:bg-blue-400 font-semibold text-white px-6 py-2 rounded-lg"
          on:click={submitSyllabus}>
          Publish
        </button>
      </div>
    </div>
  </form>

</div>
