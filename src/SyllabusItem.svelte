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
    title = syllabus["tags"]["Syllabus-Title"];
    subtitle = syllabus["tags"]["Syllabus-Subtitle"];
    duration = syllabus["tags"]["Syllabus-Duration"];
    language = syllabus["tags"]["Syllabus-Language"];
    rating = syllabus["tags"]["Syllabus-Rating"];
    reviewCount = syllabus["tags"]["Syllabus-ReviewCount"];
    isFavorite = syllabus["tags"]["Syllabus-IsFavorite"];
    badge = syllabus["tags"]["Syllabus-Badge"];
    author = syllabus["tags"]["Syllabus-Author"];
    mentorAvailable = syllabus["tags"]["Syllabus-Mentor"];
    price = syllabus["tags"]["Syllabus-Price"];
    subject = syllabus["tags"]["Syllabus-Subject"];
    status = syllabus["tags"]["Syllabus-Status"];
    apiVersion = syllabus["tags"]["Syllabus-API"];
    timestamp = syllabus["tags"]["Syllabus-Timestamp"];
    imageUrl = syllabus.data.slice(0, syllabus["tags"]["Syllabus-ImageUrl"]); // syllabus["tags"]["Syllabus-ImageUrl"];
    content = syllabus.data.slice(syllabus["tags"]["Syllabus-ImageUrl"], -1);
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
