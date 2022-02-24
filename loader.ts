const loader = ({ src, width, quality }) => {
    if (process.env.NEXT_PUBLIC_IN_DEVELOPMENT)
        return `/_next/image?url=${src}&w=${width}&q=75`;
    return `https://aiwsahcqlq.cloudimg.io/${src}?width=${width}`

}

export default loader;