<script>
  import { createEventDispatcher, onMount } from "svelte";
  import SyllabusGrid from "./SyllabusGrid.svelte";
  import { documentTitle } from "./helpers.js";
  import { syllabiByApp } from "./syllabi.js";

  import {
    subjectsStore,
    badgesStore,
    mentorsStore,
    syllabiStore,
  } from "./stores.js";

  const dispatch = createEventDispatcher();

  let tempSyllabi = [];
  let syllabi = [];
  console.log($syllabiStore);

  /* let subjectsFilter = $subjectsStore;
  let badgesFilter = $badgesStore;
  let mentorsFilter = $mentorsStore; */

  onMount(async () => {
    tempSyllabi = await syllabiByApp();
    console.log(tempSyllabi.length);
    for (let i = 0; i < tempSyllabi.length; i++) {
      console.log(tempSyllabi[i]);
      let item = {
        id: tempSyllabi[i].id,
        title: tempSyllabi[i].tags["Syllabus-Title"],
        subtitle: tempSyllabi[i].tags["Syllabus-Subtitle"],
        imageUrl: tempSyllabi[i].tags["Syllabus-ImageUrl"],
        duration: tempSyllabi[i].tags["Syllabus-Duration"],
        language: tempSyllabi[i].tags["Syllabus-Language"],
        rating: tempSyllabi[i].tags["Syllabus-Rating"],
        reviewCount: tempSyllabi[i].tags["Syllabus-ReviewCount"],
        isFavorite: tempSyllabi[i].tags["Syllabus-IsFavorite"],
        badge: tempSyllabi[i].tags["Syllabus-Badge"],
        author: tempSyllabi[i].tags["Syllabus-Author"],
        mentorAvailable: tempSyllabi[i].tags["Syllabus-Mentor"],
        price: tempSyllabi[i].tags["Syllabus-Price"],
        subject: tempSyllabi[i].tags["Syllabus-Subject"],
        status: tempSyllabi[i].tags["Syllabus-Status"],
        apiVersion: tempSyllabi[i].tags["Syllabus-API"],
        timestamp: tempSyllabi[i].tags["Syllabus-Timestamp"],
        content: tempSyllabi[i].data,
      };
      syllabi.push(item);
    }
    console.log(syllabi);
    syllabiStore.set(syllabi);
    console.log($syllabiStore);
    documentTitle();
  });
</script>

<SyllabusGrid syllabiStore={$syllabiStore} />
