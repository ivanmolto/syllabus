<script>
  import { arweave } from "./arweave.js";
  import Community from "community-js";
  import { publish } from "./syllabus.js";
  import { onMount } from "svelte";
  import { documentTitle } from "./helpers.js";
  import { quill } from "svelte-quill";
  import {
    editSubjects,
    editLanguages,
    editBadges,
    editDurations,
    editMentors,
    editPrices,
  } from "./populate.js";
  import { CONTRACTID } from "./constants.js";
  import FilePond, { registerPlugin, supported } from "svelte-filepond";
  import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
  import FilePondPluginImagePreview from "filepond-plugin-image-preview";
  import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
  import FilePondPluginFileEncode from "filepond-plugin-file-encode";
  import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
  import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
  export let wallet;
  export let address;
  let lengthToAdd = 0;
  let enablePreview = false;
  let options = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block", "link", "image", "video"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    },
    placeholder: "Start to write your syllabus...",
    theme: "snow",
  };
  let syllabusContent = {
    html: "Start to write your syllabus...",
    text: "Start to write your syllabus...",
  };
  let subjectEdited;
  let languageEdited;
  let badgeEdited;
  let durationEdited;
  let mentorEdited;
  let priceEdited;
  let pstRecipient;
  let pstFeeRecipient = 0.05;
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
  function handleAddFile(error, fileItem) {
    const dataURL = fileItem.getFileEncodeDataURL();
    imageUrl = dataURL;
    lengthToAdd = imageUrl.length;
    if (fileItem) {
      dataURL;
    }
  }
  let id = "";
  let apiVersion = "1";
  let status = "Published";
  let title = "";
  let subtitle = "";
  let imageUrl = "";
  let subject = "Arts";
  let language = "English";
  let badge = "New";
  let duration = "5 minutes";
  let price = "2.49";
  let mentorAvailable = "Available";
  const submitSyllabus = async () => {
    if (!wallet || !address) {
      return;
    }
    const client = new Arweave({
      host: "arweave.dev",
      port: 443,
      protocol: "https",
      timeout: 200000,
    });
    let community = new Community(client);
    await community.setCommunityTx(CONTRACTID);
    pstRecipient = await community.selectWeightedHolder();
    let pstTx = await arweave.createTransaction(
      {
        target: pstRecipient,
        quantity: arweave.ar.arToWinston(pstFeeRecipient),
      },
      wallet
    );
    await arweave.transactions.sign(pstTx, wallet);
    await arweave.transactions.post(pstTx);
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
        imageUrl: lengthToAdd,
        duration: duration,
        language: language,
        badge: badge,
        author: address,
        mentorAvailable: mentorAvailable,
        subject: subject,
        status: status,
        apiVersion: apiVersion,
        content: imageUrl + syllabusContent.html,
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
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginFileEncode,
    FilePondPluginFileValidateSize,
    FilePondPluginImageValidateSize
  );
  let pond;
  let name = "filepond";
  function handleInit() {}
</script>

<style>
  .editor {
    font-size: 1rem;
  }
</style>

<svelte:head>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>
<div class="py-6 antialiased text-gray-900 px-6">
  <form on:submit|preventDefault={submitSyllabus}>
    <div class="max-w-2xl mx-auto">
      <h1 class="content-center text-bold text-2xl w-full">
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
              required
              on:input={(event) => (title = event.target.value)} />
          </label>
          <label class="block mt-4">
            <span class="text-gray-900">Subtitle</span>
            <input
              type="text"
              name="subtitle"
              class="form-input mt-1 block w-full text-gray-900 shadow
                bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
              required
              on:input={(event) => (subtitle = event.target.value)} />
          </label>
          <label class="block mt-4" for="mentorship">
            <span class="text-gray-900">Mentorship</span>
            <div class="sm:flex lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none"
                name="mentorship"
                bind:value={mentorEdited}
                on:blur={handleEditedMentor}>
                {#each editMentors as editMentor}
                  <option value={editMentor}>{editMentor.text}</option>
                {/each}
              </select>
            </div>
          </label>
          {#if mentorAvailable === 'Available'}
            <label class="block mt-4" for="pricing">
              <span class="text-gray-900">Tips in AR tokens per 30 mins</span>
              <div class="sm:flex lg:block lg:mx-0">
                <select
                  class="mt-1 form-select block w-full text-gray-900 shadow
                    bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                    border-none"
                  name="pricing"
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
          <label class="block" for="subject">
            <span class="text-gray-900">Subject</span>
            <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none mr-2"
                name="subject"
                bind:value={subjectEdited}
                on:blur={handleEditedSubject}>
                {#each editSubjects as editSubject}
                  <option value={editSubject}>{editSubject.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4" for="language">
            <span class="text-gray-900">Language</span>
            <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none mr-2"
                name="language"
                bind:value={languageEdited}
                on:blur={handleEditedLanguage}>
                {#each editLanguages as editLanguage}
                  <option value={editLanguage}>{editLanguage.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4" for="badge">
            <span class="text-gray-900">Badge</span>
            <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none mr-2"
                name="badge"
                bind:value={badgeEdited}
                on:blur={handleEditedBadge}>
                {#each editBadges as editBadge}
                  <option value={editBadge}>{editBadge.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4" for="duration">
            <span class="text-gray-900">Duration</span>
            <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none mr-2"
                name="duration"
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
      <div class="block mt-6">
        <FilePond
          bind:this={pond}
          {name}
          allowFileSizeValidation={true}
          maxFileSize={100000}
          allowImageValidateSize={true}
          imageValidateSizeMinWidth={480}
          imageValidateSizeMaxWidth={480}
          imageValidateSizeMinHeight={270}
          imageValidateSizeMaxHeight={270}
          imageValidateSizeLabelExpectedMinSize={'Minimum size is {minWidth} × {minHeight}'}
          imageValidateSizeLabelExpectedMaxSize={'Maximum size is {maxWidth} × {maxHeight}'}
          acceptedFileTypes={['image/png', 'image/jpeg']}
          labelIdle={'Drag & Drop your cover image or <span class="filepond--label-action"> Browse </span><br><i>- only png and jpeg formats, 480px (width) x 270px (height) and max size of 100 KB -</i>'}
          maxFiles={1}
          allowMultiple={false}
          oninit={handleInit}
          onaddfile={handleAddFile}
          required={true} />
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
          <div class="prose">
            {@html syllabusContent.html}
          </div>
        {/if}
      </div>
      <div class="mt-4 py-4 sm:text-right">
        <button
          type="submit"
          aria-label="Publish"
          class="block w-full sm:w-auto sm:inline-block bg-blue-700
            hover:bg-blue-600 font-semibold text-white px-6 py-2 rounded-lg">
          Publish
        </button>
      </div>
    </div>
  </form>
</div>
