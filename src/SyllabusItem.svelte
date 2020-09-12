<script>
  import { read } from "./syllabus.js";
  export let id;
  $: render(id);
  let syllabus = {};
  let title;
  let subtitle;
  let imageUrl;
  let duration;
  let language;
  let rating;
  let reviewCount;
  let isFavorite;
  let badge;
  let author;
  let mentorAvailable;
  let price;
  let subject;
  let status;
  let apiVersion;
  let content;
  let timestamp;
  const render = async (id) => {
    syllabus = await read(id);
    title = syllabus["tags"]["Title"];
    subtitle = syllabus["tags"]["Subtitle"];
    duration = syllabus["tags"]["Duration"];
    language = syllabus["tags"]["Language"];
    rating = syllabus["tags"]["Rating"];
    reviewCount = syllabus["tags"]["ReviewCount"];
    isFavorite = syllabus["tags"]["IsFavorite"];
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
</script>

<div class="bg-white rounded-lg overflow-hidden shadow-lg">
  <a href="#/syllabus/{id}" class="no-underline">
    <div class="relative pb-2/3">
      <img class="h-32 w-full object-cover" src={imageUrl} alt={title} />
    </div>
    <div class="p-4">
      <div class="items-baseline">
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
            class="inline-block bg-red-400 text-gray-800 text-xs px-2 rounded-md
              uppercase font-semibold tracking-wide">
            {badge}
          </span>
        {/if}
        <div class="mt-2 text-gray-800 text-xs font-semibold tracking-wide">
          {language} &bull; {duration}
        </div>
      </div>
      <div
        class="mt-1 font-semibold text-base leading-tight row-span-2 truncate">
        {title}
      </div>
      <div
        class="mt-1 text-gray-700 font-base text-medium leading-tight row-span-2
          truncate">
        {subtitle}
      </div>
      <div class="mt-2 flex items-center">
        <span class="text-teal-800 font-semibold text-sm">{rating}</span>
        <span class="ml-2 text-gray-800 text-sm">({reviewCount} ratings)</span>
      </div>
      <div
        class="mt-1 text-gray-900 font-light text-sm leading-tight row-span-2
          truncate">
        {author}
      </div>
      <div class="items-baseline">
        {#if mentorAvailable == 'Available'}
          <span
            class="mt-2 inline-block bg-teal-200 text-teal-800 text-xs px-2
              rounded-md uppercase font-semibold tracking-wide">
            Mentor
          </span>
        {/if}
      </div>
    </div>
  </a>
</div>
