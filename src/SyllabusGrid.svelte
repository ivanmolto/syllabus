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
  <h3 class="px-6 py-6 text-gray-900 text-bold text-3xl">
    {#if $badgesStore == 'All' && $languagesStore == 'All' && $mentorsStore != 'All' && $subjectsStore == 'All'}
      {$mentorsStore} Mentors for Syllabi
    {:else if $badgesStore == 'All' && $languagesStore == 'All' && $mentorsStore != 'All'}
      {$mentorsStore} Mentors for {$subjectsStore} Syllabi
    {:else if $badgesStore == 'All' && $languagesStore == 'All'}
      {$subjectsStore} Syllabi
    {:else if $subjectsStore == 'All' && $badgesStore == 'All' && $languagesStore != 'All'}
      {$mentorsStore} Mentors for {$languagesStore} Syllabi
    {:else if $subjectsStore != 'All' && $badgesStore == 'All' && $languagesStore != 'All'}
      {$mentorsStore} Mentors for {$languagesStore} {$subjectsStore} Syllabi
    {:else if $subjectsStore == 'All' && $languagesStore == 'All' && $badgesStore != 'All'}
      {$mentorsStore} Mentors for {$badgesStore} Syllabi
    {:else if $subjectsStore == 'All' && $languagesStore != 'All' && $badgesStore != 'All'}
      {$mentorsStore} Mentors for {$languagesStore} {$badgesStore} Syllabi
    {:else}
      {$mentorsStore} Mentors for {$badgesStore} {$languagesStore}
      {$subjectsStore} Syllabi
    {/if}
  </h3>
  <section class="mt-2 px-6">
    {#each syllabiStore as syllabus}
      {#if $subjectsStore == 'All'}
        {#if $languagesStore == 'All'}
          {#if $badgesStore == 'All'}
            {#if $mentorsStore == 'All'}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {/if}
          {:else if syllabus.badge == $badgesStore}
            {#if $mentorsStore == 'All'}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {/if}
          {/if}
        {:else if syllabus.language == $languagesStore}
          {#if $badgesStore == 'All'}
            {#if $mentorsStore == 'All'}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {/if}
          {:else if syllabus.badge == $badgesStore}
            {#if $mentorsStore == 'All'}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {/if}
          {/if}
        {/if}
      {:else if syllabus.subject == $subjectsStore}
        {#if $languagesStore == 'All'}
          {#if $badgesStore == 'All'}
            {#if $mentorsStore == 'All'}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {/if}
          {:else if syllabus.badge == $badgesStore}
            {#if $mentorsStore == 'All'}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {/if}
          {/if}
        {:else if syllabus.language == $languagesStore}
          {#if $badgesStore == 'All'}
            {#if $mentorsStore == 'All'}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {/if}
          {:else if syllabus.badge == $badgesStore}
            {#if $mentorsStore == 'All'}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {:else if syllabus.mentorAvailable == $mentorsStore}
              <SyllabusItem
                id={syllabus.id}
                title={syllabus.title}
                subtitle={syllabus.subtitle}
                imageUrl={syllabus.imageUrl}
                duration={syllabus.duration}
                language={syllabus.language}
                rating={syllabus.rating}
                reviewCount={syllabus.reviewCount}
                isFavorite={syllabus.isFavorite}
                badge={syllabus.badge}
                author={syllabus.author}
                mentorAvailable={syllabus.mentorAvailable}
                price={syllabus.price}
                subject={syllabus.subject}
                status={syllabus.status}
                apiVersion={syllabus.apiVersion}
                timestamp={syllabus.timestamp}
                content={syllabus.content} />
            {/if}
          {/if}
        {/if}
      {/if}
    {/each}
  </section>
{:else}
  <h3 class="px-6 py-6 text-gray-900 text-bold text-3xl">
    Search results for {$searchStore}
  </h3>
  <section class="mt-2 px-6">
    {#each syllabiStore as syllabus}
      {#if syllabus.title
        .toLowerCase()
        .includes(
          $searchStore
        ) || syllabus.subtitle.toLowerCase().includes($searchStore)}
        <SyllabusItem
          id={syllabus.id}
          title={syllabus.title}
          subtitle={syllabus.subtitle}
          imageUrl={syllabus.imageUrl}
          duration={syllabus.duration}
          language={syllabus.language}
          rating={syllabus.rating}
          reviewCount={syllabus.reviewCount}
          isFavorite={syllabus.isFavorite}
          badge={syllabus.badge}
          author={syllabus.author}
          mentorAvailable={syllabus.mentorAvailable}
          price={syllabus.price}
          subject={syllabus.subject}
          status={syllabus.status}
          apiVersion={syllabus.apiVersion}
          timestamp={syllabus.timestamp}
          content={syllabus.content} />
      {/if}
    {/each}
  </section>
{/if}
