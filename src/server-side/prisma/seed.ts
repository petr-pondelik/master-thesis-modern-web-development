import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

let users = JSON.parse(fs.readFileSync('./prisma/data/users.json', 'utf8'));
users = users.map((user) => ({
  email: user.email,
  password: user.passwordHash,
  givenName: user.givenName,
  familyName: user.familyName,
  profileDescription: user.profileDescription,
}));

const posts = JSON.parse(fs.readFileSync('./prisma/data/posts.json', 'utf8'));

const comments = JSON.parse(
  fs.readFileSync('./prisma/data/comments.json', 'utf8'),
);

const subscriptions = JSON.parse(
  fs.readFileSync('./prisma/data/subscriptions.json', 'utf8'),
);

const prisma = new PrismaClient();

async function insert() {
  await prisma.user.createMany({
    data: users,
  });
  await prisma.post.createMany({
    data: posts,
  });
  await prisma.comment.createMany({
    data: comments,
  });
  await prisma.subscription.createMany({
    data: subscriptions,
  });
}

insert().catch((reason) => console.log(reason));
