import * as argon from 'argon2';
import faker from '@faker-js/faker';
import * as fs from 'fs';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const usersAmount = 10;
const postsAmount = 100;
const commentsCnt = 500;
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

generateUsers().then(() => {
  fs.writeFileSync('./prisma/data/users.json', JSON.stringify(usersData));

  const postsData = Array.from({ length: postsAmount }).map(() => ({
    title: faker.fake(
      '{{vehicle.manufacturer}} {{name.jobDescriptor}} {{animal.cat}}',
    ),
    description: faker.hacker.phrase(),
    content: faker.lorem.sentences(8),
    authorId: getRandomInt(usersAmount) + 1,
  }));

  fs.writeFileSync('./prisma/data/posts.json', JSON.stringify(postsData));

  const commentsData = Array.from({ length: commentsCnt }).map(() => ({
    content: faker.hacker.phrase(),
    authorId: getRandomInt(usersAmount) + 1,
    postId: getRandomInt(postsAmount) + 1,
  }));

  fs.writeFileSync('./prisma/data/comments.json', JSON.stringify(commentsData));

  const subscriptionsData = [];
  const subsCouples = [];

  for (let i = 0; i < subscriptionsCnt; i++) {
    let validCombination = false;

    let _subscriberId = getRandomInt(usersAmount) + 1;
    let _subscribingId = getRandomInt(usersAmount) + 1;

    if (
      _subscriberId !== _subscribingId &&
      subsCouples.find((item) => {
        return (
          item.subscriberId === _subscriberId &&
          item.subscribingId === _subscribingId
        );
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
          return (
            item.subscriberId === _subscriberId &&
            item.subscribingId === _subscribingId
          );
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
      title: `${usersData[_subscribingId - 1].givenName} ${
        usersData[_subscribingId - 1].familyName
      }`,
      subscriberId: _subscriberId,
      subscribingId: _subscribingId,
    });
  }

  console.log(subscriptionsData);

  fs.writeFileSync(
    './prisma/data/subscriptions.json',
    JSON.stringify(subscriptionsData),
  );
});
