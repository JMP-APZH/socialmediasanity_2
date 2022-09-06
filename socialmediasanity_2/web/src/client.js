import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// line 2 is different in the tutorial

export const client = sanityClient({
  projectId: process.env.EMOPIC_APP_SANITY_PRJ_ID,
  dataset: 'production',
  apiVersion: '2022-08-25',
  useCdn: true,
  token: process.env.EMOPIC_APP_SANITY_TOKEN,

})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
