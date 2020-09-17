<script>
  import { arweave } from "./arweave.js";
  import Community from "community-js";
  import { read } from "./syllabus.js";
  import { CONTRACTID } from "./constants.js";
  export let wallet;
  export let address;
  export let txid;
  export let prevPage;
  $: render(txid);
  let syllabus = {};
  let title = "";
  let subtitle = "";
  let imageUrl = "";
  let duration = "";
  let language = "";
  let badge = "";
  let author = "";
  let mentorAvailable = "";
  $: mentorRecipient = author;
  let price = "";
  let content = "";
  let subject = "";
  let status = "";
  let apiVersion = "";
  let timestamp = "";
  let pstRecipient;
  let pstFeeRecipient = 0.25;
  const render = async (txid) => {
    syllabus = await read(txid);
    title = syllabus["tags"]["Title"];
    subtitle = syllabus["tags"]["Subtitle"];
    duration = syllabus["tags"]["Duration"];
    language = syllabus["tags"]["Language"];
    badge = syllabus["tags"]["Badge"];
    author = syllabus["tags"]["Author"];
    mentorAvailable = syllabus["tags"]["Mentor"];
    price = syllabus["tags"]["Price"];
    subject = syllabus["tags"]["Subject"];
    status = syllabus["tags"]["Status"];
    apiVersion = syllabus["tags"]["API"];
    timestamp = syllabus["tags"]["Timestamp"];
    imageUrl = syllabus.data.slice(0, syllabus["tags"]["ImageUrl"]);
    content = syllabus.data.slice(syllabus["tags"]["ImageUrl"], -1);
  };
  async function getContractState() {
    return readContract(arweave, CONTRACTID).then((state) => {
      return state;
    });
  }
  const submitMentor = async () => {
    let feeMentor = parseFloat(price);
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

    let mentorTx = await arweave.createTransaction(
      {
        target: mentorRecipient,
        quantity: arweave.ar.arToWinston(feeMentor),
      },
      wallet
    );
    await arweave.transactions.sign(mentorTx, wallet);
    await arweave.transactions.post(mentorTx);
  };
</script>

<style>
  .aspect-16x9 {
    padding-bottom: 56.25%;
  }
</style>

<svelte:head>
  <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>
{#if prevPage == 'editor'}
  <div class="px-6 py-12">
    <h3 class="px-6 py-6 flex justify-center text-gray-900 text-bold text-2xl">
      Your syllabus will be public once the network confirmation is done
    </h3>
  </div>
{:else}
  <div class="mt-8 flex">
    <div
      class="px-2 max-w-md mx-auto sm:max-w-lg lg:max-w-full lg:w-1/2 lg:px-12">
      <div class="xl:max-w-lg xl:ml_auto">
        <img
          class="mt-6 rounded-lg shadow-xl sm:h-64 sm:mt-8 sm:w-full
            sm:object-cover sm:object-center lg:hidden"
          src={imageUrl}
          alt={title} />
        <div class="mt-2 text-gray-800 text-base font-semibold tracking-wide">
          {language} &bull; {duration}
          {#if badge == 'Bestseller'}
            <span
              class="inline-block bg-yellow-400 text-gray-800 text-xs px-2
                rounded-md uppercase font-semibold tracking-wide">
              {badge}
            </span>
          {:else if badge == 'Featured'}
            <span
              class="inline-block bg-indigo-400 text-gray-800 text-xs px-2
                rounded-md uppercase font-semibold tracking-wide">
              {badge}
            </span>
          {:else if badge == 'Updated'}
            <span
              class="inline-block bg-purple-400 text-gray-800 text-xs px-2
                rounded-md uppercase font-semibold tracking-wide">
              {badge}
            </span>
          {:else if badge == 'New'}
            <span
              class="inline-block bg-blue-400 text-gray-800 text-xs px-2
                rounded-md uppercase font-semibold tracking-wide">
              {badge}
            </span>
          {:else}
            <span
              class="inline-block bg-red-400 text-gray-800 text-xs px-2
                rounded-md uppercase font-semibold tracking-wide">
              {badge}
            </span>
          {/if}
        </div>
        <h1
          class="text-2xl font-bold text-gray-900 leading-tight sm:mt-2
            sm:text-3xl md:mt-1 md:text-3xl lg:mt-2 lg:text-3xl xl:mt-2
            xl:text-4xl truncate">
          {title}
        </h1>
        <h2
          class="text-gray-600 text-xl font-normal sm:mt-2 sm:text-xl md:mt-1
            md:text-xl lg:text-2xl xl:text-3xl truncate">
          {subtitle}
        </h2>
        <div
          class="mt-1 text-gray-900 font-light text-base leading-tight
            md:truncate">
          <a class="text-blue-900 underline" href="#/mentored/{author}">
            {author}
          </a>
        </div>
        {#if mentorAvailable == 'Available'}
          <form on:submit|preventDefault={submitMentor}>
            <div class="mt-4 sm:mt-6">
              <button
                type="submit"
                aria-label="Tip Mentor"
                class="inline-block px-5 py-3 rounded-lg shadow-lg bg-blue-700
                  hover:bg-blue-600 text-white tracking-wider font-semibold
                  sm:text-base">
                Tip and Get Coached from {price} AR
              </button>
              <div>PST Holders fee included</div>
            </div>
          </form>
        {/if}
      </div>
    </div>
    <div class="hidden lg:block lg:w-1/2 lg:relative lg:mr-8">
      <img
        class="absolute inset-0 h-64 w-full object-cover object-center
          rounded-lg"
        src={imageUrl}
        alt={title} />
    </div>
  </div>
  <div
    class="mt-16 px-2 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:px-12
      aspect-16x9">
    {@html content}
  </div>
{/if}
