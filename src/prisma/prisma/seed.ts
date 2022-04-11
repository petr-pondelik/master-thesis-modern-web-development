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

const stories = JSON.parse(fs.readFileSync('./prisma/data/stories.json', 'utf8'));
const readingLists = JSON.parse(fs.readFileSync('./prisma/data/reading-lists.json', 'utf8'));
const storiesOnReadingLists = JSON.parse(fs.readFileSync('./prisma/data/stories-on-reading-lists.json', 'utf8'));

const prisma = new PrismaClient();

async function insert() {
  await prisma.user.createMany({
    data: users,
  });
  await prisma.story.createMany({
    data: stories,
  });
  for (const rl of readingLists) {
    await prisma.readingList.create({
      data: rl
    })
  }
  await prisma.storiesOnReadingLists.createMany({
    data: storiesOnReadingLists,
  });
}

insert().catch((reason) => console.log(reason));
