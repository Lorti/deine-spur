const axios = require('axios');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '„“‚‘',
});

const http = axios.create({
  baseURL: 'https://cms.deinespur.at',
});

function transformText(block) {
  return md
    .render(block)
    .replace(/<h2/g, '<h2 class="lg:text-3xl mt-12 mb-4"')
    .replace(/<p/g, '<p class="mb-4"')
    .replace(/<ul/g, '<ul class="mb-4"')
    .replace(/<li *.?>/g, '$&<img aria-hidden="true" src="logo.png">');
}

async function getIndex() {
  const index = {};

  const { data: introductionResponse } = await http.get('/introduction');
  index.introduction = transformText(introductionResponse.text);

  const { data: workshopsResponse } = await http.get('/workshops');
  index.beforeWorkshopBlock = transformText(workshopsResponse.text_before)
    .replace('<h2 class="', '<h2 class="text-center ');
  index.workshops = workshopsResponse.workshops.map((workshop) => ({
    icon: `https://cms.deinespur.at/${workshop.icon.url}`,
    title: workshop.title,
    description: transformText(workshop.description),
  }));
  index.afterWorkshopBlock = transformText(workshopsResponse.text_after);

  const { data: teamResponse } = await http.get('/team');
  index.team = teamResponse.members.map((member) => ({
    name: member.name,
    image: `https://cms.deinespur.at/${member.image.url}`,
    biography: transformText(member.biography),
  }));

  return index;
}

module.exports = getIndex;
