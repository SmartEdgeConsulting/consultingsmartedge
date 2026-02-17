export const isCourseNew = (publishedAt: string | Date): boolean => {
  if (!publishedAt) {
    console.log('⚠️ publishedAt falsy/missing for course');
    return false;
  }

  const publishDate = new Date(publishedAt);
  if (isNaN(publishDate.getTime())) {
    console.log('⚠️ Invalid publishedAt:', publishedAt);
    return false;
  }

  const now = new Date();
  const diffMs = now.getTime() - publishDate.getTime();
  const isNew = diffMs <= 24 * 60 * 60 * 1000;

  if (!isNew) {
    console.log(`⏰ Course ${diffMs / (60*60*1000)}h old - not NEW`);
  }
  return isNew;
};
