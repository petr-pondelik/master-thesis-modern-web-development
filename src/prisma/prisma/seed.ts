import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

let users = JSON.parse(fs.readFileSync('./prisma/data/users.json', 'utf8'));
users = users.map((user: any) => ({
  email: user.email,
  password: user.passwordHash,
  givenName: user.givenName,
  familyName: user.familyName,
  profileDescription: user.profileDescription,
}));

const articles = JSON.parse(fs.readFileSync('./prisma/data/articles.json', 'utf8'));

const subscriptions = JSON.parse(fs.readFileSync('./prisma/data/subscriptions.json', 'utf8'));

const readingLists = JSON.parse(fs.readFileSync('./prisma/data/reading-lists.json', 'utf8'));

const prisma = new PrismaClient();

async function insert() {
  await prisma.user.createMany({
    data: users,
  });
  await prisma.article.createMany({
    data: articles,
  });
  for (const rl of readingLists) {
    await prisma.readingList.create({
      data: rl
    })
  }
  await prisma.subscription.createMany({
    data: subscriptions,
  });
}

insert().catch((reason) => console.log(reason));
