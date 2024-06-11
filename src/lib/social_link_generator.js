const FACEBOOK_BASE = `https://www.facebook.com/sharer/sharer.php?`;
const TWITTER_BASE = "https://twitter.com/intent/tweet?";
const LINKEDIN_BASE = "https://www.linkedin.com/sharing/share-offsite?";

function generateFacebookLink(meta) {
  const encodedPayload = encodeURIComponent(meta.link);
  let href = `${FACEBOOK_BASE}u=${encodedPayload}&display=popup&ref=plugin&src=share_button`;
  return `
  <div class="fb-share-button" data-href="${meta.link}" data-layout="button" data-size="large">
    <a target="_blank" href="${href}" class="fb-xfbml-parse-ignore">Share</a>
  </div>
  `;
}

// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
// https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites
function generateTwitterLink(meta) {
  const encodedPayload = `url=${encodeURIComponent(
    meta.link
  )}&text=${encodeURIComponent(meta.title)}`;
  return `<a class="twitter-share-button" href="${TWITTER_BASE}${encodedPayload}&hashtags=biophysicsaus,biophysics&via=biophysicsaus" data-size="large">Tweet</a>`;
}

function generateLinkedInLink(meta) {
  const encodedPayload = encodeURIComponent(meta.link);
  return `<script type="IN/Share" data-url="${LINKEDIN_BASE}mini=true&url=${encodedPayload}&title=${encodeURIComponent(
    meta.title
  )}source=BiophysicAustralia" data-title="${meta.title}"`;
  //summary=
  // https://www.linkedin.com/shareArticle?mini=true&url=http://developer.linkedin.com&title=LinkedIn%20Developer%20Network%20&summary=My%20favorite%20developer%20program&source=LinkedIn
}

module.exports = {
  twitter: generateTwitterLink,
  linkedin: generateLinkedInLink,
  facebook: generateFacebookLink,
};
