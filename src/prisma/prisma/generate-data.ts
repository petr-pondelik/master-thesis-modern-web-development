import * as argon from 'argon2';
import faker from '@faker-js/faker';
import * as fs from 'fs';
import { randomInt } from 'crypto';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const usersAmount = 10;
const storiesAmount = 100;
const commentsCnt = 500;
const readingListsAmount = 20;
const subscriptionsCnt = Math.floor((usersAmount * usersAmount) / 4);

const usersData: any[] = [];

async function generateUsers() {
  for (let i = 0; i < usersAmount; i++) {
    const _firstName = faker.name.firstName();
    const _lastName = faker.name.lastName();
    const _password = faker.internet.password(8, true);
    const passwordHash = await argon.hash(_password);
    usersData.push({
      email: faker.internet.email(_firstName, _lastName),
      password: _password,
      passwordHash: passwordHash,
      givenName: _firstName,
      familyName: _lastName,
      profileDescription: faker.hacker.phrase(),
    });
  }
}

const generateAritcles = () => {
  const storiesData = Array.from({ length: storiesAmount }).map(() => {
    const _description = faker.hacker.phrase();
    const phraseCleaned = _description.replace(/[^\w\s]/gi, '');
    const phraseParts = phraseCleaned.split(' ');
    // console.log(phraseCleaned);
    // console.log(phraseParts);
    let _title = phraseParts[0];
    for (let i = 0; i < randomInt(Math.floor(phraseParts.length / 4), Math.floor(phraseParts.length / 2)); i++) {
      let alreadyPicked = true;
      let word = '';
      while (alreadyPicked) {
        word = phraseParts[randomInt(1, phraseParts.length - 1)];
        if (!_title.includes(word)) {
          alreadyPicked = false;
        }
      }
      _title += ` ${word}`;
      console.log(_title);
    }
    return {
      title: _title,
      description: _description,
      content: faker.lorem.sentences(8),
      authorId: getRandomInt(usersAmount) + 1,
    };
  });

  fs.writeFileSync('./prisma/data/stories.json', JSON.stringify(storiesData));
};

const generateComments = () => {
  const commentsData = Array.from({ length: commentsCnt }).map(() => ({
    content: faker.hacker.phrase(),
    authorId: getRandomInt(usersAmount) + 1,
    storyId: getRandomInt(storiesAmount) + 1,
  }));

  fs.writeFileSync('./prisma/data/comments.json', JSON.stringify(commentsData));
};

const generateSubscriptions = () => {
  const subscriptionsData = [];
  const subsCouples = [];

  for (let i = 0; i < subscriptionsCnt; i++) {
    let validCombination = false;

    let _subscriberId = getRandomInt(usersAmount) + 1;
    let _subscribingId = getRandomInt(usersAmount) + 1;

    if (
      _subscriberId !== _subscribingId &&
      subsCouples.find((item) => {
        return item.subscriberId === _subscriberId && item.subscribingId === _subscribingId;
      }) === undefined
    ) {
      validCombination = true;
    }

    while (!validCombination) {
      _subscriberId = getRandomInt(usersAmount) + 1;
      _subscribingId = getRandomInt(usersAmount) + 1;
      if (
        _subscriberId !== _subscribingId &&
        subsCouples.find((item) => {
          return item.subscriberId === _subscriberId && item.subscribingId === _subscribingId;
        }) === undefined
      ) {
        validCombination = true;
      }
    }

    subsCouples.push({
      subscriberId: _subscriberId,
      subscribingId: _subscribingId,
    });

    subscriptionsData.push({
      subscriberId: _subscriberId,
      subscribingId: _subscribingId,
    });
  }

  fs.writeFileSync('./prisma/data/subscriptions.json', JSON.stringify(subscriptionsData));
};

const generateReadingLists = () => {
  const readingListsData: any[] = [];
  for (let i = 1; i <= readingListsAmount; i++) {
    const stories = [];
    readingListsData.push({
      title: faker.word.noun(),
      authorId: getRandomInt(usersAmount) + 1,
      stories: {
        connect: []
      }
    });
    const storiesCnt = randomInt(3, 8);
    const usedStories: any[]  = [];
    for (let j = 0; j < storiesCnt; j++) {
      let validStory = false;
      while (!validStory) {
        const storyId = randomInt(storiesAmount) + 1;
        if (!usedStories.includes(storyId)) {
          validStory = true;
          stories.push({id: storyId});
        }
        usedStories.push(storyId);
      }
    }
    readingListsData[i-1].stories.connect = stories;
  }
  fs.writeFileSync('./prisma/data/reading-lists.json', JSON.stringify(readingListsData));
  // fs.writeFileSync('./prisma/data/stories-on-reading-lists.json', JSON.stringify(storiesOnReadingLists));
};

generateUsers().then(() => {
  fs.writeFileSync('./prisma/data/users.json', JSON.stringify(usersData));
  generateAritcles();
  generateComments();
  generateReadingLists();
  generateSubscriptions();
});
