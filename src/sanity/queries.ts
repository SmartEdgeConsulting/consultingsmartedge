export const getAnnouncement = `*[_type == "announcement"]{
  _id,
  newAnnouncement,
}`;

export const getDepartments = `*[_type == "departments"] {
  _id,
  department,
}`;

export const getJobs = `*[_type == "careers" && Available == true] | order(publishedAt desc) {
  _id,
  jobTitle,
  slug,
  department->{
    _id,
    department,
    slug
  },
  jobDescription,
  jobType,
  "requirements": requirements[].requirement,
  applicationLink,
  publishedAt
}`;

export const getTeams = `*[_type == "teams"] | order(order asc) {
  _id,
  name,
  slug,
  title,
  profilePicture,
  bio,
  "techStack": techStack[].stack,
  linkedin,
  email
}`;

export const getEvents = `*[_type == "events"] {
  _id,
  name,
  "slug": slug.current,
  publishedAt,
  coverImage {
    asset->,
    caption
  },
  description
}`;

export const getArticles = `*[_type == "articles"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  coverImage {
    asset->,
    caption
  },
  author {
    name,
    profilePicture {
      asset->
    }
  },
  content
}`;

export const getArticle = `*[_type == "articles" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  coverImage {
    asset->,
    caption
  },
  author {
    name,
    profilePicture {
      asset->
    }
  },
  content
}`;
