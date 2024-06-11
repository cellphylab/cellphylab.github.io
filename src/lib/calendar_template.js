module.exports = (zoom, talk) => {
  return {
    title: `${talk.name}: Biophysics Australia Seminar Series`,
    description: `Hi There!\nTalk by ${talk.name} at Biophysics Australia Seminar Series.\n Zoom details: \n ${zoom.url}\n zoom id: ${zoom.id} password: ${zoom.password}.\n\n --\nRegards,\nTeam biophysicsaus.com`,
    start: `${talk.date} ${talk.time}`,
    duration: [1, "hour"],
  };
};
