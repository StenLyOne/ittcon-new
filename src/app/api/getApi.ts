export async function getHomeData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home?populate[partners][populate]=image`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
    }
  );

  const data = await res.json();
  console.log(data); 
  return data;
}
