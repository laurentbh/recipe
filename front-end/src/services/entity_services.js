export const postEntity = (baseUrl, entity, word) => {
    console.log("postEntity " + entity + " on index:" + word );
      var postURl = baseUrl
      const payload = {
        name: word
      }
      switch (entity) {
        case "Ingredient":
          postURl += "/ingredients"
          break;
          case "Category":
          postURl += "/categories"
          break;
          case "Utensil":
          postURl += "/utensils"
          break;
          case "4":
          postURl += "/ignore"
          break;
        default:
          break;
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    fetch(postURl, requestOptions)
        .then(response => response.json());
}