export const getDepartments = `*[_type == "departments"] {
  _id,
  department,
}`;

export const getJobs = `*[_type == "careers" && available == true] | order(publishedAt desc) {
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
  available,
  publishedAt
}`;

export const getTeams = `*[_type == "teams"] {
  _id,
  name,
  slug,
  profilePicture {
  asset->,
  caption},
  skill,
}`;

export const getTestimonials = `*[_type == "testimonials"] {
  _id,
  name,
  slug,
  title,
  profilePicture {
  asset->,
  caption},
  testimony
}`;

export const getVideoTestimonials = `*[_type == "videoTestimonials"] {
    _id,
    video {
      asset
    }
}`;

export const getEvents = `*[_type == "events"] | order(order desc) {
  _id,
  name,
  "slug": slug.current,
  time,
  publishedAt,
  coverImage {
    asset->,
    caption
  },
  ctaButton {
    text,
    url
  },
  description
}`;

export const getUpcomingEvents = `*[_type == "events" && time != "Concluded"] {
  _id,
  name,
  "slug": slug.current,
  time,
  publishedAt,
  coverImage {
    asset->,
    caption
  },
  ctaButton {
    text,
    url
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

export const getCourses = `*[_type == "course"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  courseType,
  price,
  thumbnail {
    asset->,
    caption
  },
  "publishedAt": coalesce(publishedAt, _createdAt),
  "modulesCount": count(modules),
  "lessonsCount": count(modules[] -> lessons),
}`;
