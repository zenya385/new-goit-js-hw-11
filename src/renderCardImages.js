export default function renderCardImages(listOfImages) {
  const markup = listOfImages
    .map(imageCard => {
      return `<div class="photo-card">
                <img src="${imageCard.webformatURL}" alt="${imageCard.tags}" loading="lazy" width="300" height="200"/>
                  <div class="info">
                      <p class="info-item">
                        <b>Likes</b>
                        ${imageCard.likes}
                      </p>
                      <p class="info-item">
                        <b>Views</b>
                        ${imageCard.views}
                      </p>
                      <p class="info-item">
                        <b>Comments</b>
                        ${imageCard.comments}
                      </p>
                      <p class="info-item">
                        <b>Downloads</b>
                        ${imageCard.downloads}
                      </p>
                  </div>
              </div>`;
    })
    .join('');

  return markup;
}
