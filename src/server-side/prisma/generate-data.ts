import * as argon from 'argon2';
import faker from '@faker-js/faker';
import * as fs from 'fs';
import { randomInt } from 'crypto';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const usersAmount = 10;
const articlesAmount = 100;
const commentsCnt = 500;
const readingListsAmount = 20;
const subscriptionsCnt = Math.floor((usersAmount * usersAmount) / 4);

const usersData = [];

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
  const articlesData = Array.from({ length: articlesAmount }).map(() => {
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

  fs.writeFileSync('./prisma/data/articles.json', JSON.stringify(articlesData));
};

const generateComments = () => {
  const commentsData = Array.from({ length: commentsCnt }).map(() => ({
    content: faker.hacker.phrase(),
    authorId: getRandomInt(usersAmount) + 1,
    articleId: getRandomInt(articlesAmount) + 1,
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
  const readingListsData = [];
  const articlesOnReadingLists = [];
  for (let i = 1; i <= readingListsAmount; i++) {
    readingListsData.push({
      title: faker.word.noun(),
      authorId: getRandomInt(usersAmount) + 1,
    });
    const articlesCnt = randomInt(3, 8);
    const usedArticles = [];
    for (let j = 0; j < articlesCnt; j++) {
      let validArticle = false;
      while (!validArticle) {
        const articleId = randomInt(articlesAmount) + 1;
        if (!usedArticles.includes(articleId)) {
          validArticle = true;
          articlesOnReadingLists.push({
            readingListId: i,
            articleId: articleId,
          });
        }
        usedArticles.push(articleId);
      }
    }
  }
  fs.writeFileSync('./prisma/data/reading-lists.json', JSON.stringify(readingListsData));
  fs.writeFileSync('./prisma/data/articles-on-reading-lists.json', JSON.stringify(articlesOnReadingLists));
};

generateUsers().then(() => {
  fs.writeFileSync('./prisma/data/users.json', JSON.stringify(usersData));
  generateAritcles();
  generateComments();
  generateReadingLists();
  generateSubscriptions();
});
