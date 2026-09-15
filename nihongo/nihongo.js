/* Shared lesson-progress tracking for the Nihongo lesson hub.
   Separate from kanjicard's own per-kanji progress store — this just
   tracks which lesson DAYS the user has marked as done. */
(function (global) {
  "use strict";
  const KEY = "nihongo.lessons.v1";

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      /* ignore */
    }
  }

  function isDone(course, day) {
    const data = load();
    return !!(data[course] && data[course][day]);
  }

  function setDone(course, day, done) {
    const data = load();
    if (!data[course]) data[course] = {};
    if (done) data[course][day] = true;
    else delete data[course][day];
    save(data);
  }

  function courseProgress(course, totalDays) {
    const data = load();
    const doneDays = data[course] ? Object.keys(data[course]).length : 0;
    return { done: Math.min(doneDays, totalDays), total: totalDays };
  }

  global.NihongoProgress = { isDone, setDone, courseProgress };
})(window);

