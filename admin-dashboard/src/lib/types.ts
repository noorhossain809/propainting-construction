export const getVideoType = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      return "youtube";
    }

    if (hostname.includes("vimeo.com")) {
      return "vimeo";
    }

    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(parsedUrl.pathname)) {
      return "direct";
    }

    return "unknown";
  } catch {
    return "unknown";
  }
};

export const getYoutubeEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    let videoId = "";

    if (parsedUrl.hostname.includes("youtu.be")) {
      videoId = parsedUrl.pathname.slice(1);
    } else if (parsedUrl.hostname.includes("youtube.com")) {
      videoId = parsedUrl.searchParams.get("v") || "";

      if (parsedUrl.pathname.startsWith("/embed/")) {
        videoId = parsedUrl.pathname.split("/embed/")[1];
      }
    }

    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  } catch {
    return null;
  }
};

export const getVimeoEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname.split("/").filter(Boolean);
    const videoId = parts[parts.length - 1];

    if (!videoId || !/^\d+$/.test(videoId)) {
      return null;
    }

    return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1`;
  } catch {
    return null;
  }
};