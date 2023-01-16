import Carousel from "./components/Carousel"

async function getInstagramPosts() {
    const url = "http://localhost:4000"
    const res = await fetch(url + `/getInstagramPosts`, { cache: "no-store" })
    const data = res.json()
    return data
}


export default async function InstagramPage() {
    const posts = await getInstagramPosts()
    

    return (
        <div>
            <h1>Instagram Posts</h1>
            <div className="grid grid-rows-2 grid-cols-4 gap-100">
            {posts.instagramPosts.map((post:any) => { 
                return(
                    <div className="h-fit w-fit " key={post.id}><InstagramPost instaPost={post}/></div>
                )
            })}
            </div>
        </div>
    )
}


function InstagramPost({ instaPost }: any) {
    let url: any=[]
    if(instaPost.media_type === "CAROUSEL_ALBUM"){
        for(let i = 0; i < instaPost.children.data.length; i++){
            url.push(instaPost.children.data[i].media_url)
        }
    }
    return (
        <>
            <div className="card bg-base-300 shadow-xl w-[250px] h-[500px]">
                <a className="link" href={instaPost.permalink}>{instaPost.username}</a>
                {instaPost.media_type === "CAROUSEL_ALBUM" ? <Carousel className="bg-red-400" children={url} id={instaPost.id}/> : (instaPost.media_type === "IMAGE" ?<figure><img src={instaPost.media_url}/></figure> :  <figure><video src={instaPost.media_url}/></figure>)}
                <div className="card-body">
                    <a className="link" href={instaPost.permalink}><p>{instaPost.caption.substring(0,100) + "..."}</p></a>
                </div>
            </div>
        </>
    )
}

