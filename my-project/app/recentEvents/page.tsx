import Carousel from "./components/Carousel";

async function getInstagramPosts() {
  const url = "http://localhost:4000";
  const res = await fetch(url + `/getInstagramPosts`, { cache: "no-store" });
  const data = res.json();
  return data;
}

export default async function InstagramPage() {
  const posts = await getInstagramPosts();

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white text-center">
        Instagram Posts
      </h1>
      <div className="flex flex-wrap  items-center justify-center flex-row flew-wrap gap-100">
        {posts.instagramPosts.map((post: any) => {
          return (
            <div className="h-fit w-fit p-4" key={post.id}>
              <InstagramPost instaPost={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InstagramPost({ instaPost }: any) {
  let url: any = [];
  if (instaPost.media_type === "CAROUSEL_ALBUM") {
    for (let i = 0; i < instaPost.children.data.length; i++) {
      url.push(instaPost.children.data[i].media_url);
    }
  }
  return (
    <>
      <div className="card glass bg-base-300 shadow-xl w-[250px] h-[500px]">
        {instaPost.media_type === "CAROUSEL_ALBUM" ? (
          <Carousel
            className="bg-red-400 rounded-t-lg"
            children={url}
            id={instaPost.id}
          />
        ) : instaPost.media_type === "IMAGE" ? (
          <figure>
            <img src={instaPost.media_url} />
          </figure>
        ) : (
          <figure>
            <video src={instaPost.media_url} />
          </figure>
        )}
        <div className="card-body">
          <a className="link" href={instaPost.permalink}>
            <p>{instaPost.caption.substring(0, 100) + "..."}</p>
          </a>
        </div>
      </div>
    </>
  );
}
