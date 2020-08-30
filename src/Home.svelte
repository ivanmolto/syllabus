<script>
  import { onMount } from "svelte";
  import SyllabusGrid from "./SyllabusGrid.svelte";
  import { documentTitle } from "./helpers.js";
  import { syllabiByApp } from "./syllabi.js";
  import { syllabiStore } from "./stores.js";
  let tempSyllabi = [];
  let syllabi = [];
  onMount(async () => {
    tempSyllabi = await syllabiByApp();
    for (let i = 0; i < tempSyllabi.length; i++) {
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
    syllabiStore.set(syllabi);
    documentTitle();
  });
</script>

<SyllabusGrid syllabiStore={$syllabiStore} />
